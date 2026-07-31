import type { CostBreakdownItem } from "../../types";
import { formatPercent, formatRupiah } from "@/utils/marketplaceTools";

const SLICE_COLORS = ["#2a78d6", "#eb6834", "#1baf7a", "#eda100", "#e87ba4", "#008300"];

export interface CostBreakdownProps {
  breakdown: CostBreakdownItem[];
}

export default function CostBreakdown({ breakdown }: CostBreakdownProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <h3 className="text-sm font-semibold text-slate-800">Breakdown Biaya</h3>
      <div className="mt-3 flex flex-col gap-2">
        {breakdown.map((item, index) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: SLICE_COLORS[index % SLICE_COLORS.length] }} />
            <span className="w-32 shrink-0 text-xs text-slate-600 sm:w-40">{item.label}</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full"
                style={{ width: `${Math.min(Math.max(item.percent, 0), 100)}%`, backgroundColor: SLICE_COLORS[index % SLICE_COLORS.length] }}
              />
            </div>
            <span className="w-24 shrink-0 text-right text-xs font-semibold text-slate-800 sm:w-28">{formatRupiah(item.value)}</span>
            <span className="w-14 shrink-0 text-right text-xs text-slate-500">{formatPercent(item.percent)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
