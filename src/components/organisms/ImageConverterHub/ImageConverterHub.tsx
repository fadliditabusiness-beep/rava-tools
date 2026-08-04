import { useEffect, useRef, useState } from "react";
import Button from "@/components/atoms/Button/Button";
import Select from "@/components/atoms/Select/Select";
import {
  downloadFile,
  extensionForMime,
  formatBytes,
  processImage,
  withExtension,
} from "@/utils/imageTools";

export interface ImageConverterHubConfig {
  accept: string;
  showQuality: boolean;
  showResize: boolean;
  actionLabel: string;
}

const OUTPUT_FORMATS = [
  { value: "image/png", label: "PNG" },
  { value: "image/jpeg", label: "JPG" },
  { value: "image/webp", label: "WebP" },
];

export default function ImageConverterHub({
  accept,
  showQuality,
  showResize,
  actionLabel,
}: ImageConverterHubConfig) {
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [outputFileType, setOutputFileType] = useState("image/png");
  const [quality, setQuality] = useState("80");
  const [maxDimension, setMaxDimension] = useState("1920");
  const [resultFile, setResultFile] = useState<File | null>(null);
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
    setResultFile(null);
    setPreviewUrl(null);
    setError(null);
  };

  const handleProcess = async () => {
    if (!sourceFile) return;
    setIsProcessing(true);
    setError(null);
    try {
      const processed = await processImage(sourceFile, {
        fileType: outputFileType,
        quality: showQuality ? Number(quality) / 100 : undefined,
        maxWidthOrHeight: showResize ? Number(maxDimension) : undefined,
      });
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
      const url = URL.createObjectURL(processed);
      previewUrlRef.current = url;
      setResultFile(processed);
      setPreviewUrl(url);
    } catch {
      setError("Gagal memproses gambar. Coba file lain.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!resultFile || !sourceFile) return;
    const extension = extensionForMime(resultFile.type);
    downloadFile(resultFile, withExtension(sourceFile.name, extension));
  };

  return (
    <div className="flex flex-col gap-4">
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
          Pilih Gambar
        </span>
        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-md file:border-0 file:bg-slate-900 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-slate-700 dark:text-slate-300 dark:file:bg-slate-100 dark:file:text-slate-900 dark:hover:file:bg-slate-300"
        />
      </label>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
          Format Tujuan
        </span>
        <Select value={outputFileType} onChange={(e) => setOutputFileType(e.target.value)}>
          {OUTPUT_FORMATS.map((format) => (
            <option key={format.value} value={format.value}>
              {format.label}
            </option>
          ))}
        </Select>
      </label>

      {showQuality && (
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
            Kualitas ({quality}%)
          </span>
          <input
            type="range"
            min={10}
            max={100}
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
            className="w-full"
          />
        </label>
      )}

      {showResize && (
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
            Ukuran Maksimum (px, sisi terpanjang)
          </span>
          <input
            type="number"
            min={1}
            value={maxDimension}
            onChange={(e) => setMaxDimension(e.target.value)}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        </label>
      )}

      <div className="flex justify-center">
        <Button disabled={!sourceFile || isProcessing} onClick={handleProcess}>
          {isProcessing ? "Memproses..." : actionLabel}
        </Button>
      </div>

      {error && <p className="text-center text-sm text-red-600 dark:text-red-400">{error}</p>}

      {sourceFile && resultFile && previewUrl && (
        <div className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt="Hasil"
              className="max-h-64 max-w-full rounded-md object-contain"
            />
            <div className="grid grid-cols-2 gap-6 text-center text-sm text-slate-600 dark:text-slate-300">
              <div>
                <div className="text-xs text-slate-400">Ukuran Asli</div>
                <div className="font-semibold">{formatBytes(sourceFile.size)}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400">Ukuran Hasil</div>
                <div className="font-semibold">{formatBytes(resultFile.size)}</div>
              </div>
            </div>
            <Button onClick={handleDownload}>Unduh</Button>
          </div>
        </div>
      )}
    </div>
  );
}
