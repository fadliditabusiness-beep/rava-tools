import { useMemo, useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import Input from "@/components/atoms/Input/Input";
import Button from "@/components/atoms/Button/Button";
import GeneratedOutput from "@/components/molecules/GeneratedOutput/GeneratedOutput";
import { EMOJIS } from "@/constants/emojis";

export default function EmojiPickerPage() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return EMOJIS;
    return EMOJIS.filter((e) => e.name.toLowerCase().includes(q) || e.keywords.includes(q));
  }, [query]);

  return (
    <ToolsPageTemplate title="Emoji Picker" description="Cari & pilih emoji, klik untuk menambahkan ke kotak salin.">
      <div className="flex flex-col gap-4">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari emoji, misal: senang, cinta, kucing..."
        />

        {selected && (
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <GeneratedOutput label="Dipilih" value={selected} />
            </div>
            <Button
              onClick={() => setSelected("")}
              className="bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
            >
              Bersihkan
            </Button>
          </div>
        )}

        {filtered.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-400 dark:text-slate-500">Emoji tidak ditemukan.</p>
        ) : (
          <div className="grid grid-cols-6 gap-2 sm:grid-cols-8 md:grid-cols-10">
            {filtered.map((emoji) => (
              <button
                key={emoji.char}
                type="button"
                title={emoji.name}
                onClick={() => setSelected((prev) => prev + emoji.char)}
                className="flex aspect-square items-center justify-center rounded-lg border border-slate-200 bg-white text-2xl transition-colors hover:border-violet-400 hover:bg-violet-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-violet-950/30"
              >
                {emoji.char}
              </button>
            ))}
          </div>
        )}
      </div>
    </ToolsPageTemplate>
  );
}
