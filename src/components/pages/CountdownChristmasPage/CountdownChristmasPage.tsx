import { useMemo } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import StatTile from "@/components/molecules/StatTile/StatTile";
import { daysUntil, nextAnnualDate } from "@/utils/dateTools";

export default function CountdownChristmasPage() {
  const today = useMemo(() => new Date(), []);
  const target = useMemo(() => nextAnnualDate(12, 25, today), [today]);
  const remaining = daysUntil(target, today);

  return (
    <ToolsPageTemplate
      title="Countdown Natal"
      description="Hitung mundur menuju Hari Raya Natal berikutnya."
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <StatTile label="Hari Lagi" value={String(remaining)} />
        <StatTile
          label="Tanggal"
          value={target.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
        />
      </div>
    </ToolsPageTemplate>
  );
}
