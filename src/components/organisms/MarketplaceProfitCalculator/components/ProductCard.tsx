import Input from "@/components/atoms/Input/Input";
import Select from "@/components/atoms/Select/Select";
import Button from "@/components/atoms/Button/Button";
import Badge from "@/components/atoms/Badge/Badge";
import NumberField from "@/components/molecules/NumberField/NumberField";
import StatTile from "@/components/molecules/StatTile/StatTile";
import { MARKETPLACE_OPTIONS } from "../constants";
import type { Product, ProductResult } from "../types";
import { formatPercent, formatRupiah } from "@/utils/marketplaceTools";

export interface ProductCardProps {
  index: number;
  product: Product;
  result: ProductResult;
  onChange: (patch: Partial<Product>) => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

function numberFieldProps(value: number, onChange: (n: number) => void) {
  return {
    value: value === 0 ? "0" : String(value),
    onChange: (v: string) => onChange(v === "" ? 0 : Number(v.replace(/[^0-9.-]/g, "")) || 0),
  };
}

export default function ProductCard({ index, product, result, onChange, onDuplicate, onDelete }: ProductCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-500">
            {index + 1}
          </span>
          <Badge tone={result.isProfit ? "slate" : "red"}>{result.isProfit ? "🟢 Profit" : "🔴 Loss"}</Badge>
        </div>
        <div className="flex gap-2">
          <Button onClick={onDuplicate} className="bg-white px-3 py-1.5 text-xs text-slate-600 ring-1 ring-inset ring-slate-200 hover:bg-slate-50">
            Duplicate
          </Button>
          <Button onClick={onDelete} className="bg-white px-3 py-1.5 text-xs text-red-600 ring-1 ring-inset ring-red-200 hover:bg-red-50">
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <label className="block text-sm sm:col-span-2">
          <span className="mb-1 block font-medium text-slate-700">Nama Produk</span>
          <Input value={product.name} placeholder="Contoh: Kaos Polos Katun" onChange={(e) => onChange({ name: e.target.value })} />
        </label>

        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Marketplace</span>
          <Select value={product.marketplace} onChange={(e) => onChange({ marketplace: e.target.value as Product["marketplace"] })}>
            {MARKETPLACE_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </Select>
        </label>

        <NumberField label="Harga Modal (Rp)" placeholder="20000" {...numberFieldProps(product.costPrice, (n) => onChange({ costPrice: n }))} />
        <NumberField label="Biaya Packing (Rp)" placeholder="2000" {...numberFieldProps(product.packingCost, (n) => onChange({ packingCost: n }))} />
        <NumberField label="Biaya Lain (Rp)" placeholder="1000" {...numberFieldProps(product.otherCost, (n) => onChange({ otherCost: n }))} />
        <NumberField label="Harga Jual (Rp)" placeholder="50000" {...numberFieldProps(product.sellPrice, (n) => onChange({ sellPrice: n }))} />
        <NumberField label="Diskon (%)" placeholder="0" {...numberFieldProps(product.discountPercent, (n) => onChange({ discountPercent: n }))} />
        <NumberField label="Voucher Seller (Rp)" placeholder="0" {...numberFieldProps(product.voucher, (n) => onChange({ voucher: n }))} />
        <NumberField
          label="Admin Marketplace (%)"
          placeholder="8"
          {...numberFieldProps(product.marketplaceFeePercent, (n) => onChange({ marketplaceFeePercent: n }))}
        />
        <NumberField label="Pajak (Rp)" placeholder="0" {...numberFieldProps(product.tax, (n) => onChange({ tax: n }))} />
        <NumberField
          label="Target Margin (%)"
          placeholder="30"
          {...numberFieldProps(product.targetMarginPercent, (n) => onChange({ targetMarginPercent: n }))}
        />

        <label className="block text-sm sm:col-span-2 lg:col-span-3">
          <span className="mb-1 block font-medium text-slate-700">Catatan</span>
          <Input value={product.note} placeholder="Opsional" onChange={(e) => onChange({ note: e.target.value })} />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
        <div>
          <div className="text-xs text-slate-500">Harga Tampil di Platform</div>
          <div className="mt-1 flex items-baseline gap-2">
            {product.discountPercent > 0 && <span className="text-sm text-slate-400 line-through">{formatRupiah(result.hargaSebelumDiskon)}</span>}
            <span className="text-lg font-bold text-slate-900">{formatRupiah(result.hargaSetelahDiskon)}</span>
            {product.discountPercent > 0 && <Badge tone="red">-{formatPercent(product.discountPercent)}</Badge>}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3">
        <div>
          <div className="text-xs text-blue-700">Rekomendasi Harga Jual (Target Margin {formatPercent(product.targetMarginPercent)})</div>
          <div className="text-lg font-bold text-blue-900">{formatRupiah(result.recommendedSellPrice)}</div>
        </div>
        {Number.isFinite(result.recommendedSellPrice) && (
          <Button
            onClick={() => onChange({ sellPrice: Math.round(result.recommendedSellPrice) })}
            className="bg-blue-600 px-3 py-1.5 text-xs hover:bg-blue-500"
          >
            Pakai Harga Ini
          </Button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-4 sm:grid-cols-3 lg:grid-cols-6">
        <StatTile label="HPP" value={formatRupiah(result.hpp)} />
        <StatTile label="Total Modal" value={formatRupiah(result.totalModal)} />
        <StatTile label="Total Biaya" value={formatRupiah(result.totalBiaya)} />
        <StatTile label="Total Potongan" value={formatRupiah(result.totalPotongan)} />
        <StatTile label="Harga Bersih" value={formatRupiah(result.hargaBersih)} />
        <StatTile label="Profit" value={formatRupiah(result.profit)} />
        <StatTile label="Margin" value={formatPercent(result.margin)} />
        <StatTile label="Markup" value={formatPercent(result.markup)} />
        <StatTile label="ROI" value={formatPercent(result.roi)} />
        <StatTile label="Profit %" value={formatPercent(result.profitPercent)} />
        <StatTile label="Net Income" value={formatRupiah(result.netIncome)} />
      </div>
    </div>
  );
}
