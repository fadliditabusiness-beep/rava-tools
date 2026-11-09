import { useState } from "react";
import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import Select from "@/components/atoms/Select/Select";
import { fetchPageSpeed, type PageSpeedResponse, type PageSpeedStrategy } from "@/utils/websiteCheckTools";

const KEY_METRICS = [
  { key: "first-contentful-paint", label: "First Contentful Paint" },
  { key: "largest-contentful-paint", label: "Largest Contentful Paint" },
  { key: "total-blocking-time", label: "Total Blocking Time" },
  { key: "cumulative-layout-shift", label: "Cumulative Layout Shift" },
  { key: "speed-index", label: "Speed Index" },
];

function scoreColor(score: number | null | undefined): string {
  if (score === null || score === undefined) return "text-slate-400";
  if (score >= 0.9) return "text-emerald-600 dark:text-emerald-400";
  if (score >= 0.5) return "text-amber-600 dark:text-amber-400";
  return "text-red-600 dark:text-red-400";
}

export default function PageSpeedCheckerTool() {
  const [url, setUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [strategy, setStrategy] = useState<PageSpeedStrategy>("mobile");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PageSpeedResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async () => {
    if (!url) return;
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      setResult(await fetchPageSpeed(url, strategy, apiKey || undefined));
    } catch (err) {
      if (err instanceof Error && err.message === "QUOTA_EXCEEDED") {
        setError("Kena limit API gratis Google. Coba lagi nanti, atau isi API key kamu sendiri di bawah.");
      } else {
        setError("Gagal memeriksa halaman. Pastikan URL valid & bisa diakses publik.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const score = result?.lighthouseResult?.categories?.performance?.score ?? null;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Dikirim langsung dari browser kamu ke Google PageSpeed Insights API, tidak lewat server kami. Tanpa API
        key, kuota gratis dibagi semua pengguna dan bisa cepat penuh.
      </p>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">URL Website</span>
        <Input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" />
      </label>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Strategi</span>
          <Select value={strategy} onChange={(e) => setStrategy(e.target.value as PageSpeedStrategy)}>
            <option value="mobile">Mobile</option>
            <option value="desktop">Desktop</option>
          </Select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
            Google API Key (opsional)
          </span>
          <Input value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="Kosongkan kalau gak punya" />
        </label>
      </div>

      <div className="flex justify-center">
        <Button disabled={!url || isLoading} onClick={handleCheck}>
          {isLoading ? "Memeriksa... (bisa 10-30 detik)" : "Cek PageSpeed"}
        </Button>
      </div>

      {error && <p className="text-center text-sm text-red-600 dark:text-red-400">{error}</p>}

      {result && (
        <div className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col items-center gap-4">
            <div className="text-center">
              <div className={`text-5xl font-bold ${scoreColor(score)}`}>
                {score !== null ? Math.round(score * 100) : "-"}
              </div>
              <div className="text-xs text-slate-400">Performance Score</div>
            </div>
            <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
              {KEY_METRICS.map((metric) => {
                const audit = result.lighthouseResult?.audits?.[metric.key];
                if (!audit) return null;
                return (
                  <div
                    key={metric.key}
                    className="flex items-center justify-between rounded-md border border-slate-200 px-3 py-2 text-sm dark:border-slate-800"
                  >
                    <span className="text-slate-600 dark:text-slate-300">{metric.label}</span>
                    <span className={`font-semibold ${scoreColor(audit.score)}`}>{audit.displayValue ?? "-"}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
