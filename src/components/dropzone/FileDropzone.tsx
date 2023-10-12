"use client";

import { useCallback } from "react";
import { type DropzoneOptions, useDropzone } from "react-dropzone";

import { cn } from "~/lib/utils";
import { usePdfData } from "~/stores/usePdfData";

type Props = {
  className?: string;

  children: React.ReactNode;
};

export function FileDropzone({ children, className }: Props) {
  // bring over the hooks

  const setOriginalList = usePdfData((s) => s.setOriginalList);

  const onDropRaw: DropzoneOptions["onDrop"] = (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;

      if (typeof result !== "string") return;

      const base64String = result.split(",")[1];

      if (!base64String) return;

      setOriginalList(base64String);

      // process PDF and update global state
    };

    reader.readAsDataURL(file);
  };

  const onDrop = useCallback(onDropRaw, [setOriginalList]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    noDragEventsBubbling: true,
  });

  return (
    <div className={cn({ "ring-2 ring-primary": isDragActive }, className)}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />

        {children}
      </div>
    </div>
  );
}
