import Head from "next/head";
import SitemapXmlGeneratorPage from "@/components/pages/SitemapXmlGeneratorPage/SitemapXmlGeneratorPage";

export default function SitemapXmlGeneratorRoute() {
  return (
    <>
      <Head>
        <title>sitemap.xml Generator — Kalkulator Hari</title>
      </Head>
      <SitemapXmlGeneratorPage />
    </>
  );
}
