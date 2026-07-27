import Head from "next/head";
import DayNamePage from "@/components/pages/DayNamePage/DayNamePage";

export default function HariApaRoute() {
  return (
    <>
      <Head>
        <title>Hari Apa — Kalkulator Hari</title>
      </Head>
      <DayNamePage />
    </>
  );
}
