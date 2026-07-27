import Head from "next/head";
import DiscountPage from "@/components/pages/DiscountPage/DiscountPage";

export default function DiskonRoute() {
  return (
    <>
      <Head>
        <title>Kalkulator Diskon — Kalkulator Hari</title>
      </Head>
      <DiscountPage />
    </>
  );
}
