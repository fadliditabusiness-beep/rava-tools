export interface StatTileProps {
  label: string;
  value: string;
}

export default function StatTile({ label, value }: StatTileProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-center dark:border-slate-800 dark:bg-slate-900">
      <div className="text-2xl font-bold text-slate-900 dark:text-slate-50">{value}</div>
      <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{label}</div>
    </div>
  );
}
