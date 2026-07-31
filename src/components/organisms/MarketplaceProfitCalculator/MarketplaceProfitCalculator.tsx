import { useProductList } from "./hooks/useProductList";
import Toolbar from "./components/Toolbar";
import ProductCard from "./components/ProductCard";
import EmptyState from "./components/EmptyState";
import BusinessSummary from "./components/BusinessSummary";

export default function MarketplaceProfitCalculator() {
  const { products, itemsWithResults, summary, addProduct, duplicateProduct, deleteProduct, updateProduct, resetAll, importFromFile, exportExcel } =
    useProductList();

  return (
    <div className="flex flex-col gap-5">
      <Toolbar
        onAdd={addProduct}
        onImportFile={importFromFile}
        onExport={exportExcel}
        onReset={resetAll}
        exportDisabled={products.length === 0}
        resetDisabled={products.length === 0}
      />

      {itemsWithResults.length === 0 ? (
        <EmptyState onAdd={addProduct} />
      ) : (
        <div className="flex flex-col gap-4">
          {itemsWithResults.map(({ product, result }, index) => (
            <ProductCard
              key={product.id}
              index={index}
              product={product}
              result={result}
              onChange={(patch) => updateProduct(product.id, patch)}
              onDuplicate={() => duplicateProduct(product.id)}
              onDelete={() => deleteProduct(product.id)}
            />
          ))}
        </div>
      )}

      {itemsWithResults.length > 0 && <BusinessSummary summary={summary} items={itemsWithResults} />}
    </div>
  );
}
