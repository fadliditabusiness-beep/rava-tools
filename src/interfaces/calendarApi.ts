import type { HolidayCategory } from "@/interfaces/calendar";

/** Bumped only on a breaking change to the payload shape. */
export type CalendarApiSchemaVersion = "1.0.0";

/** Seberapa resmi data libur untuk satu tahun. */
export type YearDataStatus = "official" | "provisional" | "unavailable";

export interface CalendarApiSourceDocument {
  title: string;
  /** Nomor SKB/Keppres. `null` jika belum diverifikasi. */
  number: string | null;
  publishedAt: string | null;
  url: string | null;
}

export interface CalendarApiSource {
  /** Dari mana tanggal grid kalender dihitung. */
  calendar: string;
  /** Dari mana konversi Hijriah diambil. */
  hijri: string;
  /** Dari mana daftar libur diambil. */
  holidays: string;
  documents: CalendarApiSourceDocument[];
  note: string | null;
}

export interface ApiHoliday {
  date: string;
  name: string;
  category: HolidayCategory;
  /** `true` = masih estimasi, belum ada SKB resmi. */
  isProvisional: boolean;
  weekday: number;
  weekdayName: string;
}

export interface ApiHijriDate {
  year: number;
  month: number;
  day: number;
  monthName: string;
}

export interface ApiDay {
  date: string;
  day: number;
  month: number;
  year: number;
  /** ISO-8601: 1 = Senin … 7 = Minggu. */
  weekday: number;
  weekdayName: string;
  weekdayNameEn: string;
  dayOfYear: number;
  isoWeek: number;
  isWeekend: boolean;
  isNationalHoliday: boolean;
  isCutiBersama: boolean;
  isHoliday: boolean;
  holidays: ApiHoliday[];
  hijri: ApiHijriDate;
}

export interface ApiMonth {
  month: number;
  name: string;
  nameEn: string;
  totalDays: number;
  /** Hari pertama bulan ini, ISO weekday 1-7. Untuk menyusun grid. */
  firstWeekday: number;
  days: ApiDay[];
}

export interface CalendarApiMeta {
  schemaVersion: CalendarApiSchemaVersion;
  generatedAt: string;
  calendar: "masehi";
  timezone: "Asia/Jakarta";
  year: number;
  status: YearDataStatus;
  source: CalendarApiSource;
}

export interface CalendarYearSummary {
  totalDays: number;
  isLeapYear: boolean;
  nationalHolidayCount: number;
  cutiBersamaCount: number;
  /** Libur nasional yang jatuh pada Sabtu/Minggu. */
  holidaysOnWeekend: number;
  longWeekends: LongWeekend[];
}

export interface LongWeekend {
  start: string;
  end: string;
  totalDays: number;
  dates: string[];
}

export interface CalendarYearResponse extends CalendarApiMeta {
  summary: CalendarYearSummary;
  holidays: ApiHoliday[];
  months: ApiMonth[];
}

export interface CalendarHolidaysResponse extends CalendarApiMeta {
  summary: Omit<CalendarYearSummary, "longWeekends"> & { longWeekends: LongWeekend[] };
  holidays: ApiHoliday[];
}

export interface CalendarYearIndexEntry {
  year: number;
  status: YearDataStatus;
  nationalHolidayCount: number;
  cutiBersamaCount: number;
  url: string;
  holidaysUrl: string;
}

export interface CalendarIndexResponse {
  schemaVersion: CalendarApiSchemaVersion;
  generatedAt: string;
  calendar: "masehi";
  timezone: "Asia/Jakarta";
  minYear: number;
  maxYear: number;
  /** Tahun yang punya data libur (official/provisional). */
  years: CalendarYearIndexEntry[];
  source: CalendarApiSource;
  endpoints: { path: string; description: string }[];
}

export interface CalendarApiError {
  error: {
    code: "invalid_year" | "year_out_of_range" | "invalid_month" | "method_not_allowed";
    message: string;
  };
}
