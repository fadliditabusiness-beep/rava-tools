import { useMemo } from "react";
import CalendarPageTemplate from "@/components/templates/CalendarPageTemplate/CalendarPageTemplate";
import HijriYearCalendarGrid from "@/components/organisms/HijriYearCalendarGrid/HijriYearCalendarGrid";
import HolidayListPanel from "@/components/organisms/HolidayListPanel/HolidayListPanel";
import YearSwitcher from "@/components/molecules/YearSwitcher/YearSwitcher";
import CalendarSystemToggle from "@/components/molecules/CalendarSystemToggle/CalendarSystemToggle";
import { getHolidayMap } from "@/constants/holidays";
import { buildHijriYear } from "@/utils/calendar";

export interface HijriahYearPageProps {
  hijriYear: number;
}

export default function HijriahYearPage({ hijriYear }: HijriahYearPageProps) {
  const today = useMemo(() => new Date(), []);
  const holidayMap = useMemo(() => getHolidayMap(), []);
  const months = useMemo(
    () => buildHijriYear(hijriYear, holidayMap, today),
    [hijriYear, holidayMap, today],
  );

  const holidaysThisYear = useMemo(
    () => months.flatMap((month) => month.days.flatMap((day) => day.holidays)),
    [months],
  );
  const isProvisional = holidaysThisYear.some((h) => h.isProvisional);
  const firstDay = months.find((m) => m.days.length > 0)?.days[0];
  const gregorianEquivalentYear = firstDay ? firstDay.gregorianDate.getFullYear() : hijriYear;

  return (
    <CalendarPageTemplate
      headerControls={
        <div className="flex flex-col items-center gap-3">
          <CalendarSystemToggle
            active="hijriah"
            masehiHref={`/masehi/${gregorianEquivalentYear}`}
            hijriahHref={`/hijriah/${hijriYear}`}
          />
          <YearSwitcher basePath="/hijriah" year={hijriYear} yearLabel={`${hijriYear} H`} />
        </div>
      }
      calendarGrid={<HijriYearCalendarGrid months={months} />}
      holidayList={<HolidayListPanel holidays={holidaysThisYear} />}
      hasProvisionalData={isProvisional}
      provisionalBanner={
        isProvisional ? (
          <div className="mb-4 rounded-md bg-amber-50 px-4 py-2 text-sm text-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
            Sebagian tahun {hijriYear} H bertepatan dengan tahun yang SKB cuti bersamanya belum
            terbit — tanggal libur keagamaan di bawah masih perkiraan.
          </div>
        ) : undefined
      }
    />
  );
}
