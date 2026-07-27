import { HIJRI_MONTH_NAMES_ID, MONTH_NAMES_ID } from "@/constants/calendar";
import type { GregorianMonth, HijriMonth, Holiday } from "@/interfaces/calendar";

export function formatDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function buildGregorianYear(
  year: number,
  holidaysByDate: Map<string, Holiday[]>,
  today: Date,
): GregorianMonth[] {
  const todayKey = formatDateKey(today);

  return MONTH_NAMES_ID.map((name, monthIndex) => {
    const firstOfMonth = new Date(year, monthIndex, 1);
    const gridStart = new Date(year, monthIndex, 1 - firstOfMonth.getDay());

    const days = Array.from({ length: 42 }, (_, i) => {
      const date = new Date(gridStart);
      date.setDate(gridStart.getDate() + i);
      const key = formatDateKey(date);
      return {
        date,
        day: date.getDate(),
        inCurrentMonth: date.getMonth() === monthIndex,
        isToday: key === todayKey,
        isSunday: date.getDay() === 0,
        holidays: holidaysByDate.get(key) ?? [],
      };
    });

    return { monthIndex, name, days };
  });
}

const hijriFormatter = new Intl.DateTimeFormat("en-US-u-ca-islamic-umalqura", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
});

interface HijriParts {
  year: number;
  month: number; // 1-12
  day: number;
}

function toHijriParts(date: Date): HijriParts {
  const parts = hijriFormatter.formatToParts(date);
  const lookup: Record<string, string> = {};
  for (const part of parts) lookup[part.type] = part.value;
  return {
    year: parseInt(lookup.year, 10),
    month: parseInt(lookup.month, 10),
    day: parseInt(lookup.day, 10),
  };
}

export function buildHijriYear(
  hijriYear: number,
  holidaysByDate: Map<string, Holiday[]>,
  today: Date,
): HijriMonth[] {
  const todayKey = formatDateKey(today);
  const months: HijriMonth[] = HIJRI_MONTH_NAMES_ID.map((name, monthIndex) => ({
    monthIndex,
    name,
    days: [],
  }));

  // Hijri year length drifts ~11 days/year vs. Gregorian, so scan a
  // generous Gregorian window around the arithmetic estimate to make
  // sure every Hijri day for the target year is captured.
  const approxGregorianYear = Math.floor(hijriYear * 0.970229 + 621.5643);
  const scanStart = new Date(approxGregorianYear - 1, 0, 1);
  const scanEnd = new Date(approxGregorianYear + 2, 0, 1);

  for (
    const cursor = new Date(scanStart);
    cursor < scanEnd;
    cursor.setDate(cursor.getDate() + 1)
  ) {
    const hijri = toHijriParts(cursor);
    if (hijri.year !== hijriYear) continue;

    const gregorianDate = new Date(cursor);
    const key = formatDateKey(gregorianDate);
    months[hijri.month - 1].days.push({
      hijriDay: hijri.day,
      gregorianDate,
      isToday: key === todayKey,
      isSunday: gregorianDate.getDay() === 0,
      holidays: holidaysByDate.get(key) ?? [],
    });
  }

  return months;
}

export function gregorianDateToHijriYear(date: Date): number {
  return toHijriParts(date).year;
}
