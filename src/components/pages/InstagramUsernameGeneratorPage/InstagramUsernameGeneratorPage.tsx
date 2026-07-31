import { useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import Input from "@/components/atoms/Input/Input";
import Button from "@/components/atoms/Button/Button";
import { generateUsernameSuggestions } from "@/utils/usernameTools";

export default function InstagramUsernameGeneratorPage() {
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generate = () => setSuggestions(generateUsernameSuggestions(keyword));

  const copy = async (value: string, index: number) => {
    await navigator.clipboard.writeText(value);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <ToolsPageTemplate title="Instagram Username Generator" description="Buat ide username Instagram unik dari kata kunci kamu.">
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && generate()}
            placeholder="Nama atau kata kunci, misal: kopikita"
          />
          <Button onClick={generate}>Generate</Button>
        </div>

        {suggestions.length > 0 && (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {suggestions.map((name, index) => (
              <button
                key={name}
                type="button"
                onClick={() => copy(name, index)}
                className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-left text-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <span className="font-mono text-slate-800 dark:text-slate-100">@{name}</span>
                <span className="text-xs font-medium text-violet-600 dark:text-violet-400">
                  {copiedIndex === index ? "Disalin!" : "Salin"}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </ToolsPageTemplate>
  );
}
