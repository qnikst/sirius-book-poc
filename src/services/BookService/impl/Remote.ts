import { BooksDataProvider } from "@/services/BookService/Interface";

/**
 * Implementation of the BookService that uses remote API calls.
 */
export const apiBooksDataProvider: BooksDataProvider = {
  fetchBooks() {
    // TODO: Implement the actual API call to fetch books
    throw new Error("fetchBooks method not implemented");
  },
  fetchMyBooks() {
    throw new Error("fetchMyBooks method not implemented");
  },
  returnMyBook() {
    throw new Error("returnMyBook method not implemented");
  },
  addToMyBooks() {
    throw new Error("addToMyBooks method not implemented");
  },
};
