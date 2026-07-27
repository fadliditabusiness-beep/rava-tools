import Head from "next/head";
import AgeCalculatorPage from "@/components/pages/AgeCalculatorPage/AgeCalculatorPage";

export default function UmurRoute() {
  return (
    <>
      <Head>
        <title>Umur & Hari Lahir — Kalkulator Hari</title>
      </Head>
      <AgeCalculatorPage />
    </>
  );
}
