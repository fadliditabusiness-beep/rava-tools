import Head from "next/head";
import ConvertPngToWebpPage from "@/components/pages/ConvertPngToWebpPage/ConvertPngToWebpPage";

export default function ConvertPngToWebpRoute() {
  return (
    <>
      <Head>
        <title>Convert PNG to WebP — Kalkulator Hari</title>
      </Head>
      <ConvertPngToWebpPage />
    </>
  );
}
