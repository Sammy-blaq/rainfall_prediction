import React, { useState } from "react";
import { ChevronDown, Check } from "lucide-react";

/* ================= ROOT ================= */

export function Select({ value, onValueChange, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
      {children({
        open,
        setOpen,
        value,
        onValueChange,
      })}
    </div>
  );
}

/* ================= TRIGGER ================= */

export function SelectTrigger({ open, setOpen, children }) {
  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className="flex h-10 w-full items-center justify-between rounded-md border bg-background px-3 py-2 text-sm"
    >
      {children}
      <ChevronDown
        className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
      />
    </button>
  );
}

/* ================= VALUE ================= */

export function SelectValue({ value, placeholder }) {
  return (
    <span className="truncate">
      {value || <span className="text-muted-foreground">{placeholder}</span>}
    </span>
  );
}

/* ================= CONTENT ================= */

export function SelectContent({
  open,
  value,
  onValueChange,
  setOpen,
  children,
}) {
  if (!open) return null;

  return (
    <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover shadow-md">
      {children({
        currentValue: value,
        onValueChange,
        setOpen,
      })}
    </div>
  );
}

/* ================= ITEM ================= */

export function SelectItem({
  value,
  currentValue,
  onValueChange,
  setOpen,
  children,
}) {
  const selected = value === currentValue;

  return (
    <div
      onClick={() => {
        onValueChange(value);
        setOpen(false);
      }}
      className={`flex cursor-pointer items-center px-3 py-2 text-sm hover:bg-accent ${
        selected ? "bg-accent font-medium" : ""
      }`}
    >
      <span className="mr-2 h-4 w-4">
        {selected && <Check className="h-4 w-4" />}
      </span>
      {children}
    </div>
  );
}
