export function formatRupiah(value: number): string {
  if (!Number.isFinite(value)) return "-";
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
}

export function formatPercent(value: number, digits = 1): string {
  if (!Number.isFinite(value)) return "-";
  return `${value.toFixed(digits)}%`;
}
