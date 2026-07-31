import Head from "next/head";
import InstagramBioGeneratorPage from "@/components/pages/InstagramBioGeneratorPage/InstagramBioGeneratorPage";

export default function InstagramBioGeneratorRoute() {
  return (
    <>
      <Head>
        <title>Instagram Bio Generator — Kalkulator Hari</title>
      </Head>
      <InstagramBioGeneratorPage />
    </>
  );
}
