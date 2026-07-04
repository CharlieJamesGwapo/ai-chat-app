// app/components/MessageList.tsx
"use client";
import { useEffect, useRef } from "react";
import { Message } from "@/app/lib/storage";
import { ChatMessage } from "./ChatMessage";

export function MessageList({ messages }: { messages: Message[] }) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
        <p>No messages yet. Start a conversation!</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      {messages.map((msg, idx) => (
        <ChatMessage key={idx} message={msg} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
