import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import MarketplaceFeeCalculator from "@/components/organisms/MarketplaceFeeCalculator/MarketplaceFeeCalculator";

export default function LazadaFeeCalculatorPage() {
  return (
    <ToolsPageTemplate title="Lazada Fee Calculator" description="Estimasi biaya admin & pendapatan bersih jualan di Lazada.">
      <MarketplaceFeeCalculator platform="Lazada" defaultFeePercent="4" />
    </ToolsPageTemplate>
  );
}
