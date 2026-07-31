import type { Material, Product, ProductMaterialLine, ProductResult } from "../types";
import { safeDivide, toSafeNumber } from "../utils/numberUtils";
import { calculatePricePerUnit } from "./materialCalculator";

/**
 * BOM costing: setiap baris material di-lookup live dari daftar Materials (bukan snapshot),
 * jadi kalau harga/qty material diubah, HPP semua produk yang memakainya ikut berubah.
 * Material Cost = Σ (qtyUsed * pricePerUnit material saat ini)
 * Total HPP      = Material Cost + Packing Cost + Other Cost
 * Profit         = Harga Jual - Total HPP
 * Margin         = Profit / Harga Jual
 * Markup / ROI   = Profit / Total HPP (tidak ada pajak/pos lain di model ini, jadi keduanya identik)
 * Net Income     = Profit (bottom line, tidak ada potongan tambahan di model ini)
 */
export function calculateProduct(product: Product, materialsById: Map<string, Material>): ProductResult {
  const sellPrice = toSafeNumber(product.sellPrice);
  const packingCost = toSafeNumber(product.packingCost);
  const otherCost = toSafeNumber(product.otherCost);
  const targetMarginPercent = toSafeNumber(product.targetMarginPercent);

  const lines: ProductMaterialLine[] = product.materials.map((usage) => {
    const material = materialsById.get(usage.materialId) ?? null;
    const pricePerUnit = material ? calculatePricePerUnit(material) : 0;
    const qtyUsed = toSafeNumber(usage.qtyUsed);
    return { materialId: usage.materialId, qtyUsed, material, pricePerUnit, total: pricePerUnit * qtyUsed };
  });

  const materialCost = lines.reduce((sum, line) => sum + line.total, 0);
  const totalHpp = materialCost + packingCost + otherCost;

  const profit = sellPrice - totalHpp;
  const netIncome = profit;

  const margin = safeDivide(profit, sellPrice) * 100;
  const markup = safeDivide(profit, totalHpp) * 100;
  const roi = markup;

  return {
    materialCost,
    packingCost,
    otherCost,
    totalHpp,
    profit,
    margin,
    markup,
    roi,
    netIncome,
    isProfit: netIncome >= 0,
    isBelowTarget: margin < targetMarginPercent,
    lines,
  };
}
