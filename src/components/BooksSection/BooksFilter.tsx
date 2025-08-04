import { useState } from "react";
import { Section, Input } from "@telegram-apps/telegram-ui";
import { BookFilters } from "@/domain/books/types";

interface BooksFilterProps {
  setFilters: (filters: BookFilters) => void;
}

/**
 * BooksFilter is a component that provides a fitering capabilities and
 * subcomponents for configuring constraints for the books section.
 *
 *
 * @returns Filter component for the books section.
 */
export function BooksFilter({ setFilters }: BooksFilterProps) {
  const [filterValue, setFilterValue] = useState("");

  const handleCommit = () => {
    setFilters({
      message: filterValue,
    });
  };

  return (
    <Section header="Find the book">
      <Input
        header="Title or author"
        placeholder="Input title or author.."
        onBlur={handleCommit}
        onChange={(e) => setFilterValue(e.target.value)}
        onKeyDown={(e) => {
          console.log("OnKeyDown:", e.key);
          if (e.key === "Enter") {
            e.currentTarget.blur();
          }
        }}
      />
    </Section>
  );
}
