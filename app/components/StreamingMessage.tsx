// app/components/StreamingMessage.tsx
export function StreamingMessage({ content }: { content: string }) {
  return (
    <div className="flex gap-3 mb-4">
      <div className="flex-1 max-w-2xl p-3 rounded-lg bg-gray-200 dark:bg-gray-700">
        <p className="text-sm text-gray-900 dark:text-white whitespace-pre-wrap">{content}</p>
        <span className="inline-block ml-1 w-2 h-4 bg-gray-900 dark:bg-white animate-pulse" />
      </div>
    </div>
  );
}
