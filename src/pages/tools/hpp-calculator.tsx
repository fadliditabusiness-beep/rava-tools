import Head from "next/head";
import HppCalculatorPage from "@/components/pages/HppCalculatorPage/HppCalculatorPage";

export default function HppCalculatorRoute() {
  return (
    <>
      <Head>
        <title>HPP Calculator — Kalkulator Hari</title>
      </Head>
      <HppCalculatorPage />
    </>
  );
}
