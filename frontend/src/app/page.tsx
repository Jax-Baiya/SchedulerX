"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getPipelineStatus } from "@/lib/api/pipeline";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getPipelineStatus()
      .then(setStatus)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>SchedulerX Pipeline Status</CardTitle>
          </CardHeader>
          <CardContent>
            {loading && <div>Loading...</div>}
            {error && <div className="text-red-500">{error}</div>}
            {status && (
              <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">{JSON.stringify(status, null, 2)}</pre>
            )}
            <div className="mt-4 flex gap-2">
              <Button variant="default">Run Full Pipeline</Button>
              <Button variant="secondary">View Logs</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button variant="outline">Copy .appdata</Button>
            <Button variant="outline">Generate Markdown</Button>
            <Button variant="outline">Decode Base64</Button>
            <Button variant="outline">Create Excel</Button>
            <Button variant="outline">Consolidate Data</Button>
            <Button variant="outline">Import to DB</Button>
            <Button variant="outline">Prisma Sync</Button>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>System Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2 text-sm">
              <div><b>Backend:</b> Flask + APScheduler</div>
              <div><b>Database:</b> PostgreSQL + Prisma</div>
              <div><b>Storage:</b> Cloudflare R2</div>
              <div><b>Scheduler:</b> APScheduler / Supabase CRON</div>
              <div><b>API Clients:</b> TikTok, Pinterest, IG</div>
            </div>
            <div className="mt-6 flex justify-center">
              <Image src="/next.svg" alt="Next.js logo" width={120} height={30} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
