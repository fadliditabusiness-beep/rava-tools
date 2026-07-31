import { useMemo, useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import Input from "@/components/atoms/Input/Input";
import Button from "@/components/atoms/Button/Button";
import GeneratedOutput from "@/components/molecules/GeneratedOutput/GeneratedOutput";

interface BreadcrumbItem {
  id: string;
  name: string;
  url: string;
}

export default function BreadcrumbSchemaGeneratorPage() {
  const [items, setItems] = useState<BreadcrumbItem[]>(() => [
    { id: crypto.randomUUID(), name: "Home", url: "" },
    { id: crypto.randomUUID(), name: "", url: "" },
  ]);

  const updateItem = (id: string, field: "name" | "url", value: string) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const addItem = () => setItems((prev) => [...prev, { id: crypto.randomUUID(), name: "", url: "" }]);
  const removeItem = (id: string) => setItems((prev) => prev.filter((item) => item.id !== id));

  const output = useMemo(() => {
    const validItems = items.filter((item) => item.name.trim() && item.url.trim());
    if (validItems.length === 0) return "";
    const data = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: validItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name.trim(),
        item: item.url.trim(),
      })),
    };
    return `<script type="application/ld+json">\n${JSON.stringify(data, null, 2)}\n</script>`;
  }, [items]);

  return (
    <ToolsPageTemplate title="Breadcrumb Schema Generator" description="Buat structured data BreadcrumbList dari jalur navigasi.">
      <div className="flex flex-col gap-4">
        {items.map((item, index) => (
          <div key={item.id} className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Langkah {index + 1}</span>
              {items.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="text-xs font-medium text-rose-600 hover:underline dark:text-rose-400"
                >
                  Hapus
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <Input value={item.name} onChange={(e) => updateItem(item.id, "name", e.target.value)} placeholder="Nama, misal: Blog" />
              <Input
                value={item.url}
                onChange={(e) => updateItem(item.id, "url", e.target.value)}
                placeholder="https://example.com/blog"
              />
            </div>
          </div>
        ))}

        <div className="flex justify-center">
          <Button
            onClick={addItem}
            className="bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
          >
            + Tambah Langkah
          </Button>
        </div>

        {output && (
          <GeneratedOutput label="Breadcrumb Schema" value={output} filename="breadcrumb-schema.html" mimeType="text/html" />
        )}
      </div>
    </ToolsPageTemplate>
  );
}
