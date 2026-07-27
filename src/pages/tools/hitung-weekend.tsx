import Head from "next/head";
import WeekendCountPage from "@/components/pages/WeekendCountPage/WeekendCountPage";

export default function HitungWeekendRoute() {
  return (
    <>
      <Head>
        <title>Hitung Weekend — Kalkulator Hari</title>
      </Head>
      <WeekendCountPage />
    </>
  );
}
