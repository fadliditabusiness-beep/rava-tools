import Head from "next/head";
import XmlFormatterPage from "@/components/pages/XmlFormatterPage/XmlFormatterPage";

export default function XmlFormatterRoute() {
  return (
    <>
      <Head>
        <title>XML Formatter — Kalkulator Hari</title>
      </Head>
      <XmlFormatterPage />
    </>
  );
}
