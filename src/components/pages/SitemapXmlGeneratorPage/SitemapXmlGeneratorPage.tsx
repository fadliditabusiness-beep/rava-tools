import { useMemo, useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import Select from "@/components/atoms/Select/Select";
import GeneratedOutput from "@/components/molecules/GeneratedOutput/GeneratedOutput";
import { escapeXml } from "@/utils/seoTools";

const CHANGEFREQ_OPTIONS = ["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"];

export default function SitemapXmlGeneratorPage() {
  const [urlsInput, setUrlsInput] = useState("https://example.com/\nhttps://example.com/tentang");
  const [changefreq, setChangefreq] = useState("weekly");
  const [priority, setPriority] = useState("0.8");

  const urls = useMemo(
    () =>
      urlsInput
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
    [urlsInput],
  );

  const output = useMemo(() => {
    if (urls.length === 0) return "";
    const entries = urls
      .map(
        (url) =>
          `  <url>\n    <loc>${escapeXml(url)}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`,
      )
      .join("\n");
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>`;
  }, [urls, changefreq, priority]);

  return (
    <ToolsPageTemplate title="sitemap.xml Generator" description="Buat sitemap.xml dari daftar URL halaman kamu.">
      <div className="flex flex-col gap-4">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">URL (satu per baris)</span>
          <textarea
            value={urlsInput}
            onChange={(e) => setUrlsInput(e.target.value)}
            rows={8}
            spellCheck={false}
            placeholder="https://example.com/"
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 font-mono text-sm text-slate-800 focus:border-lime-500 focus:outline-none focus:ring-1 focus:ring-lime-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        </label>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Change Frequency</span>
            <Select value={changefreq} onChange={(e) => setChangefreq(e.target.value)}>
              {CHANGEFREQ_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Priority (0.0 – 1.0)</span>
            <Select value={priority} onChange={(e) => setPriority(e.target.value)}>
              {["1.0", "0.9", "0.8", "0.7", "0.6", "0.5", "0.4", "0.3", "0.2", "0.1", "0.0"].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </label>
        </div>

        {output && <GeneratedOutput label={`sitemap.xml (${urls.length} URL)`} value={output} filename="sitemap.xml" mimeType="application/xml" />}
      </div>
    </ToolsPageTemplate>
  );
}
