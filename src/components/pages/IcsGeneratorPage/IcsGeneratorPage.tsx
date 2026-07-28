import { useMemo, useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import Input from "@/components/atoms/Input/Input";
import Button from "@/components/atoms/Button/Button";
import { toDateInputValue } from "@/utils/dateTools";
import { buildIcsFile } from "@/utils/icsTools";
import { downloadFile } from "@/utils/imageTools";

export default function IcsGeneratorPage() {
  const today = useMemo(() => toDateInputValue(new Date()), []);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(today);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const canGenerate = title.trim().length > 0 && date.length > 0;

  const generate = () => {
    const ics = buildIcsFile({ title, date, startTime, endTime, location, description });
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const filename = `${title.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-") || "event"}.ics`;
    downloadFile(blob, filename);
  };

  return (
    <ToolsPageTemplate
      title="Calendar Event Generator"
      description="Buat file .ics untuk ditambahkan ke Google Calendar, Outlook, atau Apple Calendar."
    >
      <div className="flex flex-col gap-4">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Judul Acara</span>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Rapat Tim" />
        </label>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Tanggal</span>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Jam Mulai</span>
            <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Jam Selesai</span>
            <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          </label>
        </div>

        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Lokasi (opsional)</span>
          <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Kantor Pusat" />
        </label>

        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Deskripsi (opsional)</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        </label>

        <div className="flex justify-center">
          <Button disabled={!canGenerate} onClick={generate}>
            Download .ics
          </Button>
        </div>
      </div>
    </ToolsPageTemplate>
  );
}
