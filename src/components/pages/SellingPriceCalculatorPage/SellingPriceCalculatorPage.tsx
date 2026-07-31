import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import SimpleCalculatorTool from "@/components/organisms/SimpleCalculatorTool/SimpleCalculatorTool";
import { formatRupiah } from "@/utils/marketplaceTools";

export default function SellingPriceCalculatorPage() {
  return (
    <ToolsPageTemplate title="Selling Price Calculator" description="Hitung harga jual dari HPP & target margin.">
      <SimpleCalculatorTool
        fields={[
          { key: "hpp", label: "HPP per Unit (Rp)", placeholder: "15000" },
          { key: "marginPercent", label: "Target Margin (%)", placeholder: "30" },
        ]}
        compute={({ hpp, marginPercent }) => {
          if (marginPercent >= 100) return null;
          const price = hpp / (1 - marginPercent / 100);
          return [
            { label: "Harga Jual", value: formatRupiah(price) },
            { label: "Profit per Unit", value: formatRupiah(price - hpp) },
          ];
        }}
      />
    </ToolsPageTemplate>
  );
}
