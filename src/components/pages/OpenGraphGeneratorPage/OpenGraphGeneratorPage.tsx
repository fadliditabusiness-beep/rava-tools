import { useMemo, useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import Input from "@/components/atoms/Input/Input";
import Select from "@/components/atoms/Select/Select";
import GeneratedOutput from "@/components/molecules/GeneratedOutput/GeneratedOutput";
import { escapeAttr } from "@/utils/seoTools";

export default function OpenGraphGeneratorPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [type, setType] = useState("website");
  const [siteName, setSiteName] = useState("");
  const [locale, setLocale] = useState("en_US");

  const output = useMemo(() => {
    const lines: string[] = [];
    if (title) lines.push(`<meta property="og:title" content="${escapeAttr(title)}">`);
    if (description) lines.push(`<meta property="og:description" content="${escapeAttr(description)}">`);
    if (image) lines.push(`<meta property="og:image" content="${escapeAttr(image)}">`);
    if (url) lines.push(`<meta property="og:url" content="${escapeAttr(url)}">`);
    lines.push(`<meta property="og:type" content="${escapeAttr(type)}">`);
    if (siteName) lines.push(`<meta property="og:site_name" content="${escapeAttr(siteName)}">`);
    if (locale) lines.push(`<meta property="og:locale" content="${escapeAttr(locale)}">`);
    return lines.join("\n");
  }, [title, description, image, url, type, siteName, locale]);

  return (
    <ToolsPageTemplate title="Open Graph Generator" description="Buat tag Open Graph untuk preview link Facebook/LinkedIn/dll.">
      <div className="flex flex-col gap-4">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">og:title</span>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Judul halaman" />
        </label>

        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">og:description</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Deskripsi singkat halaman..."
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-lime-500 focus:outline-none focus:ring-1 focus:ring-lime-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        </label>

        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">og:image</span>
          <Input value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://example.com/image.jpg" />
        </label>

        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">og:url</span>
          <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com/halaman" />
        </label>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">og:type</span>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="website">website</option>
              <option value="article">article</option>
              <option value="product">product</option>
              <option value="video.other">video.other</option>
              <option value="profile">profile</option>
            </Select>
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">og:site_name</span>
            <Input value={siteName} onChange={(e) => setSiteName(e.target.value)} placeholder="Nama situs" />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">og:locale</span>
            <Input value={locale} onChange={(e) => setLocale(e.target.value)} placeholder="en_US" />
          </label>
        </div>

        <GeneratedOutput label="Open Graph Tags" value={output} filename="open-graph-tags.html" mimeType="text/html" />
      </div>
    </ToolsPageTemplate>
  );
}
