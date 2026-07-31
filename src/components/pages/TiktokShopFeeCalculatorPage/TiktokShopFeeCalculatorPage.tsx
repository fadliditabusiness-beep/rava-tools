import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import MarketplaceFeeCalculator from "@/components/organisms/MarketplaceFeeCalculator/MarketplaceFeeCalculator";

export default function TiktokShopFeeCalculatorPage() {
  return (
    <ToolsPageTemplate title="TikTok Shop Fee Calculator" description="Estimasi biaya admin & pendapatan bersih jualan di TikTok Shop.">
      <MarketplaceFeeCalculator platform="TikTok Shop" defaultFeePercent="5" />
    </ToolsPageTemplate>
  );
}
