function canvasToBlob(canvas: HTMLCanvasElement, mimeType: string, quality?: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("Gagal membuat gambar."))), mimeType, quality);
  });
}

async function loadImageElement(file: File): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.src = url;
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("Gagal memuat gambar."));
    });
    return img;
  } finally {
    URL.revokeObjectURL(url);
  }
}

export async function rotateImage(
  file: File,
  angle: 90 | 180 | 270,
  mimeType: string = file.type || "image/png",
): Promise<Blob> {
  const img = await loadImageElement(file);
  const swap = angle === 90 || angle === 270;
  const canvas = document.createElement("canvas");
  canvas.width = swap ? img.naturalHeight : img.naturalWidth;
  canvas.height = swap ? img.naturalWidth : img.naturalHeight;
  const ctx = canvas.getContext("2d")!;
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((angle * Math.PI) / 180);
  ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
  return canvasToBlob(canvas, mimeType);
}

export async function flipImage(
  file: File,
  direction: "horizontal" | "vertical",
  mimeType: string = file.type || "image/png",
): Promise<Blob> {
  const img = await loadImageElement(file);
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d")!;
  if (direction === "horizontal") {
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
  } else {
    ctx.translate(0, canvas.height);
    ctx.scale(1, -1);
  }
  ctx.drawImage(img, 0, 0);
  return canvasToBlob(canvas, mimeType);
}

export async function enlargeImage(
  file: File,
  scaleFactor: number,
  mimeType: string = file.type || "image/png",
): Promise<Blob> {
  const img = await loadImageElement(file);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(img.naturalWidth * scaleFactor);
  canvas.height = Math.round(img.naturalHeight * scaleFactor);
  const ctx = canvas.getContext("2d")!;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvasToBlob(canvas, mimeType);
}

export interface CropBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export async function cropImage(
  file: File,
  box: CropBox,
  mimeType: string = file.type || "image/png",
): Promise<Blob> {
  const img = await loadImageElement(file);
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(box.width));
  canvas.height = Math.max(1, Math.round(box.height));
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, box.x, box.y, box.width, box.height, 0, 0, canvas.width, canvas.height);
  return canvasToBlob(canvas, mimeType);
}

export async function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  const img = await loadImageElement(file);
  return { width: img.naturalWidth, height: img.naturalHeight };
}
