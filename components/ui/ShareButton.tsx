"use client";

import { useState } from "react";
import { Share2, Link as LinkIcon, Check } from "lucide-react";

interface ShareButtonProps {
  title: string;
  url?: string;
}

export function ShareButton({ title, url }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToTwitter = () => {
    const text = encodeURIComponent(`Check out ${title} on ResBook`);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, "_blank");
  };

  const shareToLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(linkedInUrl, "_blank");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900"
        title="Share"
      >
        <Share2 className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 shadow-lg z-10">
          <button
            onClick={copyLink}
            className="w-full flex items-center gap-2 p-3 hover:bg-gray-50 dark:hover:bg-gray-900 text-sm"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <LinkIcon className="w-4 h-4" />}
            {copied ? "Copied!" : "Copy link"}
          </button>
          <button
            onClick={shareToTwitter}
            className="w-full flex items-center gap-2 p-3 hover:bg-gray-50 dark:hover:bg-gray-900 text-sm"
          >
            <span className="w-4 h-4 flex items-center justify-center font-bold text-xs">𝕏</span>
            Twitter/X
          </button>
          <button
            onClick={shareToLinkedIn}
            className="w-full flex items-center gap-2 p-3 hover:bg-gray-50 dark:hover:bg-gray-900 text-sm"
          >
            <span className="w-4 h-4 flex items-center justify-center font-bold text-xs">in</span>
            LinkedIn
          </button>
        </div>
      )}
    </div>
  );
}
