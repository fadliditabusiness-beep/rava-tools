import Head from "next/head";
import PdfMergePage from "@/components/pages/PdfMergePage/PdfMergePage";

export default function MergePdfRoute() {
  return (
    <>
      <Head>
        <title>Merge PDF — Kalkulator Hari</title>
      </Head>
      <PdfMergePage />
    </>
  );
}
