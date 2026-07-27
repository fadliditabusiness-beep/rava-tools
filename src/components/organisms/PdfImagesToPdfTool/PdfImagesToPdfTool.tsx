import { useState } from "react";
import Button from "@/components/atoms/Button/Button";
import MultiFilePicker from "@/components/molecules/MultiFilePicker/MultiFilePicker";
import { downloadFile } from "@/utils/imageTools";
import { imagesToPdf } from "@/utils/pdfTools";

export default function PdfImagesToPdfTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setError(null);
    try {
      const blob = await imagesToPdf(files);
      downloadFile(blob, "gambar-ke-pdf.pdf");
    } catch {
      setError("Gagal membuat PDF. Pastikan semua file JPG/PNG valid.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <MultiFilePicker
        accept="image/jpeg,image/png"
        label="Pilih Gambar JPG/PNG (urutan bisa diatur, jadi satu PDF)"
        files={files}
        onFilesChange={setFiles}
      />

      <div className="flex justify-center">
        <Button disabled={files.length === 0 || isProcessing} onClick={handleConvert}>
          {isProcessing ? "Memproses..." : "Buat PDF"}
        </Button>
      </div>

      {error && <p className="text-center text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}
