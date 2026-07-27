import Head from "next/head";
import RandomPasswordPage from "@/components/pages/RandomPasswordPage/RandomPasswordPage";

export default function RandomPasswordRoute() {
  return (
    <>
      <Head>
        <title>Random Password — Kalkulator Hari</title>
      </Head>
      <RandomPasswordPage />
    </>
  );
}
