import Head from "next/head";
import PdfExtractPagesPage from "@/components/pages/PdfExtractPagesPage/PdfExtractPagesPage";

export default function ExtractPdfPagesRoute() {
  return (
    <>
      <Head>
        <title>Extract PDF Pages — Kalkulator Hari</title>
      </Head>
      <PdfExtractPagesPage />
    </>
  );
}
