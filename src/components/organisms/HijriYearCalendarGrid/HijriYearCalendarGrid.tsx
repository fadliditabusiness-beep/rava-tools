import HijriMonthGrid from "@/components/molecules/HijriMonthGrid/HijriMonthGrid";
import type { HijriMonth } from "@/interfaces/calendar";

export interface HijriYearCalendarGridProps {
  months: HijriMonth[];
}

export default function HijriYearCalendarGrid({ months }: HijriYearCalendarGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {months.map((month) => (
        <HijriMonthGrid key={month.monthIndex} month={month} />
      ))}
    </div>
  );
}
