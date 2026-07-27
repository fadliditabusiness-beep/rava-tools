import { useState, type ChangeEvent } from "react";
import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import Select from "@/components/atoms/Select/Select";
import { downloadFile } from "@/utils/imageTools";
import { getPdfPageCount, parsePageSelection, rotatePages } from "@/utils/pdfTools";

export default function PdfRotateTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [selection, setSelection] = useState("");
  const [angle, setAngle] = useState("90");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0] ?? null;
    setFile(picked);
    setPageCount(null);
    setError(null);
    if (!picked) return;
    try {
      setPageCount(await getPdfPageCount(picked));
    } catch {
      setError("Gagal membaca PDF. Pastikan file valid.");
    }
  };

  const handleProcess = async () => {
    if (!file || !pageCount) return;
    setIsProcessing(true);
    setError(null);
    try {
      const indices = parsePageSelection(selection, pageCount);
      const blob = await rotatePages(file, indices, Number(angle));
      const baseName = file.name.replace(/\.pdf$/i, "");
      downloadFile(blob, `${baseName}-rotated.pdf`);
    } catch {
      setError("Gagal memutar PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
          Pilih File PDF
        </span>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-md file:border-0 file:bg-slate-900 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-slate-700 dark:text-slate-300 dark:file:bg-slate-100 dark:file:text-slate-900 dark:hover:file:bg-slate-300"
        />
      </label>

      {pageCount !== null && (
        <>
          <p className="text-sm text-slate-500 dark:text-slate-400">Total halaman: {pageCount}</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
                Putar Sebesar
              </span>
              <Select value={angle} onChange={(e) => setAngle(e.target.value)}>
                <option value="90">90°</option>
                <option value="180">180°</option>
                <option value="270">270°</option>
              </Select>
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
                Halaman (kosongkan untuk semua)
              </span>
              <Input
                placeholder="Contoh: 1-3,5"
                value={selection}
                onChange={(e) => setSelection(e.target.value)}
              />
            </label>
          </div>
        </>
      )}

      <div className="flex justify-center">
        <Button disabled={!file || !pageCount || isProcessing} onClick={handleProcess}>
          {isProcessing ? "Memproses..." : "Putar PDF"}
        </Button>
      </div>

      {error && <p className="text-center text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}
