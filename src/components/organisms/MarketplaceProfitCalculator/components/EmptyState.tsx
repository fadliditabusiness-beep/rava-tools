import Button from "@/components/atoms/Button/Button";

export interface EmptyStateProps {
  onAdd: () => void;
}

export default function EmptyState({ onAdd }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
      <span className="text-5xl" aria-hidden="true">
        🧮
      </span>
      <p className="text-sm font-medium text-slate-700">Belum ada produk.</p>
      <p className="text-xs text-slate-500">Klik Tambah Produk untuk mulai menghitung keuntungan.</p>
      <Button onClick={onAdd} className="mt-2 bg-blue-600 hover:bg-blue-500">
        ➕ Tambah Produk
      </Button>
    </div>
  );
}
