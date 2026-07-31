import Head from "next/head";
import BreadcrumbSchemaGeneratorPage from "@/components/pages/BreadcrumbSchemaGeneratorPage/BreadcrumbSchemaGeneratorPage";

export default function BreadcrumbSchemaGeneratorRoute() {
  return (
    <>
      <Head>
        <title>Breadcrumb Schema Generator — Kalkulator Hari</title>
      </Head>
      <BreadcrumbSchemaGeneratorPage />
    </>
  );
}
