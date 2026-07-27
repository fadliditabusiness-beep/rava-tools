import { useState } from "react";
import Button from "@/components/atoms/Button/Button";

export interface TextTransformToolProps {
  inputLabel: string;
  outputLabel?: string;
  inputPlaceholder?: string;
  actionLabel: string;
  defaultInput?: string;
  transform: (input: string) => string | Promise<string>;
}

export default function TextTransformTool({
  inputLabel,
  outputLabel = "Hasil",
  inputPlaceholder,
  actionLabel,
  defaultInput = "",
  transform,
}: TextTransformToolProps) {
  const [input, setInput] = useState(defaultInput);
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleProcess = async () => {
    setIsProcessing(true);
    setError(null);
    try {
      setOutput(await transform(input));
    } catch (err) {
      setOutput(null);
      setError(err instanceof Error ? err.message : "Gagal memproses input.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex flex-col gap-4">
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
          {inputLabel}
        </span>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={inputPlaceholder}
          rows={10}
          spellCheck={false}
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 font-mono text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        />
      </label>

      <div className="flex justify-center">
        <Button disabled={isProcessing} onClick={handleProcess}>
          {isProcessing ? "Memproses..." : actionLabel}
        </Button>
      </div>

      {error && <p className="text-center text-sm text-red-600 dark:text-red-400">{error}</p>}

      {output !== null && (
        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
              {outputLabel}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="text-xs font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              {copied ? "Disalin!" : "Salin"}
            </button>
          </div>
          <textarea
            readOnly
            value={output}
            rows={10}
            spellCheck={false}
            className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 font-mono text-sm text-slate-800 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          />
        </div>
      )}
    </div>
  );
}
