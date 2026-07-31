import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import MarketplaceFeeCalculator from "@/components/organisms/MarketplaceFeeCalculator/MarketplaceFeeCalculator";

export default function BukalapakFeeCalculatorPage() {
  return (
    <ToolsPageTemplate title="Bukalapak Fee Calculator" description="Estimasi biaya admin & pendapatan bersih jualan di Bukalapak.">
      <MarketplaceFeeCalculator platform="Bukalapak" defaultFeePercent="2" />
    </ToolsPageTemplate>
  );
}
