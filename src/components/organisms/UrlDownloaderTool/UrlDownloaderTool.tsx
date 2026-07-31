import { useEffect, useRef, useState } from "react";
import Input from "@/components/atoms/Input/Input";
import Button from "@/components/atoms/Button/Button";
import { fetchAsBlob, filenameFromUrl, isHttpUrl } from "@/utils/downloaderTools";
import { downloadFile, formatBytes } from "@/utils/imageTools";

export interface UrlDownloaderToolProps {
  placeholder: string;
  previewKind: "image" | "video" | "audio" | "none";
  fallbackFilename?: string;
}

type Status = "idle" | "loading" | "success" | "blocked" | "error";

export default function UrlDownloaderTool({ placeholder, previewKind, fallbackFilename = "download" }: UrlDownloaderToolProps) {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [blob, setBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const previewUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    };
  }, []);

  const handleDownload = async () => {
    if (!isHttpUrl(url)) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    setBlob(null);
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    previewUrlRef.current = null;
    setPreviewUrl(null);

    try {
      const fetchedBlob = await fetchAsBlob(url);
      const objectUrl = URL.createObjectURL(fetchedBlob);
      previewUrlRef.current = objectUrl;
      setBlob(fetchedBlob);
      setPreviewUrl(objectUrl);
      downloadFile(fetchedBlob, filenameFromUrl(url, fallbackFilename));
      setStatus("success");
    } catch {
      setStatus("blocked");
    }
  };

  const openInNewTab = () => {
    if (!isHttpUrl(url)) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Diproses langsung di browser kamu, tidak lewat server manapun. Kalau server sumber file
        memblokir akses lintas domain (CORS), unduh otomatis bisa gagal — link akan dibuka di tab baru
        sebagai gantinya, klik kanan lalu &quot;Save As&quot; untuk simpan manual.
      </p>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">URL</span>
        <Input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={placeholder}
        />
      </label>

      <div className="flex justify-center">
        <Button disabled={!url || status === "loading"} onClick={handleDownload}>
          {status === "loading" ? "Mengambil..." : "Unduh"}
        </Button>
      </div>

      {status === "error" && (
        <p className="text-center text-sm text-red-600 dark:text-red-400">URL tidak valid. Pastikan diawali http:// atau https://.</p>
      )}

      {status === "blocked" && (
        <div className="flex flex-col items-center gap-2">
          <p className="text-center text-sm text-red-600 dark:text-red-400">
            Gagal ambil otomatis (kemungkinan diblokir CORS oleh server sumber).
          </p>
          <Button
            onClick={openInNewTab}
            className="bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
          >
            Buka Link di Tab Baru
          </Button>
        </div>
      )}

      {status === "success" && blob && previewUrl && (
        <div className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col items-center gap-3">
            {previewKind === "image" && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={previewUrl} alt="Preview" className="max-h-64 max-w-full rounded-md object-contain" />
            )}
            {previewKind === "video" && <video src={previewUrl} controls className="max-h-64 max-w-full rounded-md" />}
            {previewKind === "audio" && <audio src={previewUrl} controls className="w-full" />}
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Berhasil diunduh — {formatBytes(blob.size)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
