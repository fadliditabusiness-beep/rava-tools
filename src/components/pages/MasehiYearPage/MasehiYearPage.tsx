import { useMemo } from "react";
import CalendarPageTemplate from "@/components/templates/CalendarPageTemplate/CalendarPageTemplate";
import YearCalendarGrid from "@/components/organisms/YearCalendarGrid/YearCalendarGrid";
import HolidayListPanel from "@/components/organisms/HolidayListPanel/HolidayListPanel";
import YearSwitcher from "@/components/molecules/YearSwitcher/YearSwitcher";
import CalendarSystemToggle from "@/components/molecules/CalendarSystemToggle/CalendarSystemToggle";
import { HOLIDAYS_BY_YEAR, PROVISIONAL_YEARS, getHolidayMap } from "@/constants/holidays";
import { buildGregorianYear, gregorianDateToHijriYear } from "@/utils/calendar";

export interface MasehiYearPageProps {
  year: number;
}

export default function MasehiYearPage({ year }: MasehiYearPageProps) {
  const today = useMemo(() => new Date(), []);
  const holidayMap = useMemo(() => getHolidayMap(), []);
  const months = useMemo(() => buildGregorianYear(year, holidayMap, today), [year, holidayMap, today]);
  const holidaysThisYear = HOLIDAYS_BY_YEAR[year] ?? [];
  const isProvisional = PROVISIONAL_YEARS.includes(year);
  const hijriEquivalentYear = useMemo(() => gregorianDateToHijriYear(new Date(year, 6, 1)), [year]);

  return (
    <CalendarPageTemplate
      headerControls={
        <div className="flex flex-col items-center gap-3">
          <CalendarSystemToggle
            active="masehi"
            masehiHref={`/masehi/${year}`}
            hijriahHref={`/hijriah/${hijriEquivalentYear}`}
          />
          <YearSwitcher basePath="/masehi" year={year} />
        </div>
      }
      calendarGrid={<YearCalendarGrid months={months} />}
      holidayList={<HolidayListPanel holidays={holidaysThisYear} />}
      hasProvisionalData={isProvisional}
      provisionalBanner={
        isProvisional ? (
          <div className="mb-4 rounded-md bg-amber-50 px-4 py-2 text-sm text-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
            SKB cuti bersama {year} belum terbit — tanggal libur keagamaan di bawah masih
            perkiraan.
          </div>
        ) : undefined
      }
    />
  );
}
