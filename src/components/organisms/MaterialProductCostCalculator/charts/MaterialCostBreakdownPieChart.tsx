import { Pie } from "react-chartjs-2";
import "./registerChart";
import type { MaterialCostBreakdownItem } from "../types";
import { formatRupiah } from "@/utils/marketplaceTools";

const SLICE_COLORS = ["#2a78d6", "#eb6834", "#1baf7a", "#eda100", "#e87ba4", "#008300"];

export interface MaterialCostBreakdownPieChartProps {
  breakdown: MaterialCostBreakdownItem[];
}

export default function MaterialCostBreakdownPieChart({ breakdown }: MaterialCostBreakdownPieChartProps) {
  const data = {
    labels: breakdown.map((item) => item.label),
    datasets: [
      {
        data: breakdown.map((item) => Math.max(item.value, 0)),
        backgroundColor: SLICE_COLORS,
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="mx-auto h-64 w-full max-w-xs sm:h-72 sm:max-w-sm">
      <Pie
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
              labels: { color: "#334155", boxWidth: 12, padding: 12, font: { size: 11 } },
            },
            tooltip: {
              callbacks: {
                label: (ctx) => {
                  const item = breakdown[ctx.dataIndex];
                  return ` ${item.label}: ${formatRupiah(item.value)} (${item.percent.toFixed(1)}%)`;
                },
              },
            },
          },
        }}
      />
    </div>
  );
}
