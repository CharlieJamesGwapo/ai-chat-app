// app/components/ChatMessage.tsx
import { Message } from "@/app/lib/storage";

export function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === "user";
  const time = new Date(message.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`flex gap-3 mb-4 ${isUser ? "flex-row-reverse" : ""}`}>
      <div
        className={`flex-1 max-w-2xl p-3 rounded-lg ${
          isUser
            ? "bg-blue-500 text-white"
            : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
        }`}
      >
        <p className="text-sm">{message.content}</p>
        <span className={`text-xs mt-1 block ${isUser ? "text-blue-100" : "text-gray-500 dark:text-gray-400"}`}>
          {time}
        </span>
      </div>
    </div>
  );
}
