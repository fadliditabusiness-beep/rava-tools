import Badge from "@/components/atoms/Badge/Badge";
import type { Holiday } from "@/interfaces/calendar";

export interface HolidayListPanelProps {
  holidays: Holiday[];
}

function formatLongDate(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function HolidayListPanel({ holidays }: HolidayListPanelProps) {
  const sorted = [...holidays].sort((a, b) => a.date.localeCompare(b.date));

  if (sorted.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
        Data hari libur belum tersedia untuk tahun ini.
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-3 text-sm font-semibold text-slate-800 dark:text-slate-100">
        Hari Libur Nasional &amp; Cuti Bersama
      </h2>
      <ul className="divide-y divide-slate-100 dark:divide-slate-800">
        {sorted.map((holiday) => (
          <li key={`${holiday.date}-${holiday.name}`} className="flex items-start gap-3 py-2">
            <span className="w-36 shrink-0 text-xs text-slate-500 dark:text-slate-400">
              {formatLongDate(holiday.date)}
            </span>
            <span className="flex-1 text-sm text-slate-800 dark:text-slate-100">
              {holiday.name}
            </span>
            <Badge tone={holiday.category === "national" ? "red" : "amber"}>
              {holiday.category === "national" ? "Libur Nasional" : "Cuti Bersama"}
            </Badge>
          </li>
        ))}
      </ul>
    </div>
  );
}
