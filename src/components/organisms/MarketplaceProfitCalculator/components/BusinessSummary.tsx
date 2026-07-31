import type { BusinessSummaryData, ProductWithResult } from "../types";
import KpiCards from "./summary/KpiCards";
import FinancialSummary from "./summary/FinancialSummary";
import ProfitAnalysisCard from "./summary/ProfitAnalysisCard";
import ProductAnalysisCard from "./summary/ProductAnalysisCard";
import BusinessHealth from "./summary/BusinessHealth";
import BusinessInsight from "./summary/BusinessInsight";
import CostBreakdown from "./summary/CostBreakdown";
import CostBreakdownPieChart from "../charts/CostBreakdownPieChart";
import ProductProfitBarChart from "../charts/ProductProfitBarChart";

export interface BusinessSummaryProps {
  summary: BusinessSummaryData;
  items: ProductWithResult[];
}

export default function BusinessSummary({ summary, items }: BusinessSummaryProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold text-slate-900">Business Summary</h2>

      <KpiCards summary={summary} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <FinancialSummary financial={summary.financial} />
        </div>
        <BusinessHealth health={summary.health} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ProfitAnalysisCard profitAnalysis={summary.profitAnalysis} />
        <ProductAnalysisCard productAnalysis={summary.productAnalysis} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <BusinessInsight insights={summary.insights} />
        <CostBreakdown breakdown={summary.breakdown} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <h3 className="text-sm font-semibold text-slate-800">Breakdown Biaya (Pie Chart)</h3>
          <div className="mt-3">
            <CostBreakdownPieChart breakdown={summary.breakdown} />
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <h3 className="text-sm font-semibold text-slate-800">Profit per Produk (Bar Chart)</h3>
          <div className="mt-3">
            <ProductProfitBarChart items={items} />
          </div>
        </div>
      </div>
    </div>
  );
}
