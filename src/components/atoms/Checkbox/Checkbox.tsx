import type { InputHTMLAttributes } from "react";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
}

export default function Checkbox({ label, className, ...props }: CheckboxProps) {
  return (
    <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
      <input
        type="checkbox"
        className={["h-4 w-4 rounded border-slate-300 dark:border-slate-700", className ?? ""].join(" ")}
        {...props}
      />
      {label}
    </label>
  );
}
