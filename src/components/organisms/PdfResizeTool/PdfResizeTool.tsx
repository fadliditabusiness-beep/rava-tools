import { useState, type ChangeEvent } from "react";
import Button from "@/components/atoms/Button/Button";
import Select from "@/components/atoms/Select/Select";
import { downloadFile } from "@/utils/imageTools";
import { PAGE_SIZE_PRESETS, resizePdfPages } from "@/utils/pdfTools";

export default function PdfResizeTool() {
  const [file, setFile] = useState<File | null>(null);
  const [size, setSize] = useState("a4");
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
      const blob = await resizePdfPages(file, PAGE_SIZE_PRESETS[size]);
      const baseName = file.name.replace(/\.pdf$/i, "");
      downloadFile(blob, `${baseName}-resized.pdf`);
    } catch {
      setError("Gagal mengubah ukuran PDF.");
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

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
          Ukuran Halaman
        </span>
        <Select value={size} onChange={(e) => setSize(e.target.value)}>
          <option value="a4">A4</option>
          <option value="letter">Letter</option>
          <option value="legal">Legal</option>
        </Select>
      </label>

      <div className="flex justify-center">
        <Button disabled={!file || isProcessing} onClick={handleProcess}>
          {isProcessing ? "Memproses..." : "Resize PDF"}
        </Button>
      </div>

      {error && <p className="text-center text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}
