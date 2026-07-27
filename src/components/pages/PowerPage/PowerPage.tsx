import { useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import NumberField from "@/components/molecules/NumberField/NumberField";
import StatTile from "@/components/molecules/StatTile/StatTile";
import { power } from "@/utils/mathTools";

export default function PowerPage() {
  const [base, setBase] = useState("2");
  const [exponent, setExponent] = useState("10");

  const baseNum = Number(base);
  const exponentNum = Number(exponent);
  const result =
    Number.isFinite(baseNum) && Number.isFinite(exponentNum) ? power(baseNum, exponentNum) : null;

  return (
    <ToolsPageTemplate title="Pangkat" description="Hitung hasil pangkat suatu bilangan.">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <NumberField label="Bilangan Pokok" value={base} onChange={setBase} />
        <NumberField label="Pangkat" value={exponent} onChange={setExponent} />
      </div>

      {result !== null && Number.isFinite(result) && (
        <div className="mt-6">
          <StatTile label="Hasil" value={result.toLocaleString("id-ID", { maximumFractionDigits: 6 })} />
        </div>
      )}
    </ToolsPageTemplate>
  );
}
