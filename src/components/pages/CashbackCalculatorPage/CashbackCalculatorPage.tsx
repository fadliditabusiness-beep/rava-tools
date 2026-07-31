import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import SimpleCalculatorTool from "@/components/organisms/SimpleCalculatorTool/SimpleCalculatorTool";
import { formatRupiah } from "@/utils/marketplaceTools";

export default function CashbackCalculatorPage() {
  return (
    <ToolsPageTemplate title="Cashback Calculator" description="Hitung cashback dari total belanja.">
      <SimpleCalculatorTool
        fields={[
          { key: "totalBelanja", label: "Total Belanja (Rp)", placeholder: "200000" },
          { key: "cashbackPercent", label: "Cashback (%)", placeholder: "10" },
          { key: "maxCashback", label: "Maks. Cashback (Rp, 0 = tanpa batas)", placeholder: "0" },
        ]}
        compute={({ totalBelanja, cashbackPercent, maxCashback }) => {
          const raw = (totalBelanja * cashbackPercent) / 100;
          const cashback = maxCashback > 0 ? Math.min(raw, maxCashback) : raw;
          return [
            { label: "Cashback Diterima", value: formatRupiah(cashback) },
            { label: "Total Setelah Cashback", value: formatRupiah(totalBelanja - cashback) },
          ];
        }}
      />
    </ToolsPageTemplate>
  );
}
