// app/hooks/useChatStream.ts
"use client";
import { useState } from "react";
import { streamOpenAIResponse } from "@/app/lib/openai";
import { Message } from "@/app/lib/storage";

export function useChatStream() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const send = async (
    userMessage: string,
    messages: Message[],
    apiKey: string,
    model: "gpt-4" | "gpt-3.5-turbo"
  ): Promise<string> => {
    setError(null);
    setIsStreaming(true);
    let fullResponse = "";

    try {
      const apiMessages = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));
      apiMessages.push({ role: "user", content: userMessage });

      for await (const chunk of streamOpenAIResponse(apiMessages, apiKey, model)) {
        fullResponse += chunk;
      }

      return fullResponse;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Unknown error";
      setError(errorMsg);
      throw err;
    } finally {
      setIsStreaming(false);
    }
  };

  return { send, isStreaming, error };
}
