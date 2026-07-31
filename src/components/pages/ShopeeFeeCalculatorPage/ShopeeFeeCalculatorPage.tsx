import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import MarketplaceFeeCalculator from "@/components/organisms/MarketplaceFeeCalculator/MarketplaceFeeCalculator";

export default function ShopeeFeeCalculatorPage() {
  return (
    <ToolsPageTemplate title="Shopee Fee Calculator" description="Estimasi biaya admin & pendapatan bersih jualan di Shopee.">
      <MarketplaceFeeCalculator platform="Shopee" defaultFeePercent="5" />
    </ToolsPageTemplate>
  );
}
