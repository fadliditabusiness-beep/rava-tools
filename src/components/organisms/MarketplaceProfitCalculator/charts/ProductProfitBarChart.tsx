import { Bar } from "react-chartjs-2";
import "./registerChart";
import type { ProductWithResult } from "../types";
import { formatRupiah } from "@/utils/marketplaceTools";

const COLOR_GOOD = "#0ca30c";
const COLOR_CRITICAL = "#d03b3b";

export interface ProductProfitBarChartProps {
  items: ProductWithResult[];
}

export default function ProductProfitBarChart({ items }: ProductProfitBarChartProps) {
  const data = {
    labels: items.map((item, index) => item.product.name.trim() || `Produk ${index + 1}`),
    datasets: [
      {
        label: "Net Income",
        data: items.map((item) => item.result.netIncome),
        backgroundColor: items.map((item) => (item.result.isProfit ? COLOR_GOOD : COLOR_CRITICAL)),
        borderRadius: 4,
      },
    ],
  };

  return (
    <div className="h-64 w-full sm:h-72">
      <Bar
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => ` Net Income: ${formatRupiah(Number(ctx.raw))}`,
              },
            },
          },
          scales: {
            x: { ticks: { color: "#64748b", font: { size: 10 } }, grid: { display: false } },
            y: { ticks: { color: "#64748b", font: { size: 10 } }, grid: { color: "#e2e8f0" } },
          },
        }}
      />
    </div>
  );
}
