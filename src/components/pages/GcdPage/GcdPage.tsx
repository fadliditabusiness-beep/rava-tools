import { useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import NumberField from "@/components/molecules/NumberField/NumberField";
import StatTile from "@/components/molecules/StatTile/StatTile";
import { gcd } from "@/utils/mathTools";

export default function GcdPage() {
  const [a, setA] = useState("24");
  const [b, setB] = useState("36");

  const aNum = Number(a);
  const bNum = Number(b);
  const result = Number.isFinite(aNum) && Number.isFinite(bNum) ? gcd(aNum, bNum) : null;

  return (
    <ToolsPageTemplate
      title="FPB"
      description="Hitung Faktor Persekutuan Terbesar dari dua bilangan."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <NumberField label="Bilangan Pertama" value={a} onChange={setA} />
        <NumberField label="Bilangan Kedua" value={b} onChange={setB} />
      </div>

      {result !== null && (
        <div className="mt-6">
          <StatTile label="FPB" value={String(result)} />
        </div>
      )}
    </ToolsPageTemplate>
  );
}
