"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getSettings, updateSettings } from "@/lib/api/settings";

export default function SettingsPage() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      setError("Not authenticated");
      setLoading(false);
      return;
    }
    getSettings(token)
      .then(setSettings)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <label>
              Theme:
              <select
                value={settings?.theme || "light"}
                onChange={(e) =>
                  setSettings((s: any) => ({ ...s, theme: e.target.value }))
                }
                className="ml-2 border rounded px-2 py-1"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </label>
            <label>
              Username:
              <input
                type="text"
                value={settings?.username || ""}
                onChange={(e) =>
                  setSettings((s: any) => ({ ...s, username: e.target.value }))
                }
                className="ml-2 border rounded px-2 py-1"
              />
            </label>
            <Button
              onClick={handleSave}
              className="bg-primary text-white px-4 py-2 rounded"
            >
              Save
            </Button>
            {message && <div className="text-green-600">{message}</div>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
