import { PDFDocument, degrees } from "pdf-lib";

export interface NamedBlob {
  name: string;
  blob: Blob;
}

async function loadPdf(file: File): Promise<PDFDocument> {
  const bytes = await file.arrayBuffer();
  return PDFDocument.load(bytes);
}

async function toBlob(doc: PDFDocument): Promise<Blob> {
  const bytes = await doc.save();
  return new Blob([bytes.slice()], { type: "application/pdf" });
}

export async function getPdfPageCount(file: File): Promise<number> {
  const doc = await loadPdf(file);
  return doc.getPageCount();
}

/** Parses "1-3, 5, 8-9" into 0-based, ascending, de-duplicated page indices. Empty input means "all pages". */
export function parsePageSelection(input: string, pageCount: number): number[] {
  const trimmed = input.trim();
  if (!trimmed) return Array.from({ length: pageCount }, (_, i) => i);

  const result = new Set<number>();
  for (const part of trimmed.split(",")) {
    const piece = part.trim();
    if (!piece) continue;

    const rangeMatch = /^(\d+)\s*-\s*(\d+)$/.exec(piece);
    if (rangeMatch) {
      const a = Number(rangeMatch[1]);
      const b = Number(rangeMatch[2]);
      const [lo, hi] = a <= b ? [a, b] : [b, a];
      for (let n = lo; n <= hi; n++) {
        if (n >= 1 && n <= pageCount) result.add(n - 1);
      }
      continue;
    }

    const n = Number(piece);
    if (Number.isInteger(n) && n >= 1 && n <= pageCount) result.add(n - 1);
  }

  return Array.from(result).sort((a, b) => a - b);
}

/** Parses a full permutation like "3,1,2" into 0-based indices. Returns null if invalid or incomplete. */
export function parsePageOrder(input: string, pageCount: number): number[] | null {
  const parts = input
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean)
    .map(Number);

  if (parts.length !== pageCount) return null;

  const seen = new Set<number>();
  for (const n of parts) {
    if (!Number.isInteger(n) || n < 1 || n > pageCount || seen.has(n)) return null;
    seen.add(n);
  }

  return parts.map((n) => n - 1);
}

export async function mergePdfs(files: File[]): Promise<Blob> {
  const merged = await PDFDocument.create();
  for (const file of files) {
    const src = await loadPdf(file);
    const pages = await merged.copyPages(src, src.getPageIndices());
    pages.forEach((page) => merged.addPage(page));
  }
  return toBlob(merged);
}

export async function extractPages(file: File, pageIndices: number[]): Promise<Blob> {
  const src = await loadPdf(file);
  const out = await PDFDocument.create();
  const pages = await out.copyPages(src, pageIndices);
  pages.forEach((page) => out.addPage(page));
  return toBlob(out);
}

export async function deletePages(file: File, pageIndicesToDelete: number[]): Promise<Blob> {
  const src = await loadPdf(file);
  const toDelete = new Set(pageIndicesToDelete);
  const keep = src.getPageIndices().filter((i) => !toDelete.has(i));
  const out = await PDFDocument.create();
  const pages = await out.copyPages(src, keep);
  pages.forEach((page) => out.addPage(page));
  return toBlob(out);
}

export async function rotatePages(
  file: File,
  pageIndices: number[],
  angle: number,
): Promise<Blob> {
  const doc = await loadPdf(file);
  const indices = new Set(pageIndices);
  doc.getPages().forEach((page, i) => {
    if (indices.has(i)) {
      const current = page.getRotation().angle;
      page.setRotation(degrees((current + angle) % 360));
    }
  });
  return toBlob(doc);
}

export async function rearrangePages(file: File, newOrder: number[]): Promise<Blob> {
  const src = await loadPdf(file);
  const out = await PDFDocument.create();
  const pages = await out.copyPages(src, newOrder);
  pages.forEach((page) => out.addPage(page));
  return toBlob(out);
}

export async function splitPdfToSinglePages(file: File): Promise<NamedBlob[]> {
  const src = await loadPdf(file);
  const count = src.getPageCount();
  const results: NamedBlob[] = [];

  for (let i = 0; i < count; i++) {
    const out = await PDFDocument.create();
    const [page] = await out.copyPages(src, [i]);
    out.addPage(page);
    results.push({ name: `halaman-${i + 1}.pdf`, blob: await toBlob(out) });
  }

  return results;
}

export async function imagesToPdf(files: File[]): Promise<Blob> {
  const doc = await PDFDocument.create();
  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const image = file.type === "image/png" ? await doc.embedPng(bytes) : await doc.embedJpg(bytes);
    const page = doc.addPage([image.width, image.height]);
    page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
  }
  return toBlob(doc);
}

export async function compressPdf(file: File): Promise<Blob> {
  const bytes = await file.arrayBuffer();
  const doc = await PDFDocument.load(bytes, { updateMetadata: false });
  const out = await doc.save({ useObjectStreams: true });
  return new Blob([out.slice()], { type: "application/pdf" });
}
