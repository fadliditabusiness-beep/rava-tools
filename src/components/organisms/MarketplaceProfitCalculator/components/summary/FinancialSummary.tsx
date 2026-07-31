import type { FinancialSummary as FinancialSummaryData } from "../../types";
import { formatRupiah } from "@/utils/marketplaceTools";

export interface FinancialSummaryProps {
  financial: FinancialSummaryData;
}

export default function FinancialSummary({ financial }: FinancialSummaryProps) {
  const rows: [string, number][] = [
    ["Total Modal", financial.totalModal],
    ["Total Penjualan", financial.totalPenjualan],
    ["Total Profit", financial.totalProfit],
    ["Total Biaya", financial.totalBiaya],
    ["Total Potongan", financial.totalPotongan],
    ["Total Packing", financial.totalPacking],
    ["Total Voucher", financial.totalVoucher],
    ["Total Pajak", financial.totalPajak],
    ["Total Admin Marketplace", financial.totalAdmin],
  ];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <h3 className="text-sm font-semibold text-slate-800">Financial Summary</h3>
      <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-3">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-2 border-b border-slate-100 py-1.5 sm:flex-col sm:items-start sm:border-none sm:py-0">
            <dt className="text-xs text-slate-500">{label}</dt>
            <dd className="text-sm font-semibold text-slate-900">{formatRupiah(value)}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
