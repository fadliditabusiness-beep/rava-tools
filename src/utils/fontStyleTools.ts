export interface FontStyleSpec {
  id: string;
  label: string;
  upperStart?: number;
  lowerStart?: number;
  digitStart?: number;
  exceptions?: Record<string, string>;
}

export const FONT_STYLES: FontStyleSpec[] = [
  { id: "bold", label: "Bold", upperStart: 0x1d400, lowerStart: 0x1d41a, digitStart: 0x1d7ce },
  { id: "italic", label: "Italic", upperStart: 0x1d434, lowerStart: 0x1d44e, exceptions: { h: "ℎ" } },
  { id: "bold-italic", label: "Bold Italic", upperStart: 0x1d468, lowerStart: 0x1d482 },
  { id: "monospace", label: "Monospace", upperStart: 0x1d670, lowerStart: 0x1d68a, digitStart: 0x1d7f6 },
  { id: "fullwidth", label: "Fullwidth", upperStart: 0xff21, lowerStart: 0xff41, digitStart: 0xff10 },
  { id: "circled", label: "Circled", upperStart: 0x24b6, lowerStart: 0x24d0, digitStart: 0x245f, exceptions: { "0": "⓪" } },
];

export function applyFontStyle(text: string, style: FontStyleSpec): string {
  return Array.from(text)
    .map((char) => {
      if (style.exceptions?.[char]) return style.exceptions[char];
      const code = char.codePointAt(0) ?? 0;
      if (style.upperStart !== undefined && char >= "A" && char <= "Z") {
        return String.fromCodePoint(style.upperStart + (code - 65));
      }
      if (style.lowerStart !== undefined && char >= "a" && char <= "z") {
        return String.fromCodePoint(style.lowerStart + (code - 97));
      }
      if (style.digitStart !== undefined && char >= "0" && char <= "9") {
        return String.fromCodePoint(style.digitStart + (code - 48));
      }
      return char;
    })
    .join("");
}
