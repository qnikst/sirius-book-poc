import { MyBook } from "@/domain/books/types";
import { BookDTO, toBookDTO, fromBookDTO } from "./BookDTO";

export type MyBookDTO = BookDTO & {
  uuid: string;
  takenAt: string; // ISO date string
};

export function fromMyBookDTO(dto: MyBookDTO): MyBook {
  const takenAtParsed = new Date(dto.takenAt);
  if (Number.isNaN(takenAtParsed.getTime())) {
    throw new Error("Invalid date format for takenAt");
  }
  return {
    ...fromBookDTO(dto),
    uuid: dto.uuid,
    takenAt: takenAtParsed,
  };
}

export function toMyBookDTO(book: MyBook): MyBookDTO {
  return {
    ...toBookDTO(book),
    uuid: book.uuid,
    takenAt: book.takenAt.toISOString(),
  };
}
