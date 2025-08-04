import { Snackbar } from "../Snackbar";
import { useContext } from "react";
import { FeedbackContext } from "./context";

export function useFeedbackHost() {
  const ctx = useContext(FeedbackContext);
  if (!ctx) throw new Error("useMyBooks must be used inside MyBooksProvider");
  return ctx.feedbackMessages.map(({ key, item }) => (
    <Snackbar message={item} onClose={() => ctx.filterMessages(key)} />
  ));
}
