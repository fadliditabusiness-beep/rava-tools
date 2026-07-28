import Head from "next/head";
import LiveCountdownPage from "@/components/pages/LiveCountdownPage/LiveCountdownPage";

export default function LiveCountdownRoute() {
  return (
    <>
      <Head>
        <title>Countdown Real-time — Kalkulator Hari</title>
      </Head>
      <LiveCountdownPage />
    </>
  );
}
