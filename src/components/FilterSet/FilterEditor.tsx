// FilterEditor.tsx
import { Modal, InlineButtons, IconButton } from "@telegram-apps/telegram-ui";
import { MaterialSymbol } from "react-material-symbols";
import { useState } from "react";

type FilterEditorProps = {
  open: boolean;
  initialValue?: string;
  onOpenChange: (open: boolean) => void;
  onSave: (value: string, label?: string) => void;
  onRemove: () => void;
  children: (
    value: string,
    onChange: (val: string, label?: string) => void,
    onSave: () => void,
  ) => React.ReactNode;
};

/**
 * Internal component that sets the workflow for editing filters.
 */
export default function FilterEditor({
  open,
  onOpenChange,
  initialValue,
  onSave,
  onRemove,
  children,
}: FilterEditorProps) {
  const [value, setValue] = useState(initialValue || "");
  const [label, setLabel] = useState<string | null>(null);

  const commit = () => { onSave(value, label ?? undefined) };

  return (
    <Modal onOpenChange={onOpenChange} open={open}>
      <Modal.Header
        after={
          <Modal.Close>
            <IconButton mode="plain">
              <MaterialSymbol icon="close" size={24} />
            </IconButton>
          </Modal.Close>
        }
      ></Modal.Header>

      {children(value, (value,label) => {
        setValue(value);
        label && setLabel(label);
      }, commit)}

      <InlineButtons mode="bezeled">
        <InlineButtons.Item text="Remove" onClick={() => onRemove()} />
        <InlineButtons.Item text="Save" onClick={commit} />
      </InlineButtons>
    </Modal>
  );
}
