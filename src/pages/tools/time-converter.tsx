import Head from "next/head";
import TimeConverterPage from "@/components/pages/TimeConverterPage/TimeConverterPage";

export default function TimeConverterRoute() {
  return (
    <>
      <Head>
        <title>Time Converter — Kalkulator Hari</title>
      </Head>
      <TimeConverterPage />
    </>
  );
}
