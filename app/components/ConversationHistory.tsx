// app/components/ConversationHistory.tsx
"use client";
import { Conversation } from "@/app/lib/storage";

export function ConversationHistory({
  conversations,
  current,
  onLoad,
  onDelete,
  onNew,
}: {
  conversations: Conversation[];
  current: Conversation | null;
  onLoad: (id: string) => void;
  onDelete: (id: string) => void;
  onNew: () => void;
}) {
  return (
    <div className="w-64 bg-gray-100 dark:bg-gray-800 border-r border-gray-300 dark:border-gray-700 flex flex-col">
      <button
        onClick={onNew}
        className="m-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold text-sm"
      >
        + New Chat
      </button>

      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <p className="p-4 text-sm text-gray-600 dark:text-gray-400">No conversations yet</p>
        ) : (
          conversations.map((conv) => (
            <div
              key={conv.id}
              className={`p-3 border-b border-gray-200 dark:border-gray-700 cursor-pointer ${
                current?.id === conv.id
                  ? "bg-gray-200 dark:bg-gray-700"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <div onClick={() => onLoad(conv.id)} className="flex-1">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{conv.title}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{conv.messages.length} messages</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm("Delete this conversation?")) {
                    onDelete(conv.id);
                  }
                }}
                className="text-xs text-red-500 hover:text-red-700 mt-1"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
