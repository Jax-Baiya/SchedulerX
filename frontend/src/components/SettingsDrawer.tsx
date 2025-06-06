"use client";
import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import SettingsPage from "@/app/settings/page";

export default function SettingsDrawer({ triggerClass = "" }: { triggerClass?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className={`p-2 rounded bg-gray-800 text-white hover:bg-gray-700 transition-colors ${triggerClass}`}
        onClick={() => setOpen(true)}
        aria-label="Open settings"
      >
        <span role="img" aria-label="Settings">⚙️</span>
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <div className="w-full max-w-lg p-6">
          <SettingsPage />
        </div>
      </Dialog>
    </>
  );
}
