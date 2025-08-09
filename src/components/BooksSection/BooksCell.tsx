import { MaterialSymbol } from "react-material-symbols";
import { Button, Cell } from "@telegram-apps/telegram-ui";
import { Book } from "@/domain/books/types/Book";
import { BookAction } from "./BookAction";
import { useState } from "react";

type BookCellProps = {
  book: Book;
  actions?: (book: Book) => BookAction[];
};

/**
 * Cell component to display book information.
 *
 * @param book - The book to display.
 * @param actions - Optional actions to display in the cell.
 * @returns
 */
export function BookCell({ book, actions = () => [] }: BookCellProps) {
  const [loading, setLoading] = useState(false);

  return (
    <Cell
      key={book.id}
      subhead={book.author}
      description={`${book.ageRating}, ${book.subject}, ${book.location}`}
      after={
        actions &&
        actions(book).map((action) => (
          <Button
            mode="plain"
            size="s"
            loading={loading}
            onClick={async () => {
              setLoading(true);
              await action.action();
              setLoading(false);
            }}
            before={
              action.icon && <MaterialSymbol icon={action.icon} size={24} />
            }
          >
            {action.label}
          </Button>
        ))
      }
    >
      {book.title}
    </Cell>
  );
}
