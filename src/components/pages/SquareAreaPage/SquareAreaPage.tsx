import { useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import NumberField from "@/components/molecules/NumberField/NumberField";
import StatTile from "@/components/molecules/StatTile/StatTile";
import { squareArea } from "@/utils/simpleCalc";

export default function SquareAreaPage() {
  const [side, setSide] = useState("5");

  const sideNum = Number(side);
  const result = Number.isFinite(sideNum) ? squareArea(sideNum) : null;

  return (
    <ToolsPageTemplate title="Luas Persegi" description="Hitung luas persegi dari panjang sisinya.">
      <NumberField label="Panjang Sisi" value={side} onChange={setSide} />

      {result !== null && (
        <div className="mt-6">
          <StatTile label="Luas" value={result.toLocaleString("id-ID", { maximumFractionDigits: 4 })} />
        </div>
      )}
    </ToolsPageTemplate>
  );
}
