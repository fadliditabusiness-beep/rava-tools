import Head from "next/head";
import ExtractImagesFromPdfPage from "@/components/pages/ExtractImagesFromPdfPage/ExtractImagesFromPdfPage";

export default function ExtractImagesFromPdfRoute() {
  return (
    <>
      <Head>
        <title>Extract Images from PDF — Kalkulator Hari</title>
      </Head>
      <ExtractImagesFromPdfPage />
    </>
  );
}
