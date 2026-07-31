import Head from "next/head";
import CashbackCalculatorPage from "@/components/pages/CashbackCalculatorPage/CashbackCalculatorPage";

export default function CashbackCalculatorRoute() {
  return (
    <>
      <Head>
        <title>Cashback Calculator — Kalkulator Hari</title>
      </Head>
      <CashbackCalculatorPage />
    </>
  );
}
