import { Book } from "@/domain/books/types";

export interface BookDTO {
  id: string;
  title: string;
  author: string;
  ageRating: string;
  subject: string;
  location: string;
}

export function fromBookDTO(dto: BookDTO): Book {
  return {
    id: dto.id,
    title: dto.title,
    author: dto.author,
    ageRating: dto.ageRating,
    subject: dto.subject,
    location: dto.location,
  };
}

export function toBookDTO(book: Book): BookDTO {
  return {
    id: book.id,
    title: book.title,
    author: book.author,
    ageRating: book.ageRating,
    subject: book.subject,
    location: book.location,
  };
}
