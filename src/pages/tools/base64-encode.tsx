import Head from "next/head";
import Base64EncodePage from "@/components/pages/Base64EncodePage/Base64EncodePage";

export default function Base64EncodeRoute() {
  return (
    <>
      <Head>
        <title>Base64 Encode — Kalkulator Hari</title>
      </Head>
      <Base64EncodePage />
    </>
  );
}
