import Link from "next/link";
import SiteHeader from "@/components/organisms/SiteHeader/SiteHeader";
import SiteFooter from "@/components/organisms/SiteFooter/SiteFooter";
import type { MegaCategoryGroup } from "@/interfaces/megaCategory";

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface RelatedToolEntry {
  title: string;
  href: string;
}

export interface MegaCategoryLandingTemplateProps {
  pageTitle: string;
  heroSubtitle: string;
  breadcrumbLabel: string;
  categories: MegaCategoryGroup[];
  faq: FaqEntry[];
  relatedTools: RelatedToolEntry[];
  liveCount: number;
  totalCount: number;
  accentGradient?: string;
}

export default function MegaCategoryLandingTemplate({
  pageTitle,
  heroSubtitle,
  breadcrumbLabel,
  categories,
  faq,
  relatedTools,
  liveCount,
  totalCount,
  accentGradient = "from-blue-600 to-violet-600",
}: MegaCategoryLandingTemplateProps) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-700 dark:text-slate-200">{breadcrumbLabel}</span>
        </nav>

        <section className="mb-10 text-center">
          <h1
            className={`bg-gradient-to-r ${accentGradient} bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl`}
          >
            {pageTitle}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 dark:text-slate-300 sm:text-base">{heroSubtitle}</p>
          <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">
            {liveCount} dari {totalCount} tools sudah tersedia — sisanya menyusul bertahap.
          </p>
        </section>

        <div className="flex flex-col gap-10">
          {categories.map((group) => (
            <section key={group.id} id={group.id} className="scroll-mt-24">
              <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-50">{group.title}</h2>
              <div className="flex flex-col gap-6">
                {group.subcategories.map((sub) => (
                  <div key={sub.id}>
                    <h3 className="mb-2 text-sm font-medium text-slate-500 dark:text-slate-400">{sub.title}</h3>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {sub.tools.map((tool) =>
                        tool.status === "live" && tool.href ? (
                          <Link
                            key={tool.title}
                            href={tool.href}
                            className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                          >
                            <h4 className="font-medium text-slate-900 dark:text-slate-50">{tool.title}</h4>
                            {tool.description && (
                              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{tool.description}</p>
                            )}
                          </Link>
                        ) : (
                          <div
                            key={tool.title}
                            className="rounded-xl border border-dashed border-slate-300 bg-slate-100/60 p-4 opacity-70 dark:border-slate-700 dark:bg-slate-900/40"
                          >
                            <h4 className="font-medium text-slate-500 dark:text-slate-400">{tool.title}</h4>
                            <span className="mt-1.5 inline-block rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                              Coming Soon
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {relatedTools.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-50">Related Tools</h2>
            <div className="flex flex-wrap gap-2">
              {relatedTools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 transition-colors hover:border-blue-400 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                >
                  {tool.title}
                </Link>
              ))}
            </div>
          </section>
        )}

        {faq.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-50">FAQ</h2>
            <div className="flex flex-col gap-3">
              {faq.map((item) => (
                <details
                  key={item.question}
                  className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
                >
                  <summary className="cursor-pointer font-medium text-slate-800 dark:text-slate-100">{item.question}</summary>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
