import Link from "next/link";

export interface YearSwitcherProps {
  basePath: string; // e.g. "/masehi" or "/hijriah"
  year: number;
  yearLabel?: string;
}

export default function YearSwitcher({ basePath, year, yearLabel }: YearSwitcherProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      <Link
        href={`${basePath}/${year - 1}`}
        className="rounded-md px-2 py-1 text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800 dark:hover:text-slate-100"
        aria-label="Tahun sebelumnya"
      >
        ←
      </Link>
      <span className="min-w-24 text-center text-xl font-bold text-slate-900 dark:text-slate-50">
        {yearLabel ?? year}
      </span>
      <Link
        href={`${basePath}/${year + 1}`}
        className="rounded-md px-2 py-1 text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800 dark:hover:text-slate-100"
        aria-label="Tahun berikutnya"
      >
        →
      </Link>
    </div>
  );
}
