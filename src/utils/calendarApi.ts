import { HIJRI_MONTH_NAMES_ID, MONTH_NAMES_ID } from "@/constants/calendar";
import {
  CALENDAR_API_SCHEMA_VERSION,
  DAY_NAMES_FULL_EN,
  DAY_NAMES_FULL_ID,
  MONTH_NAMES_EN,
  getHolidaySource,
} from "@/constants/calendarApi";
import { HOLIDAYS_BY_YEAR, PROVISIONAL_YEARS } from "@/constants/holidays";
import type { Holiday } from "@/interfaces/calendar";
import type {
  ApiDay,
  ApiHijriDate,
  ApiHoliday,
  ApiMonth,
  CalendarApiMeta,
  CalendarHolidaysResponse,
  CalendarYearResponse,
  CalendarYearSummary,
  LongWeekend,
  YearDataStatus,
} from "@/interfaces/calendarApi";

/**
 * Semua perhitungan pakai UTC supaya hasilnya identik di mana pun server
 * berjalan (lokal, Vercel, container dengan TZ berbeda).
 */
function utcDate(year: number, month: number, day: number): Date {
  return new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
}

function toDateKey(date: Date): string {
  const y = String(date.getUTCFullYear()).padStart(4, "0");
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** ISO-8601 weekday: 1 = Senin … 7 = Minggu. */
function isoWeekday(date: Date): number {
  const day = date.getUTCDay();
  return day === 0 ? 7 : day;
}

export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function daysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

function isoWeekNumber(date: Date): number {
  const target = new Date(date.getTime());
  target.setUTCHours(12, 0, 0, 0);
  target.setUTCDate(target.getUTCDate() + 4 - isoWeekday(target));
  const yearStart = Date.UTC(target.getUTCFullYear(), 0, 1, 12, 0, 0);
  return Math.ceil(((target.getTime() - yearStart) / 86_400_000 + 1) / 7);
}

const hijriFormatter = new Intl.DateTimeFormat("en-US-u-ca-islamic-umalqura", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  timeZone: "UTC",
});

function toHijri(date: Date): ApiHijriDate {
  const lookup: Record<string, string> = {};
  for (const part of hijriFormatter.formatToParts(date)) lookup[part.type] = part.value;
  const month = parseInt(lookup.month, 10);
  return {
    year: parseInt(lookup.year, 10),
    month,
    day: parseInt(lookup.day, 10),
    monthName: HIJRI_MONTH_NAMES_ID[month - 1] ?? "",
  };
}

export function getYearStatus(year: number): YearDataStatus {
  if (!HOLIDAYS_BY_YEAR[year]?.length) return "unavailable";
  return PROVISIONAL_YEARS.includes(year) ? "provisional" : "official";
}

function toApiHoliday(holiday: Holiday): ApiHoliday {
  const [y, m, d] = holiday.date.split("-").map(Number);
  const date = utcDate(y, m, d);
  const weekday = isoWeekday(date);
  return {
    date: holiday.date,
    name: holiday.name,
    category: holiday.category,
    isProvisional: holiday.isProvisional === true,
    weekday,
    weekdayName: DAY_NAMES_FULL_ID[weekday - 1],
  };
}

export function getApiHolidays(year: number): ApiHoliday[] {
  return (HOLIDAYS_BY_YEAR[year] ?? [])
    .map(toApiHoliday)
    .sort((a, b) => (a.date === b.date ? a.name.localeCompare(b.name) : a.date.localeCompare(b.date)));
}

function groupByDate(holidays: ApiHoliday[]): Map<string, ApiHoliday[]> {
  const map = new Map<string, ApiHoliday[]>();
  for (const holiday of holidays) {
    const existing = map.get(holiday.date);
    if (existing) existing.push(holiday);
    else map.set(holiday.date, [holiday]);
  }
  return map;
}

export function buildMonth(year: number, month: number, byDate: Map<string, ApiHoliday[]>): ApiMonth {
  const total = daysInMonth(year, month);
  const days: ApiDay[] = [];
  let dayOfYear = 0;
  for (let m = 1; m < month; m += 1) dayOfYear += daysInMonth(year, m);

  for (let day = 1; day <= total; day += 1) {
    const date = utcDate(year, month, day);
    const key = toDateKey(date);
    const weekday = isoWeekday(date);
    const holidays = byDate.get(key) ?? [];
    const isNationalHoliday = holidays.some((h) => h.category === "national");
    const isCutiBersama = holidays.some((h) => h.category === "cuti-bersama");

    days.push({
      date: key,
      day,
      month,
      year,
      weekday,
      weekdayName: DAY_NAMES_FULL_ID[weekday - 1],
      weekdayNameEn: DAY_NAMES_FULL_EN[weekday - 1],
      dayOfYear: dayOfYear + day,
      isoWeek: isoWeekNumber(date),
      isWeekend: weekday >= 6,
      isNationalHoliday,
      isCutiBersama,
      isHoliday: holidays.length > 0,
      holidays,
      hijri: toHijri(date),
    });
  }

  return {
    month,
    name: MONTH_NAMES_ID[month - 1],
    nameEn: MONTH_NAMES_EN[month - 1],
    totalDays: total,
    firstWeekday: isoWeekday(utcDate(year, month, 1)),
    days,
  };
}

/** Rentetan >= 3 hari berturut-turut yang semuanya libur (akhir pekan/libur/cuti bersama). */
export function findLongWeekends(months: ApiMonth[]): LongWeekend[] {
  const all = months.flatMap((month) => month.days);
  const result: LongWeekend[] = [];
  let run: ApiDay[] = [];

  const flush = () => {
    if (run.length >= 3 && run.some((d) => d.isHoliday)) {
      result.push({
        start: run[0].date,
        end: run[run.length - 1].date,
        totalDays: run.length,
        dates: run.map((d) => d.date),
      });
    }
    run = [];
  };

  for (const day of all) {
    if (day.isWeekend || day.isHoliday) run.push(day);
    else flush();
  }
  flush();

  return result;
}

function buildSummary(year: number, months: ApiMonth[], holidays: ApiHoliday[]): CalendarYearSummary {
  const nationals = holidays.filter((h) => h.category === "national");
  return {
    totalDays: isLeapYear(year) ? 366 : 365,
    isLeapYear: isLeapYear(year),
    nationalHolidayCount: nationals.length,
    cutiBersamaCount: holidays.filter((h) => h.category === "cuti-bersama").length,
    holidaysOnWeekend: nationals.filter((h) => h.weekday >= 6).length,
    longWeekends: findLongWeekends(months),
  };
}

function buildMeta(year: number, now: Date): CalendarApiMeta {
  const status = getYearStatus(year);
  return {
    schemaVersion: CALENDAR_API_SCHEMA_VERSION,
    generatedAt: now.toISOString(),
    calendar: "masehi",
    timezone: "Asia/Jakarta",
    year,
    status,
    source: getHolidaySource(year, status !== "unavailable", status === "provisional"),
  };
}

/**
 * Payload satu tahun penuh. Bentuknya identik untuk tahun mana pun —
 * tahun tanpa data libur tetap mengembalikan 12 bulan lengkap dengan
 * `holidays: []` dan `status: "unavailable"`.
 */
export function buildCalendarYearResponse(
  year: number,
  options: { month?: number; now?: Date } = {},
): CalendarYearResponse {
  const now = options.now ?? new Date();
  const holidays = getApiHolidays(year);
  const byDate = groupByDate(holidays);
  const allMonths = Array.from({ length: 12 }, (_, i) => buildMonth(year, i + 1, byDate));
  const months = options.month ? allMonths.filter((m) => m.month === options.month) : allMonths;

  return {
    ...buildMeta(year, now),
    summary: buildSummary(year, allMonths, holidays),
    holidays: options.month
      ? holidays.filter((h) => Number(h.date.slice(5, 7)) === options.month)
      : holidays,
    months,
  };
}

/** Payload ringan: hanya daftar libur + ringkasan, tanpa 365 hari. */
export function buildCalendarHolidaysResponse(
  year: number,
  options: { now?: Date } = {},
): CalendarHolidaysResponse {
  const now = options.now ?? new Date();
  const holidays = getApiHolidays(year);
  const byDate = groupByDate(holidays);
  const months = Array.from({ length: 12 }, (_, i) => buildMonth(year, i + 1, byDate));

  return {
    ...buildMeta(year, now),
    summary: buildSummary(year, months, holidays),
    holidays,
  };
}
