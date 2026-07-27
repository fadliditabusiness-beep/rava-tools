import { useState, type ChangeEvent } from "react";
import Button from "@/components/atoms/Button/Button";
import Select from "@/components/atoms/Select/Select";
import { downloadFile } from "@/utils/imageTools";
import { renderPdfToImages } from "@/utils/pdfRender";
import { zipFiles } from "@/utils/zipTools";

export interface PdfToImageToolProps {
  format: "image/jpeg" | "image/png";
  extension: string;
}

export default function PdfToImageTool({ format, extension }: PdfToImageToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [scale, setScale] = useState("2");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
    setError(null);
  };

  const handleConvert = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);
    try {
      const images = await renderPdfToImages(file, format, Number(scale));
      const baseName = file.name.replace(/\.pdf$/i, "");
      if (images.length === 1) {
        downloadFile(images[0].blob, `${baseName}.${extension}`);
      } else {
        const zip = await zipFiles(images, `${baseName}-${extension}.zip`);
        downloadFile(zip.blob, zip.name);
      }
    } catch {
      setError("Gagal mengonversi PDF. Pastikan file valid.");
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
          Kualitas Gambar
        </span>
        <Select value={scale} onChange={(e) => setScale(e.target.value)}>
          <option value="1">Standar (1x)</option>
          <option value="2">Tinggi (2x)</option>
          <option value="3">Sangat Tinggi (3x)</option>
        </Select>
      </label>

      <p className="text-center text-xs text-slate-500 dark:text-slate-400">
        Lebih dari 1 halaman akan diunduh sebagai satu file .zip.
      </p>

      <div className="flex justify-center">
        <Button disabled={!file || isProcessing} onClick={handleConvert}>
          {isProcessing ? "Memproses..." : `Konversi ke ${extension.toUpperCase()}`}
        </Button>
      </div>

      {error && <p className="text-center text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}
