import { useMemo, useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import Input from "@/components/atoms/Input/Input";
import Button from "@/components/atoms/Button/Button";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { formatDateKey } from "@/utils/calendar";

interface Habit {
  id: string;
  name: string;
  doneDates: string[];
}

const DAY_LABELS = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

function lastNDays(n: number): Date[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Array.from({ length: n }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (n - 1 - i));
    return d;
  });
}

function currentStreak(doneDates: string[]): number {
  const done = new Set(doneDates);
  let streak = 0;
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  while (done.has(formatDateKey(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export default function HabitTrackerPage() {
  const [habits, setHabits] = useLocalStorage<Habit[]>("rava-habits", []);
  const [name, setName] = useState("");
  const days = useMemo(() => lastNDays(7), []);

  const addHabit = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setHabits((prev) => [...prev, { id: crypto.randomUUID(), name: trimmed, doneDates: [] }]);
    setName("");
  };

  const removeHabit = (id: string) => setHabits((prev) => prev.filter((h) => h.id !== id));

  const toggleDay = (id: string, key: string) => {
    setHabits((prev) =>
      prev.map((h) =>
        h.id === id
          ? {
              ...h,
              doneDates: h.doneDates.includes(key)
                ? h.doneDates.filter((d) => d !== key)
                : [...h.doneDates, key],
            }
          : h,
      ),
    );
  };

  return (
    <ToolsPageTemplate title="Habit Tracker" description="Lacak kebiasaan harian, tersimpan di browser kamu.">
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Data disimpan di local storage browser kamu, tidak dikirim ke server manapun.
      </p>

      <div className="flex gap-2">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addHabit()}
          placeholder="Nama kebiasaan baru, misal: Olahraga"
        />
        <Button onClick={addHabit}>Tambah</Button>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {habits.map((habit) => (
          <div key={habit.id} className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-50">{habit.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Streak: {currentStreak(habit.doneDates)} hari
                </p>
              </div>
              <button
                type="button"
                onClick={() => removeHabit(habit.id)}
                className="text-xs font-medium text-rose-600 hover:underline dark:text-rose-400"
              >
                Hapus
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {days.map((day) => {
                const key = formatDateKey(day);
                const done = habit.doneDates.includes(key);
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggleDay(habit.id, key)}
                    className={`flex flex-col items-center gap-1 rounded-md py-2 text-xs transition-colors ${
                      done
                        ? "bg-gradient-to-br from-blue-600 to-violet-600 text-white"
                        : "bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                    }`}
                  >
                    <span>{DAY_LABELS[day.getDay()]}</span>
                    <span className="font-semibold">{day.getDate()}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {habits.length === 0 && (
        <p className="mt-8 text-center text-sm text-slate-400 dark:text-slate-500">Belum ada kebiasaan yang dilacak.</p>
      )}
    </ToolsPageTemplate>
  );
}
