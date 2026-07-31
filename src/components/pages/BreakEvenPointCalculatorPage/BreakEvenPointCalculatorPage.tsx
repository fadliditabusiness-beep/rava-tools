import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import SimpleCalculatorTool from "@/components/organisms/SimpleCalculatorTool/SimpleCalculatorTool";
import { formatRupiah } from "@/utils/marketplaceTools";

export default function BreakEvenPointCalculatorPage() {
  return (
    <ToolsPageTemplate title="Break Even Point Calculator" description="Hitung titik impas (BEP) usaha kamu.">
      <SimpleCalculatorTool
        fields={[
          { key: "fixedCost", label: "Biaya Tetap / Bulan (Rp)", placeholder: "3000000" },
          { key: "pricePerUnit", label: "Harga Jual per Unit (Rp)", placeholder: "50000" },
          { key: "variableCostPerUnit", label: "Biaya Variabel per Unit (Rp)", placeholder: "20000" },
        ]}
        compute={({ fixedCost, pricePerUnit, variableCostPerUnit }) => {
          const margin = pricePerUnit - variableCostPerUnit;
          if (margin <= 0) return null;
          const bepUnit = fixedCost / margin;
          return [
            { label: "BEP (Unit)", value: `${Math.ceil(bepUnit)} unit` },
            { label: "BEP (Rp)", value: formatRupiah(bepUnit * pricePerUnit) },
          ];
        }}
      />
    </ToolsPageTemplate>
  );
}
