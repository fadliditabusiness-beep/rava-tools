import MegaCategoryLandingTemplate from "@/components/templates/MegaCategoryLandingTemplate/MegaCategoryLandingTemplate";
import { MARKETPLACE_CATEGORIES, MARKETPLACE_LIVE_COUNT, MARKETPLACE_TOOL_COUNT } from "@/constants/marketplaceCategories";

const FAQ = [
  {
    question: "Apakah kalkulator fee marketplace ini akurat?",
    answer:
      "Persentase fee tiap marketplace berubah-ubah tergantung kategori produk & program yang diikuti toko. Angka default di kalkulator adalah perkiraan umum dan bisa kamu ubah sendiri — cek dashboard seller kamu untuk angka pasti.",
  },
  {
    question: "Apakah data harga/produk saya diunggah ke server?",
    answer: "Tidak. Semua perhitungan berjalan 100% di browser kamu, tidak ada data yang dikirim ke server manapun.",
  },
  {
    question: "Kenapa ada tool berlabel Coming Soon?",
    answer: "Kategori ini dikembangkan bertahap. Tool yang belum aktif ditandai Coming Soon dan akan menyusul di update berikutnya.",
  },
  {
    question: "Cocok untuk seller marketplace mana saja?",
    answer: "Kalkulator harga & fee mendukung Shopee, Tokopedia, TikTok Shop, Lazada, Blibli, dan Bukalapak.",
  },
];

const RELATED_TOOLS = [
  { title: "Semua Tools", href: "/tools" },
  { title: "Social Media Tools", href: "/social-media-tools" },
  { title: "QR Code Generator", href: "/tools/qr-code" },
  { title: "Barcode Generator", href: "/tools/barcode" },
  { title: "Resize Image", href: "/tools/resize-image" },
];

export default function MarketplaceToolsPage() {
  return (
    <MegaCategoryLandingTemplate
      pageTitle="Marketplace Tools"
      heroSubtitle="Kalkulator harga, profit, fee marketplace (Shopee/Tokopedia/TikTok Shop/Lazada/Blibli/Bukalapak), sampai tools produk untuk seller online. Semua jalan di browser kamu, tanpa upload data ke server."
      breadcrumbLabel="Marketplace Tools"
      categories={MARKETPLACE_CATEGORIES}
      faq={FAQ}
      relatedTools={RELATED_TOOLS}
      liveCount={MARKETPLACE_LIVE_COUNT}
      totalCount={MARKETPLACE_TOOL_COUNT}
      accentGradient="from-emerald-600 to-teal-600"
    />
  );
}
