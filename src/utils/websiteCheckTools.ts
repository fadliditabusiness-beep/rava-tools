export function normalizeUrl(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return trimmed;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export function normalizeDomain(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "");
}

export type PageSpeedStrategy = "mobile" | "desktop";

export interface PageSpeedAudit {
  score: number | null;
  displayValue?: string;
  title?: string;
}

export interface PageSpeedLoadingExperience {
  overall_category?: string;
  metrics?: Record<string, { percentile: number; category: string }>;
}

export interface PageSpeedResponse {
  lighthouseResult?: {
    categories?: Record<string, { score: number | null; title: string }>;
    audits?: Record<string, PageSpeedAudit>;
  };
  loadingExperience?: PageSpeedLoadingExperience;
  originLoadingExperience?: PageSpeedLoadingExperience;
}

export async function fetchPageSpeed(
  url: string,
  strategy: PageSpeedStrategy,
  apiKey?: string,
): Promise<PageSpeedResponse> {
  const params = new URLSearchParams({ url: normalizeUrl(url), strategy });
  params.append("category", "performance");
  if (apiKey) params.set("key", apiKey);

  const res = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params.toString()}`);
  if (!res.ok) {
    if (res.status === 429) throw new Error("QUOTA_EXCEEDED");
    throw new Error(`REQUEST_FAILED_${res.status}`);
  }
  return res.json();
}

const CWV_METRIC_LABELS: Record<string, string> = {
  LARGEST_CONTENTFUL_PAINT_MS: "Largest Contentful Paint (LCP)",
  INTERACTION_TO_NEXT_PAINT: "Interaction to Next Paint (INP)",
  FIRST_INPUT_DELAY_MS: "First Input Delay (FID)",
  CUMULATIVE_LAYOUT_SHIFT_SCORE: "Cumulative Layout Shift (CLS)",
  FIRST_CONTENTFUL_PAINT_MS: "First Contentful Paint (FCP)",
  EXPERIMENTAL_TIME_TO_FIRST_BYTE: "Time to First Byte (TTFB)",
};

export interface CoreWebVital {
  key: string;
  label: string;
  percentile: number;
  category: string;
}

export interface CoreWebVitalsResult {
  scope: "page" | "origin" | null;
  vitals: CoreWebVital[];
}

export function extractCoreWebVitals(response: PageSpeedResponse): CoreWebVitalsResult {
  const scoped = response.loadingExperience?.metrics
    ? { scope: "page" as const, metrics: response.loadingExperience.metrics }
    : response.originLoadingExperience?.metrics
      ? { scope: "origin" as const, metrics: response.originLoadingExperience.metrics }
      : null;

  if (!scoped) return { scope: null, vitals: [] };

  const vitals = Object.entries(scoped.metrics)
    .filter(([key]) => key in CWV_METRIC_LABELS)
    .map(([key, value]) => ({ key, label: CWV_METRIC_LABELS[key], percentile: value.percentile, category: value.category }));

  return { scope: scoped.scope, vitals };
}

export function formatCoreWebVitalValue(key: string, percentile: number): string {
  if (key === "CUMULATIVE_LAYOUT_SHIFT_SCORE") return (percentile / 100).toFixed(2);
  if (percentile >= 1000) return `${(percentile / 1000).toFixed(2)} s`;
  return `${percentile} ms`;
}

export const DNS_RECORD_TYPES = ["A", "AAAA", "MX", "TXT", "NS", "CNAME", "SOA"];

const DNS_TYPE_NUMBERS: Record<number, string> = {
  1: "A",
  2: "NS",
  5: "CNAME",
  6: "SOA",
  15: "MX",
  16: "TXT",
  28: "AAAA",
};

export function dnsTypeName(type: number): string {
  return DNS_TYPE_NUMBERS[type] ?? String(type);
}

export interface DnsAnswerRecord {
  name: string;
  type: number;
  TTL: number;
  data: string;
}

export interface DnsLookupResult {
  status: number;
  answers: DnsAnswerRecord[];
  provider: "cloudflare" | "google";
}

interface DohResponse {
  Status: number;
  Answer?: DnsAnswerRecord[];
}

export async function lookupDns(domain: string, type: string): Promise<DnsLookupResult> {
  const name = normalizeDomain(domain);

  try {
    const res = await fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(name)}&type=${type}`, {
      headers: { Accept: "application/dns-json" },
    });
    if (!res.ok) throw new Error("cloudflare failed");
    const json = (await res.json()) as DohResponse;
    return { status: json.Status, answers: json.Answer ?? [], provider: "cloudflare" };
  } catch {
    const res = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(name)}&type=${type}`);
    if (!res.ok) throw new Error("DNS_LOOKUP_FAILED");
    const json = (await res.json()) as DohResponse;
    return { status: json.Status, answers: json.Answer ?? [], provider: "google" };
  }
}

interface RdapEvent {
  eventAction: string;
  eventDate: string;
}

type RdapVcardField = [string, Record<string, unknown>, string, unknown];

interface RdapEntity {
  roles?: string[];
  handle?: string;
  vcardArray?: [string, RdapVcardField[]];
}

interface RdapNameserver {
  ldhName?: string;
}

interface RdapJson {
  ldhName?: string;
  status?: string[];
  events?: RdapEvent[];
  entities?: RdapEntity[];
  nameservers?: RdapNameserver[];
}

export interface RdapResult {
  domainName: string;
  status: string[];
  registrar: string | null;
  createdDate: string | null;
  expiresDate: string | null;
  updatedDate: string | null;
  nameServers: string[];
}

export async function lookupRdap(domain: string): Promise<RdapResult> {
  const name = normalizeDomain(domain);
  const res = await fetch(`https://rdap.org/domain/${encodeURIComponent(name)}`);
  if (res.status === 404) throw new Error("NOT_FOUND");
  if (!res.ok) throw new Error(`RDAP_FAILED_${res.status}`);

  const json = (await res.json()) as RdapJson;
  const events = json.events ?? [];
  const findEvent = (action: string) => events.find((e) => e.eventAction === action)?.eventDate ?? null;

  const registrarEntity = (json.entities ?? []).find((e) => e.roles?.includes("registrar"));
  const fnField = registrarEntity?.vcardArray?.[1]?.find((field) => field[0] === "fn");
  const registrar = (typeof fnField?.[3] === "string" ? fnField[3] : null) ?? registrarEntity?.handle ?? null;

  return {
    domainName: json.ldhName ?? name,
    status: json.status ?? [],
    registrar,
    createdDate: findEvent("registration"),
    expiresDate: findEvent("expiration"),
    updatedDate: findEvent("last changed"),
    nameServers: (json.nameservers ?? []).map((ns) => ns.ldhName).filter((ldh): ldh is string => Boolean(ldh)),
  };
}
