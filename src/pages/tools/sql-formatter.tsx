import Head from "next/head";
import SqlFormatterPage from "@/components/pages/SqlFormatterPage/SqlFormatterPage";

export default function SqlFormatterRoute() {
  return (
    <>
      <Head>
        <title>SQL Formatter — Kalkulator Hari</title>
      </Head>
      <SqlFormatterPage />
    </>
  );
}
