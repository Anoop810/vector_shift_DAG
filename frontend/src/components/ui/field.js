import React from "react";
import { cn } from "../../lib/utils";

export function Field({ className, ...props }) {
  return (
    <div role="group" className={cn("flex flex-col gap-1", className)} {...props} />
  );
}

export function FieldLabel({ className, ...props }) {
  return (
    <label
      className={cn("text-xs font-medium leading-none text-muted-foreground", className)}
      {...props}
    />
  );
}

export function FieldDescription({ className, ...props }) {
  return (
    <p
      className={cn("text-[11px] leading-snug text-muted-foreground", className)}
      {...props}
    />
  );
}
