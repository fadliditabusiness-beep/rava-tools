import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import SimpleCalculatorTool from "@/components/organisms/SimpleCalculatorTool/SimpleCalculatorTool";
import { formatRupiah, formatPercent } from "@/utils/marketplaceTools";

export default function MarginCalculatorPage() {
  return (
    <ToolsPageTemplate title="Margin Calculator" description="Hitung margin keuntungan dari harga jual & modal.">
      <SimpleCalculatorTool
        fields={[
          { key: "sellPrice", label: "Harga Jual (Rp)", placeholder: "50000" },
          { key: "costPrice", label: "Harga Modal (Rp)", placeholder: "30000" },
        ]}
        compute={({ sellPrice, costPrice }) => {
          if (sellPrice <= 0) return null;
          const margin = ((sellPrice - costPrice) / sellPrice) * 100;
          return [
            { label: "Margin", value: formatPercent(margin) },
            { label: "Profit per Unit", value: formatRupiah(sellPrice - costPrice) },
          ];
        }}
      />
    </ToolsPageTemplate>
  );
}
