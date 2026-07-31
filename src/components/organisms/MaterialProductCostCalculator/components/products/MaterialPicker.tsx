import { useMemo, useState } from "react";
import Input from "@/components/atoms/Input/Input";
import Button from "@/components/atoms/Button/Button";
import type { MaterialWithResult } from "../../types";
import { formatRupiah } from "@/utils/marketplaceTools";

export interface MaterialPickerProps {
  materials: MaterialWithResult[];
  excludeIds: string[];
  onSelect: (materialId: string) => void;
}

export default function MaterialPicker({ materials, excludeIds, onSelect }: MaterialPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const available = useMemo(() => materials.filter((m) => !excludeIds.includes(m.material.id)), [materials, excludeIds]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return available;
    return available.filter(({ material }) => [material.name, material.variant, material.supplier].some((field) => field.toLowerCase().includes(q)));
  }, [available, query]);

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} className="bg-white px-3 py-1.5 text-xs text-blue-700 ring-1 ring-inset ring-blue-200 hover:bg-blue-50">
        ➕ Tambah Material
      </Button>
    );
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
      <Input
        autoFocus
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari material berdasarkan nama, varian, atau supplier..."
      />
      <div className="mt-2 max-h-56 overflow-y-auto rounded-md border border-slate-100">
        {filtered.length === 0 ? (
          <p className="p-3 text-xs text-slate-400">{available.length === 0 ? "Semua material sudah ditambahkan." : "Material tidak ditemukan."}</p>
        ) : (
          filtered.map(({ material, result }) => (
            <button
              key={material.id}
              type="button"
              onClick={() => {
                onSelect(material.id);
                setIsOpen(false);
                setQuery("");
              }}
              className="flex w-full items-center gap-2 border-b border-slate-50 px-3 py-2 text-left text-sm last:border-none hover:bg-slate-50"
            >
              {material.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={material.image} alt={material.name} className="h-8 w-8 shrink-0 rounded object-cover ring-1 ring-slate-200" />
              ) : (
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-slate-100 text-xs text-slate-400">?</span>
              )}
              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium text-slate-900">{material.name.trim() || "(tanpa nama)"}</span>
                <span className="block truncate text-xs text-slate-500">
                  {[material.variant, material.supplier].filter(Boolean).join(" • ") || "-"}
                </span>
              </span>
              <span className="shrink-0 text-xs font-semibold text-slate-700">{formatRupiah(result.pricePerUnit)}</span>
            </button>
          ))
        )}
      </div>
      <button type="button" onClick={() => setIsOpen(false)} className="mt-2 text-xs text-slate-400 hover:text-slate-600">
        Batal
      </button>
    </div>
  );
}
