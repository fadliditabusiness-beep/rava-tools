import { useState, type ChangeEvent } from "react";
import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import { downloadFile } from "@/utils/imageTools";
import { getPdfPageCount, parsePageOrder, rearrangePages } from "@/utils/pdfTools";

export default function PdfRearrangeTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [order, setOrder] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0] ?? null;
    setFile(picked);
    setPageCount(null);
    setError(null);
    if (!picked) return;
    try {
      const count = await getPdfPageCount(picked);
      setPageCount(count);
      setOrder(Array.from({ length: count }, (_, i) => i + 1).join(","));
    } catch {
      setError("Gagal membaca PDF. Pastikan file valid.");
    }
  };

  const handleProcess = async () => {
    if (!file || !pageCount) return;
    setIsProcessing(true);
    setError(null);
    try {
      const newOrder = parsePageOrder(order, pageCount);
      if (!newOrder) {
        setError(`Urutan harus memuat semua nomor 1-${pageCount} tepat satu kali.`);
        return;
      }
      const blob = await rearrangePages(file, newOrder);
      const baseName = file.name.replace(/\.pdf$/i, "");
      downloadFile(blob, `${baseName}-diurutkan.pdf`);
    } catch {
      setError("Gagal mengubah urutan PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
          Pilih File PDF
        </span>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-md file:border-0 file:bg-slate-900 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-slate-700 dark:text-slate-300 dark:file:bg-slate-100 dark:file:text-slate-900 dark:hover:file:bg-slate-300"
        />
      </label>

      {pageCount !== null && (
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
            Urutan Halaman Baru ({pageCount} halaman)
          </span>
          <Input value={order} onChange={(e) => setOrder(e.target.value)} />
        </label>
      )}

      <div className="flex justify-center">
        <Button disabled={!file || !pageCount || isProcessing} onClick={handleProcess}>
          {isProcessing ? "Memproses..." : "Urutkan Ulang PDF"}
        </Button>
      </div>

      {error && <p className="text-center text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}
