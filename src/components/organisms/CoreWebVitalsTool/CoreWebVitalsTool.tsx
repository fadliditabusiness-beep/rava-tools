import { useState } from "react";
import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import Select from "@/components/atoms/Select/Select";
import {
  extractCoreWebVitals,
  fetchPageSpeed,
  formatCoreWebVitalValue,
  type CoreWebVitalsResult,
  type PageSpeedStrategy,
} from "@/utils/websiteCheckTools";

const CATEGORY_STYLES: Record<string, string> = {
  FAST: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
  AVERAGE: "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
  SLOW: "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-300",
};

export default function CoreWebVitalsTool() {
  const [url, setUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [strategy, setStrategy] = useState<PageSpeedStrategy>("mobile");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CoreWebVitalsResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async () => {
    if (!url) return;
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await fetchPageSpeed(url, strategy, apiKey || undefined);
      const extracted = extractCoreWebVitals(data);
      if (extracted.vitals.length === 0) {
        setError("Data Core Web Vitals belum tersedia untuk URL ini (traffic-nya kurang buat data CrUX).");
      }
      setResult(extracted);
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

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Dikirim langsung dari browser kamu ke Google PageSpeed Insights API (Chrome UX Report), tidak lewat
        server kami. Tanpa API key, kuota gratis dibagi semua pengguna dan bisa cepat penuh.
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
          {isLoading ? "Memeriksa... (bisa 10-30 detik)" : "Cek Core Web Vitals"}
        </Button>
      </div>

      {error && <p className="text-center text-sm text-red-600 dark:text-red-400">{error}</p>}

      {result && result.vitals.length > 0 && (
        <div className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <p className="mb-3 text-xs text-slate-400 dark:text-slate-500">
            Data field ({result.scope === "page" ? "halaman ini" : "seluruh domain"}) dari Chrome UX Report, 28
            hari terakhir.
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {result.vitals.map((vital) => (
              <div
                key={vital.key}
                className="flex flex-col items-center gap-1 rounded-md border border-slate-200 p-3 text-center dark:border-slate-800"
              >
                <span className="text-xs text-slate-400">{vital.label}</span>
                <span className="text-xl font-bold text-slate-900 dark:text-slate-50">
                  {formatCoreWebVitalValue(vital.key, vital.percentile)}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${CATEGORY_STYLES[vital.category] ?? ""}`}
                >
                  {vital.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
