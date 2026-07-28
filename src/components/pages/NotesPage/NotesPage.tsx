import { useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import Button from "@/components/atoms/Button/Button";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface Note {
  id: string;
  text: string;
  updatedAt: number;
}

export default function NotesPage() {
  const [notes, setNotes] = useLocalStorage<Note[]>("rava-notes", []);
  const [draft, setDraft] = useState("");

  const addNote = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    setNotes((prev) => [{ id: crypto.randomUUID(), text: trimmed, updatedAt: Date.now() }, ...prev]);
    setDraft("");
  };

  const removeNote = (id: string) => setNotes((prev) => prev.filter((n) => n.id !== id));

  return (
    <ToolsPageTemplate title="Notes" description="Catatan singkat, tersimpan di browser kamu.">
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Data disimpan di local storage browser kamu, tidak dikirim ke server manapun.
      </p>

      <div className="flex flex-col gap-2">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Tulis catatan baru..."
          rows={3}
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        />
        <div className="flex justify-end">
          <Button onClick={addNote}>Simpan Catatan</Button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {notes.map((note) => (
          <div
            key={note.id}
            className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
          >
            <p className="whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-200">{note.text}</p>
            <div className="mt-auto flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
              <span>{new Date(note.updatedAt).toLocaleString("id-ID")}</span>
              <button
                type="button"
                onClick={() => removeNote(note.id)}
                className="font-medium text-rose-600 hover:underline dark:text-rose-400"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {notes.length === 0 && (
        <p className="mt-8 text-center text-sm text-slate-400 dark:text-slate-500">Belum ada catatan.</p>
      )}
    </ToolsPageTemplate>
  );
}
