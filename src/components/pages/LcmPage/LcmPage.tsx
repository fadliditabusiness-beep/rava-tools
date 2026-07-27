import { useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import NumberField from "@/components/molecules/NumberField/NumberField";
import StatTile from "@/components/molecules/StatTile/StatTile";
import { lcm } from "@/utils/mathTools";

export default function LcmPage() {
  const [a, setA] = useState("4");
  const [b, setB] = useState("6");

  const aNum = Number(a);
  const bNum = Number(b);
  const result = Number.isFinite(aNum) && Number.isFinite(bNum) ? lcm(aNum, bNum) : null;

  return (
    <ToolsPageTemplate
      title="KPK"
      description="Hitung Kelipatan Persekutuan Terkecil dari dua bilangan."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <NumberField label="Bilangan Pertama" value={a} onChange={setA} />
        <NumberField label="Bilangan Kedua" value={b} onChange={setB} />
      </div>

      {result !== null && (
        <div className="mt-6">
          <StatTile label="KPK" value={String(result)} />
        </div>
      )}
    </ToolsPageTemplate>
  );
}
