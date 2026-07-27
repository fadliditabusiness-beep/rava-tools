export interface Rgb {
  r: number;
  g: number;
  b: number;
}

export function hexToRgb(hex: string): Rgb | null {
  const cleaned = hex.trim().replace(/^#/, "");
  const expanded = cleaned.length === 3 ? cleaned.split("").map((c) => c + c).join("") : cleaned;
  if (!/^[0-9a-fA-F]{6}$/.test(expanded)) return null;
  const num = parseInt(expanded, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

export function rgbToHex({ r, g, b }: Rgb): string | null {
  if ([r, g, b].some((v) => !Number.isInteger(v) || v < 0 || v > 255)) return null;
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

export function parseRgbString(input: string): Rgb | null {
  const match = /(\d{1,3})\D+(\d{1,3})\D+(\d{1,3})/.exec(input);
  if (!match) return null;
  const [r, g, b] = match.slice(1).map(Number);
  if ([r, g, b].some((v) => v < 0 || v > 255)) return null;
  return { r, g, b };
}

export interface Hsl {
  h: number;
  s: number;
  l: number;
}

export function rgbToHsl({ r, g, b }: Rgb): Hsl {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;

  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) };

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h: number;
  switch (max) {
    case rn:
      h = (gn - bn) / d + (gn < bn ? 6 : 0);
      break;
    case gn:
      h = (bn - rn) / d + 2;
      break;
    default:
      h = (rn - gn) / d + 4;
  }
  h /= 6;

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export interface GradientStop {
  color: string;
  position: number;
}

export function buildGradientCss(
  type: "linear" | "radial",
  angle: number,
  stops: GradientStop[],
): string {
  const stopsCss = stops.map((s) => `${s.color} ${s.position}%`).join(", ");
  return type === "linear"
    ? `linear-gradient(${angle}deg, ${stopsCss})`
    : `radial-gradient(circle, ${stopsCss})`;
}
