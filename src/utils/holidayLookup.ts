import { HOLIDAYS_BY_YEAR } from "@/constants/holidays";
import type { Holiday } from "@/interfaces/calendar";
import { daysUntil, parseDateInputValue } from "@/utils/dateTools";

export function findNextNationalHoliday(nameIncludes: string, today: Date): Holiday | null {
  let best: { holiday: Holiday; date: Date } | null = null;

  for (const holidays of Object.values(HOLIDAYS_BY_YEAR)) {
    for (const holiday of holidays) {
      if (holiday.category !== "national" || !holiday.name.includes(nameIncludes)) continue;
      const date = parseDateInputValue(holiday.date);
      if (!date || daysUntil(date, today) < 0) continue;
      if (!best || date < best.date) best = { holiday, date };
    }
  }

  return best?.holiday ?? null;
}
