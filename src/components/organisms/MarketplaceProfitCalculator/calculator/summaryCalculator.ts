import type {
  BusinessHealth,
  BusinessSummaryData,
  CostBreakdownItem,
  FinancialSummary,
  ProductAnalysis,
  ProductWithResult,
  ProfitAnalysis,
} from "../types";
import { BUSINESS_HEALTH_THRESHOLDS } from "../constants";
import { safeDivide } from "../utils/numberUtils";

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function average(values: number[]): number {
  if (!values.length) return 0;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

function pickExtreme(
  items: ProductWithResult[],
  selector: (item: ProductWithResult) => number,
  mode: "max" | "min",
): ProductWithResult | null {
  if (!items.length) return null;
  return items.reduce((best, current) => {
    const bestValue = selector(best);
    const currentValue = selector(current);
    return mode === "max" ? (currentValue > bestValue ? current : best) : currentValue < bestValue ? current : best;
  });
}

function buildFinancialSummary(items: ProductWithResult[]): FinancialSummary {
  let totalModal = 0;
  let totalPenjualan = 0;
  let totalProfit = 0;
  let totalBiaya = 0;
  let totalPotongan = 0;
  let totalPacking = 0;
  let totalVoucher = 0;
  let totalPajak = 0;
  let totalAdmin = 0;

  for (const { product, result } of items) {
    totalModal += result.totalModal;
    totalPenjualan += result.hargaSetelahDiskon;
    totalProfit += result.netIncome;
    totalBiaya += result.totalBiaya;
    totalPotongan += result.totalPotongan;
    totalPacking += product.packingCost;
    totalVoucher += product.voucher;
    totalPajak += product.tax;
    totalAdmin += result.feeAmount;
  }

  return { totalModal, totalPenjualan, totalProfit, totalBiaya, totalPotongan, totalPacking, totalVoucher, totalPajak, totalAdmin };
}

function buildProfitAnalysis(items: ProductWithResult[], financial: FinancialSummary): ProfitAnalysis {
  return {
    avgProfit: safeDivide(financial.totalProfit, items.length),
    avgMargin: average(items.map((i) => i.result.margin)),
    avgMarkup: average(items.map((i) => i.result.markup)),
    avgRoi: average(items.map((i) => i.result.roi)),
  };
}

function buildProductAnalysis(items: ProductWithResult[]): ProductAnalysis {
  return {
    highestProfit: pickExtreme(items, (i) => i.result.netIncome, "max"),
    lowestProfit: pickExtreme(items, (i) => i.result.netIncome, "min"),
    highestMargin: pickExtreme(items, (i) => i.result.margin, "max"),
    lowestMargin: pickExtreme(items, (i) => i.result.margin, "min"),
    highestSellPrice: pickExtreme(items, (i) => i.product.sellPrice, "max"),
    highestCost: pickExtreme(items, (i) => i.result.totalModal, "max"),
  };
}

function buildBusinessHealth(items: ProductWithResult[], financial: FinancialSummary, profitAnalysis: ProfitAnalysis): BusinessHealth {
  if (!items.length) return { score: 0, category: "Needs Improvement" };

  const profitableRatio = safeDivide(items.filter((i) => i.result.isProfit).length, items.length);
  const marginScore = clamp(safeDivide(profitAnalysis.avgMargin, 30), 0, 1);
  const roiScore = clamp(safeDivide(profitAnalysis.avgRoi, 50), 0, 1);
  const burdenRatio = safeDivide(financial.totalAdmin + financial.totalVoucher, financial.totalPenjualan);
  const burdenScore = clamp(1 - burdenRatio / 0.2, 0, 1);

  const score = Math.round((marginScore * 0.35 + profitableRatio * 0.3 + roiScore * 0.2 + burdenScore * 0.15) * 100);
  const category = BUSINESS_HEALTH_THRESHOLDS.find((t) => score >= t.min)?.category ?? "Needs Improvement";

  return { score: clamp(score, 0, 100), category };
}

function buildInsights(items: ProductWithResult[], financial: FinancialSummary, profitAnalysis: ProfitAnalysis): string[] {
  if (!items.length) return [];

  const insights: string[] = [];
  const feeBurden = safeDivide(financial.totalAdmin, financial.totalPenjualan);
  const voucherBurden = safeDivide(financial.totalVoucher, financial.totalPenjualan);
  const lossCount = items.filter((i) => !i.result.isProfit).length;

  if (profitAnalysis.avgMargin >= 30) insights.push("Margin sangat baik.");
  else if (profitAnalysis.avgMargin < 10) insights.push("Margin rendah, pertimbangkan naikkan harga jual atau tekan biaya.");

  if (feeBurden > 0.12) insights.push("Biaya admin marketplace terlalu tinggi dibanding total penjualan.");
  if (voucherBurden > 0.08) insights.push("Voucher seller terlalu besar dibanding total penjualan.");

  if (lossCount > 0) insights.push(`Ada ${lossCount} produk yang mengalami kerugian.`);
  else insights.push("Semua produk menghasilkan profit.");

  return insights;
}

function buildBreakdown(items: ProductWithResult[], financial: FinancialSummary): CostBreakdownItem[] {
  let modal = 0;
  let packing = 0;
  let voucher = 0;
  let pajak = 0;
  let admin = 0;
  let profit = 0;

  for (const { product, result } of items) {
    modal += product.costPrice + product.otherCost;
    packing += product.packingCost;
    voucher += product.voucher;
    pajak += product.tax;
    admin += result.feeAmount;
    profit += result.netIncome;
  }

  const total = financial.totalPenjualan;
  const toItem = (label: string, value: number): CostBreakdownItem => ({ label, value, percent: safeDivide(value, total) * 100 });

  return [
    toItem("Modal", modal),
    toItem("Packing", packing),
    toItem("Voucher", voucher),
    toItem("Pajak", pajak),
    toItem("Admin Marketplace", admin),
    toItem("Profit", profit),
  ];
}

export function calculateBusinessSummary(items: ProductWithResult[]): BusinessSummaryData {
  const financial = buildFinancialSummary(items);
  const profitAnalysis = buildProfitAnalysis(items, financial);

  return {
    productCount: items.length,
    financial,
    profitAnalysis,
    productAnalysis: buildProductAnalysis(items),
    health: buildBusinessHealth(items, financial, profitAnalysis),
    insights: buildInsights(items, financial, profitAnalysis),
    breakdown: buildBreakdown(items, financial),
  };
}
