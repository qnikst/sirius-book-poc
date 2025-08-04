import { useRef, useContext } from "react";
import { FeedbackContext } from "./context";
import { FeedbackMessage } from "../types";

export type Feedback = {
  notifySuccess: (message: string, details?: string) => number;
  notifyError: (message: string | Error, details?: string) => number;
};

export function useFeedback() {
  const ctx = useContext(FeedbackContext);
  if (!ctx) throw new Error("useMyBooks must be used inside MyBooksProvider");

  const counterRef = useRef(0);

  const getNextId = () => {
    counterRef.current += 1;
    return counterRef.current;
  };

  const addMessage = (feedbackMessage: FeedbackMessage) => {
    const key = getNextId();
    ctx.addMessage({ key: key, item: feedbackMessage });
    return key;
  };

  const notifyError = (message: string, details?: string) => {
    return addMessage({ message, details, icon: "close" });
  };
  const notifySuccess = (message: string, details?: string) => {
    return addMessage({ message, details, icon: "check" });
  };
  return { notifyError, notifySuccess };
}
