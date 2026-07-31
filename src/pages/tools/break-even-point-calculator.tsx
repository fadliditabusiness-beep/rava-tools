import Head from "next/head";
import BreakEvenPointCalculatorPage from "@/components/pages/BreakEvenPointCalculatorPage/BreakEvenPointCalculatorPage";

export default function BreakEvenPointCalculatorRoute() {
  return (
    <>
      <Head>
        <title>Break Even Point Calculator — Kalkulator Hari</title>
      </Head>
      <BreakEvenPointCalculatorPage />
    </>
  );
}
