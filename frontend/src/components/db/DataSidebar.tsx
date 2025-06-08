import { models } from "@/lib/models";

export function DataSidebar({ selected, onSelect }: { selected: string; onSelect: (name: string) => void }) {
  return (
    <aside className="w-56 bg-gray-900 text-white h-full p-4">
      <div className="font-bold mb-4">All Models</div>
      <ul>
        {models.map((m) => (
          <li
            key={m.name}
            className={`cursor-pointer p-2 rounded ${selected === m.name ? "bg-gray-700" : ""}`}
            onClick={() => onSelect(m.name)}
          >
            {m.displayName}
          </li>
        ))}
      </ul>
    </aside>
  );
}
