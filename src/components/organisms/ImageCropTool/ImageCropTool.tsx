import { useEffect, useRef, useState } from "react";
import Button from "@/components/atoms/Button/Button";
import { cropImage, getImageDimensions } from "@/utils/imageCanvasTools";
import { downloadFile, extensionForMime, formatBytes, withExtension } from "@/utils/imageTools";

export default function ImageCropTool() {
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
  const [x, setX] = useState("0");
  const [y, setY] = useState("0");
  const [width, setWidth] = useState("100");
  const [height, setHeight] = useState("100");
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    previewUrlRef.current = null;
    setSourceFile(file);
    setResultBlob(null);
    setPreviewUrl(null);
    setError(null);
    setDimensions(null);

    if (file) {
      try {
        const dims = await getImageDimensions(file);
        setDimensions(dims);
        setX("0");
        setY("0");
        setWidth(String(dims.width));
        setHeight(String(dims.height));
      } catch {
        setError("Gagal membaca ukuran gambar.");
      }
    }
  };

  const handleProcess = async () => {
    if (!sourceFile) return;
    setIsProcessing(true);
    setError(null);
    try {
      const blob = await cropImage(sourceFile, {
        x: Number(x),
        y: Number(y),
        width: Number(width),
        height: Number(height),
      });
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
      const url = URL.createObjectURL(blob);
      previewUrlRef.current = url;
      setResultBlob(blob);
      setPreviewUrl(url);
    } catch {
      setError("Gagal memproses gambar. Coba file lain.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!resultBlob || !sourceFile) return;
    const extension = extensionForMime(resultBlob.type);
    downloadFile(resultBlob, withExtension(sourceFile.name, extension));
  };

  return (
    <div className="flex flex-col gap-4">
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
          Pilih Gambar
        </span>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-md file:border-0 file:bg-slate-900 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-slate-700 dark:text-slate-300 dark:file:bg-slate-100 dark:file:text-slate-900 dark:hover:file:bg-slate-300"
        />
      </label>

      {dimensions && (
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Ukuran asli: {dimensions.width} x {dimensions.height} px
        </p>
      )}

      <div className="grid grid-cols-2 gap-4">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
            Posisi X (px)
          </span>
          <input
            type="number"
            min={0}
            value={x}
            onChange={(e) => setX(e.target.value)}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        </label>

        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
            Posisi Y (px)
          </span>
          <input
            type="number"
            min={0}
            value={y}
            onChange={(e) => setY(e.target.value)}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        </label>

        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
            Lebar (px)
          </span>
          <input
            type="number"
            min={1}
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        </label>

        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
            Tinggi (px)
          </span>
          <input
            type="number"
            min={1}
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        </label>
      </div>

      <div className="flex justify-center">
        <Button disabled={!sourceFile || isProcessing} onClick={handleProcess}>
          {isProcessing ? "Memproses..." : "Crop Gambar"}
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
            <div className="grid grid-cols-2 gap-6 text-center text-sm text-slate-600 dark:text-slate-300">
              <div>
                <div className="text-xs text-slate-400">Ukuran Asli</div>
                <div className="font-semibold">{formatBytes(sourceFile.size)}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400">Ukuran Hasil</div>
                <div className="font-semibold">{formatBytes(resultBlob.size)}</div>
              </div>
            </div>
            <Button onClick={handleDownload}>Unduh</Button>
          </div>
        </div>
      )}
    </div>
  );
}
