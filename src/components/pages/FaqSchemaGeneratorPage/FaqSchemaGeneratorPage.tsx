import { useMemo, useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import Input from "@/components/atoms/Input/Input";
import Button from "@/components/atoms/Button/Button";
import GeneratedOutput from "@/components/molecules/GeneratedOutput/GeneratedOutput";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export default function FaqSchemaGeneratorPage() {
  const [items, setItems] = useState<FaqItem[]>(() => [{ id: crypto.randomUUID(), question: "", answer: "" }]);

  const updateItem = (id: string, field: "question" | "answer", value: string) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const addItem = () => setItems((prev) => [...prev, { id: crypto.randomUUID(), question: "", answer: "" }]);
  const removeItem = (id: string) => setItems((prev) => prev.filter((item) => item.id !== id));

  const output = useMemo(() => {
    const validItems = items.filter((item) => item.question.trim() && item.answer.trim());
    if (validItems.length === 0) return "";
    const data = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: validItems.map((item) => ({
        "@type": "Question",
        name: item.question.trim(),
        acceptedAnswer: { "@type": "Answer", text: item.answer.trim() },
      })),
    };
    return `<script type="application/ld+json">\n${JSON.stringify(data, null, 2)}\n</script>`;
  }, [items]);

  return (
    <ToolsPageTemplate title="FAQ Schema Generator" description="Buat structured data FAQPage dari daftar tanya-jawab.">
      <div className="flex flex-col gap-4">
        {items.map((item, index) => (
          <div key={item.id} className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Pertanyaan {index + 1}</span>
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
            <div className="flex flex-col gap-2">
              <Input
                value={item.question}
                onChange={(e) => updateItem(item.id, "question", e.target.value)}
                placeholder="Pertanyaan"
              />
              <textarea
                value={item.answer}
                onChange={(e) => updateItem(item.id, "answer", e.target.value)}
                rows={2}
                placeholder="Jawaban"
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-lime-500 focus:outline-none focus:ring-1 focus:ring-lime-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </div>
          </div>
        ))}

        <div className="flex justify-center">
          <Button
            onClick={addItem}
            className="bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
          >
            + Tambah Pertanyaan
          </Button>
        </div>

        {output && <GeneratedOutput label="FAQ Schema" value={output} filename="faq-schema.html" mimeType="text/html" />}
      </div>
    </ToolsPageTemplate>
  );
}
