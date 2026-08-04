import Head from "next/head";
import CropImagePage from "@/components/pages/CropImagePage/CropImagePage";

export default function CropImageRoute() {
  return (
    <>
      <Head>
        <title>Crop Image — Kalkulator Hari</title>
      </Head>
      <CropImagePage />
    </>
  );
}
