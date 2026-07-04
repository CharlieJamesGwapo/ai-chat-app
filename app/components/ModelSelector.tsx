// app/components/ModelSelector.tsx
export function ModelSelector({
  value,
  onChange,
}: {
  value: "gpt-4" | "gpt-3.5-turbo";
  onChange: (model: "gpt-4" | "gpt-3.5-turbo") => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as "gpt-4" | "gpt-3.5-turbo")}
      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
    >
      <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
      <option value="gpt-4">GPT-4</option>
    </select>
  );
}
