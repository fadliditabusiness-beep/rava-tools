import Head from "next/head";
import MarketplaceToolsPage from "@/components/pages/MarketplaceToolsPage/MarketplaceToolsPage";
import { SITE_URL } from "@/config/site";

const PAGE_URL = `${SITE_URL}/marketplace-tools`;

const BREADCRUMB_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Marketplace Tools", item: PAGE_URL },
  ],
};

export default function MarketplaceToolsRoute() {
  return (
    <>
      <Head>
        <title>Marketplace Tools — Rava</title>
        <meta
          name="description"
          content="Kalkulator harga, profit, & fee marketplace (Shopee, Tokopedia, TikTok Shop, Lazada, Blibli, Bukalapak) untuk seller online. 100% client-side, gratis."
        />
        <link rel="canonical" href={PAGE_URL} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSON_LD) }} />
      </Head>
      <MarketplaceToolsPage />
    </>
  );
}
