import { useNavigate } from "react-router-dom";
import {
  hideBackButton,
  onBackButtonClick,
  showBackButton,
} from "@telegram-apps/sdk-react";
import { Section } from "@telegram-apps/telegram-ui";
import { type PropsWithChildren, useEffect } from "react";
import { NavBar } from "./Navbar";
import { useFeedbackHost } from "./feedback/context/useFeedbackHost";

export function Page({
  children,
  back = true,
}: PropsWithChildren<{
  /**
   * True if it is allowed to go back from this page.
   */
  back?: boolean;
}>) {
  const navigate = useNavigate();

  const feedback = useFeedbackHost();

  useEffect(() => {
    if (back) {
      showBackButton();
      return onBackButtonClick(() => {
        navigate(-1);
      });
    }
    hideBackButton();
  }, [back]);

  return (
    <Section style={{ marginTop: 80 }}>
      {children}
      {feedback}
      <NavBar />
    </Section>
  );
}
