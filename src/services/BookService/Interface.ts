import { Book } from "@/domain/books/types/Book";
import { MyBook } from "@/domain/books/types/MyBook";
import { BookFilters } from "@/domain/books/types/BookFilters";

/**
 * And interface for the external data provider.
 *
 * It keeps all the methods that are used to fetch and manipulate data.
 */
export interface BooksDataProvider {
  fetchBooks(
    page: number,
    filters: BookFilters,
  ): Promise<{ books: Book[]; totalPages: number; currentPage: number }>;
  fetchMyBooks(): Promise<MyBook[]>;
  returnMyBook(uuid: string): Promise<MyBook[]>;
  addToMyBooks(uuid: string): Promise<MyBook | null>;
}
