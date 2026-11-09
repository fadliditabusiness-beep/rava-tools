import Head from "next/head";
import CoreWebVitalsPage from "@/components/pages/CoreWebVitalsPage/CoreWebVitalsPage";

export default function CoreWebVitalsRoute() {
  return (
    <>
      <Head>
        <title>Core Web Vitals — Kalkulator Hari</title>
      </Head>
      <CoreWebVitalsPage />
    </>
  );
}
