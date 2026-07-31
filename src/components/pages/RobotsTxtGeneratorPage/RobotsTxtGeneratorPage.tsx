import { useMemo, useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import Input from "@/components/atoms/Input/Input";
import GeneratedOutput from "@/components/molecules/GeneratedOutput/GeneratedOutput";

export default function RobotsTxtGeneratorPage() {
  const [userAgent, setUserAgent] = useState("*");
  const [disallow, setDisallow] = useState("/admin\n/private");
  const [allow, setAllow] = useState("");
  const [sitemap, setSitemap] = useState("");

  const output = useMemo(() => {
    const lines = [`User-agent: ${userAgent || "*"}`];

    const disallowLines = disallow
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    const allowLines = allow
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    if (disallowLines.length === 0) {
      lines.push("Disallow:");
    } else {
      disallowLines.forEach((path) => lines.push(`Disallow: ${path}`));
    }
    allowLines.forEach((path) => lines.push(`Allow: ${path}`));

    if (sitemap.trim()) {
      lines.push("", `Sitemap: ${sitemap.trim()}`);
    }

    return lines.join("\n");
  }, [userAgent, disallow, allow, sitemap]);

  return (
    <ToolsPageTemplate title="robots.txt Generator" description="Buat file robots.txt untuk atur akses crawler mesin pencari.">
      <div className="flex flex-col gap-4">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">User-agent</span>
          <Input value={userAgent} onChange={(e) => setUserAgent(e.target.value)} placeholder="*" />
        </label>

        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
            Disallow (satu path per baris, kosongkan untuk izinkan semua)
          </span>
          <textarea
            value={disallow}
            onChange={(e) => setDisallow(e.target.value)}
            rows={4}
            placeholder="/admin"
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 font-mono text-sm text-slate-800 focus:border-lime-500 focus:outline-none focus:ring-1 focus:ring-lime-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        </label>

        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
            Allow (satu path per baris, opsional)
          </span>
          <textarea
            value={allow}
            onChange={(e) => setAllow(e.target.value)}
            rows={3}
            placeholder="/public"
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 font-mono text-sm text-slate-800 focus:border-lime-500 focus:outline-none focus:ring-1 focus:ring-lime-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        </label>

        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Sitemap URL (opsional)</span>
          <Input value={sitemap} onChange={(e) => setSitemap(e.target.value)} placeholder="https://example.com/sitemap.xml" />
        </label>

        <GeneratedOutput label="robots.txt" value={output} filename="robots.txt" />
      </div>
    </ToolsPageTemplate>
  );
}
