import Head from "next/head";
import PdfDeletePagesPage from "@/components/pages/PdfDeletePagesPage/PdfDeletePagesPage";

export default function DeletePdfPagesRoute() {
  return (
    <>
      <Head>
        <title>Delete PDF Pages — Kalkulator Hari</title>
      </Head>
      <PdfDeletePagesPage />
    </>
  );
}
