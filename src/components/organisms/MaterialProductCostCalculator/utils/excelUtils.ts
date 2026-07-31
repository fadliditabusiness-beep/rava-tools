import * as XLSX from "xlsx";
import type { BusinessSummaryData, Material, ProductWithResult } from "../types";
import { EXCEL_FILE_NAME, EXCEL_MATERIAL_SHEET_NAME, EXCEL_PRODUCT_SHEET_NAME, EXCEL_SUMMARY_SHEET_NAME } from "../constants";
import { createId, toSafeNumber } from "./numberUtils";
import { calculatePricePerUnit } from "../calculator/materialCalculator";

const IMPORT_COLUMNS = {
  image: ["Picture", "picture", "Gambar"],
  name: ["Name", "name", "Nama Material", "Nama"],
  variant: ["Variant", "variant", "Varian"],
  supplier: ["Supplier", "supplier"],
  link: ["Link", "link", "Link Produk"],
  price: ["Price", "price", "Harga"],
  qty: ["Qty", "qty", "Quantity"],
  unit: ["Unit", "unit", "Satuan"],
  note: ["Comment", "comment", "Catatan", "Note"],
} as const;

function readField(row: Record<string, unknown>, keys: readonly string[]): unknown {
  for (const key of keys) {
    if (key in row) return row[key];
  }
  return undefined;
}

export async function importMaterialsFromExcel(file: File): Promise<Material[]> {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: "array" });
  const sheetName = workbook.SheetNames.includes(EXCEL_MATERIAL_SHEET_NAME) ? EXCEL_MATERIAL_SHEET_NAME : workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  if (!sheet) return [];

  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: "" });

  return rows.map((row) => ({
    id: createId("material"),
    image: String(readField(row, IMPORT_COLUMNS.image) ?? ""),
    name: String(readField(row, IMPORT_COLUMNS.name) ?? ""),
    variant: String(readField(row, IMPORT_COLUMNS.variant) ?? ""),
    supplier: String(readField(row, IMPORT_COLUMNS.supplier) ?? ""),
    link: String(readField(row, IMPORT_COLUMNS.link) ?? ""),
    price: toSafeNumber(readField(row, IMPORT_COLUMNS.price)),
    qty: toSafeNumber(readField(row, IMPORT_COLUMNS.qty)) || 1,
    unit: "pcs" as const,
    note: String(readField(row, IMPORT_COLUMNS.note) ?? ""),
  }));
}

export function exportToExcel(materials: Material[], products: ProductWithResult[], summary: BusinessSummaryData): void {
  const materialRows = materials.map((material) => ({
    Picture: material.image,
    Name: material.name,
    Variant: material.variant,
    Supplier: material.supplier,
    Link: material.link,
    Price: material.price,
    Qty: material.qty,
    Unit: material.unit,
    "Harga per Unit": Number(calculatePricePerUnit(material).toFixed(2)),
    Comment: material.note,
  }));

  const productRows = products.map(({ product, result }) => ({
    "Nama Produk": product.name,
    "Harga Jual": product.sellPrice,
    "Biaya Packing": product.packingCost,
    "Biaya Lain": product.otherCost,
    "Target Margin (%)": product.targetMarginPercent,
    Catatan: product.note,
    "Material Cost": result.materialCost,
    "Total HPP": result.totalHpp,
    Profit: result.profit,
    "Margin (%)": Number(result.margin.toFixed(2)),
    "Markup (%)": Number(result.markup.toFixed(2)),
    "ROI (%)": Number(result.roi.toFixed(2)),
    "Net Income": result.netIncome,
    Status: result.isProfit ? "Profit" : "Loss",
    "Material Digunakan": result.lines
      .map((line) => `${line.material?.name ?? "(dihapus)"} x${line.qtyUsed} = ${Math.round(line.total)}`)
      .join("; "),
  }));

  const summaryRows = [
    { Kategori: "Total Material", Nilai: summary.kpi.totalMaterial },
    { Kategori: "Total Produk", Nilai: summary.kpi.totalProduct },
    { Kategori: "Average HPP", Nilai: Number(summary.kpi.avgHpp.toFixed(2)) },
    { Kategori: "Total Profit", Nilai: Number(summary.kpi.totalProfit.toFixed(2)) },
    { Kategori: "Average Margin (%)", Nilai: Number(summary.kpi.avgMargin.toFixed(2)) },
    { Kategori: "Average Markup (%)", Nilai: Number(summary.kpi.avgMarkup.toFixed(2)) },
    { Kategori: "Material Termahal", Nilai: summary.materialSummary.mostExpensive?.material.name ?? "-" },
    { Kategori: "Material Termurah", Nilai: summary.materialSummary.cheapest?.material.name ?? "-" },
    { Kategori: "Total Nilai Material", Nilai: Number(summary.materialSummary.totalValue.toFixed(2)) },
    { Kategori: "Average Harga Material", Nilai: Number(summary.materialSummary.averagePrice.toFixed(2)) },
    { Kategori: "Produk Profit Tertinggi", Nilai: summary.productSummary.highestProfit?.product.name ?? "-" },
    { Kategori: "Produk Profit Terendah", Nilai: summary.productSummary.lowestProfit?.product.name ?? "-" },
    { Kategori: "Produk HPP Tertinggi", Nilai: summary.productSummary.highestHpp?.product.name ?? "-" },
    { Kategori: "Produk HPP Terendah", Nilai: summary.productSummary.lowestHpp?.product.name ?? "-" },
    ...summary.insights.map((insight, index) => ({ Kategori: `Insight ${index + 1}`, Nilai: insight })),
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(materialRows), EXCEL_MATERIAL_SHEET_NAME);
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(productRows), EXCEL_PRODUCT_SHEET_NAME);
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(summaryRows), EXCEL_SUMMARY_SHEET_NAME);
  XLSX.writeFile(workbook, EXCEL_FILE_NAME);
}
