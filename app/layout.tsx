import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Chat App",
  description: "Chat with OpenAI models",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try { const theme = localStorage.getItem('theme') || 'light'; if (theme === 'dark') document.documentElement.classList.add('dark'); } catch (e) {}`,
          }}
        />
      </head>
      <body className="bg-white dark:bg-gray-900">
        {children}
      </body>
    </html>
  );
}
