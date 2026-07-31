import { randomInt } from "@/utils/generators";

const SUFFIXES = ["official", "id", "store", "shop"];
const PREFIXES = ["its", "the", "real"];

export function generateUsernameSuggestions(base: string): string[] {
  const clean = base
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "");

  if (!clean) return [];

  const suggestions = new Set<string>();
  suggestions.add(clean);
  suggestions.add(`_${clean}_`);
  suggestions.add(`${clean}.id`);

  SUFFIXES.forEach((suffix) => suggestions.add(`${clean}_${suffix}`));
  PREFIXES.forEach((prefix) => suggestions.add(`${prefix}${clean.charAt(0).toUpperCase()}${clean.slice(1)}`));

  for (let i = 0; i < 3; i++) suggestions.add(`${clean}${randomInt(10, 999)}`);

  if (clean.length > 1) suggestions.add(`${clean[0]}.${clean.slice(1)}`);

  return Array.from(suggestions).slice(0, 12);
}
