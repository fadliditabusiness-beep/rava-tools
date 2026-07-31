import { useCallback, useEffect, useMemo, useState } from "react";
import type { Material, MaterialWithResult, Product, ProductWithResult } from "../types";
import { createEmptyMaterial, createEmptyProduct } from "../constants";
import { calculateMaterial } from "../calculator/materialCalculator";
import { calculateProduct } from "../calculator/productCalculator";
import { calculateBusinessSummary } from "../calculator/summaryCalculator";
import { createId } from "../utils/numberUtils";
import { exportToExcel, importMaterialsFromExcel } from "../utils/excelUtils";
import { loadPersistedMaterials, loadPersistedProducts, persistMaterials, persistProducts } from "../utils/persistence";

export function useMaterialProductCostCalculator() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const loadedMaterials = loadPersistedMaterials();
    const loadedProducts = loadPersistedProducts();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client-only hydration from localStorage; must run post-mount to avoid an SSR/client markup mismatch
    setMaterials(loadedMaterials);
    setProducts(loadedProducts);
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    persistMaterials(materials);
  }, [materials, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    persistProducts(products);
  }, [products, isHydrated]);

  const materialsById = useMemo(() => new Map(materials.map((m) => [m.id, m])), [materials]);

  const materialsWithResults = useMemo<MaterialWithResult[]>(
    () => materials.map((material) => ({ material, result: calculateMaterial(material) })),
    [materials],
  );

  const productsWithResults = useMemo<ProductWithResult[]>(
    () => products.map((product) => ({ product, result: calculateProduct(product, materialsById) })),
    [products, materialsById],
  );

  const summary = useMemo(() => calculateBusinessSummary(materialsWithResults, productsWithResults), [materialsWithResults, productsWithResults]);

  const addMaterial = useCallback(() => {
    setMaterials((prev) => [...prev, createEmptyMaterial(createId("material"))]);
  }, []);

  const duplicateMaterial = useCallback((id: string) => {
    setMaterials((prev) => {
      const index = prev.findIndex((m) => m.id === id);
      if (index === -1) return prev;
      const clone: Material = { ...prev[index], id: createId("material") };
      return [...prev.slice(0, index + 1), clone, ...prev.slice(index + 1)];
    });
  }, []);

  const deleteMaterial = useCallback((id: string) => {
    setMaterials((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const updateMaterial = useCallback((id: string, patch: Partial<Material>) => {
    setMaterials((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch } : m)));
  }, []);

  const resetMaterials = useCallback(() => {
    setMaterials([]);
  }, []);

  const importMaterialsFromFile = useCallback(async (file: File) => {
    const imported = await importMaterialsFromExcel(file);
    setMaterials((prev) => [...prev, ...imported]);
  }, []);

  const addProduct = useCallback(() => {
    setProducts((prev) => [...prev, createEmptyProduct(createId("product"))]);
  }, []);

  const duplicateProduct = useCallback((id: string) => {
    setProducts((prev) => {
      const index = prev.findIndex((p) => p.id === id);
      if (index === -1) return prev;
      const clone: Product = { ...prev[index], id: createId("product"), materials: prev[index].materials.map((usage) => ({ ...usage })) };
      return [...prev.slice(0, index + 1), clone, ...prev.slice(index + 1)];
    });
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const updateProduct = useCallback((id: string, patch: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }, []);

  const addMaterialUsage = useCallback((productId: string, materialId: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== productId) return p;
        if (p.materials.some((u) => u.materialId === materialId)) return p;
        return { ...p, materials: [...p.materials, { materialId, qtyUsed: 1 }] };
      }),
    );
  }, []);

  const updateMaterialUsage = useCallback((productId: string, materialId: string, qtyUsed: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id !== productId ? p : { ...p, materials: p.materials.map((u) => (u.materialId === materialId ? { ...u, qtyUsed } : u)) })),
    );
  }, []);

  const removeMaterialUsage = useCallback((productId: string, materialId: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id !== productId ? p : { ...p, materials: p.materials.filter((u) => u.materialId !== materialId) })),
    );
  }, []);

  const exportExcel = useCallback(() => {
    exportToExcel(materials, productsWithResults, summary);
  }, [materials, productsWithResults, summary]);

  return {
    materials,
    materialsWithResults,
    products,
    productsWithResults,
    summary,
    addMaterial,
    duplicateMaterial,
    deleteMaterial,
    updateMaterial,
    resetMaterials,
    importMaterialsFromFile,
    addProduct,
    duplicateProduct,
    deleteProduct,
    updateProduct,
    addMaterialUsage,
    updateMaterialUsage,
    removeMaterialUsage,
    exportExcel,
  };
}
