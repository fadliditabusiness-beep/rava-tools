import MaterialRow from "./MaterialRow";
import type { Material, MaterialWithResult } from "../../types";

export interface MaterialsTableProps {
  items: MaterialWithResult[];
  onChange: (id: string, patch: Partial<Material>) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function MaterialsTable({ items, onChange, onDuplicate, onDelete }: MaterialsTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] divide-y divide-slate-100">
          <thead>
            <tr className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <th className="px-3 py-2.5">Gambar</th>
              <th className="px-3 py-2.5">Material</th>
              <th className="px-3 py-2.5">Supplier</th>
              <th className="px-3 py-2.5">Harga</th>
              <th className="px-3 py-2.5">Qty</th>
              <th className="px-3 py-2.5">Harga per Unit</th>
              <th className="px-3 py-2.5 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map(({ material, result }) => (
              <MaterialRow
                key={material.id}
                material={material}
                result={result}
                onChange={(patch) => onChange(material.id, patch)}
                onDuplicate={() => onDuplicate(material.id)}
                onDelete={() => onDelete(material.id)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
