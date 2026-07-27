import { useMemo, useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import DateField from "@/components/molecules/DateField/DateField";
import StatTile from "@/components/molecules/StatTile/StatTile";
import { dayOfYear, daysRemainingInYear, parseDateInputValue, toDateInputValue } from "@/utils/dateTools";

export default function DayOfYearPage() {
  const today = useMemo(() => new Date(), []);
  const [value, setValue] = useState(() => toDateInputValue(today));

  const date = parseDateInputValue(value);
  const nth = date ? dayOfYear(date) : null;
  const remaining = date ? daysRemainingInYear(date) : null;

  return (
    <ToolsPageTemplate
      title="Hari ke Berapa"
      description="Cari tahu tanggal tertentu adalah hari ke berapa dalam setahun."
    >
      <DateField label="Tanggal" value={value} onChange={setValue} />

      {nth !== null && remaining !== null && (
        <div className="mt-6 grid grid-cols-2 gap-3">
          <StatTile label="Hari ke-" value={String(nth)} />
          <StatTile label="Sisa Hari Tahun Ini" value={String(remaining)} />
        </div>
      )}
    </ToolsPageTemplate>
  );
}
