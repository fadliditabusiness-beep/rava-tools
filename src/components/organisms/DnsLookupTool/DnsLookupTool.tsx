import { useState } from "react";
import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import Select from "@/components/atoms/Select/Select";
import { DNS_RECORD_TYPES, dnsTypeName, lookupDns, type DnsLookupResult } from "@/utils/websiteCheckTools";

export default function DnsLookupTool() {
  const [domain, setDomain] = useState("");
  const [type, setType] = useState("A");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DnsLookupResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLookup = async () => {
    if (!domain) return;
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await lookupDns(domain, type);
      if (data.status === 3) {
        setError("Domain tidak ditemukan (NXDOMAIN).");
      } else if (data.answers.length === 0) {
        setError(`Tidak ada record ${type} untuk domain ini.`);
      } else {
        setResult(data);
      }
    } catch {
      setError("Gagal melakukan DNS lookup. Coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto]">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Domain</span>
          <Input value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="example.com" />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Tipe Record</span>
          <Select value={type} onChange={(e) => setType(e.target.value)}>
            {DNS_RECORD_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </label>
      </div>

      <div className="flex justify-center">
        <Button disabled={!domain || isLoading} onClick={handleLookup}>
          {isLoading ? "Mencari..." : "Lookup DNS"}
        </Button>
      </div>

      {error && <p className="text-center text-sm text-red-600 dark:text-red-400">{error}</p>}

      {result && (
        <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-3 py-2 font-medium text-slate-500 dark:text-slate-400">Name</th>
                <th className="px-3 py-2 font-medium text-slate-500 dark:text-slate-400">Type</th>
                <th className="px-3 py-2 font-medium text-slate-500 dark:text-slate-400">TTL</th>
                <th className="px-3 py-2 font-medium text-slate-500 dark:text-slate-400">Data</th>
              </tr>
            </thead>
            <tbody>
              {result.answers.map((answer, index) => (
                <tr key={index} className="border-t border-slate-200 dark:border-slate-800">
                  <td className="px-3 py-2 text-slate-700 dark:text-slate-200">{answer.name}</td>
                  <td className="px-3 py-2 text-slate-700 dark:text-slate-200">{dnsTypeName(answer.type)}</td>
                  <td className="px-3 py-2 text-slate-700 dark:text-slate-200">{answer.TTL}</td>
                  <td className="break-all px-3 py-2 text-slate-700 dark:text-slate-200">{answer.data}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
