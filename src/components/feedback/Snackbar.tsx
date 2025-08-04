import { Snackbar as TgSnackbar } from "@telegram-apps/telegram-ui";
import { FeedbackMessage } from "./types";
import { MaterialSymbol } from "react-material-symbols";

export function Snackbar({
  message,
  onClose,
}: {
  message: FeedbackMessage;
  onClose: () => void;
}) {
  return (
    <TgSnackbar
      before={message.icon && <MaterialSymbol icon={message.icon} size={24} />}
      after={<MaterialSymbol icon='close' size={24} />}
      duration={message.duration}
      description={message.details}
      onClose={onClose}
    >
      {message.message}
    </TgSnackbar>
  );
}
