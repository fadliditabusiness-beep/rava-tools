import Input from "@/components/atoms/Input/Input";
import Button from "@/components/atoms/Button/Button";
import Badge from "@/components/atoms/Badge/Badge";
import NumberField from "@/components/molecules/NumberField/NumberField";
import StatTile from "@/components/molecules/StatTile/StatTile";
import MaterialPicker from "./products/MaterialPicker";
import MaterialUsageRow from "./products/MaterialUsageRow";
import type { MaterialWithResult, Product, ProductResult } from "../types";
import { formatPercent, formatRupiah } from "@/utils/marketplaceTools";

export interface ProductCardProps {
  index: number;
  product: Product;
  result: ProductResult;
  materials: MaterialWithResult[];
  onChange: (patch: Partial<Product>) => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onAddMaterial: (materialId: string) => void;
  onQtyUsedChange: (materialId: string, qtyUsed: number) => void;
  onRemoveMaterial: (materialId: string) => void;
}

function numberFieldProps(value: number, onChange: (n: number) => void) {
  return {
    value: value === 0 ? "0" : String(value),
    onChange: (v: string) => onChange(v === "" ? 0 : Number(v.replace(/[^0-9.-]/g, "")) || 0),
  };
}

export default function ProductCard({
  index,
  product,
  result,
  materials,
  onChange,
  onDuplicate,
  onDelete,
  onAddMaterial,
  onQtyUsedChange,
  onRemoveMaterial,
}: ProductCardProps) {
  return (
    <div className="@container flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-500">
            {index + 1}
          </span>
          <Badge tone={result.isProfit ? "slate" : "red"}>{result.isProfit ? "🟢 Profit" : "🔴 Loss"}</Badge>
          {result.isBelowTarget && <Badge tone="amber">Margin di bawah target</Badge>}
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
        <label className="block text-sm sm:col-span-2 lg:col-span-3">
          <span className="mb-1 block font-medium text-slate-700">Nama Produk</span>
          <Input value={product.name} placeholder="Contoh: Flashcard Belajar" onChange={(e) => onChange({ name: e.target.value })} />
        </label>

        <NumberField label="Harga Jual (Rp)" placeholder="50000" {...numberFieldProps(product.sellPrice, (n) => onChange({ sellPrice: n }))} />
        <NumberField label="Biaya Packing (Rp)" placeholder="2000" {...numberFieldProps(product.packingCost, (n) => onChange({ packingCost: n }))} />
        <NumberField label="Biaya Lain (Rp)" placeholder="1000" {...numberFieldProps(product.otherCost, (n) => onChange({ otherCost: n }))} />
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

      <div className="flex flex-col gap-2 border-t border-slate-100 pt-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-slate-800">Materials Used</h4>
          <MaterialPicker materials={materials} excludeIds={result.lines.map((l) => l.materialId)} onSelect={onAddMaterial} />
        </div>

        {result.lines.length === 0 ? (
          <p className="text-xs text-slate-400">Belum ada material dipakai produk ini.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {result.lines.map((line) => (
              <MaterialUsageRow
                key={line.materialId}
                line={line}
                onQtyUsedChange={(qtyUsed) => onQtyUsedChange(line.materialId, qtyUsed)}
                onRemove={() => onRemoveMaterial(line.materialId)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 @sm:grid-cols-3 @3xl:grid-cols-4 @5xl:grid-cols-5">
        <StatTile label="Material Cost" value={formatRupiah(result.materialCost)} />
        <StatTile label="Packing Cost" value={formatRupiah(result.packingCost)} />
        <StatTile label="Other Cost" value={formatRupiah(result.otherCost)} />
        <StatTile label="Total HPP" value={formatRupiah(result.totalHpp)} />
        <StatTile label="Harga Jual" value={formatRupiah(product.sellPrice)} />
        <StatTile label="Profit" value={formatRupiah(result.profit)} />
        <StatTile label="Margin" value={formatPercent(result.margin)} />
        <StatTile label="Markup" value={formatPercent(result.markup)} />
        <StatTile label="ROI" value={formatPercent(result.roi)} />
        <StatTile label="Net Income" value={formatRupiah(result.netIncome)} />
      </div>
    </div>
  );
}
