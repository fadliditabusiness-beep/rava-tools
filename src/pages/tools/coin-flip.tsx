import Head from "next/head";
import CoinFlipPage from "@/components/pages/CoinFlipPage/CoinFlipPage";

export default function CoinFlipRoute() {
  return (
    <>
      <Head>
        <title>Coin Flip — Kalkulator Hari</title>
      </Head>
      <CoinFlipPage />
    </>
  );
}
