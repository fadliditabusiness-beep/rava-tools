export interface ToolEntry {
  href: string;
  title: string;
  description: string;
}

export type ToolAccent =
  | "sky"
  | "violet"
  | "emerald"
  | "amber"
  | "rose"
  | "orange"
  | "indigo"
  | "teal"
  | "fuchsia"
  | "cyan"
  | "pink"
  | "lime";

export interface ToolCategory {
  id: string;
  title: string;
  icon: string;
  accent: ToolAccent;
  note?: string;
  tools: ToolEntry[];
}

export const TOOL_CATEGORIES: ToolCategory[] = [
  {
    id: "tanggal-waktu",
    title: "Tanggal & Waktu",
    icon: "📅",
    accent: "sky",
    tools: [
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
    ],
  },
  {
    id: "matematika",
    title: "Matematika",
    icon: "🧮",
    accent: "violet",
    tools: [
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
    ],
  },
  {
    id: "kalkulator-sederhana",
    title: "Kalkulator Sederhana",
    icon: "📐",
    accent: "emerald",
    tools: [
      { href: "/tools/bmi", title: "BMI", description: "Indeks Massa Tubuh dari tinggi & berat." },
      { href: "/tools/umur-hewan", title: "Umur Hewan Peliharaan", description: "Umur anjing/kucing setara umur manusia." },
      { href: "/tools/luas-persegi", title: "Luas Persegi", description: "Luas persegi dari panjang sisi." },
      { href: "/tools/luas-lingkaran", title: "Luas Lingkaran", description: "Luas lingkaran dari jari-jari." },
      { href: "/tools/volume-balok", title: "Volume Balok", description: "Volume balok dari panjang, lebar, tinggi." },
      { href: "/tools/kecepatan", title: "Kecepatan", description: "Kecepatan = jarak ÷ waktu." },
      { href: "/tools/konsumsi-bbm", title: "Konsumsi BBM", description: "Efisiensi bahan bakar (km/liter)." },
    ],
  },
  {
    id: "generator",
    title: "Generator",
    icon: "🎲",
    accent: "amber",
    tools: [
      { href: "/tools/qr-code", title: "QR Code Generator", description: "Buat QR code dari teks atau tautan." },
      { href: "/tools/barcode", title: "Barcode Generator", description: "Buat barcode CODE128 dari teks." },
      { href: "/tools/random-number", title: "Random Number", description: "Angka acak dalam rentang tertentu." },
      { href: "/tools/random-password", title: "Random Password", description: "Password acak yang aman." },
      { href: "/tools/random-color", title: "Random Color", description: "Warna acak (hex)." },
      { href: "/tools/random-uuid", title: "Random UUID", description: "UUID v4 acak." },
      { href: "/tools/coin-flip", title: "Coin Flip", description: "Lempar koin, Kepala atau Ekor." },
      { href: "/tools/dice-roller", title: "Dice Roller", description: "Lempar dadu virtual." },
    ],
  },
  {
    id: "image-tools",
    title: "Image Tools",
    icon: "🖼️",
    accent: "rose",
    note: "Diproses langsung di browser kamu, gambar tidak diunggah ke server manapun.",
    tools: [
      { href: "/tools/compress-jpg", title: "Compress JPG", description: "Perkecil ukuran file JPG." },
      { href: "/tools/compress-png", title: "Compress PNG", description: "Perkecil ukuran file PNG." },
      { href: "/tools/resize-image", title: "Resize Image", description: "Ubah ukuran gambar JPG/PNG/WebP." },
      { href: "/tools/convert-jpg-to-png", title: "Convert JPG → PNG", description: "Ubah JPG menjadi PNG." },
      { href: "/tools/convert-png-to-jpg", title: "Convert PNG → JPG", description: "Ubah PNG menjadi JPG." },
      { href: "/tools/convert-jpg-to-webp", title: "Convert JPG → WebP", description: "Ubah JPG menjadi WebP." },
      { href: "/tools/convert-png-to-webp", title: "Convert PNG → WebP", description: "Ubah PNG menjadi WebP." },
      { href: "/tools/convert-webp-to-jpg", title: "Convert WebP → JPG", description: "Ubah WebP menjadi JPG." },
      { href: "/tools/convert-webp-to-png", title: "Convert WebP → PNG", description: "Ubah WebP menjadi PNG." },
      { href: "/tools/image-converter", title: "Image Converter", description: "Ubah gambar ke format PNG, JPG, atau WebP." },
      { href: "/tools/image-compressor", title: "Image Compressor", description: "Perkecil ukuran file gambar apa pun." },
      { href: "/tools/jfif-to-png", title: "Convert JFIF to PNG", description: "Ubah gambar JFIF menjadi PNG." },
      { href: "/tools/png-to-svg", title: "Convert PNG to SVG", description: "Bungkus gambar PNG jadi file .svg (embed, bukan vector asli)." },
      { href: "/tools/svg-converter", title: "SVG Converter", description: "Ubah SVG menjadi PNG atau JPG." },
      { href: "/tools/crop-image", title: "Crop Image", description: "Potong area gambar sesuai posisi & ukuran." },
      { href: "/tools/rotate-image", title: "Rotate Image", description: "Putar gambar 90°, 180°, atau 270°." },
      { href: "/tools/flip-image", title: "Flip Image", description: "Balik gambar secara horizontal atau vertikal." },
      { href: "/tools/image-enlarger", title: "Image Enlarger", description: "Perbesar ukuran gambar 2x, 3x, atau 4x." },
    ],
  },
  {
    id: "pdf-tools",
    title: "PDF Tools",
    icon: "📄",
    accent: "orange",
    note: "Diproses langsung di browser kamu, PDF tidak diunggah ke server manapun.",
    tools: [
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
      { href: "/tools/pdf-converter", title: "PDF Converter", description: "PDF ke gambar, atau gambar ke PDF." },
      { href: "/tools/flatten-pdf", title: "Flatten PDF", description: "Kunci form field PDF jadi konten permanen." },
      { href: "/tools/resize-pdf", title: "Resize PDF", description: "Ubah ukuran halaman PDF (A4, Letter, dll)." },
      { href: "/tools/crop-pdf", title: "Crop PDF", description: "Potong margin halaman PDF." },
      { href: "/tools/organize-pdf", title: "Organize PDF", description: "Urutkan ulang & hapus halaman PDF sekaligus." },
      { href: "/tools/extract-images-from-pdf", title: "Extract Images from PDF", description: "Ambil semua gambar yang ada di dalam PDF." },
    ],
  },
  {
    id: "developer-tools",
    title: "Developer Tools",
    icon: "⌨️",
    accent: "indigo",
    tools: [
      { href: "/tools/json-to-typescript", title: "JSON to TypeScript", description: "Buat interface TS dari JSON." },
      { href: "/tools/json-formatter", title: "JSON Formatter", description: "Rapikan JSON." },
      { href: "/tools/json-validator", title: "JSON Validator", description: "Cek validitas JSON." },
      { href: "/tools/xml-formatter", title: "XML Formatter", description: "Rapikan XML." },
      { href: "/tools/html-formatter", title: "HTML Formatter", description: "Rapikan HTML." },
      { href: "/tools/css-formatter", title: "CSS Formatter", description: "Rapikan CSS." },
      { href: "/tools/javascript-formatter", title: "JavaScript Formatter", description: "Rapikan JavaScript." },
      { href: "/tools/sql-formatter", title: "SQL Formatter", description: "Rapikan query SQL." },
      { href: "/tools/base64-encode", title: "Base64 Encode", description: "Teks ke Base64." },
      { href: "/tools/base64-decode", title: "Base64 Decode", description: "Base64 ke teks." },
      { href: "/tools/url-encode", title: "URL Encode", description: "Encode teks untuk URL." },
      { href: "/tools/url-decode", title: "URL Decode", description: "Decode URL-encoded string." },
      { href: "/tools/jwt-decoder", title: "JWT Decoder", description: "Decode header & payload JWT." },
      { href: "/tools/random-uuid", title: "UUID Generator", description: "UUID v4 acak." },
      { href: "/tools/timestamp-converter", title: "Timestamp Converter", description: "Epoch ke tanggal & sebaliknya." },
      { href: "/tools/unix-time-converter", title: "Unix Time Converter", description: "Unix time ke tanggal & sebaliknya." },
      { href: "/tools/hash-generator", title: "Hash Generator", description: "MD5, SHA-1, SHA-256." },
      { href: "/tools/regex-tester", title: "Regex Tester", description: "Uji regular expression." },
      { href: "/tools/color-picker", title: "Color Picker", description: "Pilih warna, lihat HEX/RGB/HSL." },
      { href: "/tools/hex-rgb-converter", title: "HEX ↔ RGB Converter", description: "Konversi HEX dan RGB." },
      { href: "/tools/css-gradient-generator", title: "CSS Gradient Generator", description: "Buat CSS gradient." },
    ],
  },
  {
    id: "utilitas",
    title: "Utilitas",
    icon: "🧰",
    accent: "teal",
    note: "Timer, catatan, & pilihan acak tersimpan/berjalan langsung di browser kamu.",
    tools: [
      { href: "/tools/stopwatch", title: "Stopwatch", description: "Hitung waktu berjalan, mulai, jeda, & lap." },
      { href: "/tools/timer", title: "Timer", description: "Hitung mundur waktu dengan alarm bunyi." },
      { href: "/tools/live-countdown", title: "Countdown Real-time", description: "Hitung mundur langsung ke tanggal & jam tertentu." },
      { href: "/tools/todo-list", title: "To-do List", description: "Catatan tugas, tersimpan di browser kamu." },
      { href: "/tools/notes", title: "Notes", description: "Catatan singkat, tersimpan di browser kamu." },
      { href: "/tools/habit-tracker", title: "Habit Tracker", description: "Lacak kebiasaan harian & streak." },
      { href: "/tools/ics-generator", title: "Calendar Event Generator", description: "Buat file .ics untuk Google/Outlook/Apple Calendar." },
      { href: "/tools/random-picker", title: "Random Picker (Wheel)", description: "Roda undian, putar untuk pilih acak dari daftar." },
      { href: "/tools/number-picker", title: "Number Picker", description: "Pilih angka acak dari rentang, tanpa pengulangan (opsional)." },
      { href: "/tools/decision-maker", title: "Decision Maker", description: "Bingung milih? Masukin pilihan, biar diacak." },
      { href: "/tools/unit-converter", title: "Unit Converter", description: "Konversi panjang, berat, volume, & suhu." },
      { href: "/tools/time-converter", title: "Time Converter", description: "Konversi durasi antar satuan waktu." },
    ],
  },
  {
    id: "video-tools",
    title: "Video Tools",
    icon: "🎬",
    accent: "fuchsia",
    note: "Diproses langsung di browser kamu (ffmpeg.wasm), video tidak diunggah ke server manapun. Mesin video (~30MB) diunduh sekali saat konversi pertama.",
    tools: [
      { href: "/tools/compress-video", title: "Compress Video", description: "Perkecil ukuran file video." },
      { href: "/tools/convert-mp4-to-webm", title: "Convert MP4 → WebM", description: "Ubah video MP4 menjadi WebM." },
      { href: "/tools/convert-webm-to-mp4", title: "Convert WebM → MP4", description: "Ubah video WebM menjadi MP4." },
      { href: "/tools/convert-mov-to-mp4", title: "Convert MOV → MP4", description: "Ubah video MOV menjadi MP4." },
      { href: "/tools/convert-avi-to-mp4", title: "Convert AVI → MP4", description: "Ubah video AVI menjadi MP4." },
      { href: "/tools/convert-mkv-to-mp4", title: "Convert MKV → MP4", description: "Ubah video MKV menjadi MP4." },
      { href: "/tools/convert-gif-to-mp4", title: "Convert GIF → MP4", description: "Ubah GIF menjadi video MP4." },
      { href: "/tools/convert-mp4-to-gif", title: "Convert MP4 → GIF", description: "Ubah video MP4 menjadi GIF." },
      { href: "/tools/video-converter", title: "Video Converter", description: "Ubah video ke format MP4, WebM, atau GIF." },
      { href: "/tools/mp4-converter", title: "MP4 Converter", description: "Ubah video MP4 ke WebM atau GIF." },
      { href: "/tools/crop-video", title: "Crop Video", description: "Potong area video sesuai posisi & ukuran." },
      { href: "/tools/trim-video", title: "Trim Video", description: "Potong durasi video, ambil bagian tertentu." },
    ],
  },
  {
    id: "audio-tools",
    title: "Audio Tools",
    icon: "🎵",
    accent: "violet",
    note: "Diproses langsung di browser kamu (ffmpeg.wasm), audio tidak diunggah ke server manapun.",
    tools: [
      { href: "/tools/audio-converter", title: "Audio Converter", description: "Ubah audio ke format MP3, OGG, atau WAV." },
      { href: "/tools/mp3-converter", title: "MP3 Converter", description: "Ubah file MP3 ke format OGG." },
      { href: "/tools/mp3-to-ogg", title: "Convert MP3 to OGG", description: "Ubah audio MP3 menjadi OGG." },
      { href: "/tools/mp4-to-mp3", title: "Convert MP4 to MP3", description: "Ambil audio dari video MP4 jadi MP3." },
      { href: "/tools/video-to-mp3", title: "Convert Video to MP3", description: "Ambil audio dari video apa pun jadi MP3." },
      { href: "/tools/mp3-compressor", title: "MP3 Compressor", description: "Perkecil ukuran file MP3." },
      { href: "/tools/wav-compressor", title: "WAV Compressor", description: "Perkecil ukuran file WAV." },
    ],
  },
  {
    id: "gif-tools",
    title: "GIF Tools",
    icon: "🌀",
    accent: "fuchsia",
    note: "Diproses langsung di browser kamu (ffmpeg.wasm), file tidak diunggah ke server manapun.",
    tools: [
      { href: "/tools/video-to-gif", title: "Convert Video to GIF", description: "Ubah video apa pun menjadi GIF." },
      { href: "/tools/webm-to-gif", title: "Convert WEBM to GIF", description: "Ubah video WebM menjadi GIF." },
      { href: "/tools/mov-to-gif", title: "Convert MOV to GIF", description: "Ubah video MOV menjadi GIF." },
      { href: "/tools/avi-to-gif", title: "Convert AVI to GIF", description: "Ubah video AVI menjadi GIF." },
      { href: "/tools/apng-to-gif", title: "Convert APNG to GIF", description: "Ubah APNG menjadi GIF." },
      { href: "/tools/gif-to-apng", title: "Convert GIF to APNG", description: "Ubah GIF menjadi APNG." },
      { href: "/tools/gif-maker", title: "GIF Maker", description: "Gabungkan beberapa gambar jadi GIF animasi." },
      { href: "/tools/gif-compressor", title: "GIF Compressor", description: "Perkecil ukuran file GIF animasi." },
    ],
  },
  {
    id: "archive-tools",
    title: "Archive Tools",
    icon: "🗄️",
    accent: "cyan",
    note: "Diproses langsung di browser kamu, file tidak diunggah ke server manapun.",
    tools: [
      { href: "/tools/archive-converter", title: "Archive Converter", description: "Buat & ekstrak arsip ZIP, TAR, atau TAR.GZ." },
    ],
  },
  {
    id: "downloader-tools",
    title: "Downloader Tools",
    icon: "📥",
    accent: "cyan",
    note: "Diproses langsung di browser kamu. Kalau server sumber file memblokir akses lintas domain (CORS), link akan dibuka di tab baru sebagai gantinya.",
    tools: [
      { href: "/tools/download-file-url", title: "Download File dari URL", description: "Unduh file apa pun langsung dari URL-nya." },
      { href: "/tools/download-image-url", title: "Download Gambar dari URL", description: "Unduh gambar langsung dari URL-nya." },
      { href: "/tools/download-video-url", title: "Download Video dari URL Langsung", description: "Unduh video (.mp4, .webm) dari URL file-nya." },
      { href: "/tools/download-audio-url", title: "Download Audio dari URL Langsung", description: "Unduh audio langsung dari URL file-nya." },
    ],
  },
  {
    id: "social-media-tools",
    title: "Social Media Tools",
    icon: "📱",
    accent: "pink",
    tools: [
      { href: "/tools/instagram-caption-counter", title: "Instagram Caption Counter", description: "Cek jumlah karakter & hashtag caption Instagram." },
      { href: "/tools/tiktok-caption-counter", title: "TikTok Caption Counter", description: "Cek jumlah karakter & hashtag caption TikTok." },
      { href: "/tools/youtube-tag-generator", title: "YouTube Tag Generator", description: "Buat daftar tag YouTube dari judul & kata kunci." },
      { href: "/tools/hashtag-generator", title: "Hashtag Generator", description: "Buat hashtag dari kata kunci atau topik." },
      { href: "/tools/emoji-picker", title: "Emoji Picker", description: "Cari & salin emoji dengan cepat." },
      { href: "/tools/social-media-image-size-guide", title: "Social Media Image Size Guide", description: "Ukuran gambar rekomendasi tiap platform." },
    ],
  },
  {
    id: "seo-tools",
    title: "SEO Tools",
    icon: "🔍",
    accent: "lime",
    tools: [
      { href: "/tools/meta-tag-generator", title: "Meta Tag Generator", description: "Buat tag meta HTML dasar untuk SEO." },
      { href: "/tools/open-graph-generator", title: "Open Graph Generator", description: "Buat tag Open Graph untuk preview link." },
      { href: "/tools/twitter-card-generator", title: "Twitter Card Generator", description: "Buat tag Twitter Card untuk preview link." },
      { href: "/tools/robots-txt-generator", title: "robots.txt Generator", description: "Atur akses crawler mesin pencari." },
      { href: "/tools/sitemap-xml-generator", title: "sitemap.xml Generator", description: "Buat sitemap.xml dari daftar URL." },
      { href: "/tools/canonical-tag-generator", title: "Canonical Tag Generator", description: "Hindari duplicate content." },
      { href: "/tools/json-ld-generator", title: "JSON-LD Generator", description: "Buat structured data schema.org." },
      { href: "/tools/faq-schema-generator", title: "FAQ Schema Generator", description: "Buat structured data FAQPage." },
      { href: "/tools/breadcrumb-schema-generator", title: "Breadcrumb Schema Generator", description: "Buat structured data BreadcrumbList." },
    ],
  },
];

export const TOTAL_TOOL_COUNT = TOOL_CATEGORIES.reduce((sum, cat) => sum + cat.tools.length, 0);

export interface AccentStyle {
  chip: string;
  pill: string;
  pillActive: string;
  cardLeftBorder: string;
  cardHoverBorder: string;
}

export const ACCENT_STYLES: Record<ToolAccent, AccentStyle> = {
  sky: {
    chip: "bg-sky-100 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300",
    pill: "border-sky-200 text-sky-700 hover:bg-sky-50 dark:border-sky-900 dark:text-sky-300 dark:hover:bg-sky-950/40",
    pillActive: "bg-sky-600 border-sky-600 text-white dark:bg-sky-500 dark:border-sky-500",
    cardLeftBorder: "border-l-sky-400 dark:border-l-sky-600",
    cardHoverBorder: "hover:border-sky-400 dark:hover:border-sky-500",
  },
  violet: {
    chip: "bg-violet-100 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300",
    pill: "border-violet-200 text-violet-700 hover:bg-violet-50 dark:border-violet-900 dark:text-violet-300 dark:hover:bg-violet-950/40",
    pillActive: "bg-violet-600 border-violet-600 text-white dark:bg-violet-500 dark:border-violet-500",
    cardLeftBorder: "border-l-violet-400 dark:border-l-violet-600",
    cardHoverBorder: "hover:border-violet-400 dark:hover:border-violet-500",
  },
  emerald: {
    chip: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
    pill: "border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-900 dark:text-emerald-300 dark:hover:bg-emerald-950/40",
    pillActive: "bg-emerald-600 border-emerald-600 text-white dark:bg-emerald-500 dark:border-emerald-500",
    cardLeftBorder: "border-l-emerald-400 dark:border-l-emerald-600",
    cardHoverBorder: "hover:border-emerald-400 dark:hover:border-emerald-500",
  },
  amber: {
    chip: "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
    pill: "border-amber-200 text-amber-700 hover:bg-amber-50 dark:border-amber-900 dark:text-amber-300 dark:hover:bg-amber-950/40",
    pillActive: "bg-amber-600 border-amber-600 text-white dark:bg-amber-500 dark:border-amber-500",
    cardLeftBorder: "border-l-amber-400 dark:border-l-amber-600",
    cardHoverBorder: "hover:border-amber-400 dark:hover:border-amber-500",
  },
  rose: {
    chip: "bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300",
    pill: "border-rose-200 text-rose-700 hover:bg-rose-50 dark:border-rose-900 dark:text-rose-300 dark:hover:bg-rose-950/40",
    pillActive: "bg-rose-600 border-rose-600 text-white dark:bg-rose-500 dark:border-rose-500",
    cardLeftBorder: "border-l-rose-400 dark:border-l-rose-600",
    cardHoverBorder: "hover:border-rose-400 dark:hover:border-rose-500",
  },
  orange: {
    chip: "bg-orange-100 text-orange-700 dark:bg-orange-950/50 dark:text-orange-300",
    pill: "border-orange-200 text-orange-700 hover:bg-orange-50 dark:border-orange-900 dark:text-orange-300 dark:hover:bg-orange-950/40",
    pillActive: "bg-orange-600 border-orange-600 text-white dark:bg-orange-500 dark:border-orange-500",
    cardLeftBorder: "border-l-orange-400 dark:border-l-orange-600",
    cardHoverBorder: "hover:border-orange-400 dark:hover:border-orange-500",
  },
  indigo: {
    chip: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300",
    pill: "border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-900 dark:text-indigo-300 dark:hover:bg-indigo-950/40",
    pillActive: "bg-indigo-600 border-indigo-600 text-white dark:bg-indigo-500 dark:border-indigo-500",
    cardLeftBorder: "border-l-indigo-400 dark:border-l-indigo-600",
    cardHoverBorder: "hover:border-indigo-400 dark:hover:border-indigo-500",
  },
  teal: {
    chip: "bg-teal-100 text-teal-700 dark:bg-teal-950/50 dark:text-teal-300",
    pill: "border-teal-200 text-teal-700 hover:bg-teal-50 dark:border-teal-900 dark:text-teal-300 dark:hover:bg-teal-950/40",
    pillActive: "bg-teal-600 border-teal-600 text-white dark:bg-teal-500 dark:border-teal-500",
    cardLeftBorder: "border-l-teal-400 dark:border-l-teal-600",
    cardHoverBorder: "hover:border-teal-400 dark:hover:border-teal-500",
  },
  fuchsia: {
    chip: "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-950/50 dark:text-fuchsia-300",
    pill: "border-fuchsia-200 text-fuchsia-700 hover:bg-fuchsia-50 dark:border-fuchsia-900 dark:text-fuchsia-300 dark:hover:bg-fuchsia-950/40",
    pillActive: "bg-fuchsia-600 border-fuchsia-600 text-white dark:bg-fuchsia-500 dark:border-fuchsia-500",
    cardLeftBorder: "border-l-fuchsia-400 dark:border-l-fuchsia-600",
    cardHoverBorder: "hover:border-fuchsia-400 dark:hover:border-fuchsia-500",
  },
  cyan: {
    chip: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300",
    pill: "border-cyan-200 text-cyan-700 hover:bg-cyan-50 dark:border-cyan-900 dark:text-cyan-300 dark:hover:bg-cyan-950/40",
    pillActive: "bg-cyan-600 border-cyan-600 text-white dark:bg-cyan-500 dark:border-cyan-500",
    cardLeftBorder: "border-l-cyan-400 dark:border-l-cyan-600",
    cardHoverBorder: "hover:border-cyan-400 dark:hover:border-cyan-500",
  },
  pink: {
    chip: "bg-pink-100 text-pink-700 dark:bg-pink-950/50 dark:text-pink-300",
    pill: "border-pink-200 text-pink-700 hover:bg-pink-50 dark:border-pink-900 dark:text-pink-300 dark:hover:bg-pink-950/40",
    pillActive: "bg-pink-600 border-pink-600 text-white dark:bg-pink-500 dark:border-pink-500",
    cardLeftBorder: "border-l-pink-400 dark:border-l-pink-600",
    cardHoverBorder: "hover:border-pink-400 dark:hover:border-pink-500",
  },
  lime: {
    chip: "bg-lime-100 text-lime-700 dark:bg-lime-950/50 dark:text-lime-300",
    pill: "border-lime-200 text-lime-700 hover:bg-lime-50 dark:border-lime-900 dark:text-lime-300 dark:hover:bg-lime-950/40",
    pillActive: "bg-lime-600 border-lime-600 text-white dark:bg-lime-500 dark:border-lime-500",
    cardLeftBorder: "border-l-lime-400 dark:border-l-lime-600",
    cardHoverBorder: "hover:border-lime-400 dark:hover:border-lime-500",
  },
};
