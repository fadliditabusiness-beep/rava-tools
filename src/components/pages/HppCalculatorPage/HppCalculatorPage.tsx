import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import SimpleCalculatorTool from "@/components/organisms/SimpleCalculatorTool/SimpleCalculatorTool";
import { formatRupiah } from "@/utils/marketplaceTools";

export default function HppCalculatorPage() {
  return (
    <ToolsPageTemplate title="HPP Calculator" description="Hitung Harga Pokok Produksi (HPP) per unit.">
      <SimpleCalculatorTool
        fields={[
          { key: "material", label: "Biaya Bahan (Rp)", placeholder: "500000" },
          { key: "labor", label: "Biaya Tenaga Kerja (Rp)", placeholder: "200000" },
          { key: "overhead", label: "Biaya Overhead (Rp)", placeholder: "100000" },
          { key: "units", label: "Jumlah Unit Diproduksi", placeholder: "50" },
        ]}
        compute={({ material, labor, overhead, units }) => {
          if (units <= 0) return null;
          const total = material + labor + overhead;
          return [
            { label: "HPP per Unit", value: formatRupiah(total / units) },
            { label: "Total HPP", value: formatRupiah(total) },
          ];
        }}
      />
    </ToolsPageTemplate>
  );
}
