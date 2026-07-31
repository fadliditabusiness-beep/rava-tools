import ProductsToolbar from "./products/ProductsToolbar";
import ProductCard from "./ProductCard";
import EmptyState from "./EmptyState";
import type { MaterialWithResult, Product, ProductWithResult } from "../types";

export interface ProductsSectionProps {
  items: ProductWithResult[];
  materials: MaterialWithResult[];
  onAdd: () => void;
  onChange: (id: string, patch: Partial<Product>) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onAddMaterial: (productId: string, materialId: string) => void;
  onQtyUsedChange: (productId: string, materialId: string, qtyUsed: number) => void;
  onRemoveMaterial: (productId: string, materialId: string) => void;
}

export default function ProductsSection({
  items,
  materials,
  onAdd,
  onChange,
  onDuplicate,
  onDelete,
  onAddMaterial,
  onQtyUsedChange,
  onRemoveMaterial,
}: ProductsSectionProps) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-bold text-slate-900">Products</h2>

      <ProductsToolbar onAdd={onAdd} />

      {items.length === 0 ? (
        <EmptyState icon="🧮" title="Belum ada produk." subtitle="Klik Tambah Produk untuk mulai menghitung HPP produk." />
      ) : (
        <div className="flex flex-col gap-4">
          {items.map(({ product, result }, index) => (
            <ProductCard
              key={product.id}
              index={index}
              product={product}
              result={result}
              materials={materials}
              onChange={(patch) => onChange(product.id, patch)}
              onDuplicate={() => onDuplicate(product.id)}
              onDelete={() => onDelete(product.id)}
              onAddMaterial={(materialId) => onAddMaterial(product.id, materialId)}
              onQtyUsedChange={(materialId, qtyUsed) => onQtyUsedChange(product.id, materialId, qtyUsed)}
              onRemoveMaterial={(materialId) => onRemoveMaterial(product.id, materialId)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
