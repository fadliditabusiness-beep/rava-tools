import { useMaterialProductCostCalculator } from "./hooks/useMaterialProductCostCalculator";
import MaterialsSection from "./components/MaterialsSection";
import ProductsSection from "./components/ProductsSection";
import BusinessSummary from "./components/BusinessSummary";

export default function MaterialProductCostCalculator() {
  const {
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
  } = useMaterialProductCostCalculator();

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 items-start gap-8 xl:grid-cols-2">
        <MaterialsSection
          items={materialsWithResults}
          onAdd={addMaterial}
          onChange={updateMaterial}
          onDuplicate={duplicateMaterial}
          onDelete={deleteMaterial}
          onReset={resetMaterials}
          onImportFile={importMaterialsFromFile}
          onExport={exportExcel}
          exportDisabled={materials.length === 0 && products.length === 0}
        />

        <ProductsSection
          items={productsWithResults}
          materials={materialsWithResults}
          onAdd={addProduct}
          onChange={updateProduct}
          onDuplicate={duplicateProduct}
          onDelete={deleteProduct}
          onAddMaterial={addMaterialUsage}
          onQtyUsedChange={updateMaterialUsage}
          onRemoveMaterial={removeMaterialUsage}
        />
      </div>

      {products.length > 0 && <BusinessSummary summary={summary} products={productsWithResults} />}
    </div>
  );
}
