import Head from "next/head";
import JsonToTypeScriptPage from "@/components/pages/JsonToTypeScriptPage/JsonToTypeScriptPage";

export default function JsonToTypeScriptRoute() {
  return (
    <>
      <Head>
        <title>JSON to TypeScript — Kalkulator Hari</title>
      </Head>
      <JsonToTypeScriptPage />
    </>
  );
}
