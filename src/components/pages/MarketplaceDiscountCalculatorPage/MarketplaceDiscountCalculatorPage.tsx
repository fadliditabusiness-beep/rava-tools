import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import SimpleCalculatorTool from "@/components/organisms/SimpleCalculatorTool/SimpleCalculatorTool";
import { formatRupiah } from "@/utils/marketplaceTools";

export default function MarketplaceDiscountCalculatorPage() {
  return (
    <ToolsPageTemplate title="Discount Calculator" description="Hitung harga setelah diskon untuk listing marketplace.">
      <SimpleCalculatorTool
        fields={[
          { key: "originalPrice", label: "Harga Asli (Rp)", placeholder: "150000" },
          { key: "discountPercent", label: "Diskon (%)", placeholder: "20" },
        ]}
        compute={({ originalPrice, discountPercent }) => {
          const finalPrice = originalPrice * (1 - discountPercent / 100);
          return [
            { label: "Harga Setelah Diskon", value: formatRupiah(finalPrice) },
            { label: "Hemat", value: formatRupiah(originalPrice - finalPrice) },
          ];
        }}
      />
    </ToolsPageTemplate>
  );
}
