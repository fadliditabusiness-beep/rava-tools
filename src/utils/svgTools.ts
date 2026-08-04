function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Gagal membaca file."));
    reader.readAsDataURL(file);
  });
}

export async function embedPngAsSvg(file: File): Promise<Blob> {
  const [dataUrl, bitmap] = await Promise.all([fileToDataUrl(file), createImageBitmap(file)]);
  const width = bitmap.width;
  const height = bitmap.height;
  bitmap.close();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><image width="${width}" height="${height}" href="${dataUrl}"/></svg>`;
  return new Blob([svg], { type: "image/svg+xml" });
}

export async function rasterizeSvg(file: File, mimeType: "image/png" | "image/jpeg" = "image/png"): Promise<Blob> {
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.src = url;
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("Gagal memuat SVG. Pastikan file punya width/height atau viewBox."));
    });

    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth || 512;
    canvas.height = img.naturalHeight || 512;
    const ctx = canvas.getContext("2d")!;
    if (mimeType === "image/jpeg") {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    return await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("Gagal membuat gambar."))), mimeType, 0.92);
    });
  } finally {
    URL.revokeObjectURL(url);
  }
}
