// app/components/DarkModeToggle.tsx
"use client";
import { useEffect, useState } from "react";
import { toggleTheme } from "@/app/lib/storage";

export function DarkModeToggle() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => toggleTheme()}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-yellow-300 hover:bg-gray-300 dark:hover:bg-gray-600"
      aria-label="Toggle dark mode"
    >
      🌙
    </button>
  );
}
