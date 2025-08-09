# FilterSet Module

`FilterSet` is a dynamic, configurable React component for building and editing sets of filters. It supports multiple filter types, dynamic addition/removal, and custom editors and visualizations.

## Structure

- **FilterSet.tsx**: Main component. Renders filter chips, add button, and manages modal editors. Accepts a configuration describing supported filter types.
- **FilterEditor.tsx**: Generic modal wrapper for filter editors, provides Save/Cancel actions.
- **StringFilterEditor.tsx**: Editor for string filters.
- **FilterChip.tsx**: Visualizes a filter as a chip with remove and edit actions.
- **types.tsx**: Type definitions for filters and filter types.

## Filter Model

```
type FilterType = 'enum' | 'string';

type Filter = {
    id: string;
    category: string;
    value: string;
    type: FilterType;
    options?: string[]; // only for 'enum'
};
```

## FilterSet Configuration

`FilterSet` receives a `filterConfig` prop:

```
import { SymbolCodepoints } from 'react-material-symbols';

type FilterConfig = {
    type: string; // filter type, e.g. 'string', 'enum'
    title: string; // display name for selection
    icon: SymbolCodepoints; // icon for this filter type
    editorComponent: React.ComponentType<any>; // editor to use in modal
    visualize: (val: any) => string; // function to render value as string
};
```

Example usage:

```
import StringFilterEditor from "./StringFilterEditor";

const filterConfig = {
  title: {
    type: "string",
    title: "Title",
    icon: "title", // any SymbolCodepoints value
    editorComponent: StringFilterEditor, // accepts initialValue, onChange, and any InputProps
    visualize: (val) => val,
  },
  // ...other filter types
};

<FilterSet initialFilters={[]} filterConfig={filterConfig} />;
```

## Features

- Add new filters using the + button (configurable types)
- Edit and remove filters
- Each filter type can have a custom editor and visualization
- All filter state is managed internally

## Extending

- Add new filter types by extending `filterConfig` with new objects, each providing a `type`, `title`, `icon`, and an `editorComponent` (React component that accepts `initialValue`, `onChange`, and any extra props).
- Create new editor components for complex filter types (see `StringFilterEditor.tsx` as a template).
