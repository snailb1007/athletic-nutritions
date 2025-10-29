"use client";

import type { IconProps } from "./types";

export const FlameIcon = ({ className, ...props }: IconProps) => (
  <svg
    aria-hidden="true"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 3c2 3 3 4.4 3 6.2a3 3 0 0 1-6 0c0-1.2.4-2.3 1-3.2" />
    <path d="M9 13a4.5 4.5 0 0 0 6 4.2" />
  </svg>
);
