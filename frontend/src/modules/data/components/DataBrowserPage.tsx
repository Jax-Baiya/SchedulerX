// Data browser page component for data module
"use client";
import { useState } from "react";
import { models } from "@/lib/models";
import { DataSidebar } from "@/components/db/DataSidebar";
import { DataTable } from "@/components/db/DataTable";

export default function DataBrowserPage() {
  const [selectedModel, setSelectedModel] = useState(models[0].name);
  const model = models.find((m) => m.name === selectedModel)!;

  return (
    <div className="flex h-screen">
      <DataSidebar selected={selectedModel} onSelect={setSelectedModel} />
      <main className="flex-1 p-4 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">{model.displayName}</h1>
        <DataTable model={model.name} fields={model.fields} />
      </main>
    </div>
  );
}
