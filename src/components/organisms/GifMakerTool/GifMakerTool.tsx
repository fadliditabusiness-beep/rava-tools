import { useEffect, useRef, useState } from "react";
import Button from "@/components/atoms/Button/Button";
import MultiFilePicker from "@/components/molecules/MultiFilePicker/MultiFilePicker";
import NumberField from "@/components/molecules/NumberField/NumberField";
import { useFfmpeg } from "@/hooks/useFfmpeg";
import { imagesToGif } from "@/utils/videoTools";
import { downloadFile, formatBytes } from "@/utils/imageTools";

export default function GifMakerTool() {
  const { ensureLoaded, loading } = useFfmpeg();
  const [files, setFiles] = useState<File[]>([]);
  const [fps, setFps] = useState("5");
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const resultUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
    };
  }, []);

  const handleFilesChange = (next: File[]) => {
    setFiles(next);
    setError(null);
  };

  const handleConvert = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setError(null);
    try {
      const ffmpeg = await ensureLoaded();
      const blob = await imagesToGif(ffmpeg, files, Number(fps));
      if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
      const url = URL.createObjectURL(blob);
      resultUrlRef.current = url;
      setResultBlob(blob);
      setResultUrl(url);
    } catch {
      setError("Gagal membuat GIF. Pastikan semua file gambar valid.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!resultBlob) return;
    downloadFile(resultBlob, "gif-maker-hasil.gif");
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Diproses langsung di browser kamu (via ffmpeg.wasm), gambar tidak diunggah ke server manapun. Mesin
        video (~30MB) diunduh sekali saat konversi pertama — proses bisa memakan waktu, tergantung ukuran
        file & perangkat kamu.
      </p>

      <MultiFilePicker
        accept="image/png,image/jpeg,image/webp"
        label="Pilih Gambar (urutan bisa diatur, jadi satu GIF)"
        files={files}
        onFilesChange={handleFilesChange}
      />

      <NumberField label="FPS" value={fps} onChange={setFps} placeholder="5" />

      <div className="flex justify-center">
        <Button disabled={files.length === 0 || isProcessing} onClick={handleConvert}>
          {loading ? "Memuat mesin video..." : isProcessing ? "Memproses..." : "Buat GIF"}
        </Button>
      </div>

      {error && <p className="text-center text-sm text-red-600 dark:text-red-400">{error}</p>}

      {resultBlob && resultUrl && (
        <div className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={resultUrl} alt="Hasil" className="max-h-64 max-w-full rounded-md object-contain" />
            <div className="text-center text-sm text-slate-600 dark:text-slate-300">
              <div className="text-xs text-slate-400">Ukuran Hasil</div>
              <div className="font-semibold">{formatBytes(resultBlob.size)}</div>
            </div>
            <Button onClick={handleDownload}>Unduh GIF</Button>
          </div>
        </div>
      )}
    </div>
  );
}
