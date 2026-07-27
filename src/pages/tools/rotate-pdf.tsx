import Head from "next/head";
import PdfRotatePage from "@/components/pages/PdfRotatePage/PdfRotatePage";

export default function RotatePdfRoute() {
  return (
    <>
      <Head>
        <title>Rotate PDF — Kalkulator Hari</title>
      </Head>
      <PdfRotatePage />
    </>
  );
}
