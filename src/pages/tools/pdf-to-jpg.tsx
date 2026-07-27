import Head from "next/head";
import PdfToJpgPage from "@/components/pages/PdfToJpgPage/PdfToJpgPage";

export default function PdfToJpgRoute() {
  return (
    <>
      <Head>
        <title>PDF to JPG — Kalkulator Hari</title>
      </Head>
      <PdfToJpgPage />
    </>
  );
}
