import Head from "next/head";
import CropPdfPage from "@/components/pages/CropPdfPage/CropPdfPage";

export default function CropPdfRoute() {
  return (
    <>
      <Head>
        <title>Crop PDF — Kalkulator Hari</title>
      </Head>
      <CropPdfPage />
    </>
  );
}
