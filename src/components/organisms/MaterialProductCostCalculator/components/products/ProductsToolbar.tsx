import Button from "@/components/atoms/Button/Button";

export interface ProductsToolbarProps {
  onAdd: () => void;
}

export default function ProductsToolbar({ onAdd }: ProductsToolbarProps) {
  return (
    <div className="sticky top-0 z-10 rounded-xl border border-slate-200 bg-white/90 p-3 shadow-sm backdrop-blur">
      <Button onClick={onAdd} className="bg-blue-600 hover:bg-blue-500">
        ➕ Tambah Produk
      </Button>
    </div>
  );
}
