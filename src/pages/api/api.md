# Pages / API

## Overview

Next.js API Routes — server-side endpoints bundled with the app, reachable at `/api/*`. Separate from `src/services/*`, which call *external* backends; this folder is for endpoints the Next.js server itself handles.

## Responsibilities

- Handle a request/response pair on the Next.js server for a given `/api/<name>` path.

## Current contents

```text
pages/api/
├── hello.ts                         # GET /api/hello (starter boilerplate)
└── calendar/masehi/
    ├── index.ts                     # GET /api/calendar/masehi
    ├── [year].ts                    # GET /api/calendar/masehi/:year(?month=1-12)
    └── [year]/holidays.ts           # GET /api/calendar/masehi/:year/holidays
```

### Kalender Masehi API (publik, read-only)

Dipakai klien eksternal (mis. app iOS). Bentuk payload **sama untuk semua tahun**,
termasuk tahun yang belum punya data libur (`status: "unavailable"`, `holidays: []`).

| Endpoint | Isi |
| --- | --- |
| `GET /api/calendar/masehi` | Discovery: tahun tersedia, status per tahun, metadata sumber, daftar endpoint. |
| `GET /api/calendar/masehi/{year}` | 12 bulan, semua hari (weekday, ISO week, dayOfYear, Hijriah, libur), ringkasan, long weekend. |
| `GET /api/calendar/masehi/{year}?month={1-12}` | Sama, difilter satu bulan. |
| `GET /api/calendar/masehi/{year}/holidays` | Payload ringan: hanya libur + ringkasan. |

- Validasi: tahun 4 digit dalam `MIN_YEAR`–`MAX_YEAR` (400 `invalid_year` / `year_out_of_range`),
  `month` 1-12 (400 `invalid_month`), selain GET/OPTIONS -> 405 `method_not_allowed`.
- `schemaVersion` hanya naik saat ada breaking change pada bentuk payload.
- Cache: `public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800`, plus CORS `*`.

Sumber data:

- Grid tanggal: dihitung sendiri dengan aritmetika UTC (`src/utils/calendarApi.ts`) — tanpa API pihak ketiga,
  tanpa bergantung timezone server.
- Hijriah: `Intl.DateTimeFormat` kalender `islamic-umalqura` (ICU/CLDR bawaan Node.js).
- Hari libur: `src/constants/holidays.ts`, dari SKB 3 Menteri / Keppres. Tahun yang belum ber-SKB
  ditandai `status: "provisional"` + `isProvisional: true` per hari libur.

Menambah tahun baru: tambahkan array tahun di `src/constants/holidays.ts`, daftarkan di
`HOLIDAYS_BY_YEAR`, perbarui `PROVISIONAL_YEARS` dan `HOLIDAY_SOURCE_DOCUMENTS`
(`src/constants/calendarApi.ts`). Tidak ada route baru yang perlu dibuat.

## Rules

✅ Each file exports a default `(req, res) => void` handler.

✅ Runs server-side only — safe to use secrets not exposed via `NEXT_PUBLIC_*`.

❌ Must not be confused with `src/services/*` (client calls to external APIs).

❌ `hello.ts` is unused starter boilerplate — remove or keep as a health-check reference.

## Best Practices

- Only add a route here when the app needs its own backend-for-frontend endpoint (e.g. proxying a request, hiding a secret). Calls to a real backend go through `services/` + `hooks/api/`, not here.
