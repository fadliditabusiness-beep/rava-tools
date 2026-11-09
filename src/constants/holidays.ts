import type { Holiday } from "@/interfaces/calendar";

// Sumber: SKB 3 Menteri (Menag, Menaker, Menpan-RB) & Keppres hari libur.
// 2025, 2026, dan 2027 sudah final berdasarkan SKB resmi.
// Tahun tanpa SKB ditandai lewat PROVISIONAL_YEARS + flag isProvisional per entri.

const HOLIDAYS_2025: Holiday[] = [
  { date: "2025-01-01", name: "Tahun Baru Masehi 2025", category: "national" },
  { date: "2025-01-27", name: "Isra Mikraj Nabi Muhammad SAW", category: "national" },
  { date: "2025-01-28", name: "Cuti Bersama Tahun Baru Imlek", category: "cuti-bersama" },
  { date: "2025-01-29", name: "Tahun Baru Imlek 2576 Kongzili", category: "national" },
  { date: "2025-03-28", name: "Cuti Bersama Hari Suci Nyepi", category: "cuti-bersama" },
  { date: "2025-03-29", name: "Hari Suci Nyepi (Tahun Baru Saka 1947)", category: "national" },
  { date: "2025-03-31", name: "Hari Raya Idul Fitri 1446 H (hari ke-1)", category: "national" },
  { date: "2025-04-01", name: "Hari Raya Idul Fitri 1446 H (hari ke-2)", category: "national" },
  { date: "2025-04-02", name: "Cuti Bersama Idul Fitri", category: "cuti-bersama" },
  { date: "2025-04-03", name: "Cuti Bersama Idul Fitri", category: "cuti-bersama" },
  { date: "2025-04-04", name: "Cuti Bersama Idul Fitri", category: "cuti-bersama" },
  { date: "2025-04-07", name: "Cuti Bersama Idul Fitri", category: "cuti-bersama" },
  { date: "2025-04-18", name: "Wafat Yesus Kristus", category: "national" },
  { date: "2025-04-20", name: "Kebangkitan Yesus Kristus (Paskah)", category: "national" },
  { date: "2025-05-01", name: "Hari Buruh Internasional", category: "national" },
  { date: "2025-05-12", name: "Hari Raya Waisak 2569 BE", category: "national" },
  { date: "2025-05-13", name: "Cuti Bersama Hari Raya Waisak", category: "cuti-bersama" },
  { date: "2025-05-29", name: "Kenaikan Yesus Kristus", category: "national" },
  { date: "2025-05-30", name: "Cuti Bersama Kenaikan Yesus Kristus", category: "cuti-bersama" },
  { date: "2025-06-01", name: "Hari Lahir Pancasila", category: "national" },
  { date: "2025-06-06", name: "Hari Raya Idul Adha 1446 H", category: "national" },
  { date: "2025-06-09", name: "Cuti Bersama Idul Adha", category: "cuti-bersama" },
  { date: "2025-06-27", name: "1 Muharam, Tahun Baru Islam 1447 H", category: "national" },
  { date: "2025-08-17", name: "Hari Ulang Tahun ke-80 Kemerdekaan RI", category: "national" },
  { date: "2025-08-18", name: "Cuti Bersama HUT ke-80 Kemerdekaan RI", category: "cuti-bersama" },
  { date: "2025-09-05", name: "Maulid Nabi Muhammad SAW", category: "national" },
  { date: "2025-12-25", name: "Hari Raya Natal", category: "national" },
  { date: "2025-12-26", name: "Cuti Bersama Hari Raya Natal", category: "cuti-bersama" },
];

const HOLIDAYS_2026: Holiday[] = [
  { date: "2026-01-01", name: "Tahun Baru Masehi 2026", category: "national" },
  { date: "2026-01-16", name: "Isra Mikraj Nabi Muhammad SAW", category: "national" },
  { date: "2026-02-16", name: "Cuti Bersama Tahun Baru Imlek", category: "cuti-bersama" },
  { date: "2026-02-17", name: "Tahun Baru Imlek 2577 Kongzili", category: "national" },
  { date: "2026-03-18", name: "Cuti Bersama Hari Suci Nyepi", category: "cuti-bersama" },
  { date: "2026-03-19", name: "Hari Suci Nyepi (Tahun Baru Saka 1948)", category: "national" },
  { date: "2026-03-20", name: "Cuti Bersama Idul Fitri", category: "cuti-bersama" },
  { date: "2026-03-21", name: "Hari Raya Idul Fitri 1447 H (hari ke-1)", category: "national" },
  { date: "2026-03-22", name: "Hari Raya Idul Fitri 1447 H (hari ke-2)", category: "national" },
  { date: "2026-03-23", name: "Cuti Bersama Idul Fitri", category: "cuti-bersama" },
  { date: "2026-03-24", name: "Cuti Bersama Idul Fitri", category: "cuti-bersama" },
  { date: "2026-04-03", name: "Wafat Yesus Kristus", category: "national" },
  { date: "2026-04-05", name: "Kebangkitan Yesus Kristus (Paskah)", category: "national" },
  { date: "2026-05-01", name: "Hari Buruh Internasional", category: "national" },
  { date: "2026-05-14", name: "Kenaikan Yesus Kristus", category: "national" },
  { date: "2026-05-15", name: "Cuti Bersama Kenaikan Yesus Kristus", category: "cuti-bersama" },
  { date: "2026-05-27", name: "Hari Raya Idul Adha 1447 H", category: "national" },
  { date: "2026-05-28", name: "Cuti Bersama Idul Adha", category: "cuti-bersama" },
  { date: "2026-05-31", name: "Hari Raya Waisak 2570 BE", category: "national" },
  { date: "2026-06-01", name: "Hari Lahir Pancasila", category: "national" },
  { date: "2026-06-16", name: "1 Muharam, Tahun Baru Islam 1448 H", category: "national" },
  { date: "2026-08-17", name: "Proklamasi Kemerdekaan RI", category: "national" },
  { date: "2026-08-25", name: "Maulid Nabi Muhammad SAW", category: "national" },
  { date: "2026-12-24", name: "Cuti Bersama Hari Raya Natal", category: "cuti-bersama" },
  { date: "2026-12-25", name: "Hari Raya Natal", category: "national" },
];

// SKB 3 Menteri Nomor 1205 Tahun 2026, Nomor 3 Tahun 2026, Nomor 2 Tahun 2026
// tentang Hari Libur Nasional dan Cuti Bersama Tahun 2027, ditetapkan 15 September 2026.
// 18 hari libur nasional + 8 hari cuti bersama.
// Catatan: tanggal 1 Ramadan, Idulfitri, dan Iduladha 1448 H tetap ditetapkan lewat
// Keputusan Menteri Agama (sidang isbat), bukan oleh SKB ini.
const HOLIDAYS_2027: Holiday[] = [
  { date: "2027-01-01", name: "Tahun Baru 2027 Masehi", category: "national" },
  { date: "2027-01-05", name: "Isra Mikraj Nabi Muhammad SAW 1448 Hijriah", category: "national" },
  { date: "2027-02-05", name: "Cuti Bersama Tahun Baru Imlek 2578 Kongzili", category: "cuti-bersama" },
  { date: "2027-02-06", name: "Tahun Baru Imlek 2578 Kongzili", category: "national" },
  { date: "2027-03-08", name: "Hari Suci Nyepi (Tahun Baru Saka 1949)", category: "national" },
  { date: "2027-03-09", name: "Cuti Bersama Hari Raya Idulfitri 1448 Hijriah", category: "cuti-bersama" },
  { date: "2027-03-10", name: "Idulfitri 1448 Hijriah (hari ke-1)", category: "national" },
  { date: "2027-03-11", name: "Idulfitri 1448 Hijriah (hari ke-2)", category: "national" },
  { date: "2027-03-12", name: "Cuti Bersama Hari Raya Idulfitri 1448 Hijriah", category: "cuti-bersama" },
  { date: "2027-03-15", name: "Cuti Bersama Hari Raya Idulfitri 1448 Hijriah", category: "cuti-bersama" },
  { date: "2027-03-25", name: "Cuti Bersama Wafat Yesus Kristus", category: "cuti-bersama" },
  { date: "2027-03-26", name: "Wafat Yesus Kristus", category: "national" },
  { date: "2027-03-28", name: "Hari Kebangkitan Yesus Kristus (Paskah)", category: "national" },
  { date: "2027-05-01", name: "Hari Buruh Internasional", category: "national" },
  { date: "2027-05-06", name: "Kenaikan Yesus Kristus", category: "national" },
  { date: "2027-05-17", name: "Iduladha 1448 Hijriah", category: "national" },
  { date: "2027-05-18", name: "Cuti Bersama Iduladha 1448 Hijriah", category: "cuti-bersama" },
  { date: "2027-05-19", name: "Cuti Bersama Waisak 2571 BE", category: "cuti-bersama" },
  { date: "2027-05-20", name: "Hari Raya Waisak 2571 BE", category: "national" },
  { date: "2027-06-01", name: "Hari Lahir Pancasila", category: "national" },
  { date: "2027-06-06", name: "1 Muharam Tahun Baru Islam 1449 Hijriah", category: "national" },
  { date: "2027-08-15", name: "Maulid Nabi Muhammad SAW", category: "national" },
  { date: "2027-08-17", name: "Proklamasi Kemerdekaan", category: "national" },
  { date: "2027-12-24", name: "Cuti Bersama Kelahiran Yesus Kristus (Natal)", category: "cuti-bersama" },
  { date: "2027-12-25", name: "Kelahiran Yesus Kristus (Natal)", category: "national" },
  { date: "2027-12-26", name: "Isra Mikraj Nabi Muhammad SAW 1449 Hijriah", category: "national" },
];

export const HOLIDAYS_BY_YEAR: Record<number, Holiday[]> = {
  2025: HOLIDAYS_2025,
  2026: HOLIDAYS_2026,
  2027: HOLIDAYS_2027,
};

// Tahun yang datanya masih estimasi (belum ada SKB resmi). Kosong: 2025-2027 sudah ber-SKB.
export const PROVISIONAL_YEARS: readonly number[] = [];

export function getHolidayMap(): Map<string, Holiday[]> {
  const map = new Map<string, Holiday[]>();
  for (const holidays of Object.values(HOLIDAYS_BY_YEAR)) {
    for (const holiday of holidays) {
      const existing = map.get(holiday.date);
      if (existing) {
        existing.push(holiday);
      } else {
        map.set(holiday.date, [holiday]);
      }
    }
  }
  return map;
}
