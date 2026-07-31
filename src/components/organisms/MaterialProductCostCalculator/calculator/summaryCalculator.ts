import type {
  BusinessSummaryData,
  KpiSummary,
  Material,
  MaterialCostBreakdownItem,
  MaterialSummary,
  MaterialWithResult,
  ProductSummary,
  ProductWithResult,
} from "../types";
import { MATERIAL_COST_BREAKDOWN_MAX_SLICES } from "../constants";
import { safeDivide } from "../utils/numberUtils";

function average(values: number[]): number {
  if (!values.length) return 0;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

function pickExtreme<T>(items: T[], selector: (item: T) => number, mode: "max" | "min"): T | null {
  if (!items.length) return null;
  return items.reduce((best, current) => {
    const bestValue = selector(best);
    const currentValue = selector(current);
    return mode === "max" ? (currentValue > bestValue ? current : best) : currentValue < bestValue ? current : best;
  });
}

function buildKpi(materials: Material[], products: ProductWithResult[]): KpiSummary {
  return {
    totalMaterial: materials.length,
    totalProduct: products.length,
    avgHpp: average(products.map((p) => p.result.totalHpp)),
    totalProfit: products.reduce((sum, p) => sum + p.result.netIncome, 0),
    avgMargin: average(products.map((p) => p.result.margin)),
    avgMarkup: average(products.map((p) => p.result.markup)),
  };
}

function buildMaterialSummary(materials: MaterialWithResult[]): MaterialSummary {
  return {
    mostExpensive: pickExtreme(materials, (m) => m.result.pricePerUnit, "max"),
    cheapest: pickExtreme(materials, (m) => m.result.pricePerUnit, "min"),
    totalValue: materials.reduce((sum, m) => sum + m.material.price, 0),
    averagePrice: average(materials.map((m) => m.material.price)),
  };
}

function buildProductSummary(products: ProductWithResult[]): ProductSummary {
  return {
    highestProfit: pickExtreme(products, (p) => p.result.netIncome, "max"),
    lowestProfit: pickExtreme(products, (p) => p.result.netIncome, "min"),
    highestHpp: pickExtreme(products, (p) => p.result.totalHpp, "max"),
    lowestHpp: pickExtreme(products, (p) => p.result.totalHpp, "min"),
  };
}

function buildMaterialCostBreakdown(products: ProductWithResult[]): MaterialCostBreakdownItem[] {
  const totals = new Map<string, number>();

  for (const { result } of products) {
    for (const line of result.lines) {
      const label = line.material?.name.trim() || "(material dihapus)";
      totals.set(label, (totals.get(label) ?? 0) + line.total);
    }
  }

  const sorted = [...totals.entries()].sort((a, b) => b[1] - a[1]);
  const grandTotal = sorted.reduce((sum, [, value]) => sum + value, 0);

  const top = sorted.slice(0, MATERIAL_COST_BREAKDOWN_MAX_SLICES);
  const rest = sorted.slice(MATERIAL_COST_BREAKDOWN_MAX_SLICES);
  const restTotal = rest.reduce((sum, [, value]) => sum + value, 0);

  const items: MaterialCostBreakdownItem[] = top.map(([label, value]) => ({
    label,
    value,
    percent: safeDivide(value, grandTotal) * 100,
  }));

  if (restTotal > 0) items.push({ label: "Lainnya", value: restTotal, percent: safeDivide(restTotal, grandTotal) * 100 });

  return items;
}

function buildInsights(
  products: ProductWithResult[],
  productSummary: ProductSummary,
  kpi: KpiSummary,
  breakdown: MaterialCostBreakdownItem[],
): string[] {
  if (!products.length) return [];

  const insights: string[] = [];
  const topMaterial = breakdown[0];

  if (topMaterial) {
    insights.push(`Material terbesar berasal dari ${topMaterial.label} (${topMaterial.percent.toFixed(0)}%).`);
  }

  if (productSummary.highestProfit) {
    insights.push(`Produk paling menguntungkan: ${productSummary.highestProfit.product.name.trim() || "(tanpa nama)"}.`);
  }

  insights.push(`Margin rata-rata: ${kpi.avgMargin.toFixed(0)}%.`);

  const belowTargetCount = products.filter((p) => p.result.isBelowTarget).length;
  if (belowTargetCount > 0) insights.push(`Ada ${belowTargetCount} produk dengan margin di bawah target.`);

  const lossCount = products.filter((p) => !p.result.isProfit).length;
  if (lossCount > 0) insights.push(`Ada ${lossCount} produk yang mengalami kerugian.`);
  else insights.push("Semua produk menghasilkan profit.");

  return insights;
}

export function calculateBusinessSummary(materials: MaterialWithResult[], products: ProductWithResult[]): BusinessSummaryData {
  const kpi = buildKpi(
    materials.map((m) => m.material),
    products,
  );
  const materialSummary = buildMaterialSummary(materials);
  const productSummary = buildProductSummary(products);
  const materialCostBreakdown = buildMaterialCostBreakdown(products);
  const insights = buildInsights(products, productSummary, kpi, materialCostBreakdown);

  return { kpi, materialSummary, productSummary, insights, materialCostBreakdown };
}
