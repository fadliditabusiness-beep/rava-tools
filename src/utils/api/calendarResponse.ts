import type { NextApiRequest, NextApiResponse } from "next";
import { CALENDAR_API_CACHE_CONTROL } from "@/constants/calendarApi";
import { MAX_YEAR, MIN_YEAR } from "@/constants/calendar";
import type { CalendarApiError } from "@/interfaces/calendarApi";

/** Header bersama untuk semua endpoint kalender (read-only, publik). */
export function applyCalendarHeaders(res: NextApiResponse): void {
  res.setHeader("Cache-Control", CALENDAR_API_CACHE_CONTROL);
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
}

/**
 * Menangani OPTIONS + menolak method selain GET.
 * Mengembalikan `true` kalau request sudah selesai ditangani di sini.
 */
export function handleNonGet(
  req: NextApiRequest,
  res: NextApiResponse<CalendarApiError>,
): boolean {
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return true;
  }
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET, OPTIONS");
    res.status(405).json({
      error: { code: "method_not_allowed", message: `Method ${req.method} tidak didukung. Pakai GET.` },
    });
    return true;
  }
  return false;
}

export type Parsed<T> = { ok: true; value: T } | { ok: false; error: CalendarApiError };

export function parseYear(raw: unknown): Parsed<number> {
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (typeof value !== "string" || !/^\d{4}$/.test(value)) {
    return {
      ok: false,
      error: { error: { code: "invalid_year", message: "Tahun harus 4 digit angka, contoh: 2026." } },
    };
  }
  const year = Number(value);
  if (year < MIN_YEAR || year > MAX_YEAR) {
    return {
      ok: false,
      error: {
        error: {
          code: "year_out_of_range",
          message: `Tahun harus antara ${MIN_YEAR} dan ${MAX_YEAR}.`,
        },
      },
    };
  }
  return { ok: true, value: year };
}

export function parseMonth(raw: unknown): Parsed<number | undefined> {
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (value === undefined || value === "") return { ok: true, value: undefined };
  const month = Number(value);
  if (!Number.isInteger(month) || month < 1 || month > 12) {
    return {
      ok: false,
      error: { error: { code: "invalid_month", message: "Parameter month harus 1-12." } },
    };
  }
  return { ok: true, value: month };
}
