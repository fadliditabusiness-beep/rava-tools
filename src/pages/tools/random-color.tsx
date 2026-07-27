import Head from "next/head";
import RandomColorPage from "@/components/pages/RandomColorPage/RandomColorPage";

export default function RandomColorRoute() {
  return (
    <>
      <Head>
        <title>Random Color — Kalkulator Hari</title>
      </Head>
      <RandomColorPage />
    </>
  );
}
