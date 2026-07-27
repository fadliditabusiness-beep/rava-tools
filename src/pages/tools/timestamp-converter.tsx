import Head from "next/head";
import TimestampConverterPage from "@/components/pages/TimestampConverterPage/TimestampConverterPage";

export default function TimestampConverterRoute() {
  return (
    <>
      <Head>
        <title>Timestamp Converter — Kalkulator Hari</title>
      </Head>
      <TimestampConverterPage />
    </>
  );
}
