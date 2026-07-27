import { useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import NumberField from "@/components/molecules/NumberField/NumberField";
import Button from "@/components/atoms/Button/Button";
import StatTile from "@/components/molecules/StatTile/StatTile";
import { randomInt } from "@/utils/generators";

export default function RandomNumberPage() {
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [result, setResult] = useState<number | null>(null);

  const minNum = Number(min);
  const maxNum = Number(max);
  const canGenerate = Number.isFinite(minNum) && Number.isFinite(maxNum);

  return (
    <ToolsPageTemplate title="Random Number" description="Buat angka acak dalam rentang tertentu.">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <NumberField label="Minimum" value={min} onChange={setMin} />
        <NumberField label="Maksimum" value={max} onChange={setMax} />
      </div>

      <div className="mt-4 flex justify-center">
        <Button disabled={!canGenerate} onClick={() => setResult(randomInt(minNum, maxNum))}>
          Acak
        </Button>
      </div>

      {result !== null && (
        <div className="mt-6">
          <StatTile label="Hasil" value={String(result)} />
        </div>
      )}
    </ToolsPageTemplate>
  );
}
