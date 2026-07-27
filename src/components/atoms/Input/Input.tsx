import type { InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={[
        "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800",
        "focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
        "dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100",
        className ?? "",
      ].join(" ")}
      {...props}
    />
  );
}
