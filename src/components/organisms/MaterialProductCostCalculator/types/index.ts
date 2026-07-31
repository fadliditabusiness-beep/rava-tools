export const MATERIAL_UNITS = ["pcs", "lembar", "gram", "kg", "meter", "cm", "ml", "liter", "roll", "pack", "box"] as const;
export type MaterialUnit = (typeof MATERIAL_UNITS)[number];

export interface Material {
  id: string;
  image: string;
  name: string;
  variant: string;
  supplier: string;
  link: string;
  price: number;
  qty: number;
  unit: MaterialUnit;
  note: string;
}

export interface MaterialResult {
  pricePerUnit: number;
}

export interface MaterialWithResult {
  material: Material;
  result: MaterialResult;
}

export interface ProductMaterialUsage {
  materialId: string;
  qtyUsed: number;
}

export interface Product {
  id: string;
  name: string;
  sellPrice: number;
  packingCost: number;
  otherCost: number;
  targetMarginPercent: number;
  note: string;
  materials: ProductMaterialUsage[];
}

export interface ProductMaterialLine {
  materialId: string;
  qtyUsed: number;
  material: Material | null;
  pricePerUnit: number;
  total: number;
}

export interface ProductResult {
  materialCost: number;
  packingCost: number;
  otherCost: number;
  totalHpp: number;
  profit: number;
  margin: number;
  markup: number;
  roi: number;
  netIncome: number;
  isProfit: boolean;
  isBelowTarget: boolean;
  lines: ProductMaterialLine[];
}

export interface ProductWithResult {
  product: Product;
  result: ProductResult;
}

export interface MaterialSummary {
  mostExpensive: MaterialWithResult | null;
  cheapest: MaterialWithResult | null;
  totalValue: number;
  averagePrice: number;
}

export interface ProductSummary {
  highestProfit: ProductWithResult | null;
  lowestProfit: ProductWithResult | null;
  highestHpp: ProductWithResult | null;
  lowestHpp: ProductWithResult | null;
}

export interface KpiSummary {
  totalMaterial: number;
  totalProduct: number;
  avgHpp: number;
  totalProfit: number;
  avgMargin: number;
  avgMarkup: number;
}

export interface MaterialCostBreakdownItem {
  label: string;
  value: number;
  percent: number;
}

export interface BusinessSummaryData {
  kpi: KpiSummary;
  materialSummary: MaterialSummary;
  productSummary: ProductSummary;
  insights: string[];
  materialCostBreakdown: MaterialCostBreakdownItem[];
}
