import Head from "next/head";
import QrCodePage from "@/components/pages/QrCodePage/QrCodePage";

export default function QrCodeRoute() {
  return (
    <>
      <Head>
        <title>QR Code Generator — Kalkulator Hari</title>
      </Head>
      <QrCodePage />
    </>
  );
}
