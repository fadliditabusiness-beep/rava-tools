import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import TextTransformTool from "@/components/organisms/TextTransformTool/TextTransformTool";
import { hexToRgb, parseRgbString, rgbToHex } from "@/utils/colorTools";

function hexToRgbString(input: string): string {
  const rgb = hexToRgb(input);
  if (!rgb) throw new Error("Format HEX tidak valid. Contoh: #3b82f6");
  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

function rgbToHexString(input: string): string {
  const rgb = parseRgbString(input);
  if (!rgb) throw new Error("Format RGB tidak valid. Contoh: 59, 130, 246");
  const hex = rgbToHex(rgb);
  if (!hex) throw new Error("Nilai RGB harus 0-255.");
  return hex;
}

export default function HexRgbConverterPage() {
  return (
    <ToolsPageTemplate title="HEX ↔ RGB Converter" description="Konversi warna HEX ke RGB dan sebaliknya.">
      <div className="flex flex-col gap-8">
        <section>
          <h2 className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
            HEX ke RGB
          </h2>
          <TextTransformTool
            inputLabel="HEX"
            outputLabel="RGB"
            actionLabel="Konversi"
            inputPlaceholder="#3b82f6"
            defaultInput="#3b82f6"
            transform={hexToRgbString}
          />
        </section>
        <section className="border-t border-slate-200 pt-6 dark:border-slate-800">
          <h2 className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
            RGB ke HEX
          </h2>
          <TextTransformTool
            inputLabel="RGB"
            outputLabel="HEX"
            actionLabel="Konversi"
            inputPlaceholder="59, 130, 246"
            defaultInput="59, 130, 246"
            transform={rgbToHexString}
          />
        </section>
      </div>
    </ToolsPageTemplate>
  );
}
