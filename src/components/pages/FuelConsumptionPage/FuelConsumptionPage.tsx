import { useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import NumberField from "@/components/molecules/NumberField/NumberField";
import StatTile from "@/components/molecules/StatTile/StatTile";
import { fuelConsumption } from "@/utils/simpleCalc";

export default function FuelConsumptionPage() {
  const [distance, setDistance] = useState("100");
  const [fuel, setFuel] = useState("8");

  const distanceNum = Number(distance);
  const fuelNum = Number(fuel);
  const result =
    Number.isFinite(distanceNum) && Number.isFinite(fuelNum)
      ? fuelConsumption(distanceNum, fuelNum)
      : null;

  return (
    <ToolsPageTemplate
      title="Konsumsi BBM"
      description="Hitung efisiensi bahan bakar (km per liter)."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <NumberField label="Jarak Tempuh (km)" value={distance} onChange={setDistance} />
        <NumberField label="BBM Terpakai (liter)" value={fuel} onChange={setFuel} />
      </div>

      {result !== null && (
        <div className="mt-6">
          <StatTile label="Konsumsi (km/liter)" value={result.toLocaleString("id-ID", { maximumFractionDigits: 2 })} />
        </div>
      )}
    </ToolsPageTemplate>
  );
}
