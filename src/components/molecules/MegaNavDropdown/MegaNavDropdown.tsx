import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import type { MegaNavColumn } from "@/constants/megaNav";

export interface MegaNavDropdownProps {
  label: string;
  columns: MegaNavColumn[];
  isActive: boolean;
}

const CLOSE_DELAY_MS = 150;
const PANEL_WIDTH = 640;
const VIEWPORT_MARGIN = 12;

export default function MegaNavDropdown({ label, columns, isActive }: MegaNavDropdownProps) {
  const [open, setOpen] = useState(false);
  const [panelPos, setPanelPos] = useState<{ top: number; left: number } | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimerRef.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  };

  // The nav bar scrolls horizontally on narrow screens (overflow-x-auto), which — per the CSS
  // overflow spec — forces overflow-y to clip too, so a plain absolutely-positioned panel gets
  // cut off. Portal it to <body> and compute its position from the trigger instead.
  const updatePanelPos = () => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const width = Math.min(PANEL_WIDTH, window.innerWidth - VIEWPORT_MARGIN * 2);
    const centered = rect.left + rect.width / 2 - width / 2;
    const left = Math.min(Math.max(centered, VIEWPORT_MARGIN), window.innerWidth - width - VIEWPORT_MARGIN);
    setPanelPos({ top: rect.bottom + 8, left });
  };

  useEffect(() => {
    if (!open) return;
    updatePanelPos();

    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      // panelRef is checked separately: the panel is portaled to <body>, so it is not a DOM
      // descendant of containerRef even though it's part of this component's React tree.
      const insideContainer = containerRef.current?.contains(target) ?? false;
      const insidePanel = panelRef.current?.contains(target) ?? false;
      if (!insideContainer && !insidePanel) {
        setOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const handleReposition = () => updatePanelPos();

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleReposition, true);
    window.addEventListener("resize", handleReposition);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleReposition, true);
      window.removeEventListener("resize", handleReposition);
    };
  }, [open]);

  useEffect(() => () => cancelClose(), []);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={[
          "flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium transition-all sm:px-3.5",
          isActive
            ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-sm"
            : "text-slate-500 hover:bg-white hover:text-slate-900 hover:shadow-sm",
        ].join(" ")}
        aria-expanded={open}
      >
        <span className="hidden sm:inline">{label}</span>
        <span className="sm:hidden">{label.slice(0, 4)}</span>
        <svg
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          className={`h-3.5 w-3.5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path d="M5 7.5l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open &&
        panelPos &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={panelRef}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
            style={{ top: panelPos.top, left: panelPos.left, width: Math.min(PANEL_WIDTH, typeof window !== "undefined" ? window.innerWidth - VIEWPORT_MARGIN * 2 : PANEL_WIDTH) }}
            className="fixed z-50 rounded-xl border border-slate-200 bg-white p-5 shadow-lg dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
              {columns.map((column) => (
                <div key={column.title}>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                    {column.title}
                  </h3>
                  <ul className="flex flex-col gap-1.5">
                    {column.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="block rounded-md px-1.5 py-1 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-50"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
