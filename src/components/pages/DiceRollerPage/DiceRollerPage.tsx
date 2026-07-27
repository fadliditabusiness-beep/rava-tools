import { useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import Button from "@/components/atoms/Button/Button";
import Select from "@/components/atoms/Select/Select";
import { rollDice } from "@/utils/generators";

export default function DiceRollerPage() {
  const [sides, setSides] = useState("6");
  const [result, setResult] = useState<number | null>(null);

  return (
    <ToolsPageTemplate title="Dice Roller" description="Lempar dadu virtual.">
      <div className="flex flex-col items-center gap-4">
        <label className="block w-40 text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
            Jumlah Sisi
          </span>
          <Select value={sides} onChange={(e) => setSides(e.target.value)}>
            <option value="4">D4</option>
            <option value="6">D6</option>
            <option value="8">D8</option>
            <option value="10">D10</option>
            <option value="12">D12</option>
            <option value="20">D20</option>
          </Select>
        </label>
        <Button onClick={() => setResult(rollDice(Number(sides)))}>Lempar Dadu</Button>
      </div>

      {result !== null && (
        <div className="mt-6 text-center text-3xl font-bold text-slate-900 dark:text-slate-50">
          {result}
        </div>
      )}
    </ToolsPageTemplate>
  );
}
