// FilterChip.tsx
import { MaterialSymbol } from "react-material-symbols";
import { Chip, IconButton } from "@telegram-apps/telegram-ui";
import { Filter } from "./types";

export default function FilterChip({
  filter,
  onClick,
  onRemove,
}: {
  filter: Filter;
  onClick: () => void;
  onRemove: () => void;
}) {
  return (
    <Chip
      mode="elevated"
      after={
        <IconButton mode="plain" onClick={onRemove}>
          <MaterialSymbol icon="close" size={16} />
        </IconButton>
      }
      onClick={onClick}
    >
      {`${filter.category}: ${filter.value}`}
    </Chip>
  );
}
