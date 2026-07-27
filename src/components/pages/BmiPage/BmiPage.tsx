import { useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import NumberField from "@/components/molecules/NumberField/NumberField";
import StatTile from "@/components/molecules/StatTile/StatTile";
import { calculateBmi } from "@/utils/simpleCalc";

export default function BmiPage() {
  const [height, setHeight] = useState("170");
  const [weight, setWeight] = useState("65");

  const heightNum = Number(height);
  const weightNum = Number(weight);
  const result =
    Number.isFinite(heightNum) && Number.isFinite(weightNum)
      ? calculateBmi(heightNum, weightNum)
      : null;

  return (
    <ToolsPageTemplate title="BMI" description="Hitung Indeks Massa Tubuh dari tinggi & berat badan.">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <NumberField label="Tinggi Badan (cm)" value={height} onChange={setHeight} />
        <NumberField label="Berat Badan (kg)" value={weight} onChange={setWeight} />
      </div>

      {result && (
        <div className="mt-6 grid grid-cols-2 gap-3">
          <StatTile label="BMI" value={result.bmi.toFixed(1)} />
          <StatTile label="Kategori" value={result.category} />
        </div>
      )}
    </ToolsPageTemplate>
  );
}
