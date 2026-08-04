import Head from "next/head";
import Mp4ConverterPage from "@/components/pages/Mp4ConverterPage/Mp4ConverterPage";

export default function Mp4ConverterRoute() {
  return (
    <>
      <Head>
        <title>MP4 Converter — Kalkulator Hari</title>
      </Head>
      <Mp4ConverterPage />
    </>
  );
}
