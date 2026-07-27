import { useState } from "react";
import Select from "@/components/atoms/Select/Select";
import { buildGradientCss } from "@/utils/colorTools";

export default function CssGradientTool() {
  const [type, setType] = useState<"linear" | "radial">("linear");
  const [angle, setAngle] = useState("90");
  const [colorA, setColorA] = useState("#3b82f6");
  const [colorB, setColorB] = useState("#ec4899");
  const [copied, setCopied] = useState(false);

  const gradient = buildGradientCss(type, Number(angle), [
    { color: colorA, position: 0 },
    { color: colorB, position: 100 },
  ]);
  const css = `background: ${gradient};`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex flex-col gap-4">
      <div
        className="h-40 w-full rounded-xl border border-slate-200 dark:border-slate-800"
        style={{ background: gradient }}
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Tipe</span>
          <Select value={type} onChange={(e) => setType(e.target.value as "linear" | "radial")}>
            <option value="linear">Linear</option>
            <option value="radial">Radial</option>
          </Select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
            Sudut ({angle}°)
          </span>
          <input
            type="range"
            min={0}
            max={360}
            value={angle}
            disabled={type === "radial"}
            onChange={(e) => setAngle(e.target.value)}
            className="w-full disabled:opacity-40"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
            Warna 1
          </span>
          <input
            type="color"
            value={colorA}
            onChange={(e) => setColorA(e.target.value)}
            className="h-9 w-full cursor-pointer rounded-md border border-slate-300 dark:border-slate-700"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
            Warna 2
          </span>
          <input
            type="color"
            value={colorB}
            onChange={(e) => setColorB(e.target.value)}
            className="h-9 w-full cursor-pointer rounded-md border border-slate-300 dark:border-slate-700"
          />
        </label>
      </div>

      <div>
        <div className="mb-1 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">CSS</span>
          <button
            type="button"
            onClick={handleCopy}
            className="text-xs font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            {copied ? "Disalin!" : "Salin"}
          </button>
        </div>
        <pre className="overflow-x-auto rounded-md border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
          {css}
        </pre>
      </div>
    </div>
  );
}
