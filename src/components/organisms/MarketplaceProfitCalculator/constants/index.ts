import type { MarketplaceId, Product } from "../types";

export interface MarketplaceOption {
  id: MarketplaceId;
  label: string;
  defaultFeePercent: number;
}

export const MARKETPLACE_OPTIONS: MarketplaceOption[] = [
  { id: "shopee", label: "Shopee", defaultFeePercent: 8 },
  { id: "tokopedia", label: "Tokopedia", defaultFeePercent: 6.5 },
  { id: "tiktok", label: "TikTok Shop", defaultFeePercent: 7 },
  { id: "lazada", label: "Lazada", defaultFeePercent: 6 },
  { id: "blibli", label: "Blibli", defaultFeePercent: 6 },
  { id: "bukalapak", label: "Bukalapak", defaultFeePercent: 5 },
  { id: "custom", label: "Custom", defaultFeePercent: 0 },
];

export function getDefaultFeePercent(marketplace: MarketplaceId): number {
  return MARKETPLACE_OPTIONS.find((m) => m.id === marketplace)?.defaultFeePercent ?? 0;
}

export const DEFAULT_TARGET_MARGIN_PERCENT = 30;

export function createEmptyProduct(id: string): Product {
  return {
    id,
    name: "",
    marketplace: "shopee",
    costPrice: 0,
    packingCost: 0,
    otherCost: 0,
    sellPrice: 0,
    discountPercent: 0,
    voucher: 0,
    marketplaceFeePercent: getDefaultFeePercent("shopee"),
    tax: 0,
    targetMarginPercent: DEFAULT_TARGET_MARGIN_PERCENT,
    note: "",
  };
}

export const EXCEL_FILE_NAME = "Marketplace-Profit-Calculator.xlsx";
export const EXCEL_PRODUCT_SHEET_NAME = "Produk";
export const EXCEL_SUMMARY_SHEET_NAME = "Business Summary";

export const BUSINESS_HEALTH_THRESHOLDS: { min: number; category: "Excellent" | "Good" | "Fair" | "Needs Improvement" }[] = [
  { min: 80, category: "Excellent" },
  { min: 60, category: "Good" },
  { min: 40, category: "Fair" },
  { min: 0, category: "Needs Improvement" },
];
