"use client";

import { format } from "date-fns";
import { isEqual } from "lodash-es";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";
import { useEffect } from "react";
import { useInput } from "react-day-picker";
import { usePrevious } from "react-use";

import { cn } from "~/lib/utils";

import { Button } from "./button";
import { Calendar } from "./calendar";
import { Input } from "./input";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

type DatePickerProps = {
  value: Date | undefined | null;
  onChange: (value: Date | undefined) => void;
};

export function DatePicker({ value, onChange }: DatePickerProps) {
  const date = value;
  const setDate = onChange;

  const formatString = "MM/dd/yyyy";

  const { inputProps, dayPickerProps, setSelected } = useInput({
    defaultSelected: date ?? undefined,
    format: formatString,
    required: true,
  });

  const prevDate = usePrevious(date);

  useEffect(() => {
    const dateChanged = !isEqual(date, prevDate);

    if (dateChanged) {
      setSelected(date ?? undefined);
    }
  }, [date, prevDate, setSelected]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, formatString) : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="flex flex-col gap-2">
          <Input {...inputProps} />

          <Calendar
            mode="single"
            selected={date ?? undefined}
            onSelect={setDate}
            initialFocus
            {...dayPickerProps}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
