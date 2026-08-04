export interface UnitDef {
  key: string;
  label: string;
  toBase: number;
}

export const LENGTH_UNITS: UnitDef[] = [
  { key: "mm", label: "Milimeter (mm)", toBase: 0.001 },
  { key: "cm", label: "Sentimeter (cm)", toBase: 0.01 },
  { key: "m", label: "Meter (m)", toBase: 1 },
  { key: "km", label: "Kilometer (km)", toBase: 1000 },
  { key: "in", label: "Inci (in)", toBase: 0.0254 },
  { key: "ft", label: "Kaki (ft)", toBase: 0.3048 },
  { key: "yd", label: "Yard (yd)", toBase: 0.9144 },
  { key: "mi", label: "Mil (mi)", toBase: 1609.344 },
];

export const WEIGHT_UNITS: UnitDef[] = [
  { key: "mg", label: "Miligram (mg)", toBase: 0.001 },
  { key: "g", label: "Gram (g)", toBase: 1 },
  { key: "kg", label: "Kilogram (kg)", toBase: 1000 },
  { key: "oz", label: "Ons (oz)", toBase: 28.3495 },
  { key: "lb", label: "Pon (lb)", toBase: 453.592 },
];

export const VOLUME_UNITS: UnitDef[] = [
  { key: "ml", label: "Mililiter (ml)", toBase: 1 },
  { key: "l", label: "Liter (l)", toBase: 1000 },
  { key: "gal", label: "Galon US (gal)", toBase: 3785.41 },
  { key: "cup", label: "Cup US", toBase: 236.588 },
];

export const TEMPERATURE_UNITS = [
  { key: "c", label: "Celsius (°C)" },
  { key: "f", label: "Fahrenheit (°F)" },
  { key: "k", label: "Kelvin (K)" },
];

export type UnitCategoryKey = "length" | "weight" | "volume" | "temperature";

export const UNIT_CATEGORIES: { key: UnitCategoryKey; label: string }[] = [
  { key: "length", label: "Panjang" },
  { key: "weight", label: "Berat" },
  { key: "volume", label: "Volume" },
  { key: "temperature", label: "Suhu" },
];

export function convertUnit(units: UnitDef[], value: number, from: string, to: string): number {
  const fromUnit = units.find((u) => u.key === from);
  const toUnit = units.find((u) => u.key === to);
  if (!fromUnit || !toUnit) return NaN;
  return (value * fromUnit.toBase) / toUnit.toBase;
}

export function convertTemperature(value: number, from: string, to: string): number {
  let celsius: number;
  if (from === "c") celsius = value;
  else if (from === "f") celsius = ((value - 32) * 5) / 9;
  else celsius = value - 273.15;

  if (to === "c") return celsius;
  if (to === "f") return (celsius * 9) / 5 + 32;
  return celsius + 273.15;
}
