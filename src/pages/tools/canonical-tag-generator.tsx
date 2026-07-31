import Head from "next/head";
import CanonicalTagGeneratorPage from "@/components/pages/CanonicalTagGeneratorPage/CanonicalTagGeneratorPage";

export default function CanonicalTagGeneratorRoute() {
  return (
    <>
      <Head>
        <title>Canonical Tag Generator — Kalkulator Hari</title>
      </Head>
      <CanonicalTagGeneratorPage />
    </>
  );
}
