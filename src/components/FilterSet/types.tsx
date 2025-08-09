import { SymbolCodepoints } from "react-material-symbols";

// types.ts
export type Filter = {
  id: string;
  category: string;
  value: string;
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
