import Head from "next/head";
import RoiCalculatorPage from "@/components/pages/RoiCalculatorPage/RoiCalculatorPage";

export default function RoiCalculatorRoute() {
  return (
    <>
      <Head>
        <title>ROI Calculator — Kalkulator Hari</title>
      </Head>
      <RoiCalculatorPage />
    </>
  );
}
