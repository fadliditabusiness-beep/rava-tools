import Head from "next/head";
import PdfSplitPage from "@/components/pages/PdfSplitPage/PdfSplitPage";

export default function SplitPdfRoute() {
  return (
    <>
      <Head>
        <title>Split PDF — Kalkulator Hari</title>
      </Head>
      <PdfSplitPage />
    </>
  );
}
