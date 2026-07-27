import { useMemo, useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import DateField from "@/components/molecules/DateField/DateField";
import StatTile from "@/components/molecules/StatTile/StatTile";
import { diffCalendar, nextBirthday, parseDateInputValue, toDateInputValue } from "@/utils/dateTools";

export default function AgeCalculatorPage() {
  const today = useMemo(() => new Date(), []);
  const [birthValue, setBirthValue] = useState(() => toDateInputValue(today));

  const birthDate = parseDateInputValue(birthValue);
  const age = birthDate ? diffCalendar(birthDate, today) : null;
  const upcoming = birthDate ? nextBirthday(birthDate, today) : null;
  const dayBorn = birthDate
    ? birthDate.toLocaleDateString("id-ID", { weekday: "long" })
    : null;

  return (
    <ToolsPageTemplate
      title="Umur & Hari Lahir"
      description="Masukkan tanggal lahir untuk menghitung umur dan hari lahirmu."
    >
      <DateField label="Tanggal Lahir" value={birthValue} onChange={setBirthValue} />

      {age && birthDate && (
        <>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatTile label="Tahun" value={String(age.years)} />
            <StatTile label="Bulan" value={String(age.months)} />
            <StatTile label="Hari" value={String(age.days)} />
            <StatTile label="Total Hari Hidup" value={String(Math.abs(age.totalDays))} />
          </div>

          <div className="mt-4 rounded-lg border border-slate-200 bg-white p-5 text-center text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
            Lahir hari <span className="font-semibold">{dayBorn}</span>
            {upcoming && (
              <>
                {" · "}
                Ulang tahun berikutnya dalam{" "}
                <span className="font-semibold">{upcoming.daysUntil}</span> hari (
                {upcoming.date.toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
                )
              </>
            )}
          </div>
        </>
      )}
    </ToolsPageTemplate>
  );
}
