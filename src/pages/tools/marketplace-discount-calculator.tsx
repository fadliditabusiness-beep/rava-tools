import Head from "next/head";
import MarketplaceDiscountCalculatorPage from "@/components/pages/MarketplaceDiscountCalculatorPage/MarketplaceDiscountCalculatorPage";

export default function MarketplaceDiscountCalculatorRoute() {
  return (
    <>
      <Head>
        <title>Discount Calculator — Kalkulator Hari</title>
      </Head>
      <MarketplaceDiscountCalculatorPage />
    </>
  );
}
