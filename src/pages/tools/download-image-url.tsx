import Head from "next/head";
import DownloadImageUrlPage from "@/components/pages/DownloadImageUrlPage/DownloadImageUrlPage";

export default function DownloadImageUrlRoute() {
  return (
    <>
      <Head>
        <title>Download Gambar dari URL — Kalkulator Hari</title>
      </Head>
      <DownloadImageUrlPage />
    </>
  );
}
