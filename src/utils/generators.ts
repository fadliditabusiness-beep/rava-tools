function secureRandomBytes(length: number): Uint8Array {
  const bytes = new Uint8Array(length);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < length; i++) bytes[i] = Math.floor(Math.random() * 256);
  }
  return bytes;
}

export function randomInt(min: number, max: number): number {
  const lo = Math.ceil(Math.min(min, max));
  const hi = Math.floor(Math.max(min, max));
  return Math.floor(Math.random() * (hi - lo + 1)) + lo;
}

export interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

const CHARSETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}",
};

export function generatePassword(options: PasswordOptions): string {
  const pool = [
    options.uppercase ? CHARSETS.uppercase : "",
    options.lowercase ? CHARSETS.lowercase : "",
    options.numbers ? CHARSETS.numbers : "",
    options.symbols ? CHARSETS.symbols : "",
  ].join("");

  if (!pool || options.length <= 0) return "";

  const randomBytes = secureRandomBytes(options.length);
  let result = "";
  for (let i = 0; i < options.length; i++) {
    result += pool[randomBytes[i] % pool.length];
  }
  return result;
}

export function randomHexColor(): string {
  const bytes = secureRandomBytes(3);
  return (
    "#" +
    Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
  );
}

export function generateUuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  const bytes = secureRandomBytes(16);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes).map((b) => b.toString(16).padStart(2, "0"));

  return [
    hex.slice(0, 4).join(""),
    hex.slice(4, 6).join(""),
    hex.slice(6, 8).join(""),
    hex.slice(8, 10).join(""),
    hex.slice(10, 16).join(""),
  ].join("-");
}

export function flipCoin(): "Kepala" | "Ekor" {
  return Math.random() < 0.5 ? "Kepala" : "Ekor";
}

export function rollDice(sides = 6): number {
  return randomInt(1, sides);
}
