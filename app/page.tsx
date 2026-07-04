// app/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Message, getApiKey } from "@/app/lib/storage";
import { MessageList } from "@/app/components/MessageList";
import { ChatInput } from "@/app/components/ChatInput";
import { ConversationHistory } from "@/app/components/ConversationHistory";
import { StreamingMessage } from "@/app/components/StreamingMessage";
import { ModelSelector } from "@/app/components/ModelSelector";
import { DarkModeToggle } from "@/app/components/DarkModeToggle";
import { useConversations } from "@/app/hooks/useConversations";
import { useChatStream } from "@/app/hooks/useChatStream";

export default function ChatPage() {
  const router = useRouter();
  const { conversations, current, createNew, save, load, delete: deleteConv, clear } = useConversations();
  const { send, isStreaming, error } = useChatStream();
  const [streamingMessage, setStreamingMessage] = useState("");
  const [model, setModel] = useState<"gpt-4" | "gpt-3.5-turbo">("gpt-3.5-turbo");

  useEffect(() => {
    if (!current) {
      createNew(model);
    } else {
      setModel(current.model);
    }
  }, []);

  const handleSendMessage = async (text: string) => {
    if (!current || !getApiKey()) {
      alert("Please set your API key in settings");
      router.push("/settings");
      return;
    }

    const userMessage: Message = {
      role: "user",
      content: text,
      timestamp: new Date().toISOString(),
    };

    const updatedConversation = {
      ...current,
      messages: [...current.messages, userMessage],
    };
    save(updatedConversation);

    setStreamingMessage("");

    try {
      const response = await send(text, updatedConversation.messages, getApiKey(), model);

      const assistantMessage: Message = {
        role: "assistant",
        content: response,
        timestamp: new Date().toISOString(),
      };

      updatedConversation.messages.push(assistantMessage);
      updatedConversation.updatedAt = new Date().toISOString();
      save(updatedConversation);
      setStreamingMessage("");
    } catch {
      alert("Error sending message. Check your API key.");
    }
  };

  const handleNewChat = () => {
    createNew(model);
    setStreamingMessage("");
  };

  const handleModelChange = (newModel: "gpt-4" | "gpt-3.5-turbo") => {
    setModel(newModel);
    if (current) {
      save({ ...current, model: newModel });
    }
  };

  if (!current) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      <ConversationHistory
        conversations={conversations}
        current={current}
        onLoad={load}
        onDelete={deleteConv}
        onNew={handleNewChat}
      />

      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-300 dark:border-gray-600">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Chat</h1>
          <div className="flex gap-4 items-center">
            <ModelSelector value={model} onChange={handleModelChange} />
            <button
              onClick={() => {
                if (confirm("Clear this conversation?")) {
                  clear();
                  setStreamingMessage("");
                }
              }}
              className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
            >
              Clear
            </button>
            <button
              onClick={() => router.push("/settings")}
              className="px-3 py-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg text-sm"
            >
              Settings
            </button>
            <DarkModeToggle />
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 border-b border-red-300">
            Error: {error}
          </div>
        )}

        <MessageList messages={current.messages} />

        {streamingMessage && <StreamingMessage content={streamingMessage} />}

        <ChatInput onSend={handleSendMessage} disabled={isStreaming} />
      </div>
    </div>
  );
}
