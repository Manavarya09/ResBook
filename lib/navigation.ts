export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavItem[];
}

export const navigation: NavItem[] = [
  {
    label: "Home",
    href: "/",
    icon: "home",
  },
  {
    label: "Tools",
    href: "/tools",
    icon: "tools",
    children: [
      { label: "Claude Code", href: "/tools/claude-code" },
      { label: "Cursor", href: "/tools/cursor" },
    ],
  },
  {
    label: "Workflows",
    href: "/workflows",
    icon: "workflow",
    children: [
      { label: "End-to-End Next.js", href: "/workflows/end-to-end-nextjs" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    icon: "book",
  },
];
