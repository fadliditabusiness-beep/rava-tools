import { useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import Input from "@/components/atoms/Input/Input";
import Button from "@/components/atoms/Button/Button";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface TodoItem {
  id: string;
  text: string;
  done: boolean;
}

export default function TodoListPage() {
  const [todos, setTodos] = useLocalStorage<TodoItem[]>("rava-todo-list", []);
  const [text, setText] = useState("");

  const addTodo = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setTodos((prev) => [{ id: crypto.randomUUID(), text: trimmed, done: false }, ...prev]);
    setText("");
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const removeTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const remaining = todos.filter((t) => !t.done).length;

  return (
    <ToolsPageTemplate title="To-do List" description="Catatan tugas, tersimpan di browser kamu.">
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Data disimpan di local storage browser kamu, tidak dikirim ke server manapun.
      </p>

      <div className="flex gap-2">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          placeholder="Tambah tugas baru..."
        />
        <Button onClick={addTodo}>Tambah</Button>
      </div>

      {todos.length > 0 && (
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{remaining} tugas belum selesai</p>
      )}

      <ul className="mt-4 flex flex-col gap-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 py-2.5 dark:border-slate-800 dark:bg-slate-900"
          >
            <label className="flex min-w-0 flex-1 items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleTodo(todo.id)}
                className="h-4 w-4 shrink-0 rounded border-slate-300 dark:border-slate-700"
              />
              <span className={`truncate ${todo.done ? "text-slate-400 line-through dark:text-slate-500" : ""}`}>
                {todo.text}
              </span>
            </label>
            <button
              type="button"
              onClick={() => removeTodo(todo.id)}
              className="shrink-0 text-xs font-medium text-rose-600 hover:underline dark:text-rose-400"
            >
              Hapus
            </button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && (
        <p className="mt-8 text-center text-sm text-slate-400 dark:text-slate-500">Belum ada tugas.</p>
      )}
    </ToolsPageTemplate>
  );
}
