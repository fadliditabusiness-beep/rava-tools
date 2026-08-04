import Head from "next/head";
import JfifToPngPage from "@/components/pages/JfifToPngPage/JfifToPngPage";

export default function JfifToPngRoute() {
  return (
    <>
      <Head>
        <title>Convert JFIF to PNG — Kalkulator Hari</title>
      </Head>
      <JfifToPngPage />
    </>
  );
}
