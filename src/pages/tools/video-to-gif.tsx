import Head from "next/head";
import VideoToGifPage from "@/components/pages/VideoToGifPage/VideoToGifPage";

export default function VideoToGifRoute() {
  return (
    <>
      <Head>
        <title>Convert Video to GIF — Kalkulator Hari</title>
      </Head>
      <VideoToGifPage />
    </>
  );
}
