import { useState } from "react";
import Input from "@/components/atoms/Input/Input";
import Select from "@/components/atoms/Select/Select";
import StatTile from "@/components/molecules/StatTile/StatTile";

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function toDateTimeLocalValue(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(
    date.getHours(),
  )}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

export default function TimestampConverterTool() {
  const [epochInput, setEpochInput] = useState(() => String(Math.floor(Date.now() / 1000)));
  const [unit, setUnit] = useState<"seconds" | "millis">("seconds");
  const [dateInput, setDateInput] = useState(() => toDateTimeLocalValue(new Date()));

  const epochNum = Number(epochInput);
  const epochDate = Number.isFinite(epochNum)
    ? new Date(unit === "seconds" ? epochNum * 1000 : epochNum)
    : null;
  const isValidEpochDate = epochDate && !Number.isNaN(epochDate.getTime());

  const parsedDate = dateInput ? new Date(dateInput) : null;
  const isValidDate = parsedDate && !Number.isNaN(parsedDate.getTime());

  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
          Epoch ke Tanggal
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_140px]">
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
              Epoch
            </span>
            <Input value={epochInput} onChange={(e) => setEpochInput(e.target.value)} />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
              Satuan
            </span>
            <Select value={unit} onChange={(e) => setUnit(e.target.value as "seconds" | "millis")}>
              <option value="seconds">Detik</option>
              <option value="millis">Milidetik</option>
            </Select>
          </label>
        </div>
        {isValidEpochDate ? (
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <StatTile label="Waktu Lokal" value={epochDate!.toLocaleString("id-ID")} />
            <StatTile label="ISO / UTC" value={epochDate!.toISOString()} />
          </div>
        ) : (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">Epoch tidak valid.</p>
        )}
      </section>

      <section className="border-t border-slate-200 pt-6 dark:border-slate-800">
        <h2 className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
          Tanggal ke Epoch
        </h2>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
            Tanggal &amp; Waktu
          </span>
          <Input type="datetime-local" step={1} value={dateInput} onChange={(e) => setDateInput(e.target.value)} />
        </label>
        {isValidDate ? (
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <StatTile label="Epoch (detik)" value={String(Math.floor(parsedDate!.getTime() / 1000))} />
            <StatTile label="Epoch (milidetik)" value={String(parsedDate!.getTime())} />
          </div>
        ) : (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">Tanggal tidak valid.</p>
        )}
      </section>
    </div>
  );
}
