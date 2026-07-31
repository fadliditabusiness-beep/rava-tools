import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import SimpleCalculatorTool from "@/components/organisms/SimpleCalculatorTool/SimpleCalculatorTool";
import { formatRupiah } from "@/utils/marketplaceTools";

export default function ResellerPriceCalculatorPage() {
  return (
    <ToolsPageTemplate title="Reseller Price Calculator" description="Hitung harga jual reseller dari harga modal & margin.">
      <SimpleCalculatorTool
        fields={[
          { key: "costPrice", label: "Harga Modal dari Supplier (Rp)", placeholder: "40000" },
          { key: "marginPercent", label: "Margin Reseller (%)", placeholder: "25" },
        ]}
        compute={({ costPrice, marginPercent }) => {
          const sellPrice = costPrice * (1 + marginPercent / 100);
          return [
            { label: "Harga Jual Reseller", value: formatRupiah(sellPrice) },
            { label: "Profit per Unit", value: formatRupiah(sellPrice - costPrice) },
          ];
        }}
      />
    </ToolsPageTemplate>
  );
}
