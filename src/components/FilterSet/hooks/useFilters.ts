import { useState } from "react";
import { Filter, FilterCategoresMap, FilterObject } from "../types";

/***
 * Hook that defines an object that is used in the FiterSet to
 * setup hooks between the component that can interpret the filters
 * and the UI components.
 *
 * It's expected that the caller will use `useFilters` function
 * and provide onChange callback to process filter updates.
 *
 * This function generate helpers functions to control the state
 * without direct access, that are required for FilterSet.
 */
export function useFilters(
  filterConfig: FilterCategoresMap,
  onChange: (filters: Filter[]) => void,
): FilterObject {
  const [filters, setFilters] = useState<Filter[]>([]);

  const setFiltersNotify = (filters: Filter[]) => {
    setFilters(filters);
    onChange(filters);
  };

  const addFilter = (category: string, value: string) => {
    const newFilter = { id: Date.now().toString(), category, value };
    setFiltersNotify([...filters, newFilter]);
  };

  const updateFilter = (id: string, newValue: string) => {
    setFiltersNotify(
      filters.map((f) => (f.id === id ? { ...f, value: newValue } : f)),
    );
  };

  const removeFilter = (id: string) => {
    setFilters((filters: Filter[]) => filters.filter((f) => f.id !== id));
    onChange(filters);
  };

  return {
    filters,
    filterConfig,
    addFilter,
    updateFilter,
    removeFilter,
  };
}
