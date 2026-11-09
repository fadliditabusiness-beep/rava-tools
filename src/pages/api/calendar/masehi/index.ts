import type { NextApiRequest, NextApiResponse } from "next";
import { MAX_YEAR, MIN_YEAR } from "@/constants/calendar";
import { CALENDAR_API_SCHEMA_VERSION, getHolidaySource } from "@/constants/calendarApi";
import { HOLIDAYS_BY_YEAR } from "@/constants/holidays";
import type {
  CalendarApiError,
  CalendarIndexResponse,
  CalendarYearIndexEntry,
} from "@/interfaces/calendarApi";
import { getYearStatus } from "@/utils/calendarApi";
import { applyCalendarHeaders, handleNonGet } from "@/utils/api/calendarResponse";

/**
 * GET /api/calendar/masehi
 * Discovery: tahun mana saja yang punya data libur, statusnya, dan daftar endpoint.
 * Klien iOS sebaiknya memanggil ini dulu untuk tahu tahun baru sudah tersedia.
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CalendarIndexResponse | CalendarApiError>,
) {
  if (handleNonGet(req, res)) return;

  const years: CalendarYearIndexEntry[] = Object.keys(HOLIDAYS_BY_YEAR)
    .map(Number)
    .sort((a, b) => a - b)
    .map((year) => {
      const holidays = HOLIDAYS_BY_YEAR[year] ?? [];
      return {
        year,
        status: getYearStatus(year),
        nationalHolidayCount: holidays.filter((h) => h.category === "national").length,
        cutiBersamaCount: holidays.filter((h) => h.category === "cuti-bersama").length,
        url: `/api/calendar/masehi/${year}`,
        holidaysUrl: `/api/calendar/masehi/${year}/holidays`,
      };
    });

  applyCalendarHeaders(res);
  res.status(200).json({
    schemaVersion: CALENDAR_API_SCHEMA_VERSION,
    generatedAt: new Date().toISOString(),
    calendar: "masehi",
    timezone: "Asia/Jakarta",
    minYear: MIN_YEAR,
    maxYear: MAX_YEAR,
    years,
    source: getHolidaySource(new Date().getUTCFullYear(), true, false),
    endpoints: [
      { path: "/api/calendar/masehi", description: "Daftar tahun yang tersedia + metadata sumber." },
      {
        path: "/api/calendar/masehi/{year}",
        description: "Kalender satu tahun penuh (12 bulan, semua hari, Hijriah, libur).",
      },
      {
        path: "/api/calendar/masehi/{year}?month={1-12}",
        description: "Sama, tapi hanya satu bulan.",
      },
      {
        path: "/api/calendar/masehi/{year}/holidays",
        description: "Hanya libur nasional + cuti bersama & ringkasan tahun.",
      },
    ],
  });
}
