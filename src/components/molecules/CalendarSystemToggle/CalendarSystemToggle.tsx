import Link from "next/link";
import type { CalendarSystem } from "@/interfaces/calendar";

export interface CalendarSystemToggleProps {
  active: CalendarSystem;
  masehiHref: string;
  hijriahHref: string;
}

const baseClasses = "rounded-md px-3 py-1.5 text-sm font-medium transition-colors";
const activeClasses = "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900";
const inactiveClasses =
  "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800";

export default function CalendarSystemToggle({
  active,
  masehiHref,
  hijriahHref,
}: CalendarSystemToggleProps) {
  return (
    <div className="inline-flex gap-1 rounded-lg bg-slate-100/60 p-1 dark:bg-slate-800/60">
      <Link
        href={masehiHref}
        className={`${baseClasses} ${active === "masehi" ? activeClasses : inactiveClasses}`}
      >
        Masehi
      </Link>
      <Link
        href={hijriahHref}
        className={`${baseClasses} ${active === "hijriah" ? activeClasses : inactiveClasses}`}
      >
        Hijriah
      </Link>
    </div>
  );
}
