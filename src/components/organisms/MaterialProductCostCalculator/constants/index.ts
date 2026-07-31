import type { Material, MaterialUnit, Product } from "../types";

export const DEFAULT_TARGET_MARGIN_PERCENT = 30;

export const UNIT_OPTIONS: MaterialUnit[] = ["pcs", "lembar", "gram", "kg", "meter", "cm", "ml", "liter", "roll", "pack", "box"];

export function createEmptyMaterial(id: string): Material {
  return {
    id,
    image: "",
    name: "",
    variant: "",
    supplier: "",
    link: "",
    price: 0,
    qty: 1,
    unit: "pcs",
    note: "",
  };
}

export function createEmptyProduct(id: string): Product {
  return {
    id,
    name: "",
    sellPrice: 0,
    packingCost: 0,
    otherCost: 0,
    targetMarginPercent: DEFAULT_TARGET_MARGIN_PERCENT,
    note: "",
    materials: [],
  };
}

export const EXCEL_FILE_NAME = "Material-Product-Cost-Calculator.xlsx";
export const EXCEL_MATERIAL_SHEET_NAME = "Materials";
export const EXCEL_PRODUCT_SHEET_NAME = "Products";
export const EXCEL_SUMMARY_SHEET_NAME = "Summary";

export const MATERIAL_COST_BREAKDOWN_MAX_SLICES = 5;
