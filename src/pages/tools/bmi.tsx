import Head from "next/head";
import BmiPage from "@/components/pages/BmiPage/BmiPage";

export default function BmiRoute() {
  return (
    <>
      <Head>
        <title>BMI — Kalkulator Hari</title>
      </Head>
      <BmiPage />
    </>
  );
}
