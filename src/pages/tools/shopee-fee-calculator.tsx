import Head from "next/head";
import ShopeeFeeCalculatorPage from "@/components/pages/ShopeeFeeCalculatorPage/ShopeeFeeCalculatorPage";

export default function ShopeeFeeCalculatorRoute() {
  return (
    <>
      <Head>
        <title>Shopee Fee Calculator — Kalkulator Hari</title>
      </Head>
      <ShopeeFeeCalculatorPage />
    </>
  );
}
