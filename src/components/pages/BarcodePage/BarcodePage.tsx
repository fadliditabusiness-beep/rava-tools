import { useEffect, useRef, useState } from "react";
import JsBarcode from "jsbarcode";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import Input from "@/components/atoms/Input/Input";

export default function BarcodePage() {
  const [text, setText] = useState("123456789012");
  const [error, setError] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !text) return;
    const svg = svgRef.current;
    Promise.resolve().then(() => {
      try {
        JsBarcode(svg, text, { format: "CODE128", width: 2, height: 80 });
        setError(null);
      } catch {
        setError("Teks tidak valid untuk format barcode ini.");
      }
    });
  }, [text]);

  return (
    <ToolsPageTemplate title="Barcode Generator" description="Buat barcode (CODE128) dari teks.">
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Teks</span>
        <Input value={text} onChange={(e) => setText(e.target.value)} />
      </label>

      <div className="mt-6 flex flex-col items-center rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <svg ref={svgRef} />
        {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
      </div>
    </ToolsPageTemplate>
  );
}
