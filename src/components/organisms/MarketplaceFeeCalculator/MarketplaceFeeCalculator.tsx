import SimpleCalculatorTool from "@/components/organisms/SimpleCalculatorTool/SimpleCalculatorTool";
import { formatRupiah } from "@/utils/marketplaceTools";

export interface MarketplaceFeeCalculatorProps {
  platform: string;
  defaultFeePercent: string;
}

export default function MarketplaceFeeCalculator({ platform, defaultFeePercent }: MarketplaceFeeCalculatorProps) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Persentase fee {platform} berbeda-beda tergantung kategori produk & program yang diikuti toko, dan bisa
        berubah sewaktu-waktu. Nilai di bawah cuma perkiraan awal — ubah sesuai info di dashboard seller kamu.
      </p>
      <SimpleCalculatorTool
        fields={[
          { key: "sellPrice", label: "Harga Jual per Unit (Rp)", placeholder: "100000" },
          { key: "qty", label: "Jumlah Terjual", placeholder: "10" },
          { key: "feePercent", label: `Fee Admin ${platform} (%)`, defaultValue: defaultFeePercent },
          { key: "otherFeePercent", label: "Fee Lainnya (%, opsional)", defaultValue: "0" },
        ]}
        compute={({ sellPrice, qty, feePercent, otherFeePercent }) => {
          const gross = sellPrice * qty;
          const feeAmount = (gross * (feePercent + otherFeePercent)) / 100;
          return [
            { label: "Total Penjualan", value: formatRupiah(gross) },
            { label: "Total Fee", value: formatRupiah(feeAmount) },
            { label: "Pendapatan Bersih", value: formatRupiah(gross - feeAmount) },
          ];
        }}
      />
    </div>
  );
}
