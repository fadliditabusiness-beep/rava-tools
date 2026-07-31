import Head from "next/head";
import MarkupCalculatorPage from "@/components/pages/MarkupCalculatorPage/MarkupCalculatorPage";

export default function MarkupCalculatorRoute() {
  return (
    <>
      <Head>
        <title>Markup Calculator — Kalkulator Hari</title>
      </Head>
      <MarkupCalculatorPage />
    </>
  );
}
