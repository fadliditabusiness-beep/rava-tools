import { useState, type ChangeEvent } from "react";
import Button from "@/components/atoms/Button/Button";
import { downloadFile, formatBytes } from "@/utils/imageTools";
import { compressPdf } from "@/utils/pdfTools";

export default function PdfCompressTool() {
  const [file, setFile] = useState<File | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
    setResultBlob(null);
    setError(null);
  };

  const handleCompress = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);
    try {
      setResultBlob(await compressPdf(file));
    } catch {
      setError("Gagal mengompres PDF. Pastikan file valid.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!file || !resultBlob) return;
    const baseName = file.name.replace(/\.pdf$/i, "");
    downloadFile(resultBlob, `${baseName}-compressed.pdf`);
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
        Kompresi terbatas (menyusun ulang struktur file) — hasil paling terasa untuk PDF berisi
        banyak halaman/objek berulang, bukan re-compress gambar di dalamnya.
      </p>

      <div className="flex justify-center">
        <Button disabled={!file || isProcessing} onClick={handleCompress}>
          {isProcessing ? "Memproses..." : "Kompres PDF"}
        </Button>
      </div>

      {error && <p className="text-center text-sm text-red-600 dark:text-red-400">{error}</p>}

      {file && resultBlob && (
        <div className="flex flex-col items-center gap-3 rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="grid grid-cols-2 gap-6 text-center text-sm text-slate-600 dark:text-slate-300">
            <div>
              <div className="text-xs text-slate-400">Ukuran Asli</div>
              <div className="font-semibold">{formatBytes(file.size)}</div>
            </div>
            <div>
              <div className="text-xs text-slate-400">Ukuran Hasil</div>
              <div className="font-semibold">{formatBytes(resultBlob.size)}</div>
            </div>
          </div>
          <Button onClick={handleDownload}>Unduh</Button>
        </div>
      )}
    </div>
  );
}
