import Head from "next/head";
import Base64DecodePage from "@/components/pages/Base64DecodePage/Base64DecodePage";

export default function Base64DecodeRoute() {
  return (
    <>
      <Head>
        <title>Base64 Decode — Kalkulator Hari</title>
      </Head>
      <Base64DecodePage />
    </>
  );
}
