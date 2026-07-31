import { useMemo, useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import Input from "@/components/atoms/Input/Input";
import GeneratedOutput from "@/components/molecules/GeneratedOutput/GeneratedOutput";
import { escapeAttr } from "@/utils/seoTools";

export default function CanonicalTagGeneratorPage() {
  const [url, setUrl] = useState("");

  const output = useMemo(
    () => (url.trim() ? `<link rel="canonical" href="${escapeAttr(url.trim())}" />` : ""),
    [url],
  );

  return (
    <ToolsPageTemplate title="Canonical Tag Generator" description="Buat tag canonical untuk hindari duplicate content.">
      <div className="flex flex-col gap-4">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">URL Halaman</span>
          <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com/halaman" />
        </label>

        {output && <GeneratedOutput label="Canonical Tag" value={output} />}
      </div>
    </ToolsPageTemplate>
  );
}
