import Head from "next/head";
import JwtDecoderPage from "@/components/pages/JwtDecoderPage/JwtDecoderPage";

export default function JwtDecoderRoute() {
  return (
    <>
      <Head>
        <title>JWT Decoder — Kalkulator Hari</title>
      </Head>
      <JwtDecoderPage />
    </>
  );
}
