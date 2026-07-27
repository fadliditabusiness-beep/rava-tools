import { useState } from "react";
import StatTile from "@/components/molecules/StatTile/StatTile";
import { hexToRgb, rgbToHsl } from "@/utils/colorTools";

export default function ColorPickerTool() {
  const [hex, setHex] = useState("#3b82f6");

  const rgb = hexToRgb(hex);
  const hsl = rgb ? rgbToHsl(rgb) : null;

  return (
    <div className="flex flex-col items-center gap-6">
      <input
        type="color"
        value={hex}
        onChange={(e) => setHex(e.target.value)}
        className="h-32 w-32 cursor-pointer rounded-xl border border-slate-200 dark:border-slate-800"
        aria-label="Pilih warna"
      />

      {rgb && hsl && (
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
          <StatTile label="HEX" value={hex.toUpperCase()} />
          <StatTile label="RGB" value={`${rgb.r}, ${rgb.g}, ${rgb.b}`} />
          <StatTile label="HSL" value={`${hsl.h}°, ${hsl.s}%, ${hsl.l}%`} />
        </div>
      )}
    </div>
  );
}
