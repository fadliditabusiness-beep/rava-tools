import Head from "next/head";
import AddSubtractDaysPage from "@/components/pages/AddSubtractDaysPage/AddSubtractDaysPage";

export default function TambahKurangHariRoute() {
  return (
    <>
      <Head>
        <title>Tambah / Kurang Hari — Kalkulator Hari</title>
      </Head>
      <AddSubtractDaysPage />
    </>
  );
}
