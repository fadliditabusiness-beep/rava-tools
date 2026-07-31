import { useState } from "react";
import Input from "@/components/atoms/Input/Input";
import Select from "@/components/atoms/Select/Select";
import Button from "@/components/atoms/Button/Button";
import { UNIT_OPTIONS } from "../../constants";
import type { Material, MaterialResult } from "../../types";
import { formatRupiah } from "@/utils/marketplaceTools";

export interface MaterialRowProps {
  material: Material;
  result: MaterialResult;
  onChange: (patch: Partial<Material>) => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

function numberFieldProps(value: number, onChange: (n: number) => void) {
  return {
    value: value === 0 ? "0" : String(value),
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value === "" ? 0 : Number(e.target.value.replace(/[^0-9.-]/g, "")) || 0),
  };
}

export default function MaterialRow({ material, result, onChange, onDuplicate, onDelete }: MaterialRowProps) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <tr className="bg-blue-50/50 align-top">
        <td className="p-2" colSpan={10}>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            <label className="block text-xs sm:col-span-2">
              <span className="mb-1 block font-medium text-slate-600">Gambar (URL)</span>
              <Input value={material.image} placeholder="https://..." onChange={(e) => onChange({ image: e.target.value })} />
            </label>
            <label className="block text-xs">
              <span className="mb-1 block font-medium text-slate-600">Nama Material</span>
              <Input value={material.name} placeholder="Art Paper" onChange={(e) => onChange({ name: e.target.value })} />
            </label>
            <label className="block text-xs">
              <span className="mb-1 block font-medium text-slate-600">Variant</span>
              <Input value={material.variant} placeholder="230gsm" onChange={(e) => onChange({ variant: e.target.value })} />
            </label>
            <label className="block text-xs">
              <span className="mb-1 block font-medium text-slate-600">Supplier</span>
              <Input value={material.supplier} placeholder="Toko Kertas Jaya" onChange={(e) => onChange({ supplier: e.target.value })} />
            </label>
            <label className="block text-xs sm:col-span-2">
              <span className="mb-1 block font-medium text-slate-600">Link Produk</span>
              <Input value={material.link} placeholder="https://..." onChange={(e) => onChange({ link: e.target.value })} />
            </label>
            <label className="block text-xs">
              <span className="mb-1 block font-medium text-slate-600">Harga (Rp)</span>
              <Input type="number" inputMode="decimal" {...numberFieldProps(material.price, (n) => onChange({ price: n }))} />
            </label>
            <label className="block text-xs">
              <span className="mb-1 block font-medium text-slate-600">Qty</span>
              <Input type="number" inputMode="decimal" {...numberFieldProps(material.qty, (n) => onChange({ qty: n }))} />
            </label>
            <label className="block text-xs">
              <span className="mb-1 block font-medium text-slate-600">Unit</span>
              <Select value={material.unit} onChange={(e) => onChange({ unit: e.target.value as Material["unit"] })}>
                {UNIT_OPTIONS.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </Select>
            </label>
            <label className="block text-xs sm:col-span-2">
              <span className="mb-1 block font-medium text-slate-600">Catatan</span>
              <Input value={material.note} placeholder="Opsional" onChange={(e) => onChange({ note: e.target.value })} />
            </label>
          </div>
          <div className="mt-3 flex items-center justify-between gap-2">
            <span className="text-xs text-slate-500">
              Harga per Unit: <span className="font-semibold text-slate-800">{formatRupiah(result.pricePerUnit)}</span>
            </span>
            <Button onClick={() => setIsEditing(false)} className="bg-blue-600 px-3 py-1.5 text-xs hover:bg-blue-500">
              Selesai
            </Button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr className="align-middle transition-colors hover:bg-slate-50">
      <td className="whitespace-nowrap px-3 py-2.5">
        {material.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={material.image} alt={material.name} className="h-9 w-9 rounded-md object-cover ring-1 ring-slate-200" />
        ) : (
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-100 text-xs text-slate-400">?</span>
        )}
      </td>
      <td className="px-3 py-2.5 text-sm">
        <div className="font-medium text-slate-900">{material.name.trim() || "(tanpa nama)"}</div>
        {material.variant && <div className="text-xs text-slate-500">{material.variant}</div>}
      </td>
      <td className="px-3 py-2.5 text-sm text-slate-600">{material.supplier || "-"}</td>
      <td className="whitespace-nowrap px-3 py-2.5 text-sm text-slate-800">{formatRupiah(material.price)}</td>
      <td className="whitespace-nowrap px-3 py-2.5 text-sm text-slate-600">
        {material.qty} {material.unit}
      </td>
      <td className="whitespace-nowrap px-3 py-2.5 text-sm font-semibold text-slate-900">{formatRupiah(result.pricePerUnit)}</td>
      <td className="px-3 py-2.5 text-right">
        <div className="flex justify-end gap-1.5">
          <Button onClick={() => setIsEditing(true)} className="bg-white px-2.5 py-1 text-xs text-slate-600 ring-1 ring-inset ring-slate-200 hover:bg-slate-50">
            Edit
          </Button>
          <Button onClick={onDuplicate} className="bg-white px-2.5 py-1 text-xs text-slate-600 ring-1 ring-inset ring-slate-200 hover:bg-slate-50">
            Duplicate
          </Button>
          <Button onClick={onDelete} className="bg-white px-2.5 py-1 text-xs text-red-600 ring-1 ring-inset ring-red-200 hover:bg-red-50">
            Delete
          </Button>
        </div>
      </td>
    </tr>
  );
}
