import { useMemo, useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import Input from "@/components/atoms/Input/Input";
import StatTile from "@/components/molecules/StatTile/StatTile";
import GeneratedOutput from "@/components/molecules/GeneratedOutput/GeneratedOutput";

const TAG_LIMIT = 500;

function dedupe(items: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const item of items) {
    const key = item.toLowerCase();
    if (item && !seen.has(key)) {
      seen.add(key);
      result.push(item);
    }
  }
  return result;
}

export default function YoutubeTagGeneratorPage() {
  const [title, setTitle] = useState("");
  const [keywords, setKeywords] = useState("");

  const { fitted, total, dropped } = useMemo(() => {
    const rawTags = keywords
      .split(/[\n,]+/)
      .map((s) => s.trim())
      .filter(Boolean);
    const candidates = dedupe(title.trim() ? [title.trim(), ...rawTags] : rawTags);

    let chars = 0;
    const kept: string[] = [];
    for (const tag of candidates) {
      const additional = kept.length === 0 ? tag.length : tag.length + 2;
      if (chars + additional > TAG_LIMIT) break;
      kept.push(tag);
      chars += additional;
    }

    return { fitted: kept, total: chars, dropped: candidates.length - kept.length };
  }, [title, keywords]);

  return (
    <ToolsPageTemplate title="YouTube Tag Generator" description="Buat daftar tag YouTube dari judul & kata kunci.">
      <div className="flex flex-col gap-4">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Judul Video (opsional)</span>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Cara Belajar React untuk Pemula" />
        </label>

        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
            Kata Kunci (pisahkan koma atau baris baru)
          </span>
          <textarea
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            rows={5}
            placeholder="react, belajar react, tutorial react, javascript"
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <StatTile label="Jumlah Tag" value={String(fitted.length)} />
          <StatTile label={`Karakter / ${TAG_LIMIT}`} value={String(total)} />
        </div>

        {dropped > 0 && (
          <p className="text-center text-sm text-amber-600 dark:text-amber-400">
            {dropped} tag dibuang karena melebihi batas {TAG_LIMIT} karakter gabungan YouTube.
          </p>
        )}

        {fitted.length > 0 && (
          <GeneratedOutput label="Tag (siap tempel)" value={fitted.join(", ")} filename="youtube-tags.txt" />
        )}
      </div>
    </ToolsPageTemplate>
  );
}
