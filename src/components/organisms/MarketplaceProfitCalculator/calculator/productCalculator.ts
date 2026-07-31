import type { Product, ProductResult } from "../types";
import { safeDivide, toSafeNumber } from "../utils/numberUtils";

/**
 * Formula reference:
 * HPP           = harga modal murni (costPrice)
 * Total Modal   = HPP + biaya packing + biaya lain
 * Total Biaya   = biaya packing + biaya lain (di luar HPP)
 * Harga Jual setelah diskon = sellPrice - (sellPrice * discountPercent / 100)
 * Fee Admin     = harga setelah diskon * marketplaceFeePercent / 100
 * Total Potongan = diskon + voucher + fee admin (pajak dihitung terpisah, dipotong dari profit)
 * Harga Bersih  = sellPrice - Total Potongan
 * Profit        = Harga Bersih - Total Modal (sebelum pajak)
 * Net Income    = Profit - Pajak (bottom line setelah pajak)
 * Margin        = Profit / Harga Jual (gross)
 * Profit %      = Profit / Harga Bersih (net revenue diterima)
 * Markup        = Profit / Total Modal
 * ROI           = Net Income / Total Modal
 *
 * Rekomendasi Harga Jual: harga jual (S) minimum agar Margin (Profit/S) mencapai
 * targetMarginPercent, dengan diskon/voucher/fee tetap seperti sekarang.
 * Profit = S*(1-d)*(1-f) - voucher - totalModal, margin target t = Profit/S, sehingga:
 * S = (voucher + totalModal) / ((1-d)*(1-f) - t)
 * Jika penyebut <= 0 (diskon+fee sudah terlalu besar), target tidak tercapai (NaN).
 */
export function calculateProduct(product: Product): ProductResult {
  const costPrice = toSafeNumber(product.costPrice);
  const packingCost = toSafeNumber(product.packingCost);
  const otherCost = toSafeNumber(product.otherCost);
  const sellPrice = toSafeNumber(product.sellPrice);
  const discountPercent = toSafeNumber(product.discountPercent);
  const voucher = toSafeNumber(product.voucher);
  const marketplaceFeePercent = toSafeNumber(product.marketplaceFeePercent);
  const tax = toSafeNumber(product.tax);
  const targetMarginPercent = toSafeNumber(product.targetMarginPercent);

  const hpp = costPrice;
  const totalBiaya = packingCost + otherCost;
  const totalModal = hpp + totalBiaya;

  const discountAmount = sellPrice * (discountPercent / 100);
  const hargaSetelahDiskon = sellPrice - discountAmount;
  const feeAmount = hargaSetelahDiskon * (marketplaceFeePercent / 100);

  const totalPotongan = discountAmount + voucher + feeAmount;
  const hargaBersih = sellPrice - totalPotongan;

  const profit = hargaBersih - totalModal;
  const netIncome = profit - tax;

  const margin = safeDivide(profit, sellPrice) * 100;
  const markup = safeDivide(profit, totalModal) * 100;
  const roi = safeDivide(netIncome, totalModal) * 100;
  const profitPercent = safeDivide(profit, hargaBersih) * 100;

  const retainedRatio = (1 - discountPercent / 100) * (1 - marketplaceFeePercent / 100) - targetMarginPercent / 100;
  const recommendedSellPrice = retainedRatio > 0 ? (voucher + totalModal) / retainedRatio : NaN;

  return {
    hpp,
    totalModal,
    totalBiaya,
    discountAmount,
    feeAmount,
    totalPotongan,
    hargaBersih,
    profit,
    margin,
    markup,
    roi,
    profitPercent,
    netIncome,
    recommendedSellPrice,
    isProfit: netIncome >= 0,
  };
}
