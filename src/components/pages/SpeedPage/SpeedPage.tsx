import { useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import NumberField from "@/components/molecules/NumberField/NumberField";
import StatTile from "@/components/molecules/StatTile/StatTile";
import { speed } from "@/utils/simpleCalc";

export default function SpeedPage() {
  const [distance, setDistance] = useState("100");
  const [time, setTime] = useState("2");

  const distanceNum = Number(distance);
  const timeNum = Number(time);
  const result =
    Number.isFinite(distanceNum) && Number.isFinite(timeNum) ? speed(distanceNum, timeNum) : null;

  return (
    <ToolsPageTemplate
      title="Kecepatan"
      description="Hitung kecepatan = jarak ÷ waktu (km ÷ jam = km/jam)."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <NumberField label="Jarak (km)" value={distance} onChange={setDistance} />
        <NumberField label="Waktu (jam)" value={time} onChange={setTime} />
      </div>

      {result !== null && (
        <div className="mt-6">
          <StatTile label="Kecepatan (km/jam)" value={result.toLocaleString("id-ID", { maximumFractionDigits: 2 })} />
        </div>
      )}
    </ToolsPageTemplate>
  );
}
