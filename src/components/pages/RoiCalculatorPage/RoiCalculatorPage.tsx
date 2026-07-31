import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import SimpleCalculatorTool from "@/components/organisms/SimpleCalculatorTool/SimpleCalculatorTool";
import { formatRupiah, formatPercent } from "@/utils/marketplaceTools";

export default function RoiCalculatorPage() {
  return (
    <ToolsPageTemplate title="ROI Calculator" description="Hitung Return on Investment dari modal & total pendapatan.">
      <SimpleCalculatorTool
        fields={[
          { key: "investment", label: "Modal / Investasi (Rp)", placeholder: "5000000" },
          { key: "revenue", label: "Total Pendapatan (Rp)", placeholder: "7000000" },
        ]}
        compute={({ investment, revenue }) => {
          if (investment <= 0) return null;
          const netProfit = revenue - investment;
          return [
            { label: "Keuntungan Bersih", value: formatRupiah(netProfit) },
            { label: "ROI", value: formatPercent((netProfit / investment) * 100) },
          ];
        }}
      />
    </ToolsPageTemplate>
  );
}
