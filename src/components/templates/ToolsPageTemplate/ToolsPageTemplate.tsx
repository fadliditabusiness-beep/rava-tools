import type { ReactNode } from "react";
import SiteHeader from "@/components/organisms/SiteHeader/SiteHeader";
import SiteFooter from "@/components/organisms/SiteFooter/SiteFooter";

export interface ToolsPageTemplateProps {
  title: string;
  description?: string;
  wide?: boolean;
  children: ReactNode;
}

export default function ToolsPageTemplate({
  title,
  description,
  wide = false,
  children,
}: ToolsPageTemplateProps) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <SiteHeader />
      <main className={`mx-auto px-4 py-8 ${wide ? "max-w-6xl" : "max-w-4xl"}`}>
        <h1 className="text-center text-2xl font-bold text-slate-900 dark:text-slate-50">
          {title}
        </h1>
        {description && (
          <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
            {description}
          </p>
        )}
        <div className="mt-6">{children}</div>
      </main>
      <SiteFooter />
    </div>
  );
}
