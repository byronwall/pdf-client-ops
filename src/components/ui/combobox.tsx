"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Icons } from "~/components/common/icons";
import { cn } from "~/lib/utils";

import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

type ComboboxProps = {
  options: string[];
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  className?: string;
  popoverContentClassName?: string;
  shouldShowClear?: boolean;
};

export function Combobox({
  onChange,
  value,
  options,
  className,
  popoverContentClassName,
  shouldShowClear,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const setValue = onChange;

  // TODO: the popover is hard to constrain width since it pops out -- consider JS to measure

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("flex w-full justify-between text-left ", className)}
          title={value ? value : undefined}
        >
          <span className="shrink-1 w-10 flex-1 truncate">
            {value ? value : <span className="text-gray-400">Select...</span>}
          </span>
          <div className="flex shrink-0 items-center">
            {shouldShowClear && value && (
              <Button
                size="sm"
                variant="ghost"
                className="p-0 text-red-800 opacity-50  hover:opacity-100"
                onClick={(evt) => {
                  evt.stopPropagation();
                  setValue(undefined);
                }}
              >
                <Icons.close className="h-4 w-4" />
              </Button>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn("max-w-xl p-0", popoverContentClassName)}
        align="start"
      >
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandEmpty>No option found.</CommandEmpty>
          <CommandGroup className="max-h-60 overflow-y-auto">
            {options.map((option) => (
              <CommandItem
                key={option}
                onSelect={(currentValue) => {
                  setValue(
                    // goofyness required since cmdk forces value to lowercase
                    currentValue === value ? undefined : option
                  );
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option ? "opacity-100" : "opacity-0"
                  )}
                />
                <span className="shrink-1 w-10 flex-1 truncate" title={option}>
                  {option}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
