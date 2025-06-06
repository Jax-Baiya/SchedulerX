"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getPipelineStatus, triggerPipeline } from "@/lib/api/pipeline";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

export default function Home() {
  const [status, setStatus] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [pipelineLoading, setPipelineLoading] = useState(false);
  const [pipelineError, setPipelineError] = useState<string | null>(null);
  const [pipelineResult, setPipelineResult] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    setLoading(true);
    getPipelineStatus()
      .then((data) => setStatus(data as Record<string, unknown>))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const handleRunPipeline = async () => {
    setPipelineLoading(true);
    setPipelineError(null);
    setPipelineResult(null);
    try {
      // Send a valid PipelineConfig (all stages, step mode)
      const config = {
        stages: [0, 1, 2, 3, 4, 5, 6],
        run_mode: "step",
        output_directory: "assets",
        options: {},
      };
      const result = await triggerPipeline(config);
      setPipelineResult(result as Record<string, unknown>);
      toast({ title: "Pipeline run started", description: "The pipeline was triggered successfully." });
    } catch (e) {
      const msg = e instanceof Error ? e.message : JSON.stringify(e);
      setPipelineError(msg);
      toast({ title: "Pipeline run failed", description: msg, variant: "destructive" });
    } finally {
      setPipelineLoading(false);
    }
  };

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
              <Button variant="default" onClick={handleRunPipeline} disabled={pipelineLoading}>
                {pipelineLoading ? "Running..." : "Run Full Pipeline"}
              </Button>
              <Button variant="secondary">View Logs</Button>
            </div>
            {pipelineError && <div className="text-red-500 mt-2">{pipelineError}</div>}
            {pipelineResult && (
              <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto mt-2">{JSON.stringify(pipelineResult, null, 2)}</pre>
            )}
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
