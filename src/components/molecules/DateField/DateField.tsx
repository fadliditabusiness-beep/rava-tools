import Input from "@/components/atoms/Input/Input";

export interface DateFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export default function DateField({ label, value, onChange }: DateFieldProps) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">{label}</span>
      <Input type="date" value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}
