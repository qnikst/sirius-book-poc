import { type FC } from "react";
import { List, Divider } from "@telegram-apps/telegram-ui";
import { BooksFilter, BooksTable } from "@/components/BooksSection";
import { Page } from "@/components/Page.tsx";
import { useBooksSearch } from "@/domain/books/hooks/useBooksSearch";

export const FindBookPage: FC = () => {
  const {
    books,
    setFilters,
    currentPage,
    setCurrentPage,
    totalPages,
    loading,
  } = useBooksSearch();

  return (
    <Page>
      <List>
        <BooksFilter setFilters={setFilters} />
        <Divider />
        <BooksTable
          books={books ? books : []}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          loading={loading}
        />
      </List>
    </Page>
  );
};
