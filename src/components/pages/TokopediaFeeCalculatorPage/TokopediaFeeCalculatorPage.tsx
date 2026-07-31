import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import MarketplaceFeeCalculator from "@/components/organisms/MarketplaceFeeCalculator/MarketplaceFeeCalculator";

export default function TokopediaFeeCalculatorPage() {
  return (
    <ToolsPageTemplate title="Tokopedia Fee Calculator" description="Estimasi biaya admin & pendapatan bersih jualan di Tokopedia.">
      <MarketplaceFeeCalculator platform="Tokopedia" defaultFeePercent="4" />
    </ToolsPageTemplate>
  );
}
