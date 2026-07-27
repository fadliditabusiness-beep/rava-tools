import { useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import NumberField from "@/components/molecules/NumberField/NumberField";
import StatTile from "@/components/molecules/StatTile/StatTile";
import { percentageChange } from "@/utils/mathTools";

export default function PercentageChangePage() {
  const [from, setFrom] = useState("100");
  const [to, setTo] = useState("120");

  const fromNum = Number(from);
  const toNum = Number(to);
  const result =
    Number.isFinite(fromNum) && Number.isFinite(toNum) ? percentageChange(fromNum, toNum) : null;

  return (
    <ToolsPageTemplate
      title="Persentase Kenaikan/Penurunan"
      description="Hitung persentase perubahan dari satu angka ke angka lain."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <NumberField label="Angka Awal" value={from} onChange={setFrom} />
        <NumberField label="Angka Akhir" value={to} onChange={setTo} />
      </div>

      {result !== null && Number.isFinite(result) && (
        <div className="mt-6">
          <StatTile
            label={result >= 0 ? "Kenaikan" : "Penurunan"}
            value={`${result >= 0 ? "+" : ""}${result.toFixed(2)}%`}
          />
        </div>
      )}
    </ToolsPageTemplate>
  );
}
