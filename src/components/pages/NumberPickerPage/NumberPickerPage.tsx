import { useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import NumberField from "@/components/molecules/NumberField/NumberField";
import Checkbox from "@/components/atoms/Checkbox/Checkbox";
import Button from "@/components/atoms/Button/Button";
import StatTile from "@/components/molecules/StatTile/StatTile";
import { randomInt } from "@/utils/generators";

export default function NumberPickerPage() {
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("50");
  const [noRepeat, setNoRepeat] = useState(true);
  const [picked, setPicked] = useState<number[]>([]);
  const [result, setResult] = useState<number | null>(null);

  const minNum = Number(min);
  const maxNum = Number(max);
  const rangeValid = Number.isFinite(minNum) && Number.isFinite(maxNum) && minNum <= maxNum;
  const rangeSize = rangeValid ? maxNum - minNum + 1 : 0;
  const exhausted = noRepeat && rangeValid && picked.length >= rangeSize;

  const pick = () => {
    if (!rangeValid) return;
    if (!noRepeat) {
      setResult(randomInt(minNum, maxNum));
      return;
    }

    const remaining = [];
    for (let n = minNum; n <= maxNum; n++) if (!picked.includes(n)) remaining.push(n);
    if (remaining.length === 0) return;
    const chosen = remaining[randomInt(0, remaining.length - 1)];
    setResult(chosen);
    setPicked((prev) => [...prev, chosen]);
  };

  const reset = () => {
    setPicked([]);
    setResult(null);
  };

  return (
    <ToolsPageTemplate title="Number Picker" description="Pilih angka acak dari rentang, dengan opsi tanpa pengulangan.">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <NumberField label="Minimum" value={min} onChange={setMin} />
        <NumberField label="Maksimum" value={max} onChange={setMax} />
      </div>

      <div className="mt-4 flex justify-center">
        <Checkbox
          label="Tanpa pengulangan sampai reset"
          checked={noRepeat}
          onChange={(e) => setNoRepeat(e.target.checked)}
        />
      </div>

      <div className="mt-4 flex justify-center gap-3">
        <Button disabled={!rangeValid || exhausted} onClick={pick}>
          Pilih Angka
        </Button>
        {picked.length > 0 && (
          <Button
            onClick={reset}
            className="bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
          >
            Reset
          </Button>
        )}
      </div>

      {exhausted && (
        <p className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
          Semua angka di rentang ini sudah terpilih.
        </p>
      )}

      {result !== null && (
        <div className="mt-6">
          <StatTile label="Hasil" value={String(result)} />
        </div>
      )}

      {noRepeat && picked.length > 0 && (
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {picked.map((n, i) => (
            <span
              key={`${n}-${i}`}
              className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
            >
              {n}
            </span>
          ))}
        </div>
      )}
    </ToolsPageTemplate>
  );
}
