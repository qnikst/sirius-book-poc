import { BooksDataProvider } from "@/services/BookService/Interface";
import { Book, MyBook } from "@/domain/books/types";
import { fromMyBookDTO, MyBookDTO } from "@/services/BookService/dto";
import mockBooks from "@/data/books.json";
import mockMyBooks from "@/data/my-books.json";
import mockQr from "@/data/known-qr.json";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Mock implementation of the BookService that uses local mock data.
 *
 * It tries to mimic some real server behavior so we can test our UI without it,
 * however it does not store any state.
 */
export class MockBooksDataProvider implements BooksDataProvider {
  private myBooks: MyBookDTO[] = [];

  constructor(initialBooks: MyBookDTO[] = []) {
    this.myBooks = initialBooks;
  }

  async fetchBooks(page: number, filters?: { message?: string }) {
    const mock: Book[] = mockBooks;
    const matchedBooks = mock.filter((book) => {
      if (filters && filters.message) {
        return (
          book.title.toLowerCase().includes(filters.message.toLowerCase()) ||
          book.author.toLowerCase().includes(filters.message.toLowerCase())
        );
      }
      return true;
    });

    const totalPages =
      Math.floor(matchedBooks.length / 5) +
      (matchedBooks.length % 5 > 0 ? 1 : 0);
    const currentPage = page > totalPages ? totalPages : page;
    const books = matchedBooks.slice((currentPage - 1) * 5, currentPage * 5);
    await delay(1300);
    return { books, totalPages, currentPage };
  }

  async fetchMyBooks() {
    console.log(new Error().stack);
    const myBooks = this.myBooks.map((dto) => fromMyBookDTO(dto));
    await delay(1300);
    return myBooks;
  }

  async returnMyBook(uuid: string): Promise<MyBook[]> {
    this.myBooks = this.myBooks.filter((book) => book.uuid !== uuid);
    await delay(1300);
    return this.myBooks.map((dto) => fromMyBookDTO(dto));
  }

  async addToMyBooks(uuid: string): Promise<MyBook | null> {
    const mock = Object.entries(mockQr).reduce(
      (acc: { [key: string]: MyBookDTO }, [key, value]) => {
        acc[key] = { ...value, uuid: key, takenAt: new Date().toISOString() };
        return acc;
      },
      {},
    );
    if (mock[uuid]) {
      this.myBooks.push(mock[uuid]);
      await delay(300);
      return fromMyBookDTO(mock[uuid]);
    }
    return null;
  }
}

export const mockBooksDataProvider = new MockBooksDataProvider(mockMyBooks);
