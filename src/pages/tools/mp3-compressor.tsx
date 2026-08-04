import Head from "next/head";
import Mp3CompressorPage from "@/components/pages/Mp3CompressorPage/Mp3CompressorPage";

export default function Mp3CompressorRoute() {
  return (
    <>
      <Head>
        <title>MP3 Compressor — Kalkulator Hari</title>
      </Head>
      <Mp3CompressorPage />
    </>
  );
}
