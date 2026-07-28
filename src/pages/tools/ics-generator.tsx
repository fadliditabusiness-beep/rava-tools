import Head from "next/head";
import IcsGeneratorPage from "@/components/pages/IcsGeneratorPage/IcsGeneratorPage";

export default function IcsGeneratorRoute() {
  return (
    <>
      <Head>
        <title>Calendar Event Generator — Kalkulator Hari</title>
      </Head>
      <IcsGeneratorPage />
    </>
  );
}
