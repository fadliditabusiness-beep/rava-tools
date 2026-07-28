import Head from "next/head";
import TimerPage from "@/components/pages/TimerPage/TimerPage";

export default function TimerRoute() {
  return (
    <>
      <Head>
        <title>Timer — Kalkulator Hari</title>
      </Head>
      <TimerPage />
    </>
  );
}
