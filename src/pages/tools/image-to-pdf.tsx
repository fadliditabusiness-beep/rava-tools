import Head from "next/head";
import ImageToPdfPage from "@/components/pages/ImageToPdfPage/ImageToPdfPage";

export default function ImageToPdfRoute() {
  return (
    <>
      <Head>
        <title>Image to PDF — Kalkulator Hari</title>
      </Head>
      <ImageToPdfPage />
    </>
  );
}
