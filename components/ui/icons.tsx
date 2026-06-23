import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...props,
});

export const Icons = {
  sun: (p: IconProps) => (
    <svg {...base(p)}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  ),
  moon: (p: IconProps) => (
    <svg {...base(p)}>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  ),
  arrowRight: (p: IconProps) => (
    <svg {...base(p)}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  arrowUpRight: (p: IconProps) => (
    <svg {...base(p)}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  ),
  menu: (p: IconProps) => (
    <svg {...base(p)}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  close: (p: IconProps) => (
    <svg {...base(p)}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  ),
  check: (p: IconProps) => (
    <svg {...base(p)}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),
  spark: (p: IconProps) => (
    <svg {...base(p)}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M12 8a4 4 0 0 0 4 4 4 4 0 0 0-4 4 4 4 0 0 0-4-4 4 4 0 0 0 4-4z" />
    </svg>
  ),
  heart: (p: IconProps) => (
    <svg {...base(p)}>
      <path d="M12 20s-7-4.5-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 5C19 15.5 12 20 12 20z" />
    </svg>
  ),
  alert: (p: IconProps) => (
    <svg {...base(p)}>
      <path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
    </svg>
  ),
  shield: (p: IconProps) => (
    <svg {...base(p)}>
      <path d="M12 3 5 6v6c0 4 3 7 7 9 4-2 7-5 7-9V6l-7-3z" />
      <path d="M9.5 12l2 2 3.5-3.5" />
    </svg>
  ),
  github: (p: IconProps) => (
    <svg {...base(p)}>
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-1-2.6c3-.3 6-1.5 6-6.6a5 5 0 0 0-1.4-3.5 4.7 4.7 0 0 0-.1-3.5s-1.1-.3-3.5 1.3a12 12 0 0 0-6.4 0C6.3 1.2 5.2 1.5 5.2 1.5a4.7 4.7 0 0 0-.1 3.5A5 5 0 0 0 3.7 8.5c0 5 3 6.3 6 6.6a3.4 3.4 0 0 0-1 2.6V22" />
    </svg>
  ),
  // Module glyphs
  "user-future": (p: IconProps) => (
    <svg {...base(p)}>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M12 1.5v1.5M19.5 4.5l-1 1" opacity="0.5" />
    </svg>
  ),
  receipt: (p: IconProps) => (
    <svg {...base(p)}>
      <path d="M6 2.5h12v19l-2-1.3-2 1.3-2-1.3-2 1.3-2-1.3-2 1.3v-19z" />
      <path d="M9 7h6M9 11h6M9 15h3" />
    </svg>
  ),
  translate: (p: IconProps) => (
    <svg {...base(p)}>
      <path d="M4 5h7M7.5 5v1.5C7.5 10 6 12.5 3.5 14M5 9.5c.7 2 2.4 3.6 4.5 4.5" />
      <path d="M12.5 20l3.5-9 3.5 9M13.7 17h4.6" />
    </svg>
  ),
  compass: (p: IconProps) => (
    <svg {...base(p)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5 13 13l-4.5 2.5L11 11l4.5-2.5z" />
    </svg>
  ),
  book: (p: IconProps) => (
    <svg {...base(p)}>
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v16H6.5A2.5 2.5 0 0 0 4 20.5v-16z" />
      <path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20v3.5H6.5A2.5 2.5 0 0 1 4 20.5z" opacity="0.5" />
    </svg>
  ),
  timeline: (p: IconProps) => (
    <svg {...base(p)}>
      <path d="M5 3v18" />
      <circle cx="5" cy="7" r="1.6" />
      <circle cx="5" cy="13" r="1.6" />
      <circle cx="5" cy="19" r="1.6" />
      <path d="M9 7h10M9 13h7M9 19h9" />
    </svg>
  ),
  map: (p: IconProps) => (
    <svg {...base(p)}>
      <path d="M9 3 3 5.5v15L9 18l6 3 6-2.5v-15L15 6 9 3z" />
      <path d="M9 3v15M15 6v15" />
    </svg>
  ),
};

export type IconName = keyof typeof Icons;

export function Icon({
  name,
  ...props
}: { name: IconName } & IconProps) {
  const Cmp = Icons[name];
  return <Cmp {...props} />;
}
