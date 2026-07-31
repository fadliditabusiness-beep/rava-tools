import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import MarketplaceProfitCalculator from "@/components/organisms/MarketplaceProfitCalculator/MarketplaceProfitCalculator";

export default function MarketplaceProfitPricingCalculatorPage() {
  return (
    <ToolsPageTemplate
      title="Marketplace Profit & Pricing Calculator"
      description="Hitung HPP, keuntungan, margin, markup, ROI, dan laba bersih seluruh produk marketplace dalam satu halaman."
      wide
    >
      <MarketplaceProfitCalculator />
    </ToolsPageTemplate>
  );
}
