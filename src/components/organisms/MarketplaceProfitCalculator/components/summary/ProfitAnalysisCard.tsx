import type { ProfitAnalysis } from "../../types";
import { formatPercent, formatRupiah } from "@/utils/marketplaceTools";

export interface ProfitAnalysisCardProps {
  profitAnalysis: ProfitAnalysis;
}

export default function ProfitAnalysisCard({ profitAnalysis }: ProfitAnalysisCardProps) {
  const rows: [string, string][] = [
    ["Average Profit", formatRupiah(profitAnalysis.avgProfit)],
    ["Average Margin", formatPercent(profitAnalysis.avgMargin)],
    ["Average Markup", formatPercent(profitAnalysis.avgMarkup)],
    ["Average ROI", formatPercent(profitAnalysis.avgRoi)],
  ];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <h3 className="text-sm font-semibold text-slate-800">Profit Analysis</h3>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {rows.map(([label, value]) => (
          <div key={label} className="rounded-lg bg-slate-50 px-3 py-3 text-center">
            <div className="text-base font-bold text-slate-900">{value}</div>
            <div className="mt-0.5 text-[11px] text-slate-500">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
