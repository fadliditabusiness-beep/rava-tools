import { useMemo, useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import DateField from "@/components/molecules/DateField/DateField";
import StatTile from "@/components/molecules/StatTile/StatTile";
import Input from "@/components/atoms/Input/Input";
import { getHolidayMap } from "@/constants/holidays";
import { addWorkdays, countWorkdaysBetween, parseDateInputValue, toDateInputValue } from "@/utils/dateTools";

export default function WorkdaysPage() {
  const today = useMemo(() => new Date(), []);
  const holidayKeys = useMemo(() => new Set(getHolidayMap().keys()), []);

  const [rangeStart, setRangeStart] = useState(() => toDateInputValue(today));
  const [rangeEnd, setRangeEnd] = useState(() => toDateInputValue(today));

  const [fromValue, setFromValue] = useState(() => toDateInputValue(today));
  const [workdayAmount, setWorkdayAmount] = useState("10");

  const start = parseDateInputValue(rangeStart);
  const end = parseDateInputValue(rangeEnd);
  const workdayCount = start && end ? countWorkdaysBetween(start, end, holidayKeys) : null;

  const from = parseDateInputValue(fromValue);
  const parsedAmount = Number(workdayAmount);
  const resultDate =
    from && Number.isFinite(parsedAmount) ? addWorkdays(from, parsedAmount, holidayKeys) : null;

  return (
    <ToolsPageTemplate
      title="Hari Kerja"
      description="Hitung hari kerja tanpa akhir pekan, libur nasional & cuti bersama."
    >
      <section>
        <h2 className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
          Jumlah Hari Kerja Antar Tanggal
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DateField label="Tanggal Awal" value={rangeStart} onChange={setRangeStart} />
          <DateField label="Tanggal Akhir" value={rangeEnd} onChange={setRangeEnd} />
        </div>
        {workdayCount !== null && (
          <div className="mt-4">
            <StatTile label="Hari Kerja" value={String(workdayCount)} />
          </div>
        )}
      </section>

      <section className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-800">
        <h2 className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
          Tambah Hari Kerja dari Tanggal
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DateField label="Tanggal Awal" value={fromValue} onChange={setFromValue} />
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
              Jumlah Hari Kerja (boleh negatif)
            </span>
            <Input
              type="number"
              value={workdayAmount}
              onChange={(e) => setWorkdayAmount(e.target.value)}
            />
          </label>
        </div>
        {resultDate && (
          <div className="mt-4 rounded-lg border border-slate-200 bg-white p-5 text-center dark:border-slate-800 dark:bg-slate-900">
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-50">
              {resultDate.toLocaleDateString("id-ID", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
          </div>
        )}
      </section>
    </ToolsPageTemplate>
  );
}
