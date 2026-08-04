import { useMemo, useState } from "react";
import Input from "@/components/atoms/Input/Input";
import Select from "@/components/atoms/Select/Select";
import {
  LENGTH_UNITS,
  WEIGHT_UNITS,
  VOLUME_UNITS,
  TEMPERATURE_UNITS,
  UNIT_CATEGORIES,
  convertUnit,
  convertTemperature,
  type UnitDef,
  type UnitCategoryKey,
} from "@/utils/unitConversionTools";

function unitsForCategory(category: UnitCategoryKey): UnitDef[] | typeof TEMPERATURE_UNITS {
  switch (category) {
    case "length":
      return LENGTH_UNITS;
    case "weight":
      return WEIGHT_UNITS;
    case "volume":
      return VOLUME_UNITS;
    case "temperature":
      return TEMPERATURE_UNITS;
  }
}

function formatResult(value: number): string {
  if (!Number.isFinite(value)) return "-";
  return value.toFixed(4).replace(/\.?0+$/, "");
}

export default function UnitConverterTool() {
  const [category, setCategory] = useState<UnitCategoryKey>(UNIT_CATEGORIES[0].key);
  const [value, setValue] = useState("1");
  const units = unitsForCategory(category);
  const [from, setFrom] = useState(units[0].key);
  const [to, setTo] = useState(units[1]?.key ?? units[0].key);

  const handleCategoryChange = (next: UnitCategoryKey) => {
    setCategory(next);
    const nextUnits = unitsForCategory(next);
    setFrom(nextUnits[0].key);
    setTo(nextUnits[1]?.key ?? nextUnits[0].key);
  };

  const result = useMemo(() => {
    const n = Number(value);
    if (value === "" || !Number.isFinite(n)) return null;
    if (category === "temperature") return convertTemperature(n, from, to);
    return convertUnit(units as UnitDef[], n, from, to);
  }, [value, from, to, category, units]);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
            Kategori
          </span>
          <Select
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value as UnitCategoryKey)}
          >
            {UNIT_CATEGORIES.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </Select>
        </label>

        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Nilai</span>
          <Input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Masukkan angka"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Dari</span>
          <Select value={from} onChange={(e) => setFrom(e.target.value)}>
            {units.map((u) => (
              <option key={u.key} value={u.key}>
                {u.label}
              </option>
            ))}
          </Select>
        </label>

        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Ke</span>
          <Select value={to} onChange={(e) => setTo(e.target.value)}>
            {units.map((u) => (
              <option key={u.key} value={u.key}>
                {u.label}
              </option>
            ))}
          </Select>
        </label>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white px-4 py-6 text-center dark:border-slate-800 dark:bg-slate-900">
        <div className="text-3xl font-bold text-slate-900 sm:text-4xl dark:text-slate-50">
          {result === null ? "-" : formatResult(result)}
        </div>
        <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">Hasil konversi</div>
      </div>
    </div>
  );
}
