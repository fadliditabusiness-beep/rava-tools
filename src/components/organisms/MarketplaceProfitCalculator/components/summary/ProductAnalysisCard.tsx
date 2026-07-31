import type { ProductAnalysis, ProductWithResult } from "../../types";
import { formatPercent, formatRupiah } from "@/utils/marketplaceTools";

export interface ProductAnalysisCardProps {
  productAnalysis: ProductAnalysis;
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

export default function ProductAnalysisCard({ productAnalysis }: ProductAnalysisCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <h3 className="text-sm font-semibold text-slate-800">Product Analysis</h3>
      <div className="mt-2">
        <Row label="Produk Profit Tertinggi" item={productAnalysis.highestProfit} format={(i) => formatRupiah(i.result.netIncome)} />
        <Row label="Produk Profit Terendah" item={productAnalysis.lowestProfit} format={(i) => formatRupiah(i.result.netIncome)} />
        <Row label="Produk Margin Tertinggi" item={productAnalysis.highestMargin} format={(i) => formatPercent(i.result.margin)} />
        <Row label="Produk Margin Terendah" item={productAnalysis.lowestMargin} format={(i) => formatPercent(i.result.margin)} />
        <Row label="Produk Harga Jual Tertinggi" item={productAnalysis.highestSellPrice} format={(i) => formatRupiah(i.product.sellPrice)} />
        <Row label="Produk Modal Tertinggi" item={productAnalysis.highestCost} format={(i) => formatRupiah(i.result.totalModal)} />
      </div>
    </div>
  );
}
