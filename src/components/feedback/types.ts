import { ReactNode } from "react";
import { SymbolCodepoints } from "react-material-symbols";

export interface FeedbackMessage {
  message: ReactNode;
  details?: string;
  icon?: SymbolCodepoints;
  duration?: number;
}

export type FeedbackItem = { key: number; item: FeedbackMessage };
