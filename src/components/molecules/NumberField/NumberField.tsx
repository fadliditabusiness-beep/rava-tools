import Input from "@/components/atoms/Input/Input";

export interface NumberFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function NumberField({ label, value, onChange, placeholder }: NumberFieldProps) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">{label}</span>
      <Input
        type="number"
        inputMode="decimal"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
