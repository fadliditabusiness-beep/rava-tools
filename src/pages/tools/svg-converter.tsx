import Head from "next/head";
import SvgConverterPage from "@/components/pages/SvgConverterPage/SvgConverterPage";

export default function SvgConverterRoute() {
  return (
    <>
      <Head>
        <title>SVG Converter — Kalkulator Hari</title>
      </Head>
      <SvgConverterPage />
    </>
  );
}
