import Head from "next/head";
import StopwatchPage from "@/components/pages/StopwatchPage/StopwatchPage";

export default function StopwatchRoute() {
  return (
    <>
      <Head>
        <title>Stopwatch — Kalkulator Hari</title>
      </Head>
      <StopwatchPage />
    </>
  );
}
