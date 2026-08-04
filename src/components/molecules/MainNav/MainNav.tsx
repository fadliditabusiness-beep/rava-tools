import type { ReactElement } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import MegaNavDropdown from "@/components/molecules/MegaNavDropdown/MegaNavDropdown";
import { CONVERT_NAV, COMPRESS_NAV, OTHER_TOOLS_NAV } from "@/constants/megaNav";

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

function SocialIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-4 w-4" aria-hidden="true">
      <circle cx="5" cy="10" r="2" />
      <circle cx="15" cy="4.5" r="2" />
      <circle cx="15" cy="15.5" r="2" />
      <path d="M6.8 9l6.4-3.6M6.8 11l6.4 3.6" strokeLinecap="round" />
    </svg>
  );
}

function MarketplaceIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-4 w-4" aria-hidden="true">
      <path d="M4 7h12l-1 9.5a1 1 0 0 1-1 .9H6a1 1 0 0 1-1-.9L4 7Z" strokeLinejoin="round" />
      <path d="M7 7V5.5a3 3 0 0 1 6 0V7" strokeLinecap="round" />
    </svg>
  );
}

const TABS_BEFORE_MEGA_NAV = [
  { label: "Kalender", href: "/masehi", matchPrefixes: ["/masehi", "/hijriah"], icon: CalendarIcon },
  { label: "Tools", href: "/tools", matchPrefixes: ["/tools"], icon: ToolsIcon },
];

const TABS_AFTER_MEGA_NAV = [
  { label: "Social Media", href: "/social-media-tools", matchPrefixes: ["/social-media-tools"], icon: SocialIcon },
  { label: "Marketplace", href: "/marketplace-tools", matchPrefixes: ["/marketplace-tools"], icon: MarketplaceIcon },
];

const MEGA_NAV_TABS = [
  { label: "Convert", columns: CONVERT_NAV },
  { label: "Compress", columns: COMPRESS_NAV },
  { label: "Other Tools", columns: OTHER_TOOLS_NAV },
];

function TabLink({
  tab,
  currentYear,
  isActive,
}: {
  tab: { label: string; href: string; icon: () => ReactElement };
  currentYear: number;
  isActive: boolean;
}) {
  const href = tab.label === "Kalender" ? `${tab.href}/${currentYear}` : tab.href;
  const Icon = tab.icon;

  return (
    <Link
      href={href}
      title={tab.label}
      className={[
        "flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all sm:px-3.5",
        isActive
          ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-sm"
          : "text-slate-500 hover:bg-white hover:text-slate-900 hover:shadow-sm",
      ].join(" ")}
    >
      <Icon />
      <span className="hidden sm:inline">{tab.label}</span>
    </Link>
  );
}

export default function MainNav() {
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  return (
    <nav className="flex max-w-full gap-1 overflow-x-auto rounded-full border border-slate-200 bg-slate-50 p-1">
      {TABS_BEFORE_MEGA_NAV.map((tab) => (
        <TabLink
          key={tab.label}
          tab={tab}
          currentYear={currentYear}
          isActive={tab.matchPrefixes.some((prefix) => router.pathname.startsWith(prefix))}
        />
      ))}

      {MEGA_NAV_TABS.map((tab) => (
        <MegaNavDropdown
          key={tab.label}
          label={tab.label}
          columns={tab.columns}
          isActive={tab.columns.some((column) => column.items.some((item) => item.href === router.pathname))}
        />
      ))}

      {TABS_AFTER_MEGA_NAV.map((tab) => (
        <TabLink
          key={tab.label}
          tab={tab}
          currentYear={currentYear}
          isActive={tab.matchPrefixes.some((prefix) => router.pathname.startsWith(prefix))}
        />
      ))}
    </nav>
  );
}
