import { useEffect, useRef, useState } from "react";
import Button from "@/components/atoms/Button/Button";
import NumberField from "@/components/molecules/NumberField/NumberField";
import { useFfmpeg } from "@/hooks/useFfmpeg";
import { cropVideo } from "@/utils/videoTools";
import { downloadFile, formatBytes, withExtension } from "@/utils/imageTools";

export default function VideoCropTool() {
  const { ensureLoaded, loading, withProgress } = useFfmpeg();
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [sourceUrl, setSourceUrl] = useState<string | null>(null);
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const sourceUrlRef = useRef<string | null>(null);
  const resultUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (sourceUrlRef.current) URL.revokeObjectURL(sourceUrlRef.current);
      if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (sourceUrlRef.current) URL.revokeObjectURL(sourceUrlRef.current);
    if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
    sourceUrlRef.current = file ? URL.createObjectURL(file) : null;
    resultUrlRef.current = null;
    setSourceFile(file);
    setSourceUrl(sourceUrlRef.current);
    setResultBlob(null);
    setResultUrl(null);
    setError(null);
    setProgressPercent(0);
  };

  const handleCrop = async () => {
    if (!sourceFile) return;
    setIsProcessing(true);
    setError(null);
    setProgressPercent(0);
    try {
      const ffmpeg = await ensureLoaded();
      withProgress(ffmpeg, (ratio) => setProgressPercent(Math.round(ratio * 100)));
      const blob = await cropVideo(ffmpeg, sourceFile, {
        x: Number(x),
        y: Number(y),
        width: Number(width),
        height: Number(height),
      });
      if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
      const url = URL.createObjectURL(blob);
      resultUrlRef.current = url;
      setResultBlob(blob);
      setResultUrl(url);
    } catch {
      setError("Gagal memotong video. Coba file lain atau pengaturan yang berbeda.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!resultBlob || !sourceFile) return;
    downloadFile(resultBlob, withExtension(sourceFile.name, "mp4"));
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Diproses langsung di browser kamu (via ffmpeg.wasm), video tidak diunggah ke server manapun. Mesin
        video (~30MB) diunduh sekali saat kompresi pertama — hasil selalu berupa file MP4 (H.264/AAC).
      </p>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Pilih Video</span>
        <input
          type="file"
          accept="video/mp4,video/webm,video/quicktime,video/x-msvideo,video/x-matroska,.mp4,.webm,.mov,.avi,.mkv"
          onChange={handleFileChange}
          className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-md file:border-0 file:bg-slate-900 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-slate-700 dark:text-slate-300 dark:file:bg-slate-100 dark:file:text-slate-900 dark:hover:file:bg-slate-300"
        />
      </label>

      {sourceUrl && (
        <div className="flex justify-center">
          <video src={sourceUrl} controls className="max-h-64 max-w-full rounded-md" />
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <NumberField label="Posisi X (px)" value={x} onChange={setX} placeholder="misal: 0" />
        <NumberField label="Posisi Y (px)" value={y} onChange={setY} placeholder="misal: 0" />
        <NumberField label="Lebar (px)" value={width} onChange={setWidth} placeholder="misal: 640" />
        <NumberField label="Tinggi (px)" value={height} onChange={setHeight} placeholder="misal: 480" />
      </div>

      <div className="flex justify-center">
        <Button disabled={!sourceFile || isProcessing} onClick={handleCrop}>
          {loading
            ? "Memuat mesin video..."
            : isProcessing
              ? `Memotong... ${progressPercent}%`
              : "Crop Video"}
        </Button>
      </div>

      {isProcessing && (
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-600 to-violet-600 transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}

      {error && <p className="text-center text-sm text-red-600 dark:text-red-400">{error}</p>}

      {resultBlob && resultUrl && sourceFile && (
        <div className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col items-center gap-3">
            <video src={resultUrl} controls className="max-h-64 max-w-full rounded-md" />
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
            <Button onClick={handleDownload}>Unduh Video</Button>
          </div>
        </div>
      )}
    </div>
  );
}
