"use client";

import { Button } from "~/components/ui/button";
import { Combobox } from "~/components/ui/combobox";

export type SelectPropsNullable = {
  value?: string;
  onChange: (value: string | undefined) => void;
  shouldShowClear: true;
};

export type SelectPropsNotNull = {
  value: string;
  onChange: (value: string) => void;
  shouldShowClear: false;
};

export type SimpleSelectProps = {
  options?: string[];
  shouldShowPlus?: boolean;
  className?: string;
} & (SelectPropsNullable | SelectPropsNotNull);

export function SimpleSelect(props: SimpleSelectProps) {
  const { options = [], value, shouldShowPlus = false, className } = props;

  const shouldShowClear = "shouldShowClear" in props && props.shouldShowClear;

  const handlePlusClick = () => {
    // prompt for new value and then send out

    const newValue = prompt("New value");

    if (!newValue) {
      return;
    }

    if (!props.onChange) {
      return;
    }

    props.onChange(newValue);
  };

  let selectComp: React.ReactNode;

  if (shouldShowClear) {
    const onChange = props.onChange;

    selectComp = (
      <Combobox
        value={value}
        options={options}
        onChange={(o) => {
          if (o) {
            onChange(o);
          } else {
            onChange(undefined);
          }
        }}
        className={className}
        shouldShowClear={shouldShowClear}
      />
    );
  } else {
    const onChange = props.onChange;
    selectComp = (
      <Combobox
        value={value}
        options={options}
        onChange={(o) => {
          if (o) {
            onChange(o);
          }
        }}
        className={className}
        shouldShowClear={shouldShowClear}
      />
    );
  }

  const plusComp = (
    <Button size="sm" variant="secondary" onClick={handlePlusClick}>
      +
    </Button>
  );

  return shouldShowPlus ? (
    <div className="flex items-center gap-2">
      <div className="flex-1">{selectComp}</div>

      {shouldShowPlus && plusComp}
    </div>
  ) : (
    selectComp
  );
}
