import { Book } from "@/domain/books/types/Book";

export type MyBook = Book & {
  uuid: string;
  takenAt: Date;
};

export function isMyBook(book: Book): book is MyBook {
  return "uuid" in book && "takenAt" in book;
}
