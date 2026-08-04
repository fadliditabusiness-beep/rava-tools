import Head from "next/head";
import ImageCompressorPage from "@/components/pages/ImageCompressorPage/ImageCompressorPage";

export default function ImageCompressorRoute() {
  return (
    <>
      <Head>
        <title>Image Compressor — Kalkulator Hari</title>
      </Head>
      <ImageCompressorPage />
    </>
  );
}
