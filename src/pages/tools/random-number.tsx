import Head from "next/head";
import RandomNumberPage from "@/components/pages/RandomNumberPage/RandomNumberPage";

export default function RandomNumberRoute() {
  return (
    <>
      <Head>
        <title>Random Number — Kalkulator Hari</title>
      </Head>
      <RandomNumberPage />
    </>
  );
}
