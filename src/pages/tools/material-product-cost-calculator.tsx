import Head from "next/head";
import MaterialProductCostCalculatorPage from "@/components/pages/MaterialProductCostCalculatorPage/MaterialProductCostCalculatorPage";

export default function MaterialProductCostCalculatorRoute() {
  return (
    <>
      <Head>
        <title>Material & Product Cost Calculator — Kalkulator Hari</title>
      </Head>
      <MaterialProductCostCalculatorPage />
    </>
  );
}
