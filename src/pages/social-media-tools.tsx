import Head from "next/head";
import SocialMediaToolsPage from "@/components/pages/SocialMediaToolsPage/SocialMediaToolsPage";
import { SITE_URL } from "@/config/site";

const PAGE_URL = `${SITE_URL}/social-media-tools`;

const BREADCRUMB_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Social Media Tools", item: PAGE_URL },
  ],
};

export default function SocialMediaToolsRoute() {
  return (
    <>
      <Head>
        <title>Social Media Tools — Rava</title>
        <meta
          name="description"
          content="Tools gratis untuk Instagram, TikTok, YouTube, LinkedIn, Facebook, Pinterest, Threads & X: caption counter, hashtag generator, resize gambar/video, size guide. 100% client-side."
        />
        <link rel="canonical" href={PAGE_URL} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSON_LD) }} />
      </Head>
      <SocialMediaToolsPage />
    </>
  );
}
