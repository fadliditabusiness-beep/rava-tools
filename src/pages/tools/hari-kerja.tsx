import Head from "next/head";
import WorkdaysPage from "@/components/pages/WorkdaysPage/WorkdaysPage";

export default function HariKerjaRoute() {
  return (
    <>
      <Head>
        <title>Hari Kerja — Kalkulator Hari</title>
      </Head>
      <WorkdaysPage />
    </>
  );
}
