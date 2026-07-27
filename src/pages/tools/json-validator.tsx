import Head from "next/head";
import JsonValidatorPage from "@/components/pages/JsonValidatorPage/JsonValidatorPage";

export default function JsonValidatorRoute() {
  return (
    <>
      <Head>
        <title>JSON Validator — Kalkulator Hari</title>
      </Head>
      <JsonValidatorPage />
    </>
  );
}
