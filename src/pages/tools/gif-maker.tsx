import Head from "next/head";
import GifMakerPage from "@/components/pages/GifMakerPage/GifMakerPage";

export default function GifMakerRoute() {
  return (
    <>
      <Head>
        <title>GIF Maker — Kalkulator Hari</title>
      </Head>
      <GifMakerPage />
    </>
  );
}
