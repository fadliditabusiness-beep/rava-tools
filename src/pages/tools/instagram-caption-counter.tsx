import Head from "next/head";
import InstagramCaptionCounterPage from "@/components/pages/InstagramCaptionCounterPage/InstagramCaptionCounterPage";

export default function InstagramCaptionCounterRoute() {
  return (
    <>
      <Head>
        <title>Instagram Caption Counter — Kalkulator Hari</title>
      </Head>
      <InstagramCaptionCounterPage />
    </>
  );
}
