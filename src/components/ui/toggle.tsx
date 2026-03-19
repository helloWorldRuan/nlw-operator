"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ToggleProps {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  disabled?: boolean;
  className?: string;
}

function Toggle({
  pressed: controlledPressed,
  defaultPressed = false,
  onPressedChange,
  disabled = false,
  className,
}: ToggleProps) {
  const [internalPressed, setInternalPressed] = useState(defaultPressed);

  const isControlled = controlledPressed !== undefined;
  const pressed = isControlled ? controlledPressed : internalPressed;

  const handleClick = () => {
    if (disabled) return;

    const nextPressed = !pressed;

    if (!isControlled) {
      setInternalPressed(nextPressed);
    }

    onPressedChange?.(nextPressed);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={pressed}
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        "inline-flex items-center gap-3 font-mono transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "focus-visible:ring-offset-bg-page",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "cursor-pointer",
        className,
      )}
    >
      {/* Track */}
      <span
        className={cn(
          "relative flex h-[22px] w-[40px] items-center rounded-full p-[3px] transition-colors duration-200",
          pressed ? "bg-accent-green" : "bg-border",
        )}
      >
        {/* Knob */}
        <span
          className={cn(
            "block h-4 w-4 rounded-full transition-transform duration-200 ease-out",
            pressed ? "translate-x-[18px]" : "translate-x-0",
            pressed ? "bg-page" : "bg-secondary",
          )}
        />
      </span>
    </button>
  );
}

Toggle.displayName = "Toggle";

export { Toggle };
