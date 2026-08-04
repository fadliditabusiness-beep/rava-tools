import Head from "next/head";
import ApngToGifPage from "@/components/pages/ApngToGifPage/ApngToGifPage";

export default function ApngToGifRoute() {
  return (
    <>
      <Head>
        <title>Convert APNG to GIF — Kalkulator Hari</title>
      </Head>
      <ApngToGifPage />
    </>
  );
}
