// FilterSet.tsx

import { useState } from "react";
import { FilterObject } from "./types";
import FilterEditor from "./FilterEditor";
import {
  Modal,
  List,
  ButtonCell,
  IconButton,
  Cell,
} from "@telegram-apps/telegram-ui";
import { MaterialSymbol } from "react-material-symbols";

type FilterSetProps = {
  filters: FilterObject;
};

/**
 * Wrapper for the interface component that allows to configure list
 * of the filters to be used. The component is dynamic and does not
 * depend on the concrete list of the filters as long as they can be
 * serialized into a string. Caller can use any of the `FilterSet/editors/*`
 * editors or create their own.
 *
 * It's expected that the caller will use `useFilters` function
 * to create helper filters object
 *
 * @param filters FilterObject - filter control object to be userd.
 * @returns
 */
export default function FilterSet({ filters: filtersConfig }: FilterSetProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [inAddingMode, setInAddingMode] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filters = filtersConfig.filters;
  const config = filtersConfig.filterConfig;

  const editingFilter = filters.find((f) => f.id === editingId);

  return (
    <>
      {filters.map((filter) => {
        return (
          <ButtonCell
            onClick={() => setEditingId(filter.id)}
            before={
              <IconButton mode="plain">
                <MaterialSymbol
                  icon={config[filter.category].icon}
                  size={28}
                />{" "}
              </IconButton>
            }
          >
            {filter.label || filter.value}
          </ButtonCell>
        );
      })}

      <ButtonCell
        onClick={() => setInAddingMode(true)}
        before={
          <IconButton mode="plain">
            <MaterialSymbol icon="add_circle" size={28} />{" "}
          </IconButton>
        }
      >
        Add filter
      </ButtonCell>

      {/* Modal for adding filter: select type */}
      <Modal
        open={inAddingMode && selectedType === null}
        onOpenChange={(state) => setInAddingMode(state || !!selectedType)}
      >
        <Modal.Header>Filter books</Modal.Header>
        <List>
          {Object.entries(config).map(([key, cfg]) => (
            <Cell
              key={key}
              before={<MaterialSymbol icon={cfg.icon} size={28} />}
              onClick={() => {
                setSelectedType(key);
              }}
            >
              {cfg.category}
            </Cell>
          ))}
        </List>
      </Modal>

      {inAddingMode &&
        !!selectedType &&
        config[selectedType].editorComponent && (
          <FilterEditor
            open={inAddingMode && !!selectedType}
            onOpenChange={(open) => {
              if (!open) {
                setSelectedType(null);
                setInAddingMode(false);
              }
            }}
            initialValue={""}
            onRemove={() => {
              setSelectedType(null);
              setInAddingMode(false);
            }}
            onSave={(val) => {
              setSelectedType(null);
              setInAddingMode(false);
              filtersConfig.addFilter(selectedType, val);
            }}
          >
            {(value, onChange, onSave) =>
              filtersConfig.filterConfig[selectedType].editorComponent(
                value,
                onChange,
                onSave,
              )
            }
          </FilterEditor>
        )}

      {/* Modal for editing filter */}
      {!inAddingMode && editingFilter && editingId && (
        <FilterEditor
          open={!!editingId}
          initialValue={editingFilter.value}
          onOpenChange={(open) => !open && setEditingId(null)}
          onRemove={() => {
            setEditingId(null);
            filtersConfig.removeFilter(editingId);
          }}
          onSave={(val) => {
            setEditingId(null);
            filtersConfig.updateFilter(editingId, val);
          }}
        >
          {(value, onChange, onSave) =>
            config[editingFilter.category].editorComponent(
              value,
              onChange,
              onSave,
            )
          }
        </FilterEditor>
      )}
    </>
  );
}
