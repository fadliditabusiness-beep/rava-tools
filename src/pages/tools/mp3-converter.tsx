import Head from "next/head";
import Mp3ConverterPage from "@/components/pages/Mp3ConverterPage/Mp3ConverterPage";

export default function Mp3ConverterRoute() {
  return (
    <>
      <Head>
        <title>MP3 Converter — Kalkulator Hari</title>
      </Head>
      <Mp3ConverterPage />
    </>
  );
}
