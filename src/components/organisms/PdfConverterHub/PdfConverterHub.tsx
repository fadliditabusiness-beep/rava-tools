import { useState } from "react";
import PdfToImageTool from "@/components/organisms/PdfToImageTool/PdfToImageTool";
import PdfImagesToPdfTool from "@/components/organisms/PdfImagesToPdfTool/PdfImagesToPdfTool";

type Mode = "pdf-to-image" | "image-to-pdf";

export default function PdfConverterHub() {
  const [mode, setMode] = useState<Mode>("pdf-to-image");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-center gap-2">
        <button
          type="button"
          onClick={() => setMode("pdf-to-image")}
          className={
            mode === "pdf-to-image"
              ? "rounded-full bg-slate-900 px-4 py-1.5 text-sm font-medium text-white dark:bg-slate-100 dark:text-slate-900"
              : "rounded-full border border-slate-300 px-4 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          }
        >
          PDF → Gambar
        </button>
        <button
          type="button"
          onClick={() => setMode("image-to-pdf")}
          className={
            mode === "image-to-pdf"
              ? "rounded-full bg-slate-900 px-4 py-1.5 text-sm font-medium text-white dark:bg-slate-100 dark:text-slate-900"
              : "rounded-full border border-slate-300 px-4 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          }
        >
          Gambar → PDF
        </button>
      </div>

      {mode === "pdf-to-image" ? (
        <PdfToImageTool format="image/jpeg" extension="jpg" />
      ) : (
        <PdfImagesToPdfTool />
      )}
    </div>
  );
}
