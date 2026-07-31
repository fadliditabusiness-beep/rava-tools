import { useMemo, useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import StatTile from "@/components/molecules/StatTile/StatTile";

const CAPTION_LIMIT = 2200;
const HASHTAG_LIMIT = 30;

export default function InstagramCaptionCounterPage() {
  const [caption, setCaption] = useState("");

  const stats = useMemo(() => {
    const hashtags = caption.match(/#[\p{L}\p{N}_]+/gu) ?? [];
    const words = caption.trim().length > 0 ? caption.trim().split(/\s+/) : [];
    return {
      chars: caption.length,
      hashtags: hashtags.length,
      words: words.length,
      lines: caption.length > 0 ? caption.split("\n").length : 0,
    };
  }, [caption]);

  const overChar = stats.chars > CAPTION_LIMIT;
  const overHashtag = stats.hashtags > HASHTAG_LIMIT;

  return (
    <ToolsPageTemplate
      title="Instagram Caption Counter"
      description="Cek jumlah karakter & hashtag caption Instagram kamu."
    >
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Caption</span>
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          rows={8}
          placeholder="Tulis caption Instagram kamu di sini..."
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        />
      </label>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile label={`Karakter / ${CAPTION_LIMIT}`} value={String(stats.chars)} />
        <StatTile label={`Hashtag / ${HASHTAG_LIMIT}`} value={String(stats.hashtags)} />
        <StatTile label="Kata" value={String(stats.words)} />
        <StatTile label="Baris" value={String(stats.lines)} />
      </div>

      {overChar && (
        <p className="mt-3 text-center text-sm font-medium text-red-600 dark:text-red-400">
          Caption melebihi batas {CAPTION_LIMIT} karakter Instagram.
        </p>
      )}
      {overHashtag && (
        <p className="mt-1 text-center text-sm font-medium text-red-600 dark:text-red-400">
          Jumlah hashtag melebihi batas {HASHTAG_LIMIT} yang diizinkan Instagram.
        </p>
      )}

      <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
        Batas resmi bisa berubah sewaktu-waktu mengikuti kebijakan Instagram — gunakan sebagai acuan, bukan jaminan.
      </p>
    </ToolsPageTemplate>
  );
}
