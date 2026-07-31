export interface StatTileProps {
  label: string;
  value: string;
}

export default function StatTile({ label, value }: StatTileProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-3 text-center dark:border-slate-800 dark:bg-slate-900">
      <div className="truncate text-lg font-bold text-slate-900 sm:text-xl dark:text-slate-50" title={value}>
        {value}
      </div>
      <div className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400" title={label}>
        {label}
      </div>
    </div>
  );
}
