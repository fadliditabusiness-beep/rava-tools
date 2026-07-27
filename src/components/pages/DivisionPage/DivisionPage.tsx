import { useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import NumberField from "@/components/molecules/NumberField/NumberField";
import StatTile from "@/components/molecules/StatTile/StatTile";
import { divide } from "@/utils/mathTools";

export default function DivisionPage() {
  const [a, setA] = useState("17");
  const [b, setB] = useState("5");

  const aNum = Number(a);
  const bNum = Number(b);
  const result = Number.isFinite(aNum) && Number.isFinite(bNum) ? divide(aNum, bNum) : null;

  return (
    <ToolsPageTemplate
      title="Kalkulator Pembagian"
      description="Hitung hasil bagi, sisa bagi, dan bentuk desimal."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <NumberField label="Bilangan yang Dibagi" value={a} onChange={setA} />
        <NumberField label="Pembagi" value={b} onChange={setB} />
      </div>

      {result ? (
        <div className="mt-6 grid grid-cols-3 gap-3">
          <StatTile label="Hasil Bagi" value={String(result.quotient)} />
          <StatTile label="Sisa" value={String(result.remainder)} />
          <StatTile label="Desimal" value={result.decimal.toLocaleString("id-ID", { maximumFractionDigits: 4 })} />
        </div>
      ) : (
        Number.isFinite(aNum) &&
        Number.isFinite(bNum) && (
          <p className="mt-4 text-center text-sm text-red-600 dark:text-red-400">
            Pembagi tidak boleh nol.
          </p>
        )
      )}
    </ToolsPageTemplate>
  );
}
