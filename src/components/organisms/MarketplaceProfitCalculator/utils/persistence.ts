import type { MarketplaceId, Product } from "../types";
import { createEmptyProduct, MARKETPLACE_OPTIONS } from "../constants";
import { createProductId, toSafeNumber } from "./numberUtils";

export const STORAGE_KEY = "marketplace-profit-pricing-calculator:products";

function sanitizeMarketplace(value: unknown): MarketplaceId {
  return MARKETPLACE_OPTIONS.some((m) => m.id === value) ? (value as MarketplaceId) : "shopee";
}

function sanitizeProduct(raw: unknown): Product {
  const fallback = createEmptyProduct(createProductId());
  if (typeof raw !== "object" || raw === null) return fallback;
  const source = raw as Record<string, unknown>;

  return {
    id: typeof source.id === "string" && source.id ? source.id : fallback.id,
    name: typeof source.name === "string" ? source.name : "",
    marketplace: sanitizeMarketplace(source.marketplace),
    costPrice: toSafeNumber(source.costPrice),
    packingCost: toSafeNumber(source.packingCost),
    otherCost: toSafeNumber(source.otherCost),
    sellPrice: toSafeNumber(source.sellPrice),
    discountPercent: toSafeNumber(source.discountPercent),
    voucher: toSafeNumber(source.voucher),
    marketplaceFeePercent: toSafeNumber(source.marketplaceFeePercent),
    tax: toSafeNumber(source.tax),
    targetMarginPercent: source.targetMarginPercent === undefined ? fallback.targetMarginPercent : toSafeNumber(source.targetMarginPercent),
    note: typeof source.note === "string" ? source.note : "",
  };
}

export function loadPersistedProducts(): Product[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(sanitizeProduct);
  } catch {
    return [];
  }
}

export function persistProducts(products: Product[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch {
    // storage unavailable (private mode/quota) — silently skip persistence
  }
}

export function clearPersistedProducts(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
