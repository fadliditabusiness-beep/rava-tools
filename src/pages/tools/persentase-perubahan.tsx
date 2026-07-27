import Head from "next/head";
import PercentageChangePage from "@/components/pages/PercentageChangePage/PercentageChangePage";

export default function PersentasePerubahanRoute() {
  return (
    <>
      <Head>
        <title>Persentase Kenaikan/Penurunan — Kalkulator Hari</title>
      </Head>
      <PercentageChangePage />
    </>
  );
}
