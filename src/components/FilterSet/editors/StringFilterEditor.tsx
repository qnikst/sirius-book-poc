import { Input, InputProps } from "@telegram-apps/telegram-ui";
import { useRef, useEffect } from "react";

type StringFilterEditorProps = {
  value?: string;
  onChange: (val: string, label?: string) => void;
  onSave?: () => void;
} & Omit<InputProps, "value" | "onChange" | "onKeyDown">;

/**
 * Simple editor for the textual property inherits all
 * the functionality of the Input component.
 */
export default function StringFilterEditor({
  value = "",
  onChange,
  onSave,
  ...inputProps
}: StringFilterEditorProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 0);
    // inputRef.current?.focus();
  }, []);

  return (
    <Input
      ref={inputRef}
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" && onSave) {
          onSave();
        }
      }}
      {...inputProps}
    />
  );
}
