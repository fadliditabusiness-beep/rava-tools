import { useMemo, useState } from "react";
import MaterialsToolbar from "./materials/MaterialsToolbar";
import MaterialsTable from "./materials/MaterialsTable";
import EmptyState from "./EmptyState";
import type { Material, MaterialWithResult } from "../types";

export interface MaterialsSectionProps {
  items: MaterialWithResult[];
  onAdd: () => void;
  onChange: (id: string, patch: Partial<Material>) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onReset: () => void;
  onImportFile: (file: File) => void;
  onExport: () => void;
  exportDisabled: boolean;
}

export default function MaterialsSection({ items, onAdd, onChange, onDuplicate, onDelete, onReset, onImportFile, onExport, exportDisabled }: MaterialsSectionProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(({ material }) => [material.name, material.variant, material.supplier].some((field) => field.toLowerCase().includes(q)));
  }, [items, query]);

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-bold text-slate-900">Materials</h2>

      <MaterialsToolbar
        onAdd={onAdd}
        searchQuery={query}
        onSearchChange={setQuery}
        onImportFile={onImportFile}
        onExport={onExport}
        onReset={onReset}
        exportDisabled={exportDisabled}
        resetDisabled={items.length === 0}
      />

      {items.length === 0 ? (
        <EmptyState icon="📦" title="Belum ada bahan." subtitle="Klik Tambah Material untuk mulai mendata bahan baku." />
      ) : filtered.length === 0 ? (
        <EmptyState icon="🔍" title="Material tidak ditemukan." subtitle="Coba kata kunci pencarian lain." />
      ) : (
        <MaterialsTable items={filtered} onChange={onChange} onDuplicate={onDuplicate} onDelete={onDelete} />
      )}
    </div>
  );
}
