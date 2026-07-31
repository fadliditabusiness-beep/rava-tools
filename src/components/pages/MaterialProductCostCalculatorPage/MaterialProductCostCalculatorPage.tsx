import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import MaterialProductCostCalculator from "@/components/organisms/MaterialProductCostCalculator/MaterialProductCostCalculator";

export default function MaterialProductCostCalculatorPage() {
  return (
    <ToolsPageTemplate
      title="Material & Product Cost Calculator"
      description="Kelola bahan baku dan hitung HPP produk secara otomatis menggunakan konsep Bill of Materials (BOM)."
      wide
    >
      <MaterialProductCostCalculator />
    </ToolsPageTemplate>
  );
}
