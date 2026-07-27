import { useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import Button from "@/components/atoms/Button/Button";
import { randomHexColor } from "@/utils/generators";

export default function RandomColorPage() {
  const [color, setColor] = useState<string | null>(null);

  return (
    <ToolsPageTemplate title="Random Color" description="Buat warna acak (hex).">
      <div className="flex justify-center">
        <Button onClick={() => setColor(randomHexColor())}>Acak Warna</Button>
      </div>

      {color && (
        <div className="mt-6 flex flex-col items-center gap-3">
          <div
            className="h-32 w-32 rounded-xl border border-slate-200 dark:border-slate-800"
            style={{ backgroundColor: color }}
          />
          <div className="font-mono text-lg text-slate-900 dark:text-slate-50">{color}</div>
        </div>
      )}
    </ToolsPageTemplate>
  );
}
