import Head from "next/head";
import FuelConsumptionPage from "@/components/pages/FuelConsumptionPage/FuelConsumptionPage";

export default function KonsumsiBbmRoute() {
  return (
    <>
      <Head>
        <title>Konsumsi BBM — Kalkulator Hari</title>
      </Head>
      <FuelConsumptionPage />
    </>
  );
}
