import {
  List,
  Placeholder,
  Section,
  Button,
  Divider,
  Input,
} from "@telegram-apps/telegram-ui";

import { type FC } from "react";
import { Page } from "@/components/Page.tsx";
import { MaterialSymbol } from "react-material-symbols";
import { qrScanner } from "@telegram-apps/sdk-react";
import { useFeedback } from "@/components/feedback/context/useFeedback";
import { useMyBooks } from "@/domain/books/hooks/useMyBooks";

export const TakeBookPage: FC = () => {
  const { actions: {appendToMyBooks} } = useMyBooks();
  const feedback = useFeedback();

  const scanQr = async () => {
    if (qrScanner.open.isAvailable()) {
      qrScanner.isOpened(); // false
      const promise = qrScanner.open({
        text: "Scan the QR",
        async onCaptured(qr: string) {
          const book = await appendToMyBooks(qr);
          if (book) {
            void feedback.notifySuccess(`"{book.title}" was taken`);
            qrScanner.close();
          }
        },
      });
      qrScanner.isOpened(); // true
      await promise;
    } else {
      alert("use telegram please");
    }
  };

  return (
    <Page>
      <List>
        <Section>
          {" "}
          <Section.Header>Take a book</Section.Header>{" "}
        </Section>
        <Placeholder
          description="In order to take a book, scan its QR code with your Telegram app or type ID."
          action={
            <Button
              size="l"
              stretched
              before={<MaterialSymbol icon="qr_code" size={24} fill />}
              onClick={void scanQr}
            >
              Scan QR
            </Button>
          }
        ></Placeholder>
        <Divider />
        <Placeholder
          header="Or enter book ID"
          action={<Input placeholder="Book ID" />}
        ></Placeholder>
      </List>
    </Page>
  );
};
