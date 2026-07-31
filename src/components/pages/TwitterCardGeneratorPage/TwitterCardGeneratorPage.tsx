import { useMemo, useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import Input from "@/components/atoms/Input/Input";
import Select from "@/components/atoms/Select/Select";
import GeneratedOutput from "@/components/molecules/GeneratedOutput/GeneratedOutput";
import { escapeAttr } from "@/utils/seoTools";

export default function TwitterCardGeneratorPage() {
  const [card, setCard] = useState("summary_large_image");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [site, setSite] = useState("");
  const [creator, setCreator] = useState("");

  const output = useMemo(() => {
    const lines = [`<meta name="twitter:card" content="${escapeAttr(card)}">`];
    if (title) lines.push(`<meta name="twitter:title" content="${escapeAttr(title)}">`);
    if (description) lines.push(`<meta name="twitter:description" content="${escapeAttr(description)}">`);
    if (image) lines.push(`<meta name="twitter:image" content="${escapeAttr(image)}">`);
    if (site) lines.push(`<meta name="twitter:site" content="${escapeAttr(site)}">`);
    if (creator) lines.push(`<meta name="twitter:creator" content="${escapeAttr(creator)}">`);
    return lines.join("\n");
  }, [card, title, description, image, site, creator]);

  return (
    <ToolsPageTemplate title="Twitter Card Generator" description="Buat tag Twitter Card untuk preview link di X/Twitter.">
      <div className="flex flex-col gap-4">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Card Type</span>
          <Select value={card} onChange={(e) => setCard(e.target.value)}>
            <option value="summary">summary</option>
            <option value="summary_large_image">summary_large_image</option>
            <option value="player">player</option>
            <option value="app">app</option>
          </Select>
        </label>

        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Title</span>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Judul halaman" />
        </label>

        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Description</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Deskripsi singkat halaman..."
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-lime-500 focus:outline-none focus:ring-1 focus:ring-lime-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        </label>

        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Image URL</span>
          <Input value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://example.com/image.jpg" />
        </label>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Site (@handle)</span>
            <Input value={site} onChange={(e) => setSite(e.target.value)} placeholder="@namasitus" />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Creator (@handle)</span>
            <Input value={creator} onChange={(e) => setCreator(e.target.value)} placeholder="@namapembuat" />
          </label>
        </div>

        <GeneratedOutput label="Twitter Card Tags" value={output} filename="twitter-card-tags.html" mimeType="text/html" />
      </div>
    </ToolsPageTemplate>
  );
}
