import Head from "next/head";
import CountdownPage from "@/components/pages/CountdownPage/CountdownPage";

export default function CountdownRoute() {
  return (
    <>
      <Head>
        <title>Countdown ke Tanggal — Kalkulator Hari</title>
      </Head>
      <CountdownPage />
    </>
  );
}
