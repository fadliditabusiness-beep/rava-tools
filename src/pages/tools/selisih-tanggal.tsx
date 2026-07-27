import Head from "next/head";
import DateDifferencePage from "@/components/pages/DateDifferencePage/DateDifferencePage";

export default function SelisihTanggalRoute() {
  return (
    <>
      <Head>
        <title>Selisih Tanggal — Kalkulator Hari</title>
      </Head>
      <DateDifferencePage />
    </>
  );
}
