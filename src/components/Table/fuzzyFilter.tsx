import { rankItem } from "@tanstack/match-sorter-utils";

import type { FilterMeta, Row } from "@tanstack/react-table";

export function fuzzyFilter<TData>(
  row: Row<TData>,
  columnId: string,
  value: any,
  addMeta: (meta: FilterMeta) => void
) {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value as string);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
}
