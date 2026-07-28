import Link from "next/link";
import { useRouter } from "next/router";

function CalendarIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-4 w-4" aria-hidden="true">
      <rect x="3" y="4.5" width="14" height="12" rx="2" />
      <path d="M3 8h14M7 3v3M13 3v3" strokeLinecap="round" />
    </svg>
  );
}

function ToolsIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-4 w-4" aria-hidden="true">
      <path
        d="M13.5 3.5a3 3 0 0 0-3.9 3.9L4 13v3h3l5.6-5.6a3 3 0 0 0 3.9-3.9l-2.1 2.1-1.9-.5-.5-1.9 2.1-2.1Z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const TABS = [
  { label: "Kalender", href: "/masehi", matchPrefixes: ["/masehi", "/hijriah"], icon: CalendarIcon },
  { label: "Tools", href: "/tools", matchPrefixes: ["/tools"], icon: ToolsIcon },
];

export default function MainNav() {
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  return (
    <nav className="flex gap-1 rounded-full border border-slate-200 bg-slate-50 p-1">
      {TABS.map((tab) => {
        const isActive = tab.matchPrefixes.some((prefix) => router.pathname.startsWith(prefix));
        const href = tab.label === "Kalender" ? `${tab.href}/${currentYear}` : tab.href;
        const Icon = tab.icon;

        return (
          <Link
            key={tab.label}
            href={href}
            className={[
              "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all",
              isActive
                ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-sm"
                : "text-slate-500 hover:bg-white hover:text-slate-900 hover:shadow-sm",
            ].join(" ")}
          >
            <Icon />
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
