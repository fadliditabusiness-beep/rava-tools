import Head from "next/head";
import LazadaFeeCalculatorPage from "@/components/pages/LazadaFeeCalculatorPage/LazadaFeeCalculatorPage";

export default function LazadaFeeCalculatorRoute() {
  return (
    <>
      <Head>
        <title>Lazada Fee Calculator — Kalkulator Hari</title>
      </Head>
      <LazadaFeeCalculatorPage />
    </>
  );
}
