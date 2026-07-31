import Head from "next/head";
import MetaTagGeneratorPage from "@/components/pages/MetaTagGeneratorPage/MetaTagGeneratorPage";

export default function MetaTagGeneratorRoute() {
  return (
    <>
      <Head>
        <title>Meta Tag Generator — Kalkulator Hari</title>
      </Head>
      <MetaTagGeneratorPage />
    </>
  );
}
