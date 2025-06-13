// Settings page component for settings module
"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getSettings, updateSettings } from "@/lib/api/settings";
import DBProfileSelector from "./DBProfileSelector";
import { Input } from "@/components/ui/input";

interface Settings {
  // Add your settings fields here, e.g.:
  dbProfile?: string;
  // Add more fields as needed
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [theme, setTheme] = useState<string>("light");
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      setError("Not authenticated");
      return;
    }
    getSettings(token)
      .then((data) => setSettings(data as Settings))
      .catch((e) => setError(e.message));

    // Optionally load theme/username from localStorage or settings
    const storedTheme =
      typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    if (storedTheme) setTheme(storedTheme);
    const storedUsername =
      typeof window !== "undefined" ? localStorage.getItem("username") : null;
    if (storedUsername) setUsername(storedUsername);
  }, []);

  const handleSave = async () => {
    setMessage(null);
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) throw new Error("Not authenticated");
      if (!settings) throw new Error("No settings to save");
      await updateSettings(settings, token);
      setMessage("Settings saved!");
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value);
    if (typeof window !== "undefined")
      localStorage.setItem("theme", e.target.value);
  };
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    if (typeof window !== "undefined")
      localStorage.setItem("username", e.target.value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <label className="block font-medium mb-1">Theme</label>
          <select
            className="w-full p-2 rounded border"
            value={theme}
            onChange={handleThemeChange}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Username</label>
          <Input
            value={username}
            onChange={handleUsernameChange}
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Database Profile</label>
          <DBProfileSelector />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">System Actions</label>
          <button
            className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            type="button"
            onClick={() =>
              fetch("/api/v1/prisma/studio", { method: "POST" })
            }
          >
            Launch Prisma Studio
          </button>
        </div>
        <Button onClick={handleSave}>Save</Button>
        {message && <div>{message}</div>}
        {error && <div className="text-red-500">{error}</div>}
      </CardContent>
    </Card>
  );
}
