import { useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import Button from "@/components/atoms/Button/Button";
import { generateUuid } from "@/utils/generators";

export default function RandomUuidPage() {
  const [uuid, setUuid] = useState<string | null>(null);

  return (
    <ToolsPageTemplate title="Random UUID" description="Buat UUID v4 acak.">
      <div className="flex justify-center">
        <Button onClick={() => setUuid(generateUuid())}>Generate UUID</Button>
      </div>

      {uuid && (
        <div className="mt-6 rounded-lg border border-slate-200 bg-white p-4 text-center font-mono text-lg text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-50">
          {uuid}
        </div>
      )}
    </ToolsPageTemplate>
  );
}
