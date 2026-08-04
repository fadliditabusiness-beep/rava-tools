import { useState, type ChangeEvent } from "react";
import Button from "@/components/atoms/Button/Button";
import Select from "@/components/atoms/Select/Select";
import MultiFilePicker from "@/components/molecules/MultiFilePicker/MultiFilePicker";
import { downloadFile } from "@/utils/imageTools";
import type { NamedBlob } from "@/utils/pdfTools";
import { zipFiles } from "@/utils/zipTools";
import {
  createZip,
  createTar,
  createTarGz,
  extractZip,
  extractTar,
  extractTarGz,
  isGzipSupported,
  type ArchiveFormat,
} from "@/utils/archiveTools";

type Mode = "create" | "extract";

function detectFormat(filename: string): ArchiveFormat | null {
  const lower = filename.toLowerCase();
  if (lower.endsWith(".tar.gz") || lower.endsWith(".tgz")) return "tar.gz";
  if (lower.endsWith(".tar")) return "tar";
  if (lower.endsWith(".zip")) return "zip";
  return null;
}

async function downloadExtracted(results: NamedBlob[]) {
  if (results.length === 1) {
    downloadFile(results[0].blob, results[0].name);
    return;
  }
  const zipped = await zipFiles(results, "extracted-files.zip");
  downloadFile(zipped.blob, zipped.name);
}

export default function ArchiveConverterTool() {
  const [mode, setMode] = useState<Mode>("create");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const gzipSupported = isGzipSupported();

  // Create mode state
  const [format, setFormat] = useState<ArchiveFormat>("zip");
  const [files, setFiles] = useState<File[]>([]);

  // Extract mode state
  const [extractFile, setExtractFile] = useState<File | null>(null);
  const detectedFormat = extractFile ? detectFormat(extractFile.name) : null;

  const switchMode = (next: Mode) => {
    setMode(next);
    setError(null);
  };

  const handleExtractFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setExtractFile(e.target.files?.[0] ?? null);
    setError(null);
  };

  const handleCreate = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setError(null);
    try {
      let blob: Blob;
      let filename: string;
      if (format === "zip") {
        blob = await createZip(files);
        filename = "archive.zip";
      } else if (format === "tar") {
        blob = await createTar(files);
        filename = "archive.tar";
      } else {
        blob = await createTarGz(files);
        filename = "archive.tar.gz";
      }
      downloadFile(blob, filename);
    } catch {
      setError("Gagal membuat arsip.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExtract = async () => {
    if (!extractFile || !detectedFormat) return;
    setIsProcessing(true);
    setError(null);
    try {
      let results: NamedBlob[];
      if (detectedFormat === "zip") results = await extractZip(extractFile);
      else if (detectedFormat === "tar") results = await extractTar(extractFile);
      else results = await extractTarGz(extractFile);

      if (results.length === 0) {
        setError("Arsip kosong, tidak ada file untuk diekstrak.");
        return;
      }
      await downloadExtracted(results);
    } catch {
      setError("Gagal mengekstrak arsip. Pastikan file valid.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center gap-2">
        <button
          type="button"
          onClick={() => switchMode("create")}
          className={
            mode === "create"
              ? "rounded-full bg-slate-900 px-4 py-1.5 text-sm font-medium text-white dark:bg-slate-100 dark:text-slate-900"
              : "rounded-full border border-slate-300 px-4 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          }
        >
          Buat Arsip
        </button>
        <button
          type="button"
          onClick={() => switchMode("extract")}
          className={
            mode === "extract"
              ? "rounded-full bg-slate-900 px-4 py-1.5 text-sm font-medium text-white dark:bg-slate-100 dark:text-slate-900"
              : "rounded-full border border-slate-300 px-4 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          }
        >
          Ekstrak Arsip
        </button>
      </div>

      {mode === "create" ? (
        <>
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
              Format Arsip
            </span>
            <Select value={format} onChange={(e) => setFormat(e.target.value as ArchiveFormat)}>
              <option value="zip">ZIP</option>
              <option value="tar">TAR</option>
              <option value="tar.gz" disabled={!gzipSupported}>
                TAR.GZ
              </option>
            </Select>
            {!gzipSupported && (
              <span className="mt-1 block text-xs text-amber-600 dark:text-amber-400">
                Browser ini tidak mendukung TAR.GZ
              </span>
            )}
          </label>

          <MultiFilePicker
            accept="*/*"
            label="Pilih File untuk Diarsipkan"
            files={files}
            onFilesChange={setFiles}
          />

          <div className="flex justify-center">
            <Button disabled={files.length === 0 || isProcessing} onClick={handleCreate}>
              {isProcessing ? "Memproses..." : "Buat Arsip"}
            </Button>
          </div>
        </>
      ) : (
        <>
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
              Pilih File Arsip (.zip, .tar, .tar.gz)
            </span>
            <input
              type="file"
              accept=".zip,.tar,.gz,.tgz"
              onChange={handleExtractFileChange}
              className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-md file:border-0 file:bg-slate-900 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-slate-700 dark:text-slate-300 dark:file:bg-slate-100 dark:file:text-slate-900 dark:hover:file:bg-slate-300"
            />
          </label>

          {extractFile && (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {detectedFormat
                ? `Format terdeteksi: ${detectedFormat.toUpperCase()}`
                : "Format tidak dikenali. Gunakan file .zip, .tar, atau .tar.gz."}
            </p>
          )}

          <div className="flex justify-center">
            <Button
              disabled={!extractFile || !detectedFormat || isProcessing}
              onClick={handleExtract}
            >
              {isProcessing ? "Memproses..." : "Ekstrak Arsip"}
            </Button>
          </div>
        </>
      )}

      {error && <p className="text-center text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}
