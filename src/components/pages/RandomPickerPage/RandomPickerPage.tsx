import { useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import Input from "@/components/atoms/Input/Input";
import Button from "@/components/atoms/Button/Button";
import { randomInt } from "@/utils/generators";

const SLICE_COLORS = ["#2563eb", "#7c3aed", "#0ea5e9", "#059669", "#d97706", "#e11d48", "#4f46e5", "#0891b2"];

export default function RandomPickerPage() {
  const [options, setOptions] = useState<string[]>(["Opsi 1", "Opsi 2", "Opsi 3", "Opsi 4"]);
  const [draft, setDraft] = useState("");
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  const addOption = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    setOptions((prev) => [...prev, trimmed]);
    setDraft("");
  };

  const removeOption = (index: number) => {
    setOptions((prev) => prev.filter((_, i) => i !== index));
    setWinner(null);
  };

  const segmentAngle = 360 / Math.max(options.length, 1);
  const gradient = options
    .map((_, i) => {
      const color = SLICE_COLORS[i % SLICE_COLORS.length];
      return `${color} ${i * segmentAngle}deg ${(i + 1) * segmentAngle}deg`;
    })
    .join(", ");

  const spin = () => {
    if (options.length < 2 || spinning) return;
    const winnerIndex = randomInt(0, options.length - 1);
    const targetCenter = winnerIndex * segmentAngle + segmentAngle / 2;
    setSpinning(true);
    setWinner(null);
    setRotation((prev) => {
      const baseline = Math.floor(prev / 360) * 360;
      return baseline + 360 * 5 + ((360 - targetCenter) % 360);
    });
    window.setTimeout(() => {
      setSpinning(false);
      setWinner(options[winnerIndex]);
    }, 4000);
  };

  return (
    <ToolsPageTemplate title="Random Picker (Wheel)" description="Putar roda untuk pilih acak dari daftar pilihanmu.">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div
            className="absolute left-1/2 top-0 z-10 h-0 w-0 -translate-x-1/2 -translate-y-1"
            style={{
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderTop: "16px solid #0f172a",
            }}
          />
          <div
            className="h-64 w-64 rounded-full border-4 border-slate-200 shadow-inner sm:h-72 sm:w-72"
            style={{
              background: options.length > 0 ? `conic-gradient(${gradient})` : "#e2e8f0",
              transform: `rotate(${rotation}deg)`,
              transition: "transform 4s cubic-bezier(0.17,0.67,0.12,0.99)",
            }}
          />
        </div>

        <Button disabled={options.length < 2 || spinning} onClick={spin}>
          {spinning ? "Berputar..." : "Putar"}
        </Button>

        {winner && (
          <div className="rounded-lg border border-l-4 border-l-violet-500 border-slate-200 bg-white px-6 py-3 text-center dark:border-slate-800 dark:bg-slate-900">
            <p className="text-xs text-slate-500 dark:text-slate-400">Pemenang</p>
            <p className="text-xl font-bold text-slate-900 dark:text-slate-50">{winner}</p>
          </div>
        )}

        <div className="w-full max-w-sm">
          <div className="flex gap-2">
            <Input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addOption()}
              placeholder="Tambah pilihan..."
            />
            <Button onClick={addOption}>Tambah</Button>
          </div>

          <ul className="mt-3 flex flex-col gap-1.5">
            {options.map((option, i) => (
              <li
                key={`${option}-${i}`}
                className="flex items-center justify-between gap-2 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <span className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: SLICE_COLORS[i % SLICE_COLORS.length] }}
                  />
                  {option}
                </span>
                <button
                  type="button"
                  onClick={() => removeOption(i)}
                  className="text-xs font-medium text-rose-600 hover:underline dark:text-rose-400"
                >
                  Hapus
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ToolsPageTemplate>
  );
}
