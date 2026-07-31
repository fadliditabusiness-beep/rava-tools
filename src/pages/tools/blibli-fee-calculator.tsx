import Head from "next/head";
import BlibliFeeCalculatorPage from "@/components/pages/BlibliFeeCalculatorPage/BlibliFeeCalculatorPage";

export default function BlibliFeeCalculatorRoute() {
  return (
    <>
      <Head>
        <title>Blibli Fee Calculator — Kalkulator Hari</title>
      </Head>
      <BlibliFeeCalculatorPage />
    </>
  );
}
