import type { ProductSummary, ProductWithResult } from "../../types";
import { formatRupiah } from "@/utils/marketplaceTools";

export interface ProductSummaryCardProps {
  productSummary: ProductSummary;
}

function Row({ label, item, format }: { label: string; item: ProductWithResult | null; format: (item: ProductWithResult) => string }) {
  return (
    <div className="flex items-center justify-between gap-2 border-b border-slate-100 py-2 last:border-none">
      <div>
        <div className="text-xs text-slate-500">{label}</div>
        <div className="text-sm font-medium text-slate-900">{item ? item.product.name.trim() || "(tanpa nama)" : "-"}</div>
      </div>
      <div className="text-sm font-semibold text-slate-700">{item ? format(item) : "-"}</div>
    </div>
  );
}

export default function ProductSummaryCard({ productSummary }: ProductSummaryCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <h3 className="text-sm font-semibold text-slate-800">Product Summary</h3>
      <div className="mt-2">
        <Row label="Produk Profit Tertinggi" item={productSummary.highestProfit} format={(i) => formatRupiah(i.result.netIncome)} />
        <Row label="Produk Profit Terendah" item={productSummary.lowestProfit} format={(i) => formatRupiah(i.result.netIncome)} />
        <Row label="Produk HPP Tertinggi" item={productSummary.highestHpp} format={(i) => formatRupiah(i.result.totalHpp)} />
        <Row label="Produk HPP Terendah" item={productSummary.lowestHpp} format={(i) => formatRupiah(i.result.totalHpp)} />
      </div>
    </div>
  );
}
