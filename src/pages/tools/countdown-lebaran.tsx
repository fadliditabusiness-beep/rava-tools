import Head from "next/head";
import CountdownLebaranPage from "@/components/pages/CountdownLebaranPage/CountdownLebaranPage";

export default function CountdownLebaranRoute() {
  return (
    <>
      <Head>
        <title>Countdown Lebaran — Kalkulator Hari</title>
      </Head>
      <CountdownLebaranPage />
    </>
  );
}
