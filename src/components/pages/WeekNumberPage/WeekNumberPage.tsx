import { useMemo, useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import DateField from "@/components/molecules/DateField/DateField";
import StatTile from "@/components/molecules/StatTile/StatTile";
import { isoWeekNumber, parseDateInputValue, toDateInputValue } from "@/utils/dateTools";

export default function WeekNumberPage() {
  const today = useMemo(() => new Date(), []);
  const [value, setValue] = useState(() => toDateInputValue(today));

  const date = parseDateInputValue(value);
  const week = date ? isoWeekNumber(date) : null;

  return (
    <ToolsPageTemplate
      title="Minggu ke Berapa"
      description="Cari tahu tanggal tertentu masuk minggu ke berapa (ISO week)."
    >
      <DateField label="Tanggal" value={value} onChange={setValue} />

      {week !== null && (
        <div className="mt-6">
          <StatTile label="Minggu ke-" value={String(week)} />
        </div>
      )}
    </ToolsPageTemplate>
  );
}
