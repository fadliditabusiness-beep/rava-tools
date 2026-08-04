import Head from "next/head";
import PdfConverterPage from "@/components/pages/PdfConverterPage/PdfConverterPage";

export default function PdfConverterRoute() {
  return (
    <>
      <Head>
        <title>PDF Converter — Kalkulator Hari</title>
      </Head>
      <PdfConverterPage />
    </>
  );
}
