import Head from "next/head";
import ConvertJpgToPngPage from "@/components/pages/ConvertJpgToPngPage/ConvertJpgToPngPage";

export default function ConvertJpgToPngRoute() {
  return (
    <>
      <Head>
        <title>Convert JPG to PNG — Kalkulator Hari</title>
      </Head>
      <ConvertJpgToPngPage />
    </>
  );
}
