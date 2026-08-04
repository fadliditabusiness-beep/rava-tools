import Head from "next/head";
import FlattenPdfPage from "@/components/pages/FlattenPdfPage/FlattenPdfPage";

export default function FlattenPdfRoute() {
  return (
    <>
      <Head>
        <title>Flatten PDF — Kalkulator Hari</title>
      </Head>
      <FlattenPdfPage />
    </>
  );
}
