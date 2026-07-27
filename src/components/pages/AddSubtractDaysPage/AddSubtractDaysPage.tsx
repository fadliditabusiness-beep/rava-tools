import { useMemo, useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import DateField from "@/components/molecules/DateField/DateField";
import Input from "@/components/atoms/Input/Input";
import { addDaysToDate, parseDateInputValue, toDateInputValue } from "@/utils/dateTools";

type Mode = "add" | "subtract";

export default function AddSubtractDaysPage() {
  const today = useMemo(() => new Date(), []);
  const [startValue, setStartValue] = useState(() => toDateInputValue(today));
  const [amount, setAmount] = useState("30");
  const [mode, setMode] = useState<Mode>("add");

  const start = parseDateInputValue(startValue);
  const parsedAmount = Number(amount);
  const result =
    start && Number.isFinite(parsedAmount)
      ? addDaysToDate(start, mode === "add" ? parsedAmount : -parsedAmount)
      : null;

  return (
    <ToolsPageTemplate
      title="Tambah / Kurang Hari"
      description="Cari tanggal setelah atau sebelum sejumlah hari dari tanggal tertentu."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <DateField label="Tanggal Awal" value={startValue} onChange={setStartValue} />
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
            Jumlah Hari
          </span>
          <Input
            type="number"
            min={0}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <div className="flex items-end gap-2">
          <button
            type="button"
            onClick={() => setMode("add")}
            className={[
              "flex-1 rounded-md px-3 py-2 text-sm font-medium",
              mode === "add"
                ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                : "border border-slate-300 text-slate-600 dark:border-slate-700 dark:text-slate-300",
            ].join(" ")}
          >
            Tambah
          </button>
          <button
            type="button"
            onClick={() => setMode("subtract")}
            className={[
              "flex-1 rounded-md px-3 py-2 text-sm font-medium",
              mode === "subtract"
                ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                : "border border-slate-300 text-slate-600 dark:border-slate-700 dark:text-slate-300",
            ].join(" ")}
          >
            Kurang
          </button>
        </div>
      </div>

      {result && (
        <div className="mt-6 rounded-lg border border-slate-200 bg-white p-5 text-center dark:border-slate-800 dark:bg-slate-900">
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            {result.toLocaleDateString("id-ID", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
        </div>
      )}
    </ToolsPageTemplate>
  );
}
