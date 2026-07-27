import Head from "next/head";
import CountdownNewYearPage from "@/components/pages/CountdownNewYearPage/CountdownNewYearPage";

export default function CountdownTahunBaruRoute() {
  return (
    <>
      <Head>
        <title>Countdown Tahun Baru — Kalkulator Hari</title>
      </Head>
      <CountdownNewYearPage />
    </>
  );
}
