import { useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import NumberField from "@/components/molecules/NumberField/NumberField";
import StatTile from "@/components/molecules/StatTile/StatTile";
import { circleArea } from "@/utils/simpleCalc";

export default function CircleAreaPage() {
  const [radius, setRadius] = useState("7");

  const radiusNum = Number(radius);
  const result = Number.isFinite(radiusNum) ? circleArea(radiusNum) : null;

  return (
    <ToolsPageTemplate title="Luas Lingkaran" description="Hitung luas lingkaran dari jari-jarinya.">
      <NumberField label="Jari-jari" value={radius} onChange={setRadius} />

      {result !== null && (
        <div className="mt-6">
          <StatTile label="Luas" value={result.toLocaleString("id-ID", { maximumFractionDigits: 4 })} />
        </div>
      )}
    </ToolsPageTemplate>
  );
}
