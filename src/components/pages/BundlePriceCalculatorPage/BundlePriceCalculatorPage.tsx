import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import SimpleCalculatorTool from "@/components/organisms/SimpleCalculatorTool/SimpleCalculatorTool";
import { formatRupiah, formatPercent } from "@/utils/marketplaceTools";

export default function BundlePriceCalculatorPage() {
  return (
    <ToolsPageTemplate title="Bundle Price Calculator" description="Hitung hemat dari harga paket bundling.">
      <SimpleCalculatorTool
        fields={[
          { key: "normalPrice", label: "Total Harga Satuan (Rp)", placeholder: "150000" },
          { key: "bundlePrice", label: "Harga Bundle (Rp)", placeholder: "120000" },
        ]}
        compute={({ normalPrice, bundlePrice }) => {
          const saved = normalPrice - bundlePrice;
          return [
            { label: "Hemat (Rp)", value: formatRupiah(saved) },
            { label: "Hemat (%)", value: normalPrice > 0 ? formatPercent((saved / normalPrice) * 100) : "-" },
          ];
        }}
      />
    </ToolsPageTemplate>
  );
}
