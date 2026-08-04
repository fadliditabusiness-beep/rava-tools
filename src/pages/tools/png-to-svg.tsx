import Head from "next/head";
import PngToSvgPage from "@/components/pages/PngToSvgPage/PngToSvgPage";

export default function PngToSvgRoute() {
  return (
    <>
      <Head>
        <title>Convert PNG to SVG — Kalkulator Hari</title>
      </Head>
      <PngToSvgPage />
    </>
  );
}
