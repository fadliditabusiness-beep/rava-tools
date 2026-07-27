export function percentageOf(value: number, percent: number): number {
  return (percent / 100) * value;
}

export function percentageChange(from: number, to: number): number {
  if (from === 0) return to === 0 ? 0 : Infinity;
  return ((to - from) / Math.abs(from)) * 100;
}

export interface DiscountResult {
  discountAmount: number;
  finalPrice: number;
}

export function applyDiscount(price: number, percent: number): DiscountResult {
  const discountAmount = (percent / 100) * price;
  return { discountAmount, finalPrice: price - discountAmount };
}

export interface PpnResult {
  ppnAmount: number;
  totalWithPpn: number;
}

export function applyPpn(price: number, rate: number): PpnResult {
  const ppnAmount = (rate / 100) * price;
  return { ppnAmount, totalWithPpn: price + ppnAmount };
}

export function average(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  return numbers.reduce((sum, n) => sum + n, 0) / numbers.length;
}

export interface DivisionResult {
  quotient: number;
  remainder: number;
  decimal: number;
}

export function divide(a: number, b: number): DivisionResult | null {
  if (b === 0) return null;
  return { quotient: Math.trunc(a / b), remainder: a % b, decimal: a / b };
}

export function gcd(a: number, b: number): number {
  let x = Math.abs(Math.trunc(a));
  let y = Math.abs(Math.trunc(b));
  while (y) {
    [x, y] = [y, x % y];
  }
  return x;
}

export function lcm(a: number, b: number): number {
  const divisor = gcd(a, b);
  if (divisor === 0) return 0;
  return Math.abs(Math.trunc(a) * Math.trunc(b)) / divisor;
}

export function power(base: number, exponent: number): number {
  return Math.pow(base, exponent);
}

export function sqrt(n: number): number | null {
  if (n < 0) return null;
  return Math.sqrt(n);
}
