export interface BmiResult {
  bmi: number;
  category: string;
}

export function calculateBmi(heightCm: number, weightKg: number): BmiResult | null {
  if (heightCm <= 0 || weightKg <= 0) return null;

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  let category: string;
  if (bmi < 18.5) category = "Kurus";
  else if (bmi < 25) category = "Normal";
  else if (bmi < 30) category = "Gemuk";
  else category = "Obesitas";

  return { bmi, category };
}

export type PetSpecies = "anjing" | "kucing";

export function petAgeToHumanYears(petYears: number, species: PetSpecies): number | null {
  if (petYears < 0) return null;

  const perYearAfterTwo = species === "anjing" ? 5 : 4;
  if (petYears <= 1) return petYears * 15;
  if (petYears <= 2) return 15 + (petYears - 1) * 9;
  return 24 + (petYears - 2) * perYearAfterTwo;
}

export function squareArea(side: number): number {
  return side * side;
}

export function circleArea(radius: number): number {
  return Math.PI * radius * radius;
}

export function boxVolume(length: number, width: number, height: number): number {
  return length * width * height;
}

export function speed(distance: number, time: number): number | null {
  if (time === 0) return null;
  return distance / time;
}

export function fuelConsumption(distanceKm: number, fuelLiters: number): number | null {
  if (fuelLiters === 0) return null;
  return distanceKm / fuelLiters;
}
