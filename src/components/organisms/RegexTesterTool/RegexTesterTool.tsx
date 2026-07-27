import { useState, type ReactNode } from "react";
import Input from "@/components/atoms/Input/Input";

export default function RegexTesterTool() {
  const [pattern, setPattern] = useState("\\d+");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState(
    "Order 123 shipped on 2026-07-27, tracking 4567.",
  );

  let error: string | null = null;
  let matches: RegExpMatchArray[] = [];
  let highlighted: ReactNode = testString;

  try {
    const effectiveFlags = flags.includes("g") ? flags : `${flags}g`;
    const regex = new RegExp(pattern, effectiveFlags);
    matches = [...testString.matchAll(regex)];

    if (matches.length > 0) {
      const parts: ReactNode[] = [];
      let lastIndex = 0;
      matches.forEach((match, i) => {
        const start = match.index ?? 0;
        const end = start + match[0].length;
        if (start > lastIndex) parts.push(testString.slice(lastIndex, start));
        parts.push(
          <mark
            key={i}
            className="rounded bg-amber-200 px-0.5 dark:bg-amber-600 dark:text-slate-50"
          >
            {match[0]}
          </mark>,
        );
        lastIndex = end;
      });
      if (lastIndex < testString.length) parts.push(testString.slice(lastIndex));
      highlighted = parts;
    }
  } catch (err) {
    error = err instanceof Error ? err.message : "Regex tidak valid.";
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_120px]">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
            Pattern
          </span>
          <Input
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            className="font-mono"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Flags</span>
          <Input value={flags} onChange={(e) => setFlags(e.target.value)} className="font-mono" />
        </label>
      </div>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
          Test String
        </span>
        <textarea
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
          rows={6}
          spellCheck={false}
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 font-mono text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        />
      </label>

      {error ? (
        <p className="text-center text-sm text-red-600 dark:text-red-400">{error}</p>
      ) : (
        <>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {matches.length} kecocokan ditemukan
          </p>
          <div className="whitespace-pre-wrap rounded-md border border-slate-200 bg-white p-3 font-mono text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
            {highlighted}
          </div>
          {matches.length > 0 && (
            <ul className="flex flex-col gap-1 text-sm text-slate-600 dark:text-slate-300">
              {matches.map((match, i) => (
                <li key={i}>
                  #{i + 1}: <code className="font-mono">{match[0]}</code> @ posisi {match.index}
                  {match.length > 1 ? ` — grup: ${JSON.stringify(match.slice(1))}` : ""}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
