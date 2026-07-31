import Head from "next/head";
import DownloadAudioUrlPage from "@/components/pages/DownloadAudioUrlPage/DownloadAudioUrlPage";

export default function DownloadAudioUrlRoute() {
  return (
    <>
      <Head>
        <title>Download Audio dari URL Langsung — Kalkulator Hari</title>
      </Head>
      <DownloadAudioUrlPage />
    </>
  );
}
