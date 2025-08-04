import { List, Section, Divider } from "@telegram-apps/telegram-ui";
import { type FC } from "react";
import {
  BooksTable,
  useMyBooks,
} from "@/components/BooksSection";

import { Page } from "@/components/Page.tsx";
import { isMyBook } from "@/domain/books/types/MyBook";
import { useFeedback } from "@/components/feedback/context/useFeedback";

export const MyBooksPage: FC = () => {
  const { myBooks, loading, actions: {returnBookByUuid}} = useMyBooks();
  const feedback = useFeedback();

  return (
    <Page>
      <List>
        <Section>
          <Section.Header>My Books</Section.Header>
        </Section>
        <Divider />
        <BooksTable
          books={myBooks ? myBooks : []}
          totalPages={1}
          currentPage={1}
          loading={loading}
          actions={(book) =>
            isMyBook(book)
              ? [
                  {
                    label: "Return",
                    icon: "assignment_returned",
                    action: async () => {
                      await returnBookByUuid(book.uuid);
                      feedback.notifySuccess(
                            `"${book.title}" was marked as returned`,
                            "Do not forget to return the book!",
                          );
                      }
                  },
                ]
              : []
          }
        />
      </List>
    </Page>
  );
};
