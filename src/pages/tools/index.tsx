import Head from "next/head";
import ToolsHomePage from "@/components/pages/ToolsHomePage/ToolsHomePage";

export default function ToolsRoute() {
  return (
    <>
      <Head>
        <title>Kalkulator Hari — Selisih, Tambah Kurang, Hari Kerja, Umur</title>
      </Head>
      <ToolsHomePage />
    </>
  );
}
