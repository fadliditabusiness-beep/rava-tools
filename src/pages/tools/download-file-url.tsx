import Head from "next/head";
import DownloadFileUrlPage from "@/components/pages/DownloadFileUrlPage/DownloadFileUrlPage";

export default function DownloadFileUrlRoute() {
  return (
    <>
      <Head>
        <title>Download File dari URL — Kalkulator Hari</title>
      </Head>
      <DownloadFileUrlPage />
    </>
  );
}
