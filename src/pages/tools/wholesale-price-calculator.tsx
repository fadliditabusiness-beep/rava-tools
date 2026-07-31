import Head from "next/head";
import WholesalePriceCalculatorPage from "@/components/pages/WholesalePriceCalculatorPage/WholesalePriceCalculatorPage";

export default function WholesalePriceCalculatorRoute() {
  return (
    <>
      <Head>
        <title>Wholesale Price Calculator — Kalkulator Hari</title>
      </Head>
      <WholesalePriceCalculatorPage />
    </>
  );
}
