"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";

interface BookmarkButtonProps {
  slug: string;
  type: "tool" | "workflow" | "dotfile";
  title: string;
}

const STORAGE_KEY = "resbook-bookmarks";

interface Bookmark {
  slug: string;
  type: string;
  title: string;
  savedAt: string;
}

export function BookmarkButton({ slug, type, title }: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const bookmarks: Bookmark[] = JSON.parse(stored);
      setIsBookmarked(bookmarks.some((b) => b.slug === slug && b.type === type));
    }
  }, [slug, type]);

  const toggle = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    let bookmarks: Bookmark[] = stored ? JSON.parse(stored) : [];

    if (isBookmarked) {
      bookmarks = bookmarks.filter((b) => !(b.slug === slug && b.type === type));
    } else {
      bookmarks.push({ slug, type, title, savedAt: new Date().toISOString() });
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    setIsBookmarked(!isBookmarked);
  };

  if (!isClient) return null;

  return (
    <button
      onClick={toggle}
      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900"
      title={isBookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      <Star className={`w-5 h-5 ${isBookmarked ? "fill-yellow-500 text-yellow-500" : "text-gray-400"}`} />
    </button>
  );
}
