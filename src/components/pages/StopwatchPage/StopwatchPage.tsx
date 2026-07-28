import { useEffect, useRef, useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import Button from "@/components/atoms/Button/Button";

function formatElapsed(ms: number): string {
  const totalCentiseconds = Math.floor(ms / 10);
  const centiseconds = totalCentiseconds % 100;
  const totalSeconds = Math.floor(ms / 1000);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  const pad = (n: number, len = 2) => String(n).padStart(len, "0");
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(centiseconds)}`;
}

export default function StopwatchPage() {
  const [elapsedMs, setElapsedMs] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const startedAtRef = useRef(0);

  useEffect(() => {
    if (!running) return;
    startedAtRef.current = Date.now() - elapsedMs;
    const interval = setInterval(() => {
      setElapsedMs(Date.now() - startedAtRef.current);
    }, 10);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  return (
    <ToolsPageTemplate title="Stopwatch" description="Hitung waktu berjalan, mulai, jeda, dan catat lap.">
      <div className="flex flex-col items-center gap-6">
        <div className="font-mono text-5xl font-bold tabular-nums text-slate-900 dark:text-slate-50">
          {formatElapsed(elapsedMs)}
        </div>

        <div className="flex gap-3">
          <Button onClick={() => setRunning((r) => !r)}>{running ? "Jeda" : "Mulai"}</Button>
          <Button
            onClick={() => setLaps((prev) => [elapsedMs, ...prev])}
            disabled={!running}
            className="bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
          >
            Lap
          </Button>
          <Button
            onClick={() => {
              setRunning(false);
              setElapsedMs(0);
              setLaps([]);
            }}
            className="bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
          >
            Reset
          </Button>
        </div>

        {laps.length > 0 && (
          <ol className="w-full max-w-xs divide-y divide-slate-200 rounded-lg border border-slate-200 dark:divide-slate-800 dark:border-slate-800">
            {laps.map((lap, i) => (
              <li
                key={laps.length - i}
                className="flex justify-between px-4 py-2 font-mono text-sm text-slate-700 dark:text-slate-200"
              >
                <span>Lap {laps.length - i}</span>
                <span className="tabular-nums">{formatElapsed(lap)}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </ToolsPageTemplate>
  );
}
