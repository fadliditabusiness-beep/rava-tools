import imageCompression, { type Options } from "browser-image-compression";

export interface ProcessImageOptions {
  fileType?: string;
  quality?: number;
  maxWidthOrHeight?: number;
}

export async function processImage(file: File, options: ProcessImageOptions): Promise<File> {
  const config: Options = {
    useWebWorker: false,
    maxSizeMB: 50,
    fileType: options.fileType,
    initialQuality: options.quality,
    maxWidthOrHeight: options.maxWidthOrHeight,
  };
  return imageCompression(file, config);
}

export function downloadFile(file: File | Blob, filename: string): void {
  const url = URL.createObjectURL(file);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function extensionForMime(mime: string): string {
  switch (mime) {
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    default:
      return "jpg";
  }
}

export function withExtension(filename: string, extension: string): string {
  const base = filename.replace(/\.[^./\\]+$/, "");
  return `${base}.${extension}`;
}
