import Head from "next/head";
import HexRgbConverterPage from "@/components/pages/HexRgbConverterPage/HexRgbConverterPage";

export default function HexRgbConverterRoute() {
  return (
    <>
      <Head>
        <title>HEX ↔ RGB Converter — Kalkulator Hari</title>
      </Head>
      <HexRgbConverterPage />
    </>
  );
}
