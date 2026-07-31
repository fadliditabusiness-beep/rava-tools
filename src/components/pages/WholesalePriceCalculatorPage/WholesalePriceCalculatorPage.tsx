import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import SimpleCalculatorTool from "@/components/organisms/SimpleCalculatorTool/SimpleCalculatorTool";
import { formatRupiah } from "@/utils/marketplaceTools";

export default function WholesalePriceCalculatorPage() {
  return (
    <ToolsPageTemplate title="Wholesale Price Calculator" description="Hitung harga grosir dari harga eceran.">
      <SimpleCalculatorTool
        fields={[
          { key: "retailPrice", label: "Harga Eceran (Rp)", placeholder: "50000" },
          { key: "wholesaleDiscountPercent", label: "Diskon Grosir (%)", placeholder: "15" },
          { key: "qty", label: "Jumlah Unit", placeholder: "12" },
        ]}
        compute={({ retailPrice, wholesaleDiscountPercent, qty }) => {
          const unitPrice = retailPrice * (1 - wholesaleDiscountPercent / 100);
          return [
            { label: "Harga Grosir per Unit", value: formatRupiah(unitPrice) },
            { label: "Total Harga Grosir", value: formatRupiah(unitPrice * qty) },
          ];
        }}
      />
    </ToolsPageTemplate>
  );
}
