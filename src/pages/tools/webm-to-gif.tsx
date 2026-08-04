import Head from "next/head";
import WebmToGifPage from "@/components/pages/WebmToGifPage/WebmToGifPage";

export default function WebmToGifRoute() {
  return (
    <>
      <Head>
        <title>Convert WEBM to GIF — Kalkulator Hari</title>
      </Head>
      <WebmToGifPage />
    </>
  );
}
