import Head from "next/head";
import ResellerPriceCalculatorPage from "@/components/pages/ResellerPriceCalculatorPage/ResellerPriceCalculatorPage";

export default function ResellerPriceCalculatorRoute() {
  return (
    <>
      <Head>
        <title>Reseller Price Calculator — Kalkulator Hari</title>
      </Head>
      <ResellerPriceCalculatorPage />
    </>
  );
}
