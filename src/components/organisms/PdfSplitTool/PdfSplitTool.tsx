import { useState, type ChangeEvent } from "react";
import Button from "@/components/atoms/Button/Button";
import { downloadFile } from "@/utils/imageTools";
import { splitPdfToSinglePages } from "@/utils/pdfTools";
import { zipFiles } from "@/utils/zipTools";

export default function PdfSplitTool() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
    setError(null);
  };

  const handleSplit = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);
    try {
      const pages = await splitPdfToSinglePages(file);
      const baseName = file.name.replace(/\.pdf$/i, "");
      if (pages.length === 1) {
        downloadFile(pages[0].blob, `${baseName}-halaman-1.pdf`);
      } else {
        const zip = await zipFiles(pages, `${baseName}-split.zip`);
        downloadFile(zip.blob, zip.name);
      }
    } catch {
      setError("Gagal membagi PDF. Pastikan file valid.");
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

      <p className="text-center text-xs text-slate-500 dark:text-slate-400">
        Setiap halaman jadi file PDF sendiri, diunduh sebagai satu file .zip.
      </p>

      <div className="flex justify-center">
        <Button disabled={!file || isProcessing} onClick={handleSplit}>
          {isProcessing ? "Memproses..." : "Bagi PDF"}
        </Button>
      </div>

      {error && <p className="text-center text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}
