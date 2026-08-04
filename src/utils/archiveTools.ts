import JSZip from "jszip";
import type { NamedBlob } from "@/utils/pdfTools";

export type ArchiveFormat = "zip" | "tar" | "tar.gz";

export function isGzipSupported(): boolean {
  return typeof CompressionStream !== "undefined" && typeof DecompressionStream !== "undefined";
}

export async function createZip(files: File[]): Promise<Blob> {
  const zip = new JSZip();
  files.forEach((file) => zip.file(file.name, file));
  return zip.generateAsync({ type: "blob" });
}

export async function extractZip(file: Blob): Promise<NamedBlob[]> {
  const zip = await JSZip.loadAsync(file);
  const results: NamedBlob[] = [];
  for (const entry of Object.values(zip.files)) {
    if (entry.dir) continue;
    results.push({ name: entry.name, blob: await entry.async("blob") });
  }
  return results;
}

const TAR_BLOCK_SIZE = 512;

function writeStringField(header: Uint8Array, offset: number, length: number, value: string) {
  header.set(new TextEncoder().encode(value.slice(0, length)), offset);
}

function writeOctalField(header: Uint8Array, offset: number, length: number, value: number) {
  writeStringField(header, offset, length, value.toString(8).padStart(length - 1, "0") + "\0");
}

function buildTarHeader(name: string, size: number): Uint8Array {
  const header = new Uint8Array(TAR_BLOCK_SIZE);
  writeStringField(header, 0, 100, name);
  writeStringField(header, 100, 8, "0000644\0");
  writeStringField(header, 108, 8, "0000000\0");
  writeStringField(header, 116, 8, "0000000\0");
  writeOctalField(header, 124, 12, size);
  writeOctalField(header, 136, 12, Math.floor(Date.now() / 1000));
  header.fill(32, 148, 156);
  writeStringField(header, 156, 1, "0");
  writeStringField(header, 257, 6, "ustar\0");
  writeStringField(header, 263, 2, "00");

  let checksum = 0;
  for (let i = 0; i < TAR_BLOCK_SIZE; i++) checksum += header[i];
  writeStringField(header, 148, 6, checksum.toString(8).padStart(6, "0"));
  header[154] = 0;
  header[155] = 32;

  return header;
}

function padToBlockSize(bytes: Uint8Array): Uint8Array {
  const remainder = bytes.length % TAR_BLOCK_SIZE;
  if (remainder === 0) return bytes;
  const padded = new Uint8Array(bytes.length + (TAR_BLOCK_SIZE - remainder));
  padded.set(bytes);
  return padded;
}

export async function createTar(files: File[]): Promise<Blob> {
  const chunks: Uint8Array[] = [];
  for (const file of files) {
    const content = new Uint8Array(await file.arrayBuffer());
    chunks.push(buildTarHeader(file.name, content.length));
    chunks.push(padToBlockSize(content));
  }
  chunks.push(new Uint8Array(TAR_BLOCK_SIZE * 2));

  const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }
  return new Blob([result], { type: "application/x-tar" });
}

export async function extractTar(file: Blob): Promise<NamedBlob[]> {
  const buffer = new Uint8Array(await file.arrayBuffer());
  const decoder = new TextDecoder();
  const results: NamedBlob[] = [];
  let offset = 0;

  while (offset + TAR_BLOCK_SIZE <= buffer.length) {
    const header = buffer.subarray(offset, offset + TAR_BLOCK_SIZE);
    if (header.every((byte) => byte === 0)) break;

    const name = decoder.decode(header.subarray(0, 100)).replace(/\0.*$/, "");
    const sizeStr = decoder.decode(header.subarray(124, 136)).replace(/\0.*$/, "").trim();
    const size = parseInt(sizeStr, 8) || 0;
    offset += TAR_BLOCK_SIZE;
    if (!name) break;

    results.push({ name, blob: new Blob([buffer.slice(offset, offset + size)]) });
    offset += Math.ceil(size / TAR_BLOCK_SIZE) * TAR_BLOCK_SIZE;
  }

  return results;
}

export async function gzipBlob(blob: Blob): Promise<Blob> {
  if (!CompressionStream) throw new Error("Browser ini tidak mendukung kompresi gzip.");
  const stream = blob.stream().pipeThrough(new CompressionStream("gzip"));
  return new Response(stream).blob();
}

export async function gunzipBlob(blob: Blob): Promise<Blob> {
  if (!DecompressionStream) throw new Error("Browser ini tidak mendukung dekompresi gzip.");
  const stream = blob.stream().pipeThrough(new DecompressionStream("gzip"));
  return new Response(stream).blob();
}

export async function createTarGz(files: File[]): Promise<Blob> {
  return gzipBlob(await createTar(files));
}

export async function extractTarGz(file: Blob): Promise<NamedBlob[]> {
  return extractTar(await gunzipBlob(file));
}
