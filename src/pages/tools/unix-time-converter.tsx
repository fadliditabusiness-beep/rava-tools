import Head from "next/head";
import UnixTimeConverterPage from "@/components/pages/UnixTimeConverterPage/UnixTimeConverterPage";

export default function UnixTimeConverterRoute() {
  return (
    <>
      <Head>
        <title>Unix Time Converter — Kalkulator Hari</title>
      </Head>
      <UnixTimeConverterPage />
    </>
  );
}
