import Head from "next/head";
import BundlePriceCalculatorPage from "@/components/pages/BundlePriceCalculatorPage/BundlePriceCalculatorPage";

export default function BundlePriceCalculatorRoute() {
  return (
    <>
      <Head>
        <title>Bundle Price Calculator — Kalkulator Hari</title>
      </Head>
      <BundlePriceCalculatorPage />
    </>
  );
}
