import Head from "next/head";
import YoutubeTagGeneratorPage from "@/components/pages/YoutubeTagGeneratorPage/YoutubeTagGeneratorPage";

export default function YoutubeTagGeneratorRoute() {
  return (
    <>
      <Head>
        <title>YouTube Tag Generator — Kalkulator Hari</title>
      </Head>
      <YoutubeTagGeneratorPage />
    </>
  );
}
