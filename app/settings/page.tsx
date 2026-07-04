// app/settings/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getApiKey, setApiKey } from "@/app/lib/storage";
import { DarkModeToggle } from "@/app/components/DarkModeToggle";

export default function SettingsPage() {
  const [apiKey, setApiKeyLocal] = useState("");
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setApiKeyLocal(getApiKey());
  }, []);

  const handleSave = () => {
    setApiKey(apiKey);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 p-6">
      <div className="absolute top-4 right-4">
        <DarkModeToggle />
      </div>

      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Settings</h1>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              OpenAI API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKeyLocal(e.target.value)}
              placeholder="sk-..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
            />
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
              Get your key from{" "}
              <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                OpenAI platform
              </a>
            </p>
          </div>

          <button
            onClick={handleSave}
            className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold"
          >
            Save API Key
          </button>

          {saved && <p className="text-sm text-green-600">✓ API key saved</p>}

          <button
            onClick={() => router.push("/")}
            className="w-full px-4 py-3 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-semibold"
          >
            Back to Chat
          </button>
        </div>
      </div>
    </main>
  );
}
