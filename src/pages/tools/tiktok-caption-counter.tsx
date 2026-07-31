import Head from "next/head";
import TiktokCaptionCounterPage from "@/components/pages/TiktokCaptionCounterPage/TiktokCaptionCounterPage";

export default function TiktokCaptionCounterRoute() {
  return (
    <>
      <Head>
        <title>TikTok Caption Counter — Kalkulator Hari</title>
      </Head>
      <TiktokCaptionCounterPage />
    </>
  );
}
