import Head from "next/head";
import DecisionMakerPage from "@/components/pages/DecisionMakerPage/DecisionMakerPage";

export default function DecisionMakerRoute() {
  return (
    <>
      <Head>
        <title>Decision Maker — Kalkulator Hari</title>
      </Head>
      <DecisionMakerPage />
    </>
  );
}
