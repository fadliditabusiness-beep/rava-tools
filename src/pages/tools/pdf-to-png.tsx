import Head from "next/head";
import PdfToPngPage from "@/components/pages/PdfToPngPage/PdfToPngPage";

export default function PdfToPngRoute() {
  return (
    <>
      <Head>
        <title>PDF to PNG — Kalkulator Hari</title>
      </Head>
      <PdfToPngPage />
    </>
  );
}
