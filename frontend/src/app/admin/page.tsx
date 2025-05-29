"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { apiFetch } from "@/lib/api/client";

export default function AdminPage() {
  const [status, setStatus] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      setError("Not authenticated");
      return;
    }
    apiFetch("/admin/monitor", { headers: { Authorization: `Bearer ${token}` } })
      .then(setStatus)
      .catch((e: any) => setError(e.message));
  }, []);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Admin / Monitoring</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <div className="text-red-500">{error}</div>}
          {status ? (
            <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">{JSON.stringify(status, null, 2)}</pre>
          ) : (
            <div>Loading...</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
