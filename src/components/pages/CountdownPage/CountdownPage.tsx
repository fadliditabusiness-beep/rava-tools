import { useMemo, useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import DateField from "@/components/molecules/DateField/DateField";
import StatTile from "@/components/molecules/StatTile/StatTile";
import { daysUntil, parseDateInputValue, toDateInputValue } from "@/utils/dateTools";

export default function CountdownPage() {
  const today = useMemo(() => new Date(), []);
  const [value, setValue] = useState(() => toDateInputValue(today));

  const target = parseDateInputValue(value);
  const remaining = target ? daysUntil(target, today) : null;

  return (
    <ToolsPageTemplate
      title="Countdown ke Tanggal"
      description="Hitung mundur jumlah hari menuju tanggal tertentu."
    >
      <DateField label="Tanggal Target" value={value} onChange={setValue} />

      {remaining !== null && (
        <div className="mt-6 grid grid-cols-2 gap-3">
          <StatTile
            label={remaining >= 0 ? "Hari Lagi" : "Hari Berlalu"}
            value={String(Math.abs(remaining))}
          />
          <StatTile label="Minggu" value={(Math.abs(remaining) / 7).toFixed(1)} />
        </div>
      )}
    </ToolsPageTemplate>
  );
}
