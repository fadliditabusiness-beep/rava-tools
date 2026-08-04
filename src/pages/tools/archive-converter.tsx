import Head from "next/head";
import ArchiveConverterPage from "@/components/pages/ArchiveConverterPage/ArchiveConverterPage";

export default function ArchiveConverterRoute() {
  return (
    <>
      <Head>
        <title>Archive Converter — Kalkulator Hari</title>
      </Head>
      <ArchiveConverterPage />
    </>
  );
}
