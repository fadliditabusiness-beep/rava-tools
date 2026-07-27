import Head from "next/head";
import JsonFormatterPage from "@/components/pages/JsonFormatterPage/JsonFormatterPage";

export default function JsonFormatterRoute() {
  return (
    <>
      <Head>
        <title>JSON Formatter — Kalkulator Hari</title>
      </Head>
      <JsonFormatterPage />
    </>
  );
}
