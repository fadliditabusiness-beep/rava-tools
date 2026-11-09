import { useState } from "react";
import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import { lookupRdap, type RdapResult } from "@/utils/websiteCheckTools";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-slate-100 py-1.5 last:border-0 dark:border-slate-800">
      <span className="text-slate-400">{label}</span>
      <span className="text-right font-medium text-slate-700 dark:text-slate-200">{value}</span>
    </div>
  );
}

export default function WhoisTool() {
  const [domain, setDomain] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<RdapResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLookup = async () => {
    if (!domain) return;
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      setResult(await lookupRdap(domain));
    } catch (err) {
      if (err instanceof Error && err.message === "NOT_FOUND") {
        setError("Domain tidak ditemukan atau belum terdaftar.");
      } else {
        setError("Gagal mengambil data WHOIS/RDAP.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Pakai RDAP (pengganti resmi WHOIS), dikirim langsung dari browser kamu, tidak lewat server kami.
      </p>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Domain</span>
        <Input value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="example.com" />
      </label>

      <div className="flex justify-center">
        <Button disabled={!domain || isLoading} onClick={handleLookup}>
          {isLoading ? "Mencari..." : "Cek WHOIS"}
        </Button>
      </div>

      {error && <p className="text-center text-sm text-red-600 dark:text-red-400">{error}</p>}

      {result && (
        <div className="flex flex-col gap-1 rounded-lg border border-slate-200 bg-white p-5 text-sm dark:border-slate-800 dark:bg-slate-900">
          <Row label="Domain" value={result.domainName} />
          <Row label="Registrar" value={result.registrar ?? "-"} />
          <Row label="Terdaftar" value={result.createdDate ?? "-"} />
          <Row label="Kadaluarsa" value={result.expiresDate ?? "-"} />
          <Row label="Update Terakhir" value={result.updatedDate ?? "-"} />
          <Row label="Status" value={result.status.join(", ") || "-"} />
          <Row label="Name Servers" value={result.nameServers.join(", ") || "-"} />
        </div>
      )}
    </div>
  );
}
