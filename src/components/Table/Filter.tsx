"use client";

import React from "react";

import { DebouncedInput } from "~/components/common/DebouncedInput";
import { SimpleSelect } from "~/components/common/SimpleSelect";

import type { Column, Table } from "@tanstack/react-table";

export function Filter<T>({
  column,
  table,
}: {
  column: Column<T, any>;
  table: Table<T>;
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = React.useMemo(
    () =>
      typeof firstValue === "number"
        ? []
        : Array.from(
            column.getFacetedUniqueValues().keys() as unknown as string[]
          ).sort(),
    [column.getFacetedUniqueValues()]
  );

  return typeof firstValue === "number" ? (
    <div>
      <div className="flex flex-col">
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={(columnFilterValue as [number, number])?.[0] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min ${
            column.getFacetedMinMaxValues()?.[0]
              ? `(${column.getFacetedMinMaxValues()?.[0] ?? ""})`
              : ""
          }`}
          className=" w-24 rounded border shadow"
        />
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={(columnFilterValue as [number, number])?.[1] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max ${
            column.getFacetedMinMaxValues()?.[1]
              ? `(${column.getFacetedMinMaxValues()?.[1] ?? ""})`
              : ""
          }`}
          className="w-24 rounded border shadow"
        />
      </div>
      <div className="h-1" />
    </div>
  ) : (
    <>
      <SimpleSelect
        onChange={(value) => column.setFilterValue(value)}
        value={columnFilterValue as string}
        options={sortedUniqueValues}
        shouldShowClear
      />

      <div className="h-1" />
    </>
  );
}
