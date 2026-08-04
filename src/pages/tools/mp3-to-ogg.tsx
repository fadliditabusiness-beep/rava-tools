import Head from "next/head";
import Mp3ToOggPage from "@/components/pages/Mp3ToOggPage/Mp3ToOggPage";

export default function Mp3ToOggRoute() {
  return (
    <>
      <Head>
        <title>Convert MP3 to OGG — Kalkulator Hari</title>
      </Head>
      <Mp3ToOggPage />
    </>
  );
}
