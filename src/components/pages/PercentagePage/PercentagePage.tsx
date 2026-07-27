import { useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import NumberField from "@/components/molecules/NumberField/NumberField";
import StatTile from "@/components/molecules/StatTile/StatTile";
import { percentageOf } from "@/utils/mathTools";

export default function PercentagePage() {
  const [percent, setPercent] = useState("10");
  const [value, setValue] = useState("100");

  const percentNum = Number(percent);
  const valueNum = Number(value);
  const result =
    Number.isFinite(percentNum) && Number.isFinite(valueNum)
      ? percentageOf(valueNum, percentNum)
      : null;

  return (
    <ToolsPageTemplate title="Kalkulator Persentase" description="Hitung berapa persen dari suatu angka.">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <NumberField label="Persen (%)" value={percent} onChange={setPercent} />
        <NumberField label="Dari Angka" value={value} onChange={setValue} />
      </div>

      {result !== null && (
        <div className="mt-6">
          <StatTile label="Hasil" value={result.toLocaleString("id-ID", { maximumFractionDigits: 4 })} />
        </div>
      )}
    </ToolsPageTemplate>
  );
}
