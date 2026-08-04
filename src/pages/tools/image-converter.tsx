import Head from "next/head";
import ImageConverterPage from "@/components/pages/ImageConverterPage/ImageConverterPage";

export default function ImageConverterRoute() {
  return (
    <>
      <Head>
        <title>Image Converter — Kalkulator Hari</title>
      </Head>
      <ImageConverterPage />
    </>
  );
}
