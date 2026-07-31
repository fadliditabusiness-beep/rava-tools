import Head from "next/head";
import TwitterCardGeneratorPage from "@/components/pages/TwitterCardGeneratorPage/TwitterCardGeneratorPage";

export default function TwitterCardGeneratorRoute() {
  return (
    <>
      <Head>
        <title>Twitter Card Generator — Kalkulator Hari</title>
      </Head>
      <TwitterCardGeneratorPage />
    </>
  );
}
