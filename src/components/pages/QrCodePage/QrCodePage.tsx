import { useEffect, useState } from "react";
import QRCode from "qrcode";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import Input from "@/components/atoms/Input/Input";

export default function QrCodePage() {
  const [text, setText] = useState("https://kalenderku.id");
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!text) return;
    let cancelled = false;
    QRCode.toDataURL(text, { width: 256, margin: 1 })
      .then((url) => {
        if (!cancelled) setDataUrl(url);
      })
      .catch(() => {
        if (!cancelled) setDataUrl(null);
      });
    return () => {
      cancelled = true;
    };
  }, [text]);

  return (
    <ToolsPageTemplate title="QR Code Generator" description="Buat QR code dari teks atau tautan.">
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
          Teks / Tautan
        </span>
        <Input value={text} onChange={(e) => setText(e.target.value)} />
      </label>

      {text && dataUrl && (
        <div className="mt-6 flex flex-col items-center gap-3 rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={dataUrl} alt="QR code" width={256} height={256} />
          <a
            href={dataUrl}
            download="qrcode.png"
            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            Unduh PNG
          </a>
        </div>
      )}
    </ToolsPageTemplate>
  );
}
