import Head from "next/head";
import CssFormatterPage from "@/components/pages/CssFormatterPage/CssFormatterPage";

export default function CssFormatterRoute() {
  return (
    <>
      <Head>
        <title>CSS Formatter — Kalkulator Hari</title>
      </Head>
      <CssFormatterPage />
    </>
  );
}
