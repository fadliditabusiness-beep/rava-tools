import { useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import Input from "@/components/atoms/Input/Input";
import { FONT_STYLES, applyFontStyle } from "@/utils/fontStyleTools";

function StyledResultRow({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
      <div className="min-w-0">
        <p className="text-xs text-slate-400">{label}</p>
        <p className="truncate text-lg text-slate-900 dark:text-slate-50">{value || " "}</p>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="shrink-0 text-xs font-medium text-violet-600 hover:underline dark:text-violet-400"
      >
        {copied ? "Disalin!" : "Salin"}
      </button>
    </div>
  );
}

export default function InstagramFontGeneratorPage() {
  const [text, setText] = useState("Instagram Bio");

  return (
    <ToolsPageTemplate title="Instagram Font Generator" description="Ubah teks jadi font unicode unik untuk bio & caption.">
      <div className="flex flex-col gap-4">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Teks</span>
          <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Tulis teks kamu..." />
        </label>

        <div className="flex flex-col gap-2">
          {FONT_STYLES.map((style) => (
            <StyledResultRow key={style.id} label={style.label} value={applyFontStyle(text, style)} />
          ))}
        </div>
      </div>
    </ToolsPageTemplate>
  );
}
