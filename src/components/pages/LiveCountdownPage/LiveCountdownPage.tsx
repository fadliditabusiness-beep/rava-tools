import { useEffect, useMemo, useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import Input from "@/components/atoms/Input/Input";
import StatTile from "@/components/molecules/StatTile/StatTile";
import { toDateInputValue } from "@/utils/dateTools";

function splitRemaining(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(totalSeconds / 86_400),
    hours: Math.floor(totalSeconds / 3600) % 24,
    minutes: Math.floor(totalSeconds / 60) % 60,
    seconds: totalSeconds % 60,
  };
}

export default function LiveCountdownPage() {
  const now = useMemo(() => new Date(), []);
  const [date, setDate] = useState(() => toDateInputValue(now));
  const [time, setTime] = useState("00:00");
  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNowMs(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const target = useMemo(() => {
    const [h, m] = time.split(":").map(Number);
    const [y, mo, d] = date.split("-").map(Number);
    if (!y || !mo || !d) return null;
    return new Date(y, mo - 1, d, h || 0, m || 0, 0);
  }, [date, time]);

  const remainingMs = target ? target.getTime() - nowMs : null;
  const remaining = remainingMs !== null ? splitRemaining(remainingMs) : null;

  return (
    <ToolsPageTemplate
      title="Countdown Real-time"
      description="Hitung mundur langsung ke tanggal & jam tertentu, detik demi detik."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Tanggal Target</span>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Jam Target</span>
          <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </label>
      </div>

      {remaining && (
        <div className="mt-6">
          <div className="grid grid-cols-4 gap-3">
            <StatTile label="Hari" value={String(remaining.days)} />
            <StatTile label="Jam" value={String(remaining.hours)} />
            <StatTile label="Menit" value={String(remaining.minutes)} />
            <StatTile label="Detik" value={String(remaining.seconds)} />
          </div>
          {remainingMs !== null && remainingMs <= 0 && (
            <p className="mt-4 text-center text-sm font-medium text-emerald-600 dark:text-emerald-400">
              Waktu target sudah tercapai.
            </p>
          )}
        </div>
      )}
    </ToolsPageTemplate>
  );
}
