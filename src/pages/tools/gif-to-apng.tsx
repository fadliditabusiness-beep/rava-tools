import Head from "next/head";
import GifToApngPage from "@/components/pages/GifToApngPage/GifToApngPage";

export default function GifToApngRoute() {
  return (
    <>
      <Head>
        <title>Convert GIF to APNG — Kalkulator Hari</title>
      </Head>
      <GifToApngPage />
    </>
  );
}
