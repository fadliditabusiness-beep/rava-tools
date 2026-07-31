import Head from "next/head";
import FaqSchemaGeneratorPage from "@/components/pages/FaqSchemaGeneratorPage/FaqSchemaGeneratorPage";

export default function FaqSchemaGeneratorRoute() {
  return (
    <>
      <Head>
        <title>FAQ Schema Generator — Kalkulator Hari</title>
      </Head>
      <FaqSchemaGeneratorPage />
    </>
  );
}
