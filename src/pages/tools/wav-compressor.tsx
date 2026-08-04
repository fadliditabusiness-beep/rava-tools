import Head from "next/head";
import WavCompressorPage from "@/components/pages/WavCompressorPage/WavCompressorPage";

export default function WavCompressorRoute() {
  return (
    <>
      <Head>
        <title>WAV Compressor — Kalkulator Hari</title>
      </Head>
      <WavCompressorPage />
    </>
  );
}
