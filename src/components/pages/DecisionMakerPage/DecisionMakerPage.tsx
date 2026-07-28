import { useRef, useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import Input from "@/components/atoms/Input/Input";
import Button from "@/components/atoms/Button/Button";
import { randomInt } from "@/utils/generators";

export default function DecisionMakerPage() {
  const [options, setOptions] = useState<string[]>(["Ya", "Tidak"]);
  const [draft, setDraft] = useState("");
  const [display, setDisplay] = useState<string | null>(null);
  const [deciding, setDeciding] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const addOption = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    setOptions((prev) => [...prev, trimmed]);
    setDraft("");
  };

  const removeOption = (index: number) => setOptions((prev) => prev.filter((_, i) => i !== index));

  const decide = () => {
    if (options.length < 2 || deciding) return;
    setDeciding(true);
    let ticks = 0;
    const maxTicks = 18;
    intervalRef.current = setInterval(() => {
      setDisplay(options[randomInt(0, options.length - 1)]);
      ticks++;
      if (ticks >= maxTicks) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplay(options[randomInt(0, options.length - 1)]);
        setDeciding(false);
      }
    }, 90);
  };

  return (
    <ToolsPageTemplate title="Decision Maker" description="Bingung milih? Masukin pilihan, biarkan diacak.">
      <div className="flex flex-col items-center gap-6">
        <div
          className={`flex h-28 w-full max-w-sm items-center justify-center rounded-xl border px-6 text-center text-2xl font-bold transition-colors ${
            deciding
              ? "border-slate-200 bg-slate-50 text-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-500"
              : "border-l-4 border-l-violet-500 border-slate-200 bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-50"
          }`}
        >
          {display ?? "?"}
        </div>

        <Button disabled={options.length < 2 || deciding} onClick={decide}>
          {deciding ? "Memutuskan..." : "Putuskan!"}
        </Button>

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
                className="flex items-center justify-between gap-2 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              >
                {option}
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
