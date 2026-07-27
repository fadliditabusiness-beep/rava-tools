import Head from "next/head";
import PdfCompressPage from "@/components/pages/PdfCompressPage/PdfCompressPage";

export default function CompressPdfRoute() {
  return (
    <>
      <Head>
        <title>Compress PDF — Kalkulator Hari</title>
      </Head>
      <PdfCompressPage />
    </>
  );
}
