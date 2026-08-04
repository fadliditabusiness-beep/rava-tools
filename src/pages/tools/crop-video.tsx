import Head from "next/head";
import CropVideoPage from "@/components/pages/CropVideoPage/CropVideoPage";

export default function CropVideoRoute() {
  return (
    <>
      <Head>
        <title>Crop Video — Kalkulator Hari</title>
      </Head>
      <CropVideoPage />
    </>
  );
}
