import Head from "next/head";
import WhoisPage from "@/components/pages/WhoisPage/WhoisPage";

export default function WhoisRoute() {
  return (
    <>
      <Head>
        <title>WHOIS — Kalkulator Hari</title>
      </Head>
      <WhoisPage />
    </>
  );
}
