import Head from "next/head";
import HashGeneratorPage from "@/components/pages/HashGeneratorPage/HashGeneratorPage";

export default function HashGeneratorRoute() {
  return (
    <>
      <Head>
        <title>Hash Generator — Kalkulator Hari</title>
      </Head>
      <HashGeneratorPage />
    </>
  );
}
