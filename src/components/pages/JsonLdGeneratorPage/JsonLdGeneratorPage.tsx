import { useMemo, useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import Input from "@/components/atoms/Input/Input";
import Select from "@/components/atoms/Select/Select";
import GeneratedOutput from "@/components/molecules/GeneratedOutput/GeneratedOutput";

type SchemaType = "Organization" | "Article" | "Product" | "Person";

export default function JsonLdGeneratorPage() {
  const [type, setType] = useState<SchemaType>("Organization");

  const [orgName, setOrgName] = useState("");
  const [orgUrl, setOrgUrl] = useState("");
  const [orgLogo, setOrgLogo] = useState("");

  const [articleHeadline, setArticleHeadline] = useState("");
  const [articleAuthor, setArticleAuthor] = useState("");
  const [articleDate, setArticleDate] = useState("");
  const [articleImage, setArticleImage] = useState("");

  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCurrency, setProductCurrency] = useState("IDR");

  const [personName, setPersonName] = useState("");
  const [personUrl, setPersonUrl] = useState("");
  const [personJobTitle, setPersonJobTitle] = useState("");

  const output = useMemo(() => {
    let data: Record<string, unknown> = {};

    if (type === "Organization") {
      data = { "@context": "https://schema.org", "@type": "Organization", name: orgName, url: orgUrl, logo: orgLogo };
    } else if (type === "Article") {
      data = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: articleHeadline,
        author: { "@type": "Person", name: articleAuthor },
        datePublished: articleDate,
        image: articleImage,
      };
    } else if (type === "Product") {
      data = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: productName,
        image: productImage,
        description: productDescription,
        offers: { "@type": "Offer", price: productPrice, priceCurrency: productCurrency },
      };
    } else {
      data = { "@context": "https://schema.org", "@type": "Person", name: personName, url: personUrl, jobTitle: personJobTitle };
    }

    return `<script type="application/ld+json">\n${JSON.stringify(data, null, 2)}\n</script>`;
  }, [
    type,
    orgName,
    orgUrl,
    orgLogo,
    articleHeadline,
    articleAuthor,
    articleDate,
    articleImage,
    productName,
    productImage,
    productDescription,
    productPrice,
    productCurrency,
    personName,
    personUrl,
    personJobTitle,
  ]);

  return (
    <ToolsPageTemplate title="JSON-LD Generator" description="Buat structured data JSON-LD untuk schema.org.">
      <div className="flex flex-col gap-4">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Tipe Schema</span>
          <Select value={type} onChange={(e) => setType(e.target.value as SchemaType)}>
            <option value="Organization">Organization</option>
            <option value="Article">Article</option>
            <option value="Product">Product</option>
            <option value="Person">Person</option>
          </Select>
        </label>

        {type === "Organization" && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Nama</span>
              <Input value={orgName} onChange={(e) => setOrgName(e.target.value)} placeholder="Nama Organisasi" />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">URL</span>
              <Input value={orgUrl} onChange={(e) => setOrgUrl(e.target.value)} placeholder="https://example.com" />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Logo URL</span>
              <Input value={orgLogo} onChange={(e) => setOrgLogo(e.target.value)} placeholder="https://example.com/logo.png" />
            </label>
          </div>
        )}

        {type === "Article" && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Headline</span>
              <Input value={articleHeadline} onChange={(e) => setArticleHeadline(e.target.value)} placeholder="Judul artikel" />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Author</span>
              <Input value={articleAuthor} onChange={(e) => setArticleAuthor(e.target.value)} placeholder="Nama penulis" />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Tanggal Publish</span>
              <Input type="date" value={articleDate} onChange={(e) => setArticleDate(e.target.value)} />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Image URL</span>
              <Input value={articleImage} onChange={(e) => setArticleImage(e.target.value)} placeholder="https://example.com/image.jpg" />
            </label>
          </div>
        )}

        {type === "Product" && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Nama Produk</span>
              <Input value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Nama produk" />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Image URL</span>
              <Input value={productImage} onChange={(e) => setProductImage(e.target.value)} placeholder="https://example.com/produk.jpg" />
            </label>
            <label className="block text-sm sm:col-span-2">
              <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Deskripsi</span>
              <Input value={productDescription} onChange={(e) => setProductDescription(e.target.value)} placeholder="Deskripsi singkat produk" />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Harga</span>
              <Input value={productPrice} onChange={(e) => setProductPrice(e.target.value)} placeholder="150000" />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Mata Uang</span>
              <Input value={productCurrency} onChange={(e) => setProductCurrency(e.target.value)} placeholder="IDR" />
            </label>
          </div>
        )}

        {type === "Person" && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Nama</span>
              <Input value={personName} onChange={(e) => setPersonName(e.target.value)} placeholder="Nama lengkap" />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">URL</span>
              <Input value={personUrl} onChange={(e) => setPersonUrl(e.target.value)} placeholder="https://example.com/profil" />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Jabatan</span>
              <Input value={personJobTitle} onChange={(e) => setPersonJobTitle(e.target.value)} placeholder="Software Engineer" />
            </label>
          </div>
        )}

        <GeneratedOutput label="JSON-LD" value={output} filename="json-ld.html" mimeType="text/html" />
      </div>
    </ToolsPageTemplate>
  );
}
