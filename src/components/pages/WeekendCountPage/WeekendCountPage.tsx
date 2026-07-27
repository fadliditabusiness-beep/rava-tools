import { useMemo, useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import DateField from "@/components/molecules/DateField/DateField";
import StatTile from "@/components/molecules/StatTile/StatTile";
import { countWeekendDays, parseDateInputValue, toDateInputValue } from "@/utils/dateTools";

export default function WeekendCountPage() {
  const today = useMemo(() => new Date(), []);
  const [startValue, setStartValue] = useState(() => toDateInputValue(today));
  const [endValue, setEndValue] = useState(() => toDateInputValue(today));

  const start = parseDateInputValue(startValue);
  const end = parseDateInputValue(endValue);
  const weekendDays = start && end ? countWeekendDays(start, end) : null;

  return (
    <ToolsPageTemplate
      title="Hitung Weekend"
      description="Hitung jumlah hari Sabtu & Minggu di antara dua tanggal."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <DateField label="Tanggal Awal" value={startValue} onChange={setStartValue} />
        <DateField label="Tanggal Akhir" value={endValue} onChange={setEndValue} />
      </div>

      {weekendDays !== null && (
        <div className="mt-6">
          <StatTile label="Hari Weekend" value={String(weekendDays)} />
        </div>
      )}
    </ToolsPageTemplate>
  );
}
