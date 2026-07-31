import type { BusinessSummaryData, ProductWithResult } from "../types";
import KpiCards from "./summary/KpiCards";
import MaterialSummaryCard from "./summary/MaterialSummaryCard";
import ProductSummaryCard from "./summary/ProductSummaryCard";
import BusinessInsight from "./summary/BusinessInsight";
import MaterialCostBreakdownPieChart from "../charts/MaterialCostBreakdownPieChart";
import ProductProfitBarChart from "../charts/ProductProfitBarChart";

export interface BusinessSummaryProps {
  summary: BusinessSummaryData;
  products: ProductWithResult[];
}

export default function BusinessSummary({ summary, products }: BusinessSummaryProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold text-slate-900">Business Summary</h2>

      <KpiCards kpi={summary.kpi} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <MaterialSummaryCard materialSummary={summary.materialSummary} />
        <ProductSummaryCard productSummary={summary.productSummary} />
      </div>

      <BusinessInsight insights={summary.insights} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <h3 className="text-sm font-semibold text-slate-800">Material Cost Breakdown</h3>
          <div className="mt-3">
            <MaterialCostBreakdownPieChart breakdown={summary.materialCostBreakdown} />
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <h3 className="text-sm font-semibold text-slate-800">Profit per Product</h3>
          <div className="mt-3">
            <ProductProfitBarChart items={products} />
          </div>
        </div>
      </div>
    </div>
  );
}
