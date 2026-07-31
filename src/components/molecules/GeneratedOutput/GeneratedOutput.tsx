import { useState } from "react";
import { downloadFile } from "@/utils/imageTools";

export interface GeneratedOutputProps {
  label?: string;
  value: string;
  filename?: string;
  mimeType?: string;
}

export default function GeneratedOutput({ label = "Hasil", value, filename, mimeType = "text/plain" }: GeneratedOutputProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDownload = () => {
    if (!filename) return;
    downloadFile(new Blob([value], { type: mimeType }), filename);
  };

  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}</span>
        <div className="flex gap-3">
          {filename && (
            <button
              type="button"
              onClick={handleDownload}
              className="text-xs font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              Unduh
            </button>
          )}
          <button
            type="button"
            onClick={handleCopy}
            className="text-xs font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            {copied ? "Disalin!" : "Salin"}
          </button>
        </div>
      </div>
      <pre className="overflow-x-auto whitespace-pre-wrap break-words rounded-md border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-xs text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
        {value}
      </pre>
    </div>
  );
}
