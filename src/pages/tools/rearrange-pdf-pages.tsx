import Head from "next/head";
import PdfRearrangePagesPage from "@/components/pages/PdfRearrangePagesPage/PdfRearrangePagesPage";

export default function RearrangePdfPagesRoute() {
  return (
    <>
      <Head>
        <title>Rearrange PDF Pages — Kalkulator Hari</title>
      </Head>
      <PdfRearrangePagesPage />
    </>
  );
}
