import { useMemo, useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import DateField from "@/components/molecules/DateField/DateField";
import { getHolidayMap } from "@/constants/holidays";
import { formatDateKey } from "@/utils/calendar";
import { parseDateInputValue, toDateInputValue } from "@/utils/dateTools";

export default function DayNamePage() {
  const today = useMemo(() => new Date(), []);
  const holidayMap = useMemo(() => getHolidayMap(), []);
  const [value, setValue] = useState(() => toDateInputValue(today));

  const date = parseDateInputValue(value);
  const holidays = date ? (holidayMap.get(formatDateKey(date)) ?? []) : [];

  return (
    <ToolsPageTemplate
      title="Hari Apa"
      description="Cari tahu tanggal tertentu jatuh pada hari apa."
    >
      <DateField label="Tanggal" value={value} onChange={setValue} />

      {date && (
        <div className="mt-6 rounded-lg border border-slate-200 bg-white p-5 text-center dark:border-slate-800 dark:bg-slate-900">
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            {date.toLocaleDateString("id-ID", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
          {holidays.length > 0 && (
            <div className="mt-2 text-sm text-red-600 dark:text-red-400">
              {holidays.map((h) => h.name).join(" · ")}
            </div>
          )}
        </div>
      )}
    </ToolsPageTemplate>
  );
}
