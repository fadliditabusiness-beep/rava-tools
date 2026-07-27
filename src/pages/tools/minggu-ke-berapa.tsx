import Head from "next/head";
import WeekNumberPage from "@/components/pages/WeekNumberPage/WeekNumberPage";

export default function MingguKeBerapaRoute() {
  return (
    <>
      <Head>
        <title>Minggu ke Berapa — Kalkulator Hari</title>
      </Head>
      <WeekNumberPage />
    </>
  );
}
