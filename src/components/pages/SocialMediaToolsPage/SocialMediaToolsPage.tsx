import MegaCategoryLandingTemplate from "@/components/templates/MegaCategoryLandingTemplate/MegaCategoryLandingTemplate";
import { SOCIAL_MEDIA_CATEGORIES, SOCIAL_MEDIA_LIVE_COUNT, SOCIAL_MEDIA_TOOL_COUNT } from "@/constants/socialMediaCategories";

const FAQ = [
  {
    question: "Apakah semua tool ini gratis?",
    answer: "Ya, semua tool di Social Media Tools gratis dan berjalan langsung di browser kamu — tidak ada limit pemakaian.",
  },
  {
    question: "Apakah data caption/gambar saya diunggah ke server?",
    answer: "Tidak. Semua proses (hitung karakter, generate hashtag, kompres gambar/video) berjalan 100% di browser kamu, tidak lewat server manapun.",
  },
  {
    question: "Kenapa ada tool berlabel Coming Soon?",
    answer: "Kategori ini dikembangkan bertahap. Tool yang belum aktif ditandai Coming Soon dan akan menyusul di update berikutnya.",
  },
  {
    question: "Apakah bisa dipakai di HP?",
    answer: "Bisa. Semua tool responsive dan bisa dipasang sebagai aplikasi (PWA) langsung dari browser HP kamu.",
  },
];

const RELATED_TOOLS = [
  { title: "Semua Tools", href: "/tools" },
  { title: "Marketplace Tools", href: "/marketplace-tools" },
  { title: "Compress Video", href: "/tools/compress-video" },
  { title: "QR Code Generator", href: "/tools/qr-code" },
];

export default function SocialMediaToolsPage() {
  return (
    <MegaCategoryLandingTemplate
      pageTitle="Social Media Tools"
      heroSubtitle="Kumpulan tools gratis untuk Instagram, TikTok, YouTube, LinkedIn, Facebook, Pinterest, Threads, dan X — caption counter, hashtag generator, resize gambar/video, sampai size guide. Semua jalan di browser kamu."
      breadcrumbLabel="Social Media Tools"
      categories={SOCIAL_MEDIA_CATEGORIES}
      faq={FAQ}
      relatedTools={RELATED_TOOLS}
      liveCount={SOCIAL_MEDIA_LIVE_COUNT}
      totalCount={SOCIAL_MEDIA_TOOL_COUNT}
      accentGradient="from-pink-600 to-rose-600"
    />
  );
}
