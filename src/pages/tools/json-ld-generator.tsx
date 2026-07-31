import Head from "next/head";
import JsonLdGeneratorPage from "@/components/pages/JsonLdGeneratorPage/JsonLdGeneratorPage";

export default function JsonLdGeneratorRoute() {
  return (
    <>
      <Head>
        <title>JSON-LD Generator — Kalkulator Hari</title>
      </Head>
      <JsonLdGeneratorPage />
    </>
  );
}
