import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import SimpleCalculatorTool from "@/components/organisms/SimpleCalculatorTool/SimpleCalculatorTool";
import { formatRupiah } from "@/utils/marketplaceTools";

export default function MarkupCalculatorPage() {
  return (
    <ToolsPageTemplate title="Markup Calculator" description="Hitung harga jual dari harga modal & persentase markup.">
      <SimpleCalculatorTool
        fields={[
          { key: "costPrice", label: "Harga Modal (Rp)", placeholder: "30000" },
          { key: "markupPercent", label: "Markup (%)", placeholder: "50" },
        ]}
        compute={({ costPrice, markupPercent }) => {
          const price = costPrice * (1 + markupPercent / 100);
          return [
            { label: "Harga Jual", value: formatRupiah(price) },
            { label: "Profit per Unit", value: formatRupiah(price - costPrice) },
          ];
        }}
      />
    </ToolsPageTemplate>
  );
}
