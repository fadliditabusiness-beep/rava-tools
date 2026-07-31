import { useRef } from "react";
import Button from "@/components/atoms/Button/Button";

export interface ToolbarProps {
  onAdd: () => void;
  onImportFile: (file: File) => void;
  onExport: () => void;
  onReset: () => void;
  exportDisabled: boolean;
  resetDisabled: boolean;
}

export default function Toolbar({ onAdd, onImportFile, onExport, onReset, exportDisabled, resetDisabled }: ToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) onImportFile(file);
    e.target.value = "";
  }

  function handleReset() {
    if (resetDisabled) return;
    if (window.confirm("Hapus semua produk? Tindakan ini tidak bisa dibatalkan.")) onReset();
  }

  return (
    <div className="flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:gap-3">
      <Button onClick={onAdd} className="bg-blue-600 hover:bg-blue-500">
        ➕ Tambah Produk
      </Button>
      <Button onClick={() => fileInputRef.current?.click()} className="bg-slate-700 hover:bg-slate-600">
        📥 Import Excel
      </Button>
      <input ref={fileInputRef} type="file" accept=".xlsx,.xls,.csv" className="hidden" onChange={handleFileChange} />
      <Button onClick={onExport} disabled={exportDisabled} className="bg-emerald-600 hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50">
        📤 Export Excel
      </Button>
      <Button
        onClick={handleReset}
        disabled={resetDisabled}
        className="bg-white text-red-600 ring-1 ring-inset ring-red-200 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-900"
      >
        🗑 Reset Semua
      </Button>
    </div>
  );
}
