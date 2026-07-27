import MonthGrid from "@/components/molecules/MonthGrid/MonthGrid";
import type { GregorianMonth } from "@/interfaces/calendar";

export interface YearCalendarGridProps {
  months: GregorianMonth[];
}

export default function YearCalendarGrid({ months }: YearCalendarGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {months.map((month) => (
        <MonthGrid key={month.monthIndex} month={month} />
      ))}
    </div>
  );
}
