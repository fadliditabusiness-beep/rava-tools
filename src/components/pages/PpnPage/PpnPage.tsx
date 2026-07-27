import { useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import NumberField from "@/components/molecules/NumberField/NumberField";
import StatTile from "@/components/molecules/StatTile/StatTile";
import { applyPpn } from "@/utils/mathTools";

function formatRupiah(n: number): string {
  return n.toLocaleString("id-ID", { maximumFractionDigits: 2 });
}

export default function PpnPage() {
  const [price, setPrice] = useState("100000");
  const [rate, setRate] = useState("11");

  const priceNum = Number(price);
  const rateNum = Number(rate);
  const result =
    Number.isFinite(priceNum) && Number.isFinite(rateNum) ? applyPpn(priceNum, rateNum) : null;

  return (
    <ToolsPageTemplate title="Kalkulator PPN" description="Hitung harga termasuk PPN (default 11%).">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <NumberField label="Harga Sebelum PPN" value={price} onChange={setPrice} />
        <NumberField label="Tarif PPN (%)" value={rate} onChange={setRate} />
      </div>

      {result && (
        <div className="mt-6 grid grid-cols-2 gap-3">
          <StatTile label="Nilai PPN" value={formatRupiah(result.ppnAmount)} />
          <StatTile label="Total" value={formatRupiah(result.totalWithPpn)} />
        </div>
      )}
    </ToolsPageTemplate>
  );
}
