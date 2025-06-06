"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api/client";
import { getPipelineStatus, triggerPipeline } from "@/lib/api/pipeline";
import { useToast } from "@/components/ui/toast";

export default function AdminPage() {
  const [status, setStatus] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pipelineStatus, setPipelineStatus] = useState<Record<string, unknown> | null>(null);
  const [pipelineError, setPipelineError] = useState<string | null>(null);
  const [triggering, setTriggering] = useState(false);
  const { toast } = useToast();

  const fetchPipelineStatus = async () => {
    setPipelineError(null);
    try {
      const status = await getPipelineStatus();
      setPipelineStatus(status as Record<string, unknown>);
    } catch (e) {
      setPipelineError(e instanceof Error ? e.message : String(e));
    }
  };

  const handleTriggerPipeline = async () => {
    setTriggering(true);
    setPipelineError(null);
    try {
      // Send a valid PipelineConfig (all stages, step mode)
      const config = {
        stages: [0, 1, 2, 3, 4, 5, 6],
        run_mode: "step",
        output_directory: "assets",
        options: {},
      };
      const result = await triggerPipeline(config);
      setPipelineStatus(result as Record<string, unknown>);
      toast({ title: "Pipeline run started", description: "The pipeline was triggered successfully." });
    } catch (e) {
      const msg = e instanceof Error ? e.message : JSON.stringify(e);
      setPipelineError(msg);
      toast({ title: "Pipeline run failed", description: msg, variant: "destructive" });
    } finally {
      setTriggering(false);
    }
  };

  useEffect(() => {
    fetchPipelineStatus();
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      setError("Not authenticated");
      return;
    }
    apiFetch<Record<string, unknown>>("/admin/monitor", { headers: { Authorization: `Bearer ${token}` } })
      .then((data) => setStatus(data))
      .catch((e: unknown) => setError(e instanceof Error ? e.message : String(e)));
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
      <Card>
        <CardHeader>
          <CardTitle>Pipeline Runner</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={handleTriggerPipeline} disabled={triggering}>
            {triggering ? "Running..." : "Run Pipeline"}
          </Button>
          {pipelineError && <div className="text-red-500 mt-2">{pipelineError}</div>}
          {pipelineStatus && (
            <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto mt-2">{JSON.stringify(pipelineStatus, null, 2)}</pre>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
