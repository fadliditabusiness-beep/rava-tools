import type { ReactNode } from "react";
import SiteHeader from "@/components/organisms/SiteHeader/SiteHeader";
import SiteFooter from "@/components/organisms/SiteFooter/SiteFooter";

export interface CalendarPageTemplateProps {
  headerControls: ReactNode;
  calendarGrid: ReactNode;
  holidayList: ReactNode;
  provisionalBanner?: ReactNode;
  hasProvisionalData?: boolean;
}

export default function CalendarPageTemplate({
  headerControls,
  calendarGrid,
  holidayList,
  provisionalBanner,
  hasProvisionalData,
}: CalendarPageTemplateProps) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <SiteHeader>{headerControls}</SiteHeader>
      <main className="mx-auto max-w-6xl px-4 py-6">
        {provisionalBanner}
        <div className="flex flex-col gap-8">
          <div>{calendarGrid}</div>
          <div>{holidayList}</div>
        </div>
      </main>
      <SiteFooter hasProvisionalData={hasProvisionalData} />
    </div>
  );
}
