import Head from "next/head";
import DownloadVideoUrlPage from "@/components/pages/DownloadVideoUrlPage/DownloadVideoUrlPage";

export default function DownloadVideoUrlRoute() {
  return (
    <>
      <Head>
        <title>Download Video dari URL Langsung — Kalkulator Hari</title>
      </Head>
      <DownloadVideoUrlPage />
    </>
  );
}
