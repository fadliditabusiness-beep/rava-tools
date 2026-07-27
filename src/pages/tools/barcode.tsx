import Head from "next/head";
import BarcodePage from "@/components/pages/BarcodePage/BarcodePage";

export default function BarcodeRoute() {
  return (
    <>
      <Head>
        <title>Barcode Generator — Kalkulator Hari</title>
      </Head>
      <BarcodePage />
    </>
  );
}
