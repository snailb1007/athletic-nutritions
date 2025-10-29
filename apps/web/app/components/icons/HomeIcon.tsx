"use client";

import type { IconProps } from "./types";

export const HomeIcon = ({ className, ...props }: IconProps) => (
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
    <path d="M3 11L12 4l9 7" />
    <path d="M6 10v10h5v-5h2v5h5V10" />
  </svg>
);
