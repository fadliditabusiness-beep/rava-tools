import { useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import NumberField from "@/components/molecules/NumberField/NumberField";
import StatTile from "@/components/molecules/StatTile/StatTile";
import { boxVolume } from "@/utils/simpleCalc";

export default function BoxVolumePage() {
  const [length, setLength] = useState("10");
  const [width, setWidth] = useState("5");
  const [height, setHeight] = useState("4");

  const lengthNum = Number(length);
  const widthNum = Number(width);
  const heightNum = Number(height);
  const result =
    Number.isFinite(lengthNum) && Number.isFinite(widthNum) && Number.isFinite(heightNum)
      ? boxVolume(lengthNum, widthNum, heightNum)
      : null;

  return (
    <ToolsPageTemplate title="Volume Balok" description="Hitung volume balok dari panjang, lebar, tinggi.">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <NumberField label="Panjang" value={length} onChange={setLength} />
        <NumberField label="Lebar" value={width} onChange={setWidth} />
        <NumberField label="Tinggi" value={height} onChange={setHeight} />
      </div>

      {result !== null && (
        <div className="mt-6">
          <StatTile label="Volume" value={result.toLocaleString("id-ID", { maximumFractionDigits: 4 })} />
        </div>
      )}
    </ToolsPageTemplate>
  );
}
