import Head from "next/head";
import TokopediaFeeCalculatorPage from "@/components/pages/TokopediaFeeCalculatorPage/TokopediaFeeCalculatorPage";

export default function TokopediaFeeCalculatorRoute() {
  return (
    <>
      <Head>
        <title>Tokopedia Fee Calculator — Kalkulator Hari</title>
      </Head>
      <TokopediaFeeCalculatorPage />
    </>
  );
}
