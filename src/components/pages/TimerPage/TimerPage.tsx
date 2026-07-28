import { useEffect, useRef, useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import Button from "@/components/atoms/Button/Button";
import NumberField from "@/components/molecules/NumberField/NumberField";

function playBeep() {
  const AudioContextClass = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return;
  const ctx = new AudioContextClass();
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  oscillator.type = "sine";
  oscillator.frequency.value = 880;
  gain.gain.setValueAtTime(0.2, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
  oscillator.connect(gain);
  gain.connect(ctx.destination);
  oscillator.start();
  oscillator.stop(ctx.currentTime + 0.6);
}

function formatDuration(totalSeconds: number): string {
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export default function TimerPage() {
  const [minutesInput, setMinutesInput] = useState("5");
  const [secondsInput, setSecondsInput] = useState("0");
  const [remainingMs, setRemainingMs] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const deadlineRef = useRef(0);

  useEffect(() => {
    if (!running || remainingMs === null) return;
    deadlineRef.current = Date.now() + remainingMs;
    const interval = setInterval(() => {
      const left = deadlineRef.current - Date.now();
      if (left <= 0) {
        setRemainingMs(0);
        setRunning(false);
        setDone(true);
        playBeep();
        clearInterval(interval);
        return;
      }
      setRemainingMs(left);
    }, 250);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  const startTimer = () => {
    const totalMs = (Number(minutesInput) * 60 + Number(secondsInput)) * 1000;
    if (!Number.isFinite(totalMs) || totalMs <= 0) return;
    setDone(false);
    setRemainingMs(totalMs);
    setRunning(true);
  };

  const reset = () => {
    setRunning(false);
    setDone(false);
    setRemainingMs(null);
  };

  const displaySeconds = remainingMs !== null ? Math.ceil(remainingMs / 1000) : null;

  return (
    <ToolsPageTemplate title="Timer" description="Hitung mundur waktu, ada alarm bunyi saat selesai.">
      <div className="flex flex-col items-center gap-6">
        {remainingMs === null ? (
          <div className="grid grid-cols-2 gap-4">
            <NumberField label="Menit" value={minutesInput} onChange={setMinutesInput} />
            <NumberField label="Detik" value={secondsInput} onChange={setSecondsInput} />
          </div>
        ) : (
          <div
            className={`font-mono text-5xl font-bold tabular-nums ${
              done ? "text-emerald-600 dark:text-emerald-400" : "text-slate-900 dark:text-slate-50"
            }`}
          >
            {formatDuration(displaySeconds ?? 0)}
          </div>
        )}

        {done && <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Waktu habis!</p>}

        <div className="flex gap-3">
          {remainingMs === null ? (
            <Button onClick={startTimer}>Mulai</Button>
          ) : (
            <>
              {!done && <Button onClick={() => setRunning((r) => !r)}>{running ? "Jeda" : "Lanjut"}</Button>}
              <Button
                onClick={reset}
                className="bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
              >
                Reset
              </Button>
            </>
          )}
        </div>
      </div>
    </ToolsPageTemplate>
  );
}
