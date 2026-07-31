import { MATERIAL_UNITS, type Material, type MaterialUnit, type Product, type ProductMaterialUsage } from "../types";
import { createEmptyMaterial, createEmptyProduct } from "../constants";
import { createId, toSafeNumber } from "./numberUtils";

export const MATERIALS_STORAGE_KEY = "material-product-cost-calculator:materials";
export const PRODUCTS_STORAGE_KEY = "material-product-cost-calculator:products";

function sanitizeUnit(value: unknown): MaterialUnit {
  return (MATERIAL_UNITS as readonly string[]).includes(value as string) ? (value as MaterialUnit) : "pcs";
}

function sanitizeMaterial(raw: unknown): Material {
  const fallback = createEmptyMaterial(createId("material"));
  if (typeof raw !== "object" || raw === null) return fallback;
  const source = raw as Record<string, unknown>;

  return {
    id: typeof source.id === "string" && source.id ? source.id : fallback.id,
    image: typeof source.image === "string" ? source.image : "",
    name: typeof source.name === "string" ? source.name : "",
    variant: typeof source.variant === "string" ? source.variant : "",
    supplier: typeof source.supplier === "string" ? source.supplier : "",
    link: typeof source.link === "string" ? source.link : "",
    price: toSafeNumber(source.price),
    qty: toSafeNumber(source.qty),
    unit: sanitizeUnit(source.unit),
    note: typeof source.note === "string" ? source.note : "",
  };
}

function sanitizeUsage(raw: unknown): ProductMaterialUsage | null {
  if (typeof raw !== "object" || raw === null) return null;
  const source = raw as Record<string, unknown>;
  if (typeof source.materialId !== "string" || !source.materialId) return null;
  return { materialId: source.materialId, qtyUsed: toSafeNumber(source.qtyUsed) };
}

function sanitizeProduct(raw: unknown): Product {
  const fallback = createEmptyProduct(createId("product"));
  if (typeof raw !== "object" || raw === null) return fallback;
  const source = raw as Record<string, unknown>;

  const materials = Array.isArray(source.materials) ? source.materials.map(sanitizeUsage).filter((u): u is ProductMaterialUsage => u !== null) : [];

  return {
    id: typeof source.id === "string" && source.id ? source.id : fallback.id,
    name: typeof source.name === "string" ? source.name : "",
    sellPrice: toSafeNumber(source.sellPrice),
    packingCost: toSafeNumber(source.packingCost),
    otherCost: toSafeNumber(source.otherCost),
    targetMarginPercent: source.targetMarginPercent === undefined ? fallback.targetMarginPercent : toSafeNumber(source.targetMarginPercent),
    note: typeof source.note === "string" ? source.note : "",
    materials,
  };
}

function loadList<T>(key: string, sanitize: (raw: unknown) => T): T[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(sanitize);
  } catch {
    return [];
  }
}

function saveList<T>(key: string, list: T[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(list));
  } catch {
    // storage unavailable (private mode/quota) — silently skip persistence
  }
}

export function loadPersistedMaterials(): Material[] {
  return loadList(MATERIALS_STORAGE_KEY, sanitizeMaterial);
}

export function persistMaterials(materials: Material[]): void {
  saveList(MATERIALS_STORAGE_KEY, materials);
}

export function loadPersistedProducts(): Product[] {
  return loadList(PRODUCTS_STORAGE_KEY, sanitizeProduct);
}

export function persistProducts(products: Product[]): void {
  saveList(PRODUCTS_STORAGE_KEY, products);
}
