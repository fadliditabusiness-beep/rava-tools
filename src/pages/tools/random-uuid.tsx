import Head from "next/head";
import RandomUuidPage from "@/components/pages/RandomUuidPage/RandomUuidPage";

export default function RandomUuidRoute() {
  return (
    <>
      <Head>
        <title>Random UUID — Kalkulator Hari</title>
      </Head>
      <RandomUuidPage />
    </>
  );
}
