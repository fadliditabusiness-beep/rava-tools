import Input from "@/components/atoms/Input/Input";
import type { ProductMaterialLine } from "../../types";
import { formatRupiah } from "@/utils/marketplaceTools";

export interface MaterialUsageRowProps {
  line: ProductMaterialLine;
  onQtyUsedChange: (qtyUsed: number) => void;
  onRemove: () => void;
}

export default function MaterialUsageRow({ line, onQtyUsedChange, onRemove }: MaterialUsageRowProps) {
  const { material } = line;

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
      {material?.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={material.image} alt={material.name} className="h-9 w-9 shrink-0 rounded object-cover ring-1 ring-slate-200" />
      ) : (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-slate-200 text-xs text-slate-400">?</span>
      )}

      <div className="min-w-[9rem] flex-1">
        <div className="truncate text-sm font-medium text-slate-900">{material ? material.name.trim() || "(tanpa nama)" : "(material dihapus)"}</div>
        <div className="truncate text-xs text-slate-500">
          {material ? [material.variant, material.supplier].filter(Boolean).join(" • ") || "-" : "Material ini sudah dihapus dari daftar Materials"}
        </div>
      </div>

      <div className="hidden shrink-0 text-xs text-slate-500 sm:block">
        {material ? `${formatRupiah(material.price)} / ${material.qty} ${material.unit}` : "-"}
      </div>

      <div className="shrink-0 text-xs text-slate-500">
        <span className="hidden sm:inline">Harga per Unit: </span>
        <span className="font-semibold text-slate-800">{formatRupiah(line.pricePerUnit)}</span>
      </div>

      <label className="flex shrink-0 items-center gap-1.5 text-xs text-slate-500">
        Qty Digunakan
        <Input
          type="number"
          inputMode="decimal"
          value={line.qtyUsed === 0 ? "0" : String(line.qtyUsed)}
          onChange={(e) => onQtyUsedChange(e.target.value === "" ? 0 : Number(e.target.value.replace(/[^0-9.-]/g, "")) || 0)}
          className="w-16 px-2 py-1 text-center"
        />
      </label>

      <div className="shrink-0 text-sm font-semibold text-slate-900">{formatRupiah(line.total)}</div>

      <button type="button" onClick={onRemove} className="shrink-0 text-xs text-red-500 hover:text-red-700" aria-label="Hapus material dari produk">
        ✕
      </button>
    </div>
  );
}
