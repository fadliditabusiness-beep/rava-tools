import Head from "next/head";
import AudioConverterPage from "@/components/pages/AudioConverterPage/AudioConverterPage";

export default function AudioConverterRoute() {
  return (
    <>
      <Head>
        <title>Audio Converter — Kalkulator Hari</title>
      </Head>
      <AudioConverterPage />
    </>
  );
}
