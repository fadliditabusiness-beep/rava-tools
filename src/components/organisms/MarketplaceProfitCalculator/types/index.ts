export type MarketplaceId = "shopee" | "tokopedia" | "tiktok" | "lazada" | "blibli" | "bukalapak" | "custom";

export interface Product {
  id: string;
  name: string;
  marketplace: MarketplaceId;
  costPrice: number;
  packingCost: number;
  otherCost: number;
  sellPrice: number;
  discountPercent: number;
  voucher: number;
  marketplaceFeePercent: number;
  tax: number;
  targetMarginPercent: number;
  note: string;
}

export interface ProductResult {
  hpp: number;
  totalModal: number;
  totalBiaya: number;
  discountAmount: number;
  feeAmount: number;
  totalPotongan: number;
  hargaBersih: number;
  profit: number;
  margin: number;
  markup: number;
  roi: number;
  profitPercent: number;
  recommendedSellPrice: number;
  netIncome: number;
  isProfit: boolean;
}

export interface ProductWithResult {
  product: Product;
  result: ProductResult;
}

export interface FinancialSummary {
  totalModal: number;
  totalPenjualan: number;
  totalProfit: number;
  totalBiaya: number;
  totalPotongan: number;
  totalPacking: number;
  totalVoucher: number;
  totalPajak: number;
  totalAdmin: number;
}

export interface ProfitAnalysis {
  avgProfit: number;
  avgMargin: number;
  avgMarkup: number;
  avgRoi: number;
}

export interface ProductAnalysis {
  highestProfit: ProductWithResult | null;
  lowestProfit: ProductWithResult | null;
  highestMargin: ProductWithResult | null;
  lowestMargin: ProductWithResult | null;
  highestSellPrice: ProductWithResult | null;
  highestCost: ProductWithResult | null;
}

export type BusinessHealthCategory = "Excellent" | "Good" | "Fair" | "Needs Improvement";

export interface BusinessHealth {
  score: number;
  category: BusinessHealthCategory;
}

export interface CostBreakdownItem {
  label: string;
  value: number;
  percent: number;
}

export interface BusinessSummaryData {
  productCount: number;
  financial: FinancialSummary;
  profitAnalysis: ProfitAnalysis;
  productAnalysis: ProductAnalysis;
  health: BusinessHealth;
  insights: string[];
  breakdown: CostBreakdownItem[];
}
