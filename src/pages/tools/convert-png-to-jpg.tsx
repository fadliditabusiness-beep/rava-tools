import Head from "next/head";
import ConvertPngToJpgPage from "@/components/pages/ConvertPngToJpgPage/ConvertPngToJpgPage";

export default function ConvertPngToJpgRoute() {
  return (
    <>
      <Head>
        <title>Convert PNG to JPG — Kalkulator Hari</title>
      </Head>
      <ConvertPngToJpgPage />
    </>
  );
}
