import Head from "next/head";
import PageSpeedCheckerPage from "@/components/pages/PageSpeedCheckerPage/PageSpeedCheckerPage";

export default function PageSpeedCheckerRoute() {
  return (
    <>
      <Head>
        <title>PageSpeed Checker — Kalkulator Hari</title>
      </Head>
      <PageSpeedCheckerPage />
    </>
  );
}
