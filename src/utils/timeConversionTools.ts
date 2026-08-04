export interface TimeUnitDef {
  key: string;
  label: string;
  toSeconds: number;
}

export const TIME_UNITS: TimeUnitDef[] = [
  { key: "ms", label: "Milidetik", toSeconds: 0.001 },
  { key: "s", label: "Detik", toSeconds: 1 },
  { key: "min", label: "Menit", toSeconds: 60 },
  { key: "h", label: "Jam", toSeconds: 3600 },
  { key: "day", label: "Hari", toSeconds: 86400 },
  { key: "week", label: "Minggu", toSeconds: 604800 },
];

export function convertTime(value: number, from: string, to: string): number {
  const fromUnit = TIME_UNITS.find((u) => u.key === from);
  const toUnit = TIME_UNITS.find((u) => u.key === to);
  if (!fromUnit || !toUnit) return NaN;
  return (value * fromUnit.toSeconds) / toUnit.toSeconds;
}
