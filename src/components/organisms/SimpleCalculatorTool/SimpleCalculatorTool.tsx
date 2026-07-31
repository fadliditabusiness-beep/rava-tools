import { useMemo, useState } from "react";
import NumberField from "@/components/molecules/NumberField/NumberField";
import StatTile from "@/components/molecules/StatTile/StatTile";

export interface CalcFieldSpec {
  key: string;
  label: string;
  placeholder?: string;
  defaultValue?: string;
}

export interface CalcResultSpec {
  label: string;
  value: string;
}

export interface SimpleCalculatorToolProps {
  fields: CalcFieldSpec[];
  compute: (values: Record<string, number>) => CalcResultSpec[] | null;
  note?: string;
}

export default function SimpleCalculatorTool({ fields, compute, note }: SimpleCalculatorToolProps) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(fields.map((f) => [f.key, f.defaultValue ?? ""])),
  );

  const results = useMemo(() => {
    const numeric: Record<string, number> = {};
    for (const field of fields) {
      const n = Number(values[field.key]);
      if (values[field.key] === "" || !Number.isFinite(n)) return null;
      numeric[field.key] = n;
    }
    return compute(numeric);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values, compute]);

  return (
    <div className="flex flex-col gap-4">
      {note && <p className="text-xs text-slate-500 dark:text-slate-400">{note}</p>}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <NumberField
            key={field.key}
            label={field.label}
            value={values[field.key]}
            onChange={(value) => setValues((prev) => ({ ...prev, [field.key]: value }))}
            placeholder={field.placeholder}
          />
        ))}
      </div>

      {results && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {results.map((result) => (
            <StatTile key={result.label} label={result.label} value={result.value} />
          ))}
        </div>
      )}
    </div>
  );
}
