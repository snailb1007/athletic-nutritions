import type { IconProps } from "./types";

export const LeafIcon = ({ className, ...props }: IconProps) => (
  <svg
    aria-hidden="true"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M19 5c0 9-6 15-14 15 0-8 6-15 14-15Z" />
    <path d="M7 19c0-4.5 3.5-8 8.5-9.5" />
  </svg>
);
