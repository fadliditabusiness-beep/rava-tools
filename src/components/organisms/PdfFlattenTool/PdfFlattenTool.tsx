import { useState, type ChangeEvent } from "react";
import Button from "@/components/atoms/Button/Button";
import { downloadFile } from "@/utils/imageTools";
import { flattenPdf } from "@/utils/pdfTools";

export default function PdfFlattenTool() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
    setError(null);
  };

  const handleProcess = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);
    try {
      const blob = await flattenPdf(file);
      const baseName = file.name.replace(/\.pdf$/i, "");
      downloadFile(blob, `${baseName}-flattened.pdf`);
    } catch {
      setError("Gagal flatten PDF. Pastikan file valid.");
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

      <div className="flex justify-center">
        <Button disabled={!file || isProcessing} onClick={handleProcess}>
          {isProcessing ? "Memproses..." : "Flatten PDF"}
        </Button>
      </div>

      {error && <p className="text-center text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}
