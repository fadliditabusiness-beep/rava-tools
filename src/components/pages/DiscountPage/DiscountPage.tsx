import { useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import NumberField from "@/components/molecules/NumberField/NumberField";
import StatTile from "@/components/molecules/StatTile/StatTile";
import { applyDiscount } from "@/utils/mathTools";

function formatRupiah(n: number): string {
  return n.toLocaleString("id-ID", { maximumFractionDigits: 2 });
}

export default function DiscountPage() {
  const [price, setPrice] = useState("100000");
  const [percent, setPercent] = useState("20");

  const priceNum = Number(price);
  const percentNum = Number(percent);
  const result =
    Number.isFinite(priceNum) && Number.isFinite(percentNum)
      ? applyDiscount(priceNum, percentNum)
      : null;

  return (
    <ToolsPageTemplate title="Kalkulator Diskon" description="Hitung harga setelah diskon.">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <NumberField label="Harga Awal" value={price} onChange={setPrice} />
        <NumberField label="Diskon (%)" value={percent} onChange={setPercent} />
      </div>

      {result && (
        <div className="mt-6 grid grid-cols-2 gap-3">
          <StatTile label="Potongan" value={formatRupiah(result.discountAmount)} />
          <StatTile label="Harga Akhir" value={formatRupiah(result.finalPrice)} />
        </div>
      )}
    </ToolsPageTemplate>
  );
}
