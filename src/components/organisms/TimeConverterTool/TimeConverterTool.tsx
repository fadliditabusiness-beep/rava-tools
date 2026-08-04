import { useMemo, useState } from "react";
import Input from "@/components/atoms/Input/Input";
import Select from "@/components/atoms/Select/Select";
import { TIME_UNITS, convertTime } from "@/utils/timeConversionTools";

function formatResult(value: number): string {
  if (!Number.isFinite(value)) return "-";
  return value.toFixed(4).replace(/\.?0+$/, "");
}

export default function TimeConverterTool() {
  const [value, setValue] = useState("1");
  const [from, setFrom] = useState(TIME_UNITS[0].key);
  const [to, setTo] = useState(TIME_UNITS[1]?.key ?? TIME_UNITS[0].key);

  const result = useMemo(() => {
    const n = Number(value);
    if (value === "" || !Number.isFinite(n)) return null;
    return convertTime(n, from, to);
  }, [value, from, to]);

  return (
    <div className="flex flex-col gap-4">
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Nilai</span>
        <Input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Masukkan angka"
        />
      </label>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Dari</span>
          <Select value={from} onChange={(e) => setFrom(e.target.value)}>
            {TIME_UNITS.map((u) => (
              <option key={u.key} value={u.key}>
                {u.label}
              </option>
            ))}
          </Select>
        </label>

        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Ke</span>
          <Select value={to} onChange={(e) => setTo(e.target.value)}>
            {TIME_UNITS.map((u) => (
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
