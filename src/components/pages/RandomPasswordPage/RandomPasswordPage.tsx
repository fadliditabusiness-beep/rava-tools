import { useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import NumberField from "@/components/molecules/NumberField/NumberField";
import Checkbox from "@/components/atoms/Checkbox/Checkbox";
import Button from "@/components/atoms/Button/Button";
import { generatePassword } from "@/utils/generators";

export default function RandomPasswordPage() {
  const [length, setLength] = useState("16");
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(false);
  const [password, setPassword] = useState("");

  const lengthNum = Number(length);
  const hasCharset = uppercase || lowercase || numbers || symbols;
  const canGenerate = Number.isFinite(lengthNum) && lengthNum > 0 && hasCharset;

  const handleGenerate = () => {
    setPassword(
      generatePassword({ length: lengthNum, uppercase, lowercase, numbers, symbols }),
    );
  };

  return (
    <ToolsPageTemplate title="Random Password" description="Buat password acak yang aman.">
      <NumberField label="Panjang Password" value={length} onChange={setLength} />

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Checkbox label="A-Z" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} />
        <Checkbox label="a-z" checked={lowercase} onChange={(e) => setLowercase(e.target.checked)} />
        <Checkbox label="0-9" checked={numbers} onChange={(e) => setNumbers(e.target.checked)} />
        <Checkbox label="!@#" checked={symbols} onChange={(e) => setSymbols(e.target.checked)} />
      </div>

      <div className="mt-4 flex justify-center">
        <Button disabled={!canGenerate} onClick={handleGenerate}>
          Generate
        </Button>
      </div>

      {password && (
        <div className="mt-6 rounded-lg border border-slate-200 bg-white p-4 text-center font-mono text-lg text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-50">
          {password}
        </div>
      )}

      {!hasCharset && (
        <p className="mt-2 text-center text-sm text-red-600 dark:text-red-400">
          Pilih minimal satu jenis karakter.
        </p>
      )}
    </ToolsPageTemplate>
  );
}
