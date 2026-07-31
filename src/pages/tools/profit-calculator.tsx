import Head from "next/head";
import ProfitCalculatorPage from "@/components/pages/ProfitCalculatorPage/ProfitCalculatorPage";

export default function ProfitCalculatorRoute() {
  return (
    <>
      <Head>
        <title>Profit Calculator — Kalkulator Hari</title>
      </Head>
      <ProfitCalculatorPage />
    </>
  );
}
