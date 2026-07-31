import Head from "next/head";
import BukalapakFeeCalculatorPage from "@/components/pages/BukalapakFeeCalculatorPage/BukalapakFeeCalculatorPage";

export default function BukalapakFeeCalculatorRoute() {
  return (
    <>
      <Head>
        <title>Bukalapak Fee Calculator — Kalkulator Hari</title>
      </Head>
      <BukalapakFeeCalculatorPage />
    </>
  );
}
