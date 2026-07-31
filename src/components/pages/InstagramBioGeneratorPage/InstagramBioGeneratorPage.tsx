import { useMemo, useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import Input from "@/components/atoms/Input/Input";
import GeneratedOutput from "@/components/molecules/GeneratedOutput/GeneratedOutput";

const BIO_LIMIT = 150;

export default function InstagramBioGeneratorPage() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [highlight, setHighlight] = useState("");
  const [cta, setCta] = useState("");

  const bio = useMemo(() => {
    const lines = [
      name && `✨ ${name}`,
      role,
      location && `📍 ${location}`,
      highlight,
      cta && `👇 ${cta}`,
    ].filter(Boolean);
    return lines.join("\n");
  }, [name, role, location, highlight, cta]);

  const overLimit = bio.length > BIO_LIMIT;

  return (
    <ToolsPageTemplate title="Instagram Bio Generator" description="Susun bio Instagram dari beberapa baris & emoji.">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Nama / Brand</span>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Kopi Kita" />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Peran / Profesi</span>
            <Input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Content Creator ☕" />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Lokasi</span>
            <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Jakarta, Indonesia" />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Highlight / Value</span>
            <Input value={highlight} onChange={(e) => setHighlight(e.target.value)} placeholder="Ngopi tiap hari 🔥" />
          </label>
          <label className="block text-sm sm:col-span-2">
            <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Call to Action / Link</span>
            <Input value={cta} onChange={(e) => setCta(e.target.value)} placeholder="Order di link bawah ini" />
          </label>
        </div>

        <p className={`text-xs ${overLimit ? "text-red-600 dark:text-red-400" : "text-slate-500 dark:text-slate-400"}`}>
          {bio.length} / {BIO_LIMIT} karakter{overLimit ? " — melebihi batas bio Instagram" : ""}
        </p>

        {bio && <GeneratedOutput label="Bio" value={bio} />}
      </div>
    </ToolsPageTemplate>
  );
}
