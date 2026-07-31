import Head from "next/head";
import SellingPriceCalculatorPage from "@/components/pages/SellingPriceCalculatorPage/SellingPriceCalculatorPage";

export default function SellingPriceCalculatorRoute() {
  return (
    <>
      <Head>
        <title>Selling Price Calculator — Kalkulator Hari</title>
      </Head>
      <SellingPriceCalculatorPage />
    </>
  );
}
