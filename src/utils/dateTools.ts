import { formatDateKey } from "@/utils/calendar";

export function parseDateInputValue(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const [, y, m, d] = match;
  const date = new Date(Number(y), Number(m) - 1, Number(d));
  return Number.isNaN(date.getTime()) ? null : date;
}

export { formatDateKey as toDateInputValue };

export interface CalendarDiff {
  years: number;
  months: number;
  days: number;
  totalDays: number;
}

export function diffCalendar(from: Date, to: Date): CalendarDiff {
  const [start, end] = from <= to ? [from, to] : [to, from];

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
    const lastDayOfPrevMonth = new Date(end.getFullYear(), end.getMonth(), 0).getDate();
    days += lastDayOfPrevMonth;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalDays = Math.round((end.getTime() - start.getTime()) / 86_400_000);

  return { years, months, days, totalDays };
}

export function addDaysToDate(date: Date, amount: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + amount);
  return result;
}

export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

export function countWorkdaysBetween(
  from: Date,
  to: Date,
  holidayKeys: Set<string>,
): number {
  const [start, end] = from <= to ? [from, to] : [to, from];

  let count = 0;
  const cursor = new Date(start);
  cursor.setDate(cursor.getDate() + 1);
  while (cursor <= end) {
    if (!isWeekend(cursor) && !holidayKeys.has(formatDateKey(cursor))) {
      count++;
    }
    cursor.setDate(cursor.getDate() + 1);
  }

  return from <= to ? count : -count;
}

export function addWorkdays(start: Date, amount: number, holidayKeys: Set<string>): Date {
  const step = amount >= 0 ? 1 : -1;
  let remaining = Math.abs(amount);
  const cursor = new Date(start);

  while (remaining > 0) {
    cursor.setDate(cursor.getDate() + step);
    if (!isWeekend(cursor) && !holidayKeys.has(formatDateKey(cursor))) {
      remaining--;
    }
  }

  return cursor;
}

export function daysUntil(target: Date, today: Date): number {
  const t = new Date(target.getFullYear(), target.getMonth(), target.getDate());
  const n = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return Math.round((t.getTime() - n.getTime()) / 86_400_000);
}

export function nextBirthday(birthDate: Date, today: Date): { date: Date; daysUntil: number } {
  let next = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  if (daysUntil(next, today) < 0) {
    next = new Date(today.getFullYear() + 1, birthDate.getMonth(), birthDate.getDate());
  }
  return { date: next, daysUntil: daysUntil(next, today) };
}

export function nextAnnualDate(month: number, day: number, today: Date): Date {
  let candidate = new Date(today.getFullYear(), month - 1, day);
  if (daysUntil(candidate, today) < 0) {
    candidate = new Date(today.getFullYear() + 1, month - 1, day);
  }
  return candidate;
}

export function dayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 1);
  return Math.round((date.getTime() - start.getTime()) / 86_400_000) + 1;
}

export function daysRemainingInYear(date: Date): number {
  const end = new Date(date.getFullYear(), 11, 31);
  return Math.round((end.getTime() - date.getTime()) / 86_400_000);
}

export function isoWeekNumber(date: Date): number {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const dayNum = d.getDay() || 7;
  d.setDate(d.getDate() + 4 - dayNum);
  const yearStart = new Date(d.getFullYear(), 0, 1);
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7);
}

export function countWeekendDays(from: Date, to: Date): number {
  const [start, end] = from <= to ? [from, to] : [to, from];
  let count = 0;
  const cursor = new Date(start);
  while (cursor <= end) {
    if (isWeekend(cursor)) count++;
    cursor.setDate(cursor.getDate() + 1);
  }
  return count;
}
