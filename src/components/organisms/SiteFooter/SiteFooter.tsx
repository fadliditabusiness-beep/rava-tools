export interface SiteFooterProps {
  hasProvisionalData?: boolean;
}

export default function SiteFooter({ hasProvisionalData }: SiteFooterProps) {
  return (
    <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
      <p>
        Data hari libur nasional &amp; cuti bersama mengacu pada SKB 3 Menteri. Tanggal libur
        keagamaan (Idul Fitri, Idul Adha, Nyepi, Waisak, dll.) dapat berubah mengikuti hasil sidang
        isbat / penetapan resmi pemerintah.
      </p>
      {hasProvisionalData && (
        <p className="mt-1 font-medium text-amber-600 dark:text-amber-400">
          Tahun yang ditampilkan belum memiliki SKB resmi — tanggal bertanda &quot;perkiraan&quot;
          adalah estimasi dan bisa berubah.
        </p>
      )}
    </footer>
  );
}
