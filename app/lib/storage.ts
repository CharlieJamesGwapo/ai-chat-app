// app/lib/storage.ts
export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  model: "gpt-4" | "gpt-3.5-turbo";
  createdAt: string;
  updatedAt: string;
}

const CONVERSATIONS_KEY = "ai_conversations";
const CURRENT_CHAT_KEY = "ai_current_chat";
const API_KEY_KEY = "ai_api_key";
const THEME_KEY = "theme";

export function getConversations(): Conversation[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(CONVERSATIONS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveConversation(conversation: Conversation): void {
  const conversations = getConversations();
  const index = conversations.findIndex((c) => c.id === conversation.id);
  if (index >= 0) {
    conversations[index] = conversation;
  } else {
    conversations.push(conversation);
  }
  localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(conversations));
}

export function deleteConversation(id: string): void {
  const conversations = getConversations();
  const filtered = conversations.filter((c) => c.id !== id);
  localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(filtered));
}

export function getCurrentConversation(): Conversation | null {
  if (typeof window === "undefined") return null;
  try {
    const data = localStorage.getItem(CURRENT_CHAT_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function setCurrentConversation(conversation: Conversation): void {
  localStorage.setItem(CURRENT_CHAT_KEY, JSON.stringify(conversation));
}

export function getApiKey(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(API_KEY_KEY) || "";
}

export function setApiKey(key: string): void {
  localStorage.setItem(API_KEY_KEY, key);
}

export function getTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return (localStorage.getItem(THEME_KEY) as "light" | "dark") || "light";
}

export function setTheme(theme: "light" | "dark"): void {
  localStorage.setItem(THEME_KEY, theme);
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

export function toggleTheme(): "light" | "dark" {
  const current = getTheme();
  const next = current === "light" ? "dark" : "light";
  setTheme(next);
  return next;
}
