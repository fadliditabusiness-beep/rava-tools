import Head from "next/head";
import MarginCalculatorPage from "@/components/pages/MarginCalculatorPage/MarginCalculatorPage";

export default function MarginCalculatorRoute() {
  return (
    <>
      <Head>
        <title>Margin Calculator — Kalkulator Hari</title>
      </Head>
      <MarginCalculatorPage />
    </>
  );
}
