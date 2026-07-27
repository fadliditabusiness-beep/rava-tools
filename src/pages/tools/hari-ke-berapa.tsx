import Head from "next/head";
import DayOfYearPage from "@/components/pages/DayOfYearPage/DayOfYearPage";

export default function HariKeBerapaRoute() {
  return (
    <>
      <Head>
        <title>Hari ke Berapa — Kalkulator Hari</title>
      </Head>
      <DayOfYearPage />
    </>
  );
}
