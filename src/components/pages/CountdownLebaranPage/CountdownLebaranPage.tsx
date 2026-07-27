import { useMemo } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import StatTile from "@/components/molecules/StatTile/StatTile";
import { findNextNationalHoliday } from "@/utils/holidayLookup";
import { daysUntil, parseDateInputValue } from "@/utils/dateTools";

export default function CountdownLebaranPage() {
  const today = useMemo(() => new Date(), []);
  const holiday = useMemo(() => findNextNationalHoliday("Idul Fitri", today), [today]);
  const target = holiday ? parseDateInputValue(holiday.date) : null;
  const remaining = target ? daysUntil(target, today) : null;

  return (
    <ToolsPageTemplate
      title="Countdown Lebaran"
      description="Hitung mundur menuju Hari Raya Idul Fitri berikutnya."
    >
      {target && remaining !== null ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <StatTile label="Hari Lagi" value={String(remaining)} />
          <StatTile
            label="Tanggal"
            value={target.toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          />
        </div>
      ) : (
        <div className="rounded-lg border border-slate-200 bg-white p-5 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
          Tanggal Idul Fitri belum tersedia untuk tahun mendatang di data kami.
        </div>
      )}
    </ToolsPageTemplate>
  );
}
