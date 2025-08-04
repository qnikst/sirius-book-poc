import { SymbolCodepoints } from "react-material-symbols";

/**
 * Action to perform on the book.
 *
 * @property icon - Icon to display in the action button.
 * @property label - Text to display in the action button.
 * @property action - Function to call when the action is performed,
 *   book itself is captured in the closure.
 */
export type BookAction = {
  icon?: SymbolCodepoints;
  label: string;
  action: () => Promise<void>;
};
