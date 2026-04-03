"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { navigation, type NavItem } from "@/lib/navigation";

export function Sidebar() {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (href: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(href)) {
      newExpanded.delete(href);
    } else {
      newExpanded.add(href);
    }
    setExpandedItems(newExpanded);
  };

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  const renderNavItem = (item: NavItem, level = 0) => {
    const active = isActive(item.href);
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.href);

    return (
      <div key={item.href}>
        <div className="flex items-center">
          <Link
            href={item.href}
            className={cn(
              "flex-1 px-4 py-2 text-sm font-mono transition-colors",
              "hover:bg-gray-100 dark:hover:bg-gray-900",
              active
                ? "border-l-2 border-black bg-gray-50 font-bold dark:border-white dark:bg-gray-900"
                : "border-l-2 border-transparent",
              level > 0 && "pl-8"
            )}
          >
            {item.label}
          </Link>
          {hasChildren && (
            <button
              onClick={() => toggleExpanded(item.href)}
              className="px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-900"
              aria-label="Toggle submenu"
            >
              <ChevronDown
                size={16}
                className={cn("transition-transform", isExpanded && "rotate-180")}
              />
            </button>
          )}
        </div>

        {hasChildren && isExpanded && item.children && (
          <div className="border-l border-gray-300 dark:border-gray-700">
            {item.children.map((child) => renderNavItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 overflow-y-auto border-r border-black bg-white dark:border-white dark:bg-black">
      {/* Logo/Home */}
      <div className="border-b border-black p-4 dark:border-white">
        <Link href="/" className="block text-xl font-bold hover:opacity-75">
          resbook
        </Link>
        <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
          AI Tools & Workflows
        </p>
      </div>

      {/* Navigation */}
      <nav className="py-4">
        {navigation.map((item) => renderNavItem(item))}
      </nav>

      {/* Footer */}
      <div className="border-t border-black p-4 dark:border-white">
        <p className="text-xs text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} ResBook
        </p>
      </div>
    </aside>
  );
}
