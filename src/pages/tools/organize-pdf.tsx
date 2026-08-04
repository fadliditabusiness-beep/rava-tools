import Head from "next/head";
import OrganizePdfPage from "@/components/pages/OrganizePdfPage/OrganizePdfPage";

export default function OrganizePdfRoute() {
  return (
    <>
      <Head>
        <title>Organize PDF — Kalkulator Hari</title>
      </Head>
      <OrganizePdfPage />
    </>
  );
}
