import Head from "next/head";
import ResizePdfPage from "@/components/pages/ResizePdfPage/ResizePdfPage";

export default function ResizePdfRoute() {
  return (
    <>
      <Head>
        <title>Resize PDF — Kalkulator Hari</title>
      </Head>
      <ResizePdfPage />
    </>
  );
}
