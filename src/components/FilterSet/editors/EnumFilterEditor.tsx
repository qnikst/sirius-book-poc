import { Select, SelectProps } from "@telegram-apps/telegram-ui";

type StringFilterEditorProps = {
  value?: string;
  onChange: (val: string, label?: string) => void;
  options?: { label: string; value: string }[];
  onSave?: () => void;
} & Omit<SelectProps, "value" | "onChange" | "children" >;

export default function StringFilterEditor({
  value = "",
  onChange,
  onSave,
  options = [],
  ...inputProps
}: StringFilterEditorProps) {
  return (
    <Select
      value={value}
      onChange={(e) => {
        onChange(e.target.value, options.find(option => option.value === e.target.value)?.label);
      }}
      {...inputProps}
      >
      {options.map((option) => (
        <option key={option.value} value={option.value} selected={option.value === value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
}