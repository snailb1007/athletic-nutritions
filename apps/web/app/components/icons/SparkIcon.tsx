"use client";

import type { IconProps } from "./types";

export const SparkIcon = ({ className, ...props }: IconProps) => (
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
    <path d="m12 3 .7 3.3L16 8l-3.3 1.7L12 13l-.7-3.3L8 8l3.3-1.7Z" />
    <path d="m6 14 .4 1.8L8 17l-1.6.8L6 20l-.4-2.2L4 17l1.6-.2Z" />
    <path d="m18 12 .5 2.2L21 15l-2.5.8L18 18l-.5-2.2L15 15l2.5-.8Z" />
  </svg>
);
