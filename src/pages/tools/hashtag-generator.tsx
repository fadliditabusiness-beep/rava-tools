import Head from "next/head";
import HashtagGeneratorPage from "@/components/pages/HashtagGeneratorPage/HashtagGeneratorPage";

export default function HashtagGeneratorRoute() {
  return (
    <>
      <Head>
        <title>Hashtag Generator — Kalkulator Hari</title>
      </Head>
      <HashtagGeneratorPage />
    </>
  );
}
