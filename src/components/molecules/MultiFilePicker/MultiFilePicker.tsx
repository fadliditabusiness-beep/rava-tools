import type { ChangeEvent } from "react";
import { formatBytes } from "@/utils/imageTools";

export interface MultiFilePickerProps {
  accept: string;
  label: string;
  files: File[];
  onFilesChange: (files: File[]) => void;
}

export default function MultiFilePicker({
  accept,
  label,
  files,
  onFilesChange,
}: MultiFilePickerProps) {
  const handleAdd = (e: ChangeEvent<HTMLInputElement>) => {
    const added = Array.from(e.target.files ?? []);
    onFilesChange([...files, ...added]);
    e.target.value = "";
  };

  const remove = (index: number) => onFilesChange(files.filter((_, i) => i !== index));

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= files.length) return;
    const copy = [...files];
    [copy[index], copy[target]] = [copy[target], copy[index]];
    onFilesChange(copy);
  };

  return (
    <div className="flex flex-col gap-3">
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">{label}</span>
        <input
          type="file"
          accept={accept}
          multiple
          onChange={handleAdd}
          className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-md file:border-0 file:bg-slate-900 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-slate-700 dark:text-slate-300 dark:file:bg-slate-100 dark:file:text-slate-900 dark:hover:file:bg-slate-300"
        />
      </label>

      {files.length > 0 && (
        <ul className="flex flex-col gap-2">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <span className="flex-1 truncate text-slate-700 dark:text-slate-200">
                {index + 1}. {file.name}
              </span>
              <span className="text-xs text-slate-400">{formatBytes(file.size)}</span>
              <button
                type="button"
                onClick={() => move(index, -1)}
                disabled={index === 0}
                className="text-slate-400 hover:text-slate-700 disabled:opacity-30 dark:hover:text-slate-200"
                aria-label="Naikkan urutan"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => move(index, 1)}
                disabled={index === files.length - 1}
                className="text-slate-400 hover:text-slate-700 disabled:opacity-30 dark:hover:text-slate-200"
                aria-label="Turunkan urutan"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-400 hover:text-red-600"
                aria-label="Hapus"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
