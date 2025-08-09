// FilterEditor.tsx
import { Modal, InlineButtons, IconButton } from "@telegram-apps/telegram-ui";
import { MaterialSymbol } from "react-material-symbols";
import { useState } from "react";

type FilterEditorProps = {
  open: boolean;
  initialValue?: string;
  onOpenChange: (open: boolean) => void;
  onSave: (value: string) => void;
  onRemove: () => void;
  children: (
    value: string,
    onChange: (val: string) => void,
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

      {children(value, setValue, () => onSave(value))}

      <InlineButtons mode="bezeled">
        <InlineButtons.Item text="Remove" onClick={() => onRemove()} />
        <InlineButtons.Item text="Save" onClick={() => onSave(value)} />
      </InlineButtons>
    </Modal>
  );
}
