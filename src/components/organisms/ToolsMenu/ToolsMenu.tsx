import Link from "next/link";

interface ToolEntry {
  href: string;
  title: string;
  description: string;
}

const DATE_TOOLS: ToolEntry[] = [
  { href: "/tools/umur", title: "Hitung Umur", description: "Umur, hari lahir, & countdown ulang tahun." },
  { href: "/tools/selisih-tanggal", title: "Selisih Dua Tanggal", description: "Jarak antara dua tanggal." },
  { href: "/tools/tambah-kurang-hari", title: "Tambah / Kurang Hari", description: "Tambah atau kurangi hari dari suatu tanggal." },
  { href: "/tools/hari-apa", title: "Hari Apa", description: "Tanggal tertentu jatuh pada hari apa." },
  { href: "/tools/hari-ke-berapa", title: "Hari ke Berapa", description: "Urutan hari dalam setahun." },
  { href: "/tools/minggu-ke-berapa", title: "Minggu ke Berapa", description: "Nomor minggu ISO dalam setahun." },
  { href: "/tools/countdown", title: "Countdown ke Tanggal", description: "Hitung mundur ke tanggal tertentu." },
  { href: "/tools/hari-kerja", title: "Hari Kerja", description: "Hari kerja antar tanggal, tanpa weekend & libur." },
  { href: "/tools/hitung-weekend", title: "Hitung Weekend", description: "Jumlah Sabtu & Minggu antar tanggal." },
  { href: "/tools/countdown-tahun-baru", title: "Countdown Tahun Baru", description: "Hitung mundur Tahun Baru Masehi." },
  { href: "/tools/countdown-lebaran", title: "Countdown Lebaran", description: "Hitung mundur Idul Fitri berikutnya." },
  { href: "/tools/countdown-natal", title: "Countdown Natal", description: "Hitung mundur Hari Raya Natal." },
];

const MATH_TOOLS: ToolEntry[] = [
  { href: "/tools/persentase", title: "Kalkulator Persentase", description: "Berapa persen dari suatu angka." },
  { href: "/tools/persentase-perubahan", title: "Persentase Kenaikan/Penurunan", description: "Persentase perubahan antar dua angka." },
  { href: "/tools/diskon", title: "Kalkulator Diskon", description: "Harga setelah potongan diskon." },
  { href: "/tools/ppn", title: "Kalkulator PPN", description: "Harga termasuk PPN." },
  { href: "/tools/rata-rata", title: "Kalkulator Rata-rata", description: "Rata-rata dari sekumpulan angka." },
  { href: "/tools/pembagian", title: "Kalkulator Pembagian", description: "Hasil bagi, sisa, dan desimal." },
  { href: "/tools/fpb", title: "FPB", description: "Faktor Persekutuan Terbesar." },
  { href: "/tools/kpk", title: "KPK", description: "Kelipatan Persekutuan Terkecil." },
  { href: "/tools/pangkat", title: "Pangkat", description: "Hasil pangkat suatu bilangan." },
  { href: "/tools/akar-kuadrat", title: "Akar Kuadrat", description: "Akar kuadrat suatu bilangan." },
];

const SIMPLE_TOOLS: ToolEntry[] = [
  { href: "/tools/bmi", title: "BMI", description: "Indeks Massa Tubuh dari tinggi & berat." },
  { href: "/tools/umur-hewan", title: "Umur Hewan Peliharaan", description: "Umur anjing/kucing setara umur manusia." },
  { href: "/tools/luas-persegi", title: "Luas Persegi", description: "Luas persegi dari panjang sisi." },
  { href: "/tools/luas-lingkaran", title: "Luas Lingkaran", description: "Luas lingkaran dari jari-jari." },
  { href: "/tools/volume-balok", title: "Volume Balok", description: "Volume balok dari panjang, lebar, tinggi." },
  { href: "/tools/kecepatan", title: "Kecepatan", description: "Kecepatan = jarak ÷ waktu." },
  { href: "/tools/konsumsi-bbm", title: "Konsumsi BBM", description: "Efisiensi bahan bakar (km/liter)." },
];

const GENERATOR_TOOLS: ToolEntry[] = [
  { href: "/tools/qr-code", title: "QR Code Generator", description: "Buat QR code dari teks atau tautan." },
  { href: "/tools/barcode", title: "Barcode Generator", description: "Buat barcode CODE128 dari teks." },
  { href: "/tools/random-number", title: "Random Number", description: "Angka acak dalam rentang tertentu." },
  { href: "/tools/random-password", title: "Random Password", description: "Password acak yang aman." },
  { href: "/tools/random-color", title: "Random Color", description: "Warna acak (hex)." },
  { href: "/tools/random-uuid", title: "Random UUID", description: "UUID v4 acak." },
  { href: "/tools/coin-flip", title: "Coin Flip", description: "Lempar koin, Kepala atau Ekor." },
  { href: "/tools/dice-roller", title: "Dice Roller", description: "Lempar dadu virtual." },
];

const IMAGE_TOOLS: ToolEntry[] = [
  { href: "/tools/compress-jpg", title: "Compress JPG", description: "Perkecil ukuran file JPG." },
  { href: "/tools/compress-png", title: "Compress PNG", description: "Perkecil ukuran file PNG." },
  { href: "/tools/resize-image", title: "Resize Image", description: "Ubah ukuran gambar JPG/PNG/WebP." },
  { href: "/tools/convert-jpg-to-png", title: "Convert JPG → PNG", description: "Ubah JPG menjadi PNG." },
  { href: "/tools/convert-png-to-jpg", title: "Convert PNG → JPG", description: "Ubah PNG menjadi JPG." },
  { href: "/tools/convert-jpg-to-webp", title: "Convert JPG → WebP", description: "Ubah JPG menjadi WebP." },
  { href: "/tools/convert-png-to-webp", title: "Convert PNG → WebP", description: "Ubah PNG menjadi WebP." },
  { href: "/tools/convert-webp-to-jpg", title: "Convert WebP → JPG", description: "Ubah WebP menjadi JPG." },
  { href: "/tools/convert-webp-to-png", title: "Convert WebP → PNG", description: "Ubah WebP menjadi PNG." },
];

const PDF_TOOLS: ToolEntry[] = [
  { href: "/tools/merge-pdf", title: "Merge PDF", description: "Gabungkan beberapa PDF jadi satu." },
  { href: "/tools/split-pdf", title: "Split PDF", description: "Pisahkan tiap halaman jadi file sendiri." },
  { href: "/tools/compress-pdf", title: "Compress PDF", description: "Perkecil ukuran file PDF." },
  { href: "/tools/rotate-pdf", title: "Rotate PDF", description: "Putar halaman PDF." },
  { href: "/tools/extract-pdf-pages", title: "Extract PDF Pages", description: "Ambil halaman tertentu jadi PDF baru." },
  { href: "/tools/delete-pdf-pages", title: "Delete PDF Pages", description: "Hapus halaman tertentu dari PDF." },
  { href: "/tools/rearrange-pdf-pages", title: "Rearrange PDF Pages", description: "Ubah urutan halaman PDF." },
  { href: "/tools/image-to-pdf", title: "Image to PDF", description: "Gabungkan gambar jadi satu PDF." },
  { href: "/tools/pdf-to-jpg", title: "PDF to JPG", description: "Ubah tiap halaman PDF jadi JPG." },
  { href: "/tools/pdf-to-png", title: "PDF to PNG", description: "Ubah tiap halaman PDF jadi PNG." },
];

function ToolGrid({ tools }: { tools: ToolEntry[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {tools.map((tool) => (
        <Link
          key={tool.href}
          href={tool.href}
          className="rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-blue-400 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500"
        >
          <h3 className="font-semibold text-slate-900 dark:text-slate-50">{tool.title}</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{tool.description}</p>
        </Link>
      ))}
    </div>
  );
}

export default function ToolsMenu() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Tanggal &amp; Waktu
        </h2>
        <ToolGrid tools={DATE_TOOLS} />
      </section>
      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Matematika
        </h2>
        <ToolGrid tools={MATH_TOOLS} />
      </section>
      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Kalkulator Sederhana
        </h2>
        <ToolGrid tools={SIMPLE_TOOLS} />
      </section>
      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Generator
        </h2>
        <ToolGrid tools={GENERATOR_TOOLS} />
      </section>
      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Image Tools
        </h2>
        <p className="mb-3 text-xs text-slate-500 dark:text-slate-400">
          Diproses langsung di browser kamu, gambar tidak diunggah ke server manapun.
        </p>
        <ToolGrid tools={IMAGE_TOOLS} />
      </section>
      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          PDF Tools
        </h2>
        <p className="mb-3 text-xs text-slate-500 dark:text-slate-400">
          Diproses langsung di browser kamu, PDF tidak diunggah ke server manapun.
        </p>
        <ToolGrid tools={PDF_TOOLS} />
      </section>
    </div>
  );
}
