import type { NextApiRequest, NextApiResponse } from "next";
import type { CalendarApiError, CalendarYearResponse } from "@/interfaces/calendarApi";
import { buildCalendarYearResponse } from "@/utils/calendarApi";
import {
  applyCalendarHeaders,
  handleNonGet,
  parseMonth,
  parseYear,
} from "@/utils/api/calendarResponse";

/**
 * GET /api/calendar/masehi/:year        -> kalender Masehi satu tahun penuh
 * GET /api/calendar/masehi/:year?month=3 -> hanya bulan tertentu (bentuk sama)
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CalendarYearResponse | CalendarApiError>,
) {
  if (handleNonGet(req, res)) return;

  const year = parseYear(req.query.year);
  if (!year.ok) {
    res.status(400).json(year.error);
    return;
  }

  const month = parseMonth(req.query.month);
  if (!month.ok) {
    res.status(400).json(month.error);
    return;
  }

  applyCalendarHeaders(res);
  res.status(200).json(buildCalendarYearResponse(year.value, { month: month.value }));
}
