import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import MarketplaceFeeCalculator from "@/components/organisms/MarketplaceFeeCalculator/MarketplaceFeeCalculator";

export default function BlibliFeeCalculatorPage() {
  return (
    <ToolsPageTemplate title="Blibli Fee Calculator" description="Estimasi biaya admin & pendapatan bersih jualan di Blibli.">
      <MarketplaceFeeCalculator platform="Blibli" defaultFeePercent="6" />
    </ToolsPageTemplate>
  );
}
