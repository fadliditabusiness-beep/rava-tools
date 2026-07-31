import { useMemo, useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import GeneratedOutput from "@/components/molecules/GeneratedOutput/GeneratedOutput";

function toHashtagWord(word: string): string {
  return word.replace(/[^\p{L}\p{N}]/gu, "");
}

function capitalize(word: string): string {
  return word.length > 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word;
}

function dedupe(items: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const item of items) {
    const key = item.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      result.push(item);
    }
  }
  return result;
}

export default function HashtagGeneratorPage() {
  const [input, setInput] = useState("");

  const hashtags = useMemo(() => {
    const words = input
      .split(/[\n,]+/)
      .map((w) => w.trim())
      .filter(Boolean);

    const individual = words.map((w) => `#${toHashtagWord(w)}`).filter((h) => h.length > 1);
    const combined = words.length > 1 ? [`#${words.map((w) => capitalize(toHashtagWord(w))).join("")}`] : [];

    return dedupe([...individual, ...combined]);
  }, [input]);

  return (
    <ToolsPageTemplate title="Hashtag Generator" description="Buat hashtag dari kata kunci atau topik kamu.">
      <div className="flex flex-col gap-4">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
            Kata Kunci / Topik (pisahkan koma atau baris baru)
          </span>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={5}
            placeholder="kopi, pagi, ngopi santai"
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        </label>

        {hashtags.length > 0 && (
          <GeneratedOutput label={`${hashtags.length} Hashtag`} value={hashtags.join(" ")} filename="hashtags.txt" />
        )}
      </div>
    </ToolsPageTemplate>
  );
}
