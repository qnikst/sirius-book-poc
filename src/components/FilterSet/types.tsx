import { SymbolCodepoints } from "react-material-symbols";

// types.ts
export type Filter = {
  id: string;       // Internal unique identifier
  category: string; // Name of the category (used to search for properties and build request)
  value: string;    // The actual value of the filter
  label?: string;   // Optional label for better UI representation
};

export type FilterCategoryConfig = {
  category: string;
  icon: SymbolCodepoints;
  editorComponent: (
    value: string,
    onChange: (val: string) => void,
    onSave: () => void,
  ) => React.ReactNode;
};

export type FilterCategoresMap = { [key: string]: FilterCategoryConfig };

export type FilterObject = {
  filters: Filter[];
  filterConfig: FilterCategoresMap;
  updateFilter: (id: string, newValue: string) => void;
  addFilter: (category: string, value: string) => void;
  removeFilter: (id: string) => void;
};
