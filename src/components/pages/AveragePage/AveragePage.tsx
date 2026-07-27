import { useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import StatTile from "@/components/molecules/StatTile/StatTile";
import { average } from "@/utils/mathTools";

export default function AveragePage() {
  const [input, setInput] = useState("8, 9, 7, 10");

  const numbers = input
    .split(/[,\s]+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map(Number)
    .filter(Number.isFinite);

  const result = numbers.length > 0 ? average(numbers) : null;

  return (
    <ToolsPageTemplate
      title="Kalkulator Rata-rata"
      description="Masukkan angka dipisah koma atau spasi."
    >
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Angka</span>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={3}
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        />
      </label>

      {result !== null && (
        <div className="mt-6 grid grid-cols-2 gap-3">
          <StatTile label="Rata-rata" value={result.toLocaleString("id-ID", { maximumFractionDigits: 4 })} />
          <StatTile label="Jumlah Data" value={String(numbers.length)} />
        </div>
      )}
    </ToolsPageTemplate>
  );
}
