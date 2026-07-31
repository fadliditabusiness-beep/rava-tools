import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import SimpleCalculatorTool from "@/components/organisms/SimpleCalculatorTool/SimpleCalculatorTool";
import { formatRupiah, formatPercent } from "@/utils/marketplaceTools";

export default function ProfitCalculatorPage() {
  return (
    <ToolsPageTemplate title="Profit Calculator" description="Hitung profit dari harga jual, modal, & jumlah terjual.">
      <SimpleCalculatorTool
        fields={[
          { key: "sellPrice", label: "Harga Jual (Rp)", placeholder: "50000" },
          { key: "costPrice", label: "Harga Modal (Rp)", placeholder: "30000" },
          { key: "qty", label: "Jumlah Terjual", placeholder: "10" },
        ]}
        compute={({ sellPrice, costPrice, qty }) => {
          const profitPerUnit = sellPrice - costPrice;
          return [
            { label: "Profit per Unit", value: formatRupiah(profitPerUnit) },
            { label: "Total Profit", value: formatRupiah(profitPerUnit * qty) },
            { label: "Margin", value: sellPrice > 0 ? formatPercent((profitPerUnit / sellPrice) * 100) : "-" },
          ];
        }}
      />
    </ToolsPageTemplate>
  );
}
