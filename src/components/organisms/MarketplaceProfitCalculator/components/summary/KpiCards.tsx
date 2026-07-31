import type { BusinessSummaryData } from "../../types";
import { formatPercent, formatRupiah } from "@/utils/marketplaceTools";

export interface KpiCardsProps {
  summary: BusinessSummaryData;
}

export default function KpiCards({ summary }: KpiCardsProps) {
  const items = [
    { icon: "🛒", label: "Jumlah Produk", value: String(summary.productCount) },
    { icon: "💰", label: "Total Profit", value: formatRupiah(summary.financial.totalProfit) },
    { icon: "💵", label: "Total Penjualan", value: formatRupiah(summary.financial.totalPenjualan) },
    { icon: "📦", label: "Total Modal", value: formatRupiah(summary.financial.totalModal) },
    { icon: "📈", label: "Average Margin", value: formatPercent(summary.profitAnalysis.avgMargin) },
    { icon: "🏷", label: "Total Voucher", value: formatRupiah(summary.financial.totalVoucher) },
    { icon: "🏦", label: "Total Admin Marketplace", value: formatRupiah(summary.financial.totalAdmin) },
    { icon: "💸", label: "Total Pajak", value: formatRupiah(summary.financial.totalPajak) },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="text-xl">{item.icon}</div>
          <div className="mt-2 text-lg font-bold text-slate-900">{item.value}</div>
          <div className="mt-0.5 text-xs text-slate-500">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
