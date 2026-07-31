import { useMemo, useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import Input from "@/components/atoms/Input/Input";
import Select from "@/components/atoms/Select/Select";
import GeneratedOutput from "@/components/molecules/GeneratedOutput/GeneratedOutput";
import { escapeAttr } from "@/utils/seoTools";

export default function MetaTagGeneratorPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [author, setAuthor] = useState("");
  const [robots, setRobots] = useState("index, follow");

  const output = useMemo(() => {
    const lines = [
      '<meta charset="UTF-8">',
      '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
    ];
    if (title) lines.push(`<title>${escapeAttr(title)}</title>`);
    if (description) lines.push(`<meta name="description" content="${escapeAttr(description)}">`);
    if (keywords) lines.push(`<meta name="keywords" content="${escapeAttr(keywords)}">`);
    if (author) lines.push(`<meta name="author" content="${escapeAttr(author)}">`);
    lines.push(`<meta name="robots" content="${escapeAttr(robots)}">`);
    return lines.join("\n");
  }, [title, description, keywords, author, robots]);

  return (
    <ToolsPageTemplate title="Meta Tag Generator" description="Buat tag meta HTML dasar untuk SEO.">
      <div className="flex flex-col gap-4">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Judul Halaman</span>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Judul Halaman Kamu" />
        </label>

        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Deskripsi</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Deskripsi singkat halaman untuk hasil pencarian..."
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-lime-500 focus:outline-none focus:ring-1 focus:ring-lime-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        </label>

        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Keywords (opsional)</span>
          <Input value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="kalender, kalkulator, tools" />
        </label>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Author (opsional)</span>
            <Input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Nama kamu" />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Robots</span>
            <Select value={robots} onChange={(e) => setRobots(e.target.value)}>
              <option value="index, follow">index, follow</option>
              <option value="noindex, follow">noindex, follow</option>
              <option value="index, nofollow">index, nofollow</option>
              <option value="noindex, nofollow">noindex, nofollow</option>
            </Select>
          </label>
        </div>

        <GeneratedOutput label="Meta Tags" value={output} filename="meta-tags.html" mimeType="text/html" />
      </div>
    </ToolsPageTemplate>
  );
}
