import type { BusinessHealth as BusinessHealthData } from "../../types";

const CATEGORY_COLOR: Record<BusinessHealthData["category"], string> = {
  Excellent: "#0ca30c",
  Good: "#2a78d6",
  Fair: "#fab219",
  "Needs Improvement": "#d03b3b",
};

export interface BusinessHealthProps {
  health: BusinessHealthData;
}

const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function BusinessHealth({ health }: BusinessHealthProps) {
  const color = CATEGORY_COLOR[health.category];
  const offset = CIRCUMFERENCE * (1 - health.score / 100);

  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <h3 className="self-start text-sm font-semibold text-slate-800">Business Health</h3>
      <svg viewBox="0 0 120 120" className="h-32 w-32">
        <circle cx="60" cy="60" r={RADIUS} fill="none" stroke="#e2e8f0" strokeWidth="10" />
        <circle
          cx="60"
          cy="60"
          r={RADIUS}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          transform="rotate(-90 60 60)"
          style={{ transition: "stroke-dashoffset 0.4s ease" }}
        />
        <text x="60" y="56" textAnchor="middle" className="fill-slate-900 text-2xl font-bold">
          {health.score}
        </text>
        <text x="60" y="74" textAnchor="middle" className="fill-slate-400 text-[10px]">
          / 100
        </text>
      </svg>
      <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: `${color}1a`, color }}>
        {health.category}
      </span>
    </div>
  );
}
