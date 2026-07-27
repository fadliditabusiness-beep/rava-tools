import type { ReactNode } from "react";
import Link from "next/link";
import MainNav from "@/components/molecules/MainNav/MainNav";

export interface SiteHeaderProps {
  children?: ReactNode; // slot for page-specific controls (e.g. YearSwitcher)
}

export default function SiteHeader({ children }: SiteHeaderProps) {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-6">
        <div className="flex w-full items-center justify-between">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-50"
          >
            Kalender Indonesia
          </Link>
          <MainNav />
        </div>
        {children}
      </div>
    </header>
  );
}
