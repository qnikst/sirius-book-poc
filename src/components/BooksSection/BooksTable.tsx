import {
  Section,
  Pagination,
  Placeholder,
  Spinner,
} from "@telegram-apps/telegram-ui";
import { Book, MyBook } from "@/domain/books/types";
import { BookCell } from "./BooksCell";
import { BookAction } from "./BookAction";

type BooksTableProps<TBook extends Book | MyBook> = {
  books: TBook[];
  totalPages: number;
  currentPage: number;
  loading: boolean;
  onPageChange?: (page: number) => void;
  actions?: (book: Book) => BookAction[];
};

/**
 * Pure table that displays books and bookeep representation rules
 *
 * @param param0
 * @returns
 */
export function BooksTable<TBook extends Book | MyBook>({
  books,
  totalPages,
  currentPage,
  loading,
  onPageChange = () => {},
  actions = () => [],
}: BooksTableProps<TBook>) {
  return (
    <Section>
      {loading && (
        <Placeholder title="loading..">
          <Spinner size="l" />
        </Placeholder>
      )}
      {books && books.map((book) => <BookCell book={book} actions={actions} />)}
      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(_, page) => onPageChange(page)}
        />
      )}
    </Section>
  );
}
