import * as XLSX from "xlsx";
import type { BusinessSummaryData, MarketplaceId, Product, ProductWithResult } from "../types";
import {
  MARKETPLACE_OPTIONS,
  EXCEL_FILE_NAME,
  EXCEL_PRODUCT_SHEET_NAME,
  EXCEL_SUMMARY_SHEET_NAME,
  getDefaultFeePercent,
  DEFAULT_TARGET_MARGIN_PERCENT,
} from "../constants";
import { createProductId, toSafeNumber } from "./numberUtils";

const IMPORT_COLUMNS = {
  name: ["Nama Produk", "Nama produk", "nama produk"],
  marketplace: ["Marketplace", "marketplace"],
  costPrice: ["Harga Modal", "harga modal"],
  packingCost: ["Biaya Packing", "biaya packing"],
  otherCost: ["Biaya Lain", "biaya lain"],
  sellPrice: ["Harga Jual", "harga jual"],
  discountPercent: ["Diskon", "diskon", "Diskon (%)"],
  voucher: ["Voucher", "voucher"],
  marketplaceFeePercent: ["Admin Marketplace", "admin marketplace", "Admin Marketplace (%)"],
  tax: ["Pajak", "pajak"],
} as const;

function readField(row: Record<string, unknown>, keys: readonly string[]): unknown {
  for (const key of keys) {
    if (key in row) return row[key];
  }
  return undefined;
}

function resolveMarketplace(value: unknown): MarketplaceId {
  const normalized = String(value ?? "").trim().toLowerCase();
  const match = MARKETPLACE_OPTIONS.find((m) => m.label.toLowerCase() === normalized || m.id === normalized);
  return match?.id ?? "custom";
}

export async function importProductsFromExcel(file: File): Promise<Product[]> {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: "array" });
  const sheetName = workbook.SheetNames.includes(EXCEL_PRODUCT_SHEET_NAME) ? EXCEL_PRODUCT_SHEET_NAME : workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  if (!sheet) return [];

  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: "" });

  return rows.map((row) => {
    const marketplace = resolveMarketplace(readField(row, IMPORT_COLUMNS.marketplace));
    const marketplaceFeeRaw = readField(row, IMPORT_COLUMNS.marketplaceFeePercent);

    return {
      id: createProductId(),
      name: String(readField(row, IMPORT_COLUMNS.name) ?? ""),
      marketplace,
      costPrice: toSafeNumber(readField(row, IMPORT_COLUMNS.costPrice)),
      packingCost: toSafeNumber(readField(row, IMPORT_COLUMNS.packingCost)),
      otherCost: toSafeNumber(readField(row, IMPORT_COLUMNS.otherCost)),
      sellPrice: toSafeNumber(readField(row, IMPORT_COLUMNS.sellPrice)),
      discountPercent: toSafeNumber(readField(row, IMPORT_COLUMNS.discountPercent)),
      voucher: toSafeNumber(readField(row, IMPORT_COLUMNS.voucher)),
      marketplaceFeePercent: marketplaceFeeRaw === "" || marketplaceFeeRaw === undefined ? getDefaultFeePercent(marketplace) : toSafeNumber(marketplaceFeeRaw),
      tax: toSafeNumber(readField(row, IMPORT_COLUMNS.tax)),
      targetMarginPercent: DEFAULT_TARGET_MARGIN_PERCENT,
      note: "",
    };
  });
}

function marketplaceLabel(id: MarketplaceId): string {
  return MARKETPLACE_OPTIONS.find((m) => m.id === id)?.label ?? id;
}

export function exportToExcel(items: ProductWithResult[], summary: BusinessSummaryData): void {
  const productRows = items.map(({ product, result }) => ({
    "Nama Produk": product.name,
    Marketplace: marketplaceLabel(product.marketplace),
    "Harga Modal": product.costPrice,
    "Biaya Packing": product.packingCost,
    "Biaya Lain": product.otherCost,
    "Harga Jual": product.sellPrice,
    "Diskon (%)": product.discountPercent,
    Voucher: product.voucher,
    "Admin Marketplace (%)": product.marketplaceFeePercent,
    Pajak: product.tax,
    "Target Margin (%)": product.targetMarginPercent,
    Catatan: product.note,
    HPP: result.hpp,
    "Total Modal": result.totalModal,
    "Total Biaya": result.totalBiaya,
    "Total Potongan": result.totalPotongan,
    "Harga Bersih": result.hargaBersih,
    Profit: result.profit,
    "Margin (%)": Number(result.margin.toFixed(2)),
    "Markup (%)": Number(result.markup.toFixed(2)),
    "ROI (%)": Number(result.roi.toFixed(2)),
    "Profit (%)": Number(result.profitPercent.toFixed(2)),
    "Net Income": result.netIncome,
    "Rekomendasi Harga Jual": Number.isFinite(result.recommendedSellPrice) ? result.recommendedSellPrice : "",
    Status: result.isProfit ? "Profit" : "Loss",
  }));

  const summaryRows = [
    { Kategori: "Jumlah Produk", Nilai: summary.productCount },
    { Kategori: "Total Modal", Nilai: summary.financial.totalModal },
    { Kategori: "Total Penjualan", Nilai: summary.financial.totalPenjualan },
    { Kategori: "Total Profit", Nilai: summary.financial.totalProfit },
    { Kategori: "Total Biaya", Nilai: summary.financial.totalBiaya },
    { Kategori: "Total Potongan", Nilai: summary.financial.totalPotongan },
    { Kategori: "Total Packing", Nilai: summary.financial.totalPacking },
    { Kategori: "Total Voucher", Nilai: summary.financial.totalVoucher },
    { Kategori: "Total Pajak", Nilai: summary.financial.totalPajak },
    { Kategori: "Total Admin Marketplace", Nilai: summary.financial.totalAdmin },
    { Kategori: "Average Profit", Nilai: Number(summary.profitAnalysis.avgProfit.toFixed(2)) },
    { Kategori: "Average Margin (%)", Nilai: Number(summary.profitAnalysis.avgMargin.toFixed(2)) },
    { Kategori: "Average Markup (%)", Nilai: Number(summary.profitAnalysis.avgMarkup.toFixed(2)) },
    { Kategori: "Average ROI (%)", Nilai: Number(summary.profitAnalysis.avgRoi.toFixed(2)) },
    { Kategori: "Business Health Score", Nilai: summary.health.score },
    { Kategori: "Business Health Category", Nilai: summary.health.category },
    ...summary.insights.map((insight, index) => ({ Kategori: `Insight ${index + 1}`, Nilai: insight })),
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(productRows), EXCEL_PRODUCT_SHEET_NAME);
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(summaryRows), EXCEL_SUMMARY_SHEET_NAME);
  XLSX.writeFile(workbook, EXCEL_FILE_NAME);
}
