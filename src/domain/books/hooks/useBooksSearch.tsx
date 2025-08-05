import { useBooksService } from "@/services/BookService/Context";
import { useEffect, useState } from "react";
import { Book, BookFilters } from "../types";

/**
 * [SCNR-1] Workflow and operations for searching the books
 */

/**
 * Types that provides an interface for the tables.
 */
export type UserBooksSearchType = {
  books: Book[];
  setFilters: (filters: BookFilters | null) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  loading: boolean;
};

export function useBooksSearch(): UserBooksSearchType {
  const booksService = useBooksService();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<BookFilters | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setBooks([]);
    void booksService
      .fetchBooks(currentPage, filters ? filters : {})
      .then(({ books, totalPages }) => {
        if (!isMounted) return;
        setBooks(books);
        setTotalPages(totalPages);
        setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [currentPage, filters, booksService]);

  return {
    books,
    setFilters,
    currentPage,
    setCurrentPage,
    totalPages,
    loading,
  };
}
