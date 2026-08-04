import { useEffect, useRef, useState } from "react";
import Button from "@/components/atoms/Button/Button";
import Select from "@/components/atoms/Select/Select";
import { useFfmpeg } from "@/hooks/useFfmpeg";
import { convertVideo, type VideoConversionSpec } from "@/utils/videoTools";
import { downloadFile, formatBytes, withExtension } from "@/utils/imageTools";

export interface VideoConverterHubProps {
  specs: VideoConversionSpec[];
  fromLabel: string;
  accept: string;
}

export default function VideoConverterHub({ specs, fromLabel, accept }: VideoConverterHubProps) {
  const { ensureLoaded, loading, withProgress } = useFfmpeg();
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [sourceUrl, setSourceUrl] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState(specs[0]?.id ?? "");
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const sourceUrlRef = useRef<string | null>(null);
  const resultUrlRef = useRef<string | null>(null);

  const spec = specs.find((s) => s.id === selectedId) ?? specs[0];

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

  const handleConvert = async () => {
    if (!sourceFile || !spec) return;
    setIsProcessing(true);
    setError(null);
    setProgressPercent(0);
    try {
      const ffmpeg = await ensureLoaded();
      withProgress(ffmpeg, (ratio) => setProgressPercent(Math.round(ratio * 100)));
      const blob = await convertVideo(ffmpeg, sourceFile, spec, () => setProgressPercent(0));
      if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
      const url = URL.createObjectURL(blob);
      resultUrlRef.current = url;
      setResultBlob(blob);
      setResultUrl(url);
    } catch {
      setError("Gagal konversi video. Coba file lain atau format yang lebih kecil.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!resultBlob || !sourceFile || !spec) return;
    downloadFile(resultBlob, withExtension(sourceFile.name, spec.outputExt));
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Diproses langsung di browser kamu (via ffmpeg.wasm), video tidak diunggah ke server manapun. Mesin
        video (~30MB) diunduh sekali saat konversi pertama — proses bisa memakan waktu, tergantung ukuran
        file & perangkat kamu.
      </p>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
          Pilih File {fromLabel}
        </span>
        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-md file:border-0 file:bg-slate-900 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-slate-700 dark:text-slate-300 dark:file:bg-slate-100 dark:file:text-slate-900 dark:hover:file:bg-slate-300"
        />
      </label>

      {sourceUrl && (
        <div className="flex justify-center">
          <video src={sourceUrl} controls className="max-h-64 max-w-full rounded-md" />
        </div>
      )}

      {specs.length > 1 ? (
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Format Tujuan</span>
          <Select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
            {specs.map((s) => (
              <option key={s.id} value={s.id}>
                {s.toLabel}
              </option>
            ))}
          </Select>
        </label>
      ) : (
        spec && (
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Format tujuan: <span className="font-medium">{spec.toLabel}</span>
          </p>
        )
      )}

      <div className="flex justify-center">
        <Button disabled={!sourceFile || !spec || isProcessing} onClick={handleConvert}>
          {loading
            ? "Memuat mesin video..."
            : isProcessing
              ? `Mengonversi... ${progressPercent}%`
              : `Convert ke ${spec?.toLabel ?? ""}`}
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

      {resultBlob && resultUrl && sourceFile && spec && (
        <div className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col items-center gap-3">
            {spec.isGifOutput ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={resultUrl} alt="Hasil" className="max-h-64 max-w-full rounded-md object-contain" />
            ) : (
              <video src={resultUrl} controls className="max-h-64 max-w-full rounded-md" />
            )}
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
            <Button onClick={handleDownload}>Unduh {spec.toLabel}</Button>
          </div>
        </div>
      )}
    </div>
  );
}
