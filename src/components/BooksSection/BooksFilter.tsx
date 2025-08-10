import { useState } from "react";
import { Section, Input } from "@telegram-apps/telegram-ui";
import { BookFilters } from "@/domain/books/types";
import {
  EnumFilterEditor,
  FilterSet,
  StringFilterEditor,
  useFilters,
} from "@/components/FilterSet";
import { MaterialSymbol, SymbolCodepoints } from "react-material-symbols";
import { Filter } from "@/components/FilterSet/types";

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
  const myFilterConfig = {
    title: {
      category: "Filter by title",
      icon: "book" as SymbolCodepoints,
      // TODO: this is pretty ugly when defining components
      // I'd like to automatically pass props down the line
      // to the component, and this looks an additional boilerplate.
      editorComponent: (
        value: string,
        onChange: (val: string) => void,
        onSave: () => void,
      ) => (
        <StringFilterEditor
          before={<MaterialSymbol icon="book" size={24} />}
          value={value}
          onChange={onChange}
          header="Find by title"
          placeholder="Input title..."
          onSave={onSave}
        />
      ),
    },
    author: {
      category: "Filter by author",
      icon: "person" as SymbolCodepoints,
      editorComponent: (
        value: string,
        onChange: (val: string) => void,
        onSave: () => void,
      ) => (
        <Section header="Find by author">
          <StringFilterEditor
            value={value}
            before={<MaterialSymbol icon="person" size={24} />}
            onChange={onChange}
            header="Find by author"
            placeholder="Input author..."
            onSave={onSave}
          />
        </Section>
      ),
    },
    location: {
      category: "Find by location",
      icon: "location_on" as SymbolCodepoints,
      editorComponent: (
        value: string,
        onChange: (val: string, label?: string) => void,
        onSave: () => void,
      ) => (
        <Section header="Find by location">
          <EnumFilterEditor
            value={value}
            before={<MaterialSymbol icon="location_on" size={24} />}
            options={[{ label: "Location #1", value: "loc1" }
                     ,{ label: "Location #2", value: "loc2" }
                     ]}
            onChange={onChange}
            header="Find by location"
            onSave={onSave}
          />
        </Section>
      ),
    }
  };

  const [filterValue, setFilterValue] = useState("");

  const setBookFilters = (currentFilters: Filter[]) => {
    const authors = currentFilters
      .filter((f) => f.category === "author")
      .map((f) => f.value);
    const titles = currentFilters
      .filter((f) => f.category === "title")
      .map((f) => f.value);
    setFilters({
      message: filterValue,
      authors: authors,
      titles: titles,
    });
  };

  const filters = useFilters(myFilterConfig, setBookFilters);

  const handleCommit = () => {
    setBookFilters(filters.filters);
  };

  return (
    <Section header="Find the book">
      <Input
        header="Title or author"
        placeholder="Input title or author.."
        onBlur={handleCommit}
        onChange={(e) => setFilterValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.currentTarget.blur();
          }
        }}
      />
      <FilterSet filters={filters} />
    </Section>
  );
}
