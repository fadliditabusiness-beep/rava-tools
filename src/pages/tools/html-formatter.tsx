import Head from "next/head";
import HtmlFormatterPage from "@/components/pages/HtmlFormatterPage/HtmlFormatterPage";

export default function HtmlFormatterRoute() {
  return (
    <>
      <Head>
        <title>HTML Formatter — Kalkulator Hari</title>
      </Head>
      <HtmlFormatterPage />
    </>
  );
}
