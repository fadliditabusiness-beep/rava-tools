import type { NamedBlob } from "@/utils/pdfTools";

interface PdfJsImageObject {
  width?: number;
  height?: number;
  data?: Uint8ClampedArray | Uint8Array;
  bitmap?: ImageBitmap;
}

function getPageObject(
  page: { objs: { get: (name: string, callback?: (value: unknown) => void) => unknown } },
  name: string,
): Promise<PdfJsImageObject | null> {
  return new Promise((resolve) => {
    const value = page.objs.get(name, (resolved: unknown) => resolve((resolved as PdfJsImageObject) ?? null));
    if (value !== undefined) resolve((value as PdfJsImageObject) ?? null);
  });
}

function imageObjectToCanvas(imgData: PdfJsImageObject): HTMLCanvasElement | null {
  if (imgData.bitmap) {
    const canvas = document.createElement("canvas");
    canvas.width = imgData.bitmap.width;
    canvas.height = imgData.bitmap.height;
    canvas.getContext("2d")!.drawImage(imgData.bitmap, 0, 0);
    return canvas;
  }

  if (imgData.data && imgData.width && imgData.height) {
    const canvas = document.createElement("canvas");
    canvas.width = imgData.width;
    canvas.height = imgData.height;
    const ctx = canvas.getContext("2d")!;
    const imageData = ctx.createImageData(imgData.width, imgData.height);
    const pixelCount = imgData.width * imgData.height;

    if (imgData.data.length === pixelCount * 4) {
      imageData.data.set(imgData.data);
    } else if (imgData.data.length === pixelCount * 3) {
      for (let src = 0, dst = 0; src < imgData.data.length; src += 3, dst += 4) {
        imageData.data[dst] = imgData.data[src];
        imageData.data[dst + 1] = imgData.data[src + 1];
        imageData.data[dst + 2] = imgData.data[src + 2];
        imageData.data[dst + 3] = 255;
      }
    } else {
      return null; // unsupported pixel format (e.g. grayscale/CMYK) — skip rather than render garbage
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas;
  }

  return null;
}

export async function extractImagesFromPdf(file: File): Promise<NamedBlob[]> {
  // Loaded lazily: pdfjs-dist touches browser-only globals at module-eval time (see pdfRender.ts).
  const pdfjsLib = await import("pdfjs-dist");
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

  const data = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data }).promise;
  const results: NamedBlob[] = [];

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const operatorList = await page.getOperatorList();
    const { OPS } = pdfjsLib;
    let imageIndex = 0;

    for (let i = 0; i < operatorList.fnArray.length; i++) {
      if (operatorList.fnArray[i] !== OPS.paintImageXObject) continue;
      const name = operatorList.argsArray[i][0] as string;

      const imgData = await getPageObject(page, name);
      if (!imgData) continue;
      const canvas = imageObjectToCanvas(imgData);
      if (!canvas) continue;

      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
      if (!blob) continue;

      imageIndex += 1;
      results.push({ name: `halaman-${pageNum}-gambar-${imageIndex}.png`, blob });
    }
  }

  return results;
}
