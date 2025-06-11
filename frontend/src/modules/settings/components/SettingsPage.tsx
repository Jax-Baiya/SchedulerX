// Settings page component for settings module
"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getSettings, updateSettings } from "@/lib/api/settings";
import DBProfileSelector from "./DBProfileSelector";

interface Settings {
  // Add your settings fields here, e.g.:
  dbProfile?: string;
  // Add more fields as needed
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      setError("Not authenticated");
      return;
    }
    getSettings(token)
      .then(setSettings)
      .catch((e) => setError(e.message));
  }, []);

  const handleSave = async () => {
    setMessage(null);
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) throw new Error("Not authenticated");
      await updateSettings(settings, token);
      setMessage("Settings saved!");
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <label className="block font-medium mb-1">Database Profile</label>
          <DBProfileSelector />
        </div>
        {/* Add more settings fields here */}
        <Button onClick={handleSave}>Save</Button>
        {message && <div>{message}</div>}
        {error && <div className="text-red-500">{error}</div>}
      </CardContent>
    </Card>
  );
}
