import { createContext, ReactNode, useState } from "react";
import { FeedbackItem } from "../types";

export type FeedbackContextType = {
  feedbackMessages: FeedbackItem[];
  addMessage: (item: FeedbackItem) => void;
  filterMessages: (key: number) => void;
};

export const FeedbackContext = createContext<FeedbackContextType>(
  {} as FeedbackContextType,
);

export function FeedbackProvider({ children }: { children: ReactNode }) {
  const [feedbackMessages, setFeedbackMessages] = useState<FeedbackItem[]>([]);

  const addMessage = (item: FeedbackItem) => {
    setFeedbackMessages([...feedbackMessages, item]);
  };

  const filterMessages = (key: number) => {
    setFeedbackMessages(
      feedbackMessages.filter((value) => {
        value.key != key;
      }),
    );
  };

  return (
    <FeedbackContext.Provider
      value={{ feedbackMessages, addMessage, filterMessages }}
    >
      {children}
    </FeedbackContext.Provider>
  );
}
