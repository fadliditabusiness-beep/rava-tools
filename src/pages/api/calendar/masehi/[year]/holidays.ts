import type { NextApiRequest, NextApiResponse } from "next";
import type { CalendarApiError, CalendarHolidaysResponse } from "@/interfaces/calendarApi";
import { buildCalendarHolidaysResponse } from "@/utils/calendarApi";
import { applyCalendarHeaders, handleNonGet, parseYear } from "@/utils/api/calendarResponse";

/**
 * GET /api/calendar/masehi/:year/holidays
 * Payload ringan: hanya libur nasional + cuti bersama & ringkasan tahun.
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CalendarHolidaysResponse | CalendarApiError>,
) {
  if (handleNonGet(req, res)) return;

  const year = parseYear(req.query.year);
  if (!year.ok) {
    res.status(400).json(year.error);
    return;
  }

  applyCalendarHeaders(res);
  res.status(200).json(buildCalendarHolidaysResponse(year.value));
}
