import type { ButtonHTMLAttributes } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ className, type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={[
        "rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors",
        "hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300",
        className ?? "",
      ].join(" ")}
      {...props}
    />
  );
}
