import { useMemo, useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import DateField from "@/components/molecules/DateField/DateField";
import StatTile from "@/components/molecules/StatTile/StatTile";
import { diffCalendar, parseDateInputValue, toDateInputValue } from "@/utils/dateTools";

export default function DateDifferencePage() {
  const today = useMemo(() => new Date(), []);
  const [startValue, setStartValue] = useState(() => toDateInputValue(today));
  const [endValue, setEndValue] = useState(() => toDateInputValue(today));

  const start = parseDateInputValue(startValue);
  const end = parseDateInputValue(endValue);
  const diff = start && end ? diffCalendar(start, end) : null;

  return (
    <ToolsPageTemplate
      title="Selisih Tanggal"
      description="Hitung jarak antara dua tanggal."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <DateField label="Tanggal Awal" value={startValue} onChange={setStartValue} />
        <DateField label="Tanggal Akhir" value={endValue} onChange={setEndValue} />
      </div>

      {diff && (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatTile label="Tahun" value={String(diff.years)} />
          <StatTile label="Bulan" value={String(diff.months)} />
          <StatTile label="Hari" value={String(diff.days)} />
          <StatTile label="Total Hari" value={String(Math.abs(diff.totalDays))} />
        </div>
      )}
    </ToolsPageTemplate>
  );
}
