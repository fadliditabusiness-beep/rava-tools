import { useState } from "react";
import Button from "@/components/atoms/Button/Button";
import MultiFilePicker from "@/components/molecules/MultiFilePicker/MultiFilePicker";
import { downloadFile } from "@/utils/imageTools";
import { mergePdfs } from "@/utils/pdfTools";

export default function PdfMergeTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleMerge = async () => {
    if (files.length < 2) return;
    setIsProcessing(true);
    setError(null);
    try {
      const blob = await mergePdfs(files);
      downloadFile(blob, "gabungan.pdf");
    } catch {
      setError("Gagal menggabungkan PDF. Pastikan semua file adalah PDF yang valid.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <MultiFilePicker
        accept="application/pdf"
        label="Pilih File PDF (minimal 2, urutan bisa diatur)"
        files={files}
        onFilesChange={setFiles}
      />

      <div className="flex justify-center">
        <Button disabled={files.length < 2 || isProcessing} onClick={handleMerge}>
          {isProcessing ? "Menggabungkan..." : "Gabungkan PDF"}
        </Button>
      </div>

      {error && <p className="text-center text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}
