"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getPipelineStatus, triggerPipeline } from "@/lib/api/pipeline";

export default function PipelineModule() {
  const [status, setStatus] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pipelineLoading, setPipelineLoading] = useState(false);
  const [pipelineError, setPipelineError] = useState<string | null>(null);
  const [pipelineResult, setPipelineResult] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    getPipelineStatus()
      .then((data) => setStatus(data as Record<string, unknown>))
      .catch((e: unknown) => setError(e instanceof Error ? e.message : String(e)));
  }, []);

  const handleRunPipeline = async () => {
    setPipelineLoading(true);
    setPipelineError(null);
    setPipelineResult(null);
    try {
      const result = await triggerPipeline({});
      setPipelineResult(result as Record<string, unknown>);
      // Optionally refresh status after running
      const newStatus = await getPipelineStatus();
      setStatus(newStatus as Record<string, unknown>);
    } catch (e) {
      setPipelineError(e instanceof Error ? e.message : String(e));
    } finally {
      setPipelineLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Pipeline System</CardTitle>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <div>
              <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto mb-4">
                {JSON.stringify(status, null, 2)}
              </pre>
              <Button onClick={handleRunPipeline} disabled={pipelineLoading}>
                {pipelineLoading ? "Running..." : "Run Pipeline"}
              </Button>
              {pipelineError && (
                <div className="text-red-500 mt-2">{pipelineError}</div>
              )}
              {pipelineResult && (
                <div className="mt-2">
                  <div className="font-semibold">Pipeline Result:</div>
                  <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
                    {JSON.stringify(pipelineResult, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
