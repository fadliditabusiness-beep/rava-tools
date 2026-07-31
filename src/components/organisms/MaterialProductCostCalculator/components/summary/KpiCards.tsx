import type { KpiSummary } from "../../types";
import { formatPercent, formatRupiah } from "@/utils/marketplaceTools";

export interface KpiCardsProps {
  kpi: KpiSummary;
}

export default function KpiCards({ kpi }: KpiCardsProps) {
  const items = [
    { icon: "🧱", label: "Total Material", value: String(kpi.totalMaterial) },
    { icon: "🛒", label: "Total Produk", value: String(kpi.totalProduct) },
    { icon: "📦", label: "Average HPP", value: formatRupiah(kpi.avgHpp) },
    { icon: "💰", label: "Total Profit", value: formatRupiah(kpi.totalProfit) },
    { icon: "📈", label: "Average Margin", value: formatPercent(kpi.avgMargin) },
    { icon: "🏷", label: "Average Markup", value: formatPercent(kpi.avgMarkup) },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {items.map((item) => (
        <div key={item.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
          <div className="text-xl">{item.icon}</div>
          <div className="mt-2 text-lg font-bold text-slate-900">{item.value}</div>
          <div className="mt-0.5 text-xs text-slate-500">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
