import { useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import NumberField from "@/components/molecules/NumberField/NumberField";
import StatTile from "@/components/molecules/StatTile/StatTile";
import { sqrt } from "@/utils/mathTools";

export default function SqrtPage() {
  const [value, setValue] = useState("144");

  const valueNum = Number(value);
  const result = Number.isFinite(valueNum) ? sqrt(valueNum) : null;

  return (
    <ToolsPageTemplate title="Akar Kuadrat" description="Hitung akar kuadrat suatu bilangan.">
      <NumberField label="Angka" value={value} onChange={setValue} />

      {result !== null ? (
        <div className="mt-6">
          <StatTile label="Akar Kuadrat" value={result.toLocaleString("id-ID", { maximumFractionDigits: 6 })} />
        </div>
      ) : (
        Number.isFinite(valueNum) && (
          <p className="mt-4 text-center text-sm text-red-600 dark:text-red-400">
            Angka tidak boleh negatif.
          </p>
        )
      )}
    </ToolsPageTemplate>
  );
}
