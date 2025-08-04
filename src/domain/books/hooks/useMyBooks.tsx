import { useBooksService } from "@/services/BookService/Context";
import { BooksDataProvider } from "@/services/BookService/Interface";
import { MyBook } from "@/domain/books/types/MyBook";
import { createContext, useContext, useEffect, useState } from "react";

import { ReactNode } from "react";

/**
 * Context for keeping track of the user's books.
 *
 * It's needed because the information about the books is used across multiple components
 * and interfaces that are not related to each other.
 *
 * The context provives three main properties:
 * - `myBooks`: the list of books that the user has.
 * - `setMyBooks`: a function to update the list of books.
 * - `loading`: a boolean indicating whether the data is being loaded.
 *
 */

export type MyBooksContextType = {
  myBooks: MyBook[] | null;
  setMyBooks: (books: MyBook[]) => void;
  loading: boolean;
};

const MyBooksContext = createContext<MyBooksContextType | null>(null);

export function MyBooksProvider({ children }: { children: ReactNode }) {
  const [myBooks, setMyBooks] = useState<MyBook[] | null>(null);
  const [loading, setLoading] = useState(true);

  const booksService: BooksDataProvider = useBooksService();

  useEffect(() => {
    if (!booksService) {
      return;
    }

    setLoading(true);

    void booksService.fetchMyBooks().then((books) => {
      setMyBooks(books);
      setLoading(false);
    });
  }, [booksService]);

  return (
    <MyBooksContext.Provider value={{ myBooks, setMyBooks, loading }}>
      {children}
    </MyBooksContext.Provider>
  );
}

export function useMyBooks() {
  const ctx = useContext(MyBooksContext);
  if (!ctx) throw new Error("useMyBooks must be used inside MyBooksProvider");
  const { myBooks, setMyBooks, loading } = ctx;

  const booksService = useBooksService();

  const returnBookByUuid = async (bookUuid: string): Promise<MyBook[]> => {
    const newBooks = await booksService.returnMyBook(bookUuid);
    setMyBooks(newBooks);
    return newBooks;
  };

  const appendToMyBooks = async (qr: string): Promise<MyBook | null> => {
    const book = await booksService.addToMyBooks(qr);
    if (book) {
      setMyBooks(myBooks ? [...myBooks, book] : [book]);
    }
    return book;
  };

  return {
    myBooks,
    setMyBooks,
    loading,
    actions: { returnBookByUuid, appendToMyBooks },
  };
}
