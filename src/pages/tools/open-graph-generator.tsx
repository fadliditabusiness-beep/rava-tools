import Head from "next/head";
import OpenGraphGeneratorPage from "@/components/pages/OpenGraphGeneratorPage/OpenGraphGeneratorPage";

export default function OpenGraphGeneratorRoute() {
  return (
    <>
      <Head>
        <title>Open Graph Generator — Kalkulator Hari</title>
      </Head>
      <OpenGraphGeneratorPage />
    </>
  );
}
