import Head from "next/head";
import UnitConverterPage from "@/components/pages/UnitConverterPage/UnitConverterPage";

export default function UnitConverterRoute() {
  return (
    <>
      <Head>
        <title>Unit Converter — Kalkulator Hari</title>
      </Head>
      <UnitConverterPage />
    </>
  );
}
