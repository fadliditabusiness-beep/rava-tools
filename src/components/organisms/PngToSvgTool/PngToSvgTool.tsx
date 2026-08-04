import { useEffect, useRef, useState } from "react";
import Button from "@/components/atoms/Button/Button";
import { downloadFile, withExtension } from "@/utils/imageTools";
import { embedPngAsSvg } from "@/utils/svgTools";

export default function PngToSvgTool() {
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const previewUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    previewUrlRef.current = null;
    setSourceFile(file);
    setResultBlob(null);
    setPreviewUrl(null);
    setError(null);
  };

  const handleProcess = async () => {
    if (!sourceFile) return;
    setIsProcessing(true);
    setError(null);
    try {
      const blob = await embedPngAsSvg(sourceFile);
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
      const url = URL.createObjectURL(blob);
      previewUrlRef.current = url;
      setResultBlob(blob);
      setPreviewUrl(url);
    } catch {
      setError("Gagal mengonversi gambar. Coba file lain.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!resultBlob || !sourceFile) return;
    downloadFile(resultBlob, withExtension(sourceFile.name, "svg"));
  };

  return (
    <div className="flex flex-col gap-4">
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
          Pilih Gambar PNG
        </span>
        <input
          type="file"
          accept="image/png"
          onChange={handleFileChange}
          className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-md file:border-0 file:bg-slate-900 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-slate-700 dark:text-slate-300 dark:file:bg-slate-100 dark:file:text-slate-900 dark:hover:file:bg-slate-300"
        />
      </label>

      <div className="flex justify-center">
        <Button disabled={!sourceFile || isProcessing} onClick={handleProcess}>
          {isProcessing ? "Memproses..." : "Konversi ke SVG"}
        </Button>
      </div>

      {error && <p className="text-center text-sm text-red-600 dark:text-red-400">{error}</p>}

      {sourceFile && resultBlob && previewUrl && (
        <div className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt="Hasil"
              className="max-h-64 max-w-full rounded-md object-contain"
            />
            <p className="text-center text-xs text-slate-500 dark:text-slate-400">
              PNG dibungkus di dalam file .svg (bukan hasil vector asli).
            </p>
            <Button onClick={handleDownload}>Unduh</Button>
          </div>
        </div>
      )}
    </div>
  );
}
