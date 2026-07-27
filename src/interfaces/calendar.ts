export type HolidayCategory = "national" | "cuti-bersama";

export interface Holiday {
  date: string; // Gregorian date, YYYY-MM-DD
  name: string;
  category: HolidayCategory;
  isProvisional?: boolean;
}

export interface GregorianDay {
  date: Date;
  day: number;
  inCurrentMonth: boolean;
  isToday: boolean;
  isSunday: boolean;
  holidays: Holiday[];
}

export interface GregorianMonth {
  monthIndex: number; // 0-11
  name: string;
  days: GregorianDay[];
}

export interface HijriDay {
  hijriDay: number;
  gregorianDate: Date;
  isToday: boolean;
  isSunday: boolean;
  holidays: Holiday[];
}

export interface HijriMonth {
  monthIndex: number; // 0-11
  name: string;
  days: HijriDay[];
}

export type CalendarSystem = "masehi" | "hijriah";
