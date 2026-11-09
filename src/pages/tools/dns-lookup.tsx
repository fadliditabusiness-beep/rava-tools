import Head from "next/head";
import DnsLookupPage from "@/components/pages/DnsLookupPage/DnsLookupPage";

export default function DnsLookupRoute() {
  return (
    <>
      <Head>
        <title>DNS Lookup — Kalkulator Hari</title>
      </Head>
      <DnsLookupPage />
    </>
  );
}
