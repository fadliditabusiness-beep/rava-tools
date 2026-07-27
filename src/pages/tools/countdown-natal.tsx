import Head from "next/head";
import CountdownChristmasPage from "@/components/pages/CountdownChristmasPage/CountdownChristmasPage";

export default function CountdownNatalRoute() {
  return (
    <>
      <Head>
        <title>Countdown Natal — Kalkulator Hari</title>
      </Head>
      <CountdownChristmasPage />
    </>
  );
}
