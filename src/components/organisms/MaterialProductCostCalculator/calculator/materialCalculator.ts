import type { Material, MaterialResult } from "../types";
import { safeDivide, toSafeNumber } from "../utils/numberUtils";

export function calculatePricePerUnit(material: Material): number {
  return safeDivide(toSafeNumber(material.price), toSafeNumber(material.qty));
}

export function calculateMaterial(material: Material): MaterialResult {
  return { pricePerUnit: calculatePricePerUnit(material) };
}
