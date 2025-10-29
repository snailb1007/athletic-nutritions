"use client";

import type { IconProps } from "./types";

export const DownloadIcon = ({ className, ...props }: IconProps) => (
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
    <path d="M12 4v11" />
    <path d="m7.5 11.5 4.5 4.5 4.5-4.5" />
    <path d="M5 20h14" />
  </svg>
);
