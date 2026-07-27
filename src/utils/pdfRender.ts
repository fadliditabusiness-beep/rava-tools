import type { NamedBlob } from "@/utils/pdfTools";

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality?: number): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
}

export async function renderPdfToImages(
  file: File,
  format: "image/jpeg" | "image/png",
  scale: number,
): Promise<NamedBlob[]> {
  // Loaded lazily: pdfjs-dist touches browser-only globals (DOMMatrix) at
  // module-eval time, which breaks Next.js SSR if imported at the top level.
  const pdfjsLib = await import("pdfjs-dist");
  // Self-hosting the worker file trips up webpack's ESM/PnP resolution, so
  // point at the matching version on a CDN instead (only the worker script
  // itself is fetched — the PDF content never leaves the browser).
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

  const data = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data }).promise;
  const extension = format === "image/png" ? "png" : "jpg";
  const results: NamedBlob[] = [];

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({ canvas, viewport }).promise;

    const blob = await canvasToBlob(canvas, format, format === "image/jpeg" ? 0.92 : undefined);
    if (blob) {
      results.push({ name: `halaman-${pageNum}.${extension}`, blob });
    }
  }

  return results;
}
