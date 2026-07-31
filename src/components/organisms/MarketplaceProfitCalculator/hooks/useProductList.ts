import { useCallback, useEffect, useMemo, useState } from "react";
import type { Product, ProductWithResult } from "../types";
import { createEmptyProduct, getDefaultFeePercent } from "../constants";
import { calculateProduct } from "../calculator/productCalculator";
import { calculateBusinessSummary } from "../calculator/summaryCalculator";
import { createProductId } from "../utils/numberUtils";
import { exportToExcel, importProductsFromExcel } from "../utils/excelUtils";
import { loadPersistedProducts, persistProducts } from "../utils/persistence";

export function useProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const loaded = loadPersistedProducts();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client-only hydration from localStorage; must run post-mount to avoid an SSR/client markup mismatch
    setProducts(loaded);
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    persistProducts(products);
  }, [products, isHydrated]);

  const itemsWithResults = useMemo<ProductWithResult[]>(
    () => products.map((product) => ({ product, result: calculateProduct(product) })),
    [products],
  );

  const summary = useMemo(() => calculateBusinessSummary(itemsWithResults), [itemsWithResults]);

  const addProduct = useCallback(() => {
    setProducts((prev) => [...prev, createEmptyProduct(createProductId())]);
  }, []);

  const duplicateProduct = useCallback((id: string) => {
    setProducts((prev) => {
      const index = prev.findIndex((p) => p.id === id);
      if (index === -1) return prev;
      const clone: Product = { ...prev[index], id: createProductId() };
      return [...prev.slice(0, index + 1), clone, ...prev.slice(index + 1)];
    });
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const updateProduct = useCallback((id: string, patch: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const next = { ...p, ...patch };
        if (patch.marketplace && patch.marketplace !== p.marketplace) {
          next.marketplaceFeePercent = getDefaultFeePercent(patch.marketplace);
        }
        return next;
      }),
    );
  }, []);

  const resetAll = useCallback(() => {
    setProducts([]);
  }, []);

  const importFromFile = useCallback(async (file: File) => {
    const imported = await importProductsFromExcel(file);
    setProducts((prev) => [...prev, ...imported]);
  }, []);

  const exportExcel = useCallback(() => {
    exportToExcel(itemsWithResults, summary);
  }, [itemsWithResults, summary]);

  return {
    products,
    itemsWithResults,
    summary,
    addProduct,
    duplicateProduct,
    deleteProduct,
    updateProduct,
    resetAll,
    importFromFile,
    exportExcel,
  };
}
