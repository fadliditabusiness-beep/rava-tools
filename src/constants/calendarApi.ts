import type {
  CalendarApiSchemaVersion,
  CalendarApiSource,
  CalendarApiSourceDocument,
} from "@/interfaces/calendarApi";

export const CALENDAR_API_SCHEMA_VERSION: CalendarApiSchemaVersion = "1.0.0";

/** Cache publik: 24 jam segar, boleh stale 7 hari saat revalidasi. */
export const CALENDAR_API_CACHE_CONTROL =
  "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800";

export const DAY_NAMES_FULL_ID = [
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
  "Minggu",
] as const;

export const DAY_NAMES_FULL_EN = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export const MONTH_NAMES_EN = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

/**
 * Dokumen rujukan per tahun. `number` sengaja `null` kalau nomor SKB-nya
 * belum diverifikasi ulang — jangan isi dengan tebakan.
 */
export const HOLIDAY_SOURCE_DOCUMENTS: Record<number, CalendarApiSourceDocument[]> = {
  2025: [
    {
      title: "SKB 3 Menteri tentang Hari Libur Nasional dan Cuti Bersama Tahun 2025",
      number: null,
      publishedAt: null,
      url: "https://www.kemenag.go.id/",
    },
  ],
  2026: [
    {
      title: "SKB 3 Menteri tentang Hari Libur Nasional dan Cuti Bersama Tahun 2026",
      number: null,
      publishedAt: null,
      url: "https://www.kemenag.go.id/",
    },
  ],
  2027: [],
};

const BASE_SOURCE = {
  calendar:
    "Dihitung sendiri (kalender Gregorian proleptik, aritmetika UTC) — tidak memanggil API pihak ketiga.",
  hijri:
    "Intl.DateTimeFormat kalender islamic-umalqura (Umm al-Qura) bawaan ICU/CLDR di Node.js runtime.",
} as const;

export function getHolidaySource(year: number, hasData: boolean, isProvisional: boolean): CalendarApiSource {
  if (!hasData) {
    return {
      ...BASE_SOURCE,
      holidays: `Belum ada data libur untuk ${year} di src/constants/holidays.ts.`,
      documents: [],
      note: "Grid tanggal tetap akurat; array holidays kosong sampai data tahun ini ditambahkan.",
    };
  }

  return {
    ...BASE_SOURCE,
    holidays: isProvisional
      ? "Estimasi hisab dari sumber pihak ketiga, menunggu SKB 3 Menteri resmi."
      : "SKB 3 Menteri (Menag, Menaker, Menpan-RB) dan Keppres hari libur nasional.",
    documents: HOLIDAY_SOURCE_DOCUMENTS[year] ?? [],
    note: isProvisional
      ? "Tanggal libur keagamaan bisa berubah saat SKB resmi terbit. Cek field isProvisional per hari libur."
      : null,
  };
}
