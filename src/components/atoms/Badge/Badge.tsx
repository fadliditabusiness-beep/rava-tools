import type { ReactNode } from "react";

type BadgeTone = "red" | "amber" | "slate";

const TONE_CLASSES: Record<BadgeTone, string> = {
  red: "bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-950/40 dark:text-red-300 dark:ring-red-400/20",
  amber:
    "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-950/40 dark:text-amber-300 dark:ring-amber-400/20",
  slate:
    "bg-slate-100 text-slate-600 ring-slate-500/20 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-400/20",
};

export interface BadgeProps {
  tone?: BadgeTone;
  children: ReactNode;
}

export default function Badge({ tone = "slate", children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${TONE_CLASSES[tone]}`}
    >
      {children}
    </span>
  );
}
