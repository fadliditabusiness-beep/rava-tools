import Head from "next/head";
import GifCompressorPage from "@/components/pages/GifCompressorPage/GifCompressorPage";

export default function GifCompressorRoute() {
  return (
    <>
      <Head>
        <title>GIF Compressor — Kalkulator Hari</title>
      </Head>
      <GifCompressorPage />
    </>
  );
}
