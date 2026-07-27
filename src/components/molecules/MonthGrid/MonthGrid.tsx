import Badge from "@/components/atoms/Badge/Badge";
import { DAY_NAMES_ID } from "@/constants/calendar";
import type { GregorianMonth } from "@/interfaces/calendar";

export interface MonthGridProps {
  month: GregorianMonth;
}

export default function MonthGrid({ month }: MonthGridProps) {
  const monthHolidays = month.days
    .filter((d) => d.inCurrentMonth && d.holidays.length > 0)
    .flatMap((d) => d.holidays.map((h) => ({ day: d.day, holiday: h })));

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-3 text-center text-lg font-semibold text-slate-800 dark:text-slate-100">
        {month.name}
      </h3>
      <div className="grid grid-cols-7 gap-y-1 text-center text-xs font-medium text-slate-400">
        {DAY_NAMES_ID.map((day, i) => (
          <span key={day} className={i === 0 ? "text-red-500" : undefined}>
            {day}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-1 text-center text-sm">
        {month.days.map((day) => {
          const hasNational = day.holidays.some((h) => h.category === "national");
          const hasCutiBersama = day.holidays.some((h) => h.category === "cuti-bersama");
          const isHoliday = hasNational || hasCutiBersama;
          const title = day.holidays.map((h) => h.name).join(" · ") || undefined;

          return (
            <div
              key={day.date.toISOString()}
              title={title}
              className={[
                "flex h-10 items-center justify-center rounded",
                day.inCurrentMonth ? "" : "opacity-30",
                day.isToday ? "ring-2 ring-inset ring-blue-500" : "",
                isHoliday
                  ? hasNational
                    ? "bg-red-50 font-semibold text-red-600 dark:bg-red-950/40 dark:text-red-300"
                    : "bg-amber-50 font-semibold text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
                  : day.isSunday
                    ? "text-red-500"
                    : "text-slate-700 dark:text-slate-200",
              ].join(" ")}
            >
              {day.day}
            </div>
          );
        })}
      </div>
      {monthHolidays.length > 0 && (
        <ul className="mt-4 space-y-1.5 border-t border-slate-100 pt-3 dark:border-slate-800">
          {monthHolidays.map(({ day, holiday }) => (
            <li
              key={`${holiday.date}-${holiday.name}`}
              className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300"
            >
              <span className="w-5 shrink-0 font-semibold text-slate-800 dark:text-slate-100">
                {day}
              </span>
              <span className="flex-1">{holiday.name}</span>
              <Badge tone={holiday.category === "national" ? "red" : "amber"}>
                {holiday.category === "national" ? "Nasional" : "Cuti"}
              </Badge>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
