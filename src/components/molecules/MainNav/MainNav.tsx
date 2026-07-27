import Link from "next/link";
import { useRouter } from "next/router";

const TABS = [
  { label: "Kalender", href: "/masehi", matchPrefixes: ["/masehi", "/hijriah"] },
  { label: "Tools", href: "/tools", matchPrefixes: ["/tools"] },
];

export default function MainNav() {
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  return (
    <nav className="flex gap-1">
      {TABS.map((tab) => {
        const isActive = tab.matchPrefixes.some((prefix) => router.pathname.startsWith(prefix));
        const href = tab.label === "Kalender" ? `${tab.href}/${currentYear}` : tab.href;

        return (
          <Link
            key={tab.label}
            href={href}
            className={[
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
            ].join(" ")}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
