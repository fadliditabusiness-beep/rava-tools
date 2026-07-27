import Head from "next/head";
import ConvertJpgToWebpPage from "@/components/pages/ConvertJpgToWebpPage/ConvertJpgToWebpPage";

export default function ConvertJpgToWebpRoute() {
  return (
    <>
      <Head>
        <title>Convert JPG to WebP — Kalkulator Hari</title>
      </Head>
      <ConvertJpgToWebpPage />
    </>
  );
}
