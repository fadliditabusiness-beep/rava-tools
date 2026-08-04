import Head from "next/head";
import VideoConverterPage from "@/components/pages/VideoConverterPage/VideoConverterPage";

export default function VideoConverterRoute() {
  return (
    <>
      <Head>
        <title>Video Converter — Kalkulator Hari</title>
      </Head>
      <VideoConverterPage />
    </>
  );
}
