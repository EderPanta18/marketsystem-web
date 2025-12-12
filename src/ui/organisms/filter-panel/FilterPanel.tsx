// ui/organisms/filter-panel/FilterPanel.tsx

"use client";

import { OptionGroupFilter } from "@/ui/molecules";
import type { FilterPanelProps } from "./FilterPanel.types";
import {
  getPanelClasses,
  getPanelStyle,
  getGroupsContainerClasses,
} from "./FilterPanel.helpers";

export const FilterPanel: React.FC<FilterPanelProps> = ({
  title = "Filtrar por:",
  groups,
  onGroupChange,
  className,
  width = "full",
}) => {
  const handleGroupChange = (groupId: string, values: string[]) => {
    onGroupChange(groupId, values);
  };

  return (
    <section
      className={getPanelClasses(className, width)}
      style={getPanelStyle(width)}
    >
      {title && (
        <h3 className="text-lg font-semibold text-primary-700">{title}</h3>
      )}

      {/* Contenedor de grupos con scroll vertical */}
      <div className={getGroupsContainerClasses()}>
        {groups.map((group) => (
          <OptionGroupFilter
            key={group.id}
            label={group.label}
            options={group.options}
            values={group.values}
            multiple={group.multiple}
            disabled={group.disabled}
            width={group.width ?? "full"}
            onChange={(values) => handleGroupChange(group.id, values)}
          />
        ))}
      </div>
    </section>
  );
};

export default FilterPanel;
