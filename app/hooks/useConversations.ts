// app/hooks/useConversations.ts
"use client";
import { useState, useEffect } from "react";
import {
  Conversation,
  getConversations,
  getCurrentConversation,
  setCurrentConversation,
  saveConversation,
  deleteConversation,
} from "@/app/lib/storage";

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [current, setCurrent] = useState<Conversation | null>(null);

  useEffect(() => {
    setConversations(getConversations());
    setCurrent(getCurrentConversation());
  }, []);

  const createNew = (model: "gpt-4" | "gpt-3.5-turbo" = "gpt-3.5-turbo") => {
    const conversation: Conversation = {
      id: Math.random().toString(36).substring(7),
      title: "New conversation",
      messages: [],
      model,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setCurrent(conversation);
    setCurrentConversation(conversation);
    return conversation;
  };

  const save = (conversation: Conversation) => {
    saveConversation(conversation);
    setCurrent(conversation);
    setCurrentConversation(conversation);
    setConversations(getConversations());
  };

  const load = (id: string) => {
    const conv = conversations.find((c) => c.id === id);
    if (conv) {
      setCurrent(conv);
      setCurrentConversation(conv);
    }
  };

  const delete_ = (id: string) => {
    deleteConversation(id);
    setConversations(getConversations());
    if (current?.id === id) {
      setCurrent(null);
    }
  };

  const clear = () => {
    if (current) {
      current.messages = [];
      save(current);
    }
  };

  return { conversations, current, createNew, save, load, delete: delete_, clear };
}
