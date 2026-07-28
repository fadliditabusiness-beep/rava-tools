import { useMemo, useState } from "react";
import Link from "next/link";
import { ACCENT_STYLES, TOOL_CATEGORIES, TOTAL_TOOL_COUNT, type ToolCategory, type ToolEntry } from "@/constants/tools";

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      className="h-4 w-4"
      aria-hidden="true"
    >
      <circle cx="8.5" cy="8.5" r="5.5" />
      <path d="M17 17l-3.8-3.8" strokeLinecap="round" />
    </svg>
  );
}

function ToolCard({ tool, accent: accentName }: { tool: ToolEntry; accent: ToolCategory["accent"] }) {
  const accent = ACCENT_STYLES[accentName];
  return (
    <Link
      href={tool.href}
      className={`group flex flex-col gap-1 rounded-xl border border-l-4 border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:border-slate-800 dark:bg-slate-900 ${accent.cardLeftBorder} ${accent.cardHoverBorder}`}
    >
      <h3 className="font-semibold text-slate-900 dark:text-slate-50">{tool.title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400">{tool.description}</p>
    </Link>
  );
}

function ToolGrid({ tools, accent }: { tools: ToolEntry[]; accent: ToolCategory["accent"] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tools.map((tool) => (
        <ToolCard key={tool.href} tool={tool} accent={accent} />
      ))}
    </div>
  );
}

export default function ToolsMenu() {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();

  const filteredCategories = useMemo(() => {
    if (!normalizedQuery) return TOOL_CATEGORIES;
    return TOOL_CATEGORIES.map((category) => ({
      ...category,
      tools: category.tools.filter(
        (tool) =>
          tool.title.toLowerCase().includes(normalizedQuery) ||
          tool.description.toLowerCase().includes(normalizedQuery),
      ),
    })).filter((category) => category.tools.length > 0);
  }, [normalizedQuery]);

  const matchCount = filteredCategories.reduce((sum, cat) => sum + cat.tools.length, 0);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <label className="relative block">
          <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
            <SearchIcon />
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Cari dari ${TOTAL_TOOL_COUNT} tools...`}
            className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 shadow-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        </label>

        {filteredCategories.length > 0 && (
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            {filteredCategories.map((category) => {
              const accent = ACCENT_STYLES[category.accent];
              return (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${accent.pill}`}
                >
                  <span>{category.icon}</span>
                  {category.title}
                  <span className="opacity-60">{category.tools.length}</span>
                </a>
              );
            })}
          </div>
        )}
      </div>

      {normalizedQuery && (
        <p className="-mt-4 text-sm text-slate-500 dark:text-slate-400">
          {matchCount > 0 ? `${matchCount} tools cocok dengan "${query}"` : null}
        </p>
      )}

      {filteredCategories.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-slate-300 py-16 text-center dark:border-slate-700">
          <span className="text-3xl">🔍</span>
          <p className="text-slate-600 dark:text-slate-300">
            Gak ketemu tools yang cocok dengan &quot;{query}&quot;.
          </p>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="text-sm font-medium text-violet-600 hover:underline dark:text-violet-400"
          >
            Hapus pencarian
          </button>
        </div>
      ) : (
        filteredCategories.map((category) => {
          const accent = ACCENT_STYLES[category.accent];
          return (
            <section key={category.id} id={category.id} className="scroll-mt-24">
              <div className="mb-3 flex items-center gap-3">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-base ${accent.chip}`}
                  aria-hidden="true"
                >
                  {category.icon}
                </span>
                <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50">
                  {category.title}
                </h2>
                <span className="text-sm text-slate-400">{category.tools.length} tools</span>
              </div>
              {category.note && (
                <p className="mb-3 text-xs text-slate-500 dark:text-slate-400">{category.note}</p>
              )}
              <ToolGrid tools={category.tools} accent={category.accent} />
            </section>
          );
        })
      )}
    </div>
  );
}
