import type { MaterialSummary } from "../../types";
import { formatRupiah } from "@/utils/marketplaceTools";

export interface MaterialSummaryCardProps {
  materialSummary: MaterialSummary;
}

export default function MaterialSummaryCard({ materialSummary }: MaterialSummaryCardProps) {
  const rows: [string, string][] = [
    ["Material Termahal", materialSummary.mostExpensive ? materialSummary.mostExpensive.material.name.trim() || "(tanpa nama)" : "-"],
    ["Material Termurah", materialSummary.cheapest ? materialSummary.cheapest.material.name.trim() || "(tanpa nama)" : "-"],
    ["Total Nilai Material", formatRupiah(materialSummary.totalValue)],
    ["Average Harga Material", formatRupiah(materialSummary.averagePrice)],
  ];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <h3 className="text-sm font-semibold text-slate-800">Material Summary</h3>
      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3">
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs text-slate-500">{label}</dt>
            <dd className="text-sm font-semibold text-slate-900">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
