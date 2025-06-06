"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { triggerPipeline } from "@/lib/api/pipeline";
import { useToast } from "@/components/ui/toast";

const defaultStages = [0, 1, 2, 3, 4, 5, 6];

export default function PipelinePage() {
  const [runMode, setRunMode] = useState("step");
  const [srcProfile, setSrcProfile] = useState("");
  const [dbProfile, setDbProfile] = useState("");
  const [outputDirectory, setOutputDirectory] = useState("assets");
  const [stages, setStages] = useState<number[]>(defaultStages);
  const [options, setOptions] = useState("{}");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleStageToggle = (stage: number) => {
    setStages((prev) =>
      prev.includes(stage) ? prev.filter((s) => s !== stage) : [...prev, stage]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    let parsedOptions = {};
    try {
      parsedOptions = options ? JSON.parse(options) : {};
    } catch (e) {
      setError("Options must be valid JSON");
      setLoading(false);
      return;
    }
    try {
      const config = {
        stages,
        src_profile: srcProfile || undefined,
        db_profile: dbProfile || undefined,
        output_directory: outputDirectory,
        run_mode: runMode,
        options: parsedOptions,
      };
      const res = await triggerPipeline(config);
      setResult(res);
      toast({ title: "Pipeline started", description: "Pipeline run triggered." });
    } catch (e: any) {
      setError(e?.message || JSON.stringify(e));
      toast({ title: "Pipeline error", description: e?.message || JSON.stringify(e), variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Run Pipeline</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block font-medium mb-1">Run Mode</label>
              <select
                className="w-full p-2 rounded border"
                value={runMode}
                onChange={(e) => setRunMode(e.target.value)}
              >
                <option value="auto">Auto</option>
                <option value="step">Step</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Source Profile</label>
              <Input
                value={srcProfile}
                onChange={(e) => setSrcProfile(e.target.value)}
                placeholder="e.g. default, test, ..."
              />
            </div>
            <div>
              <label className="block font-medium mb-1">DB Profile</label>
              <Input
                value={dbProfile}
                onChange={(e) => setDbProfile(e.target.value)}
                placeholder="e.g. supabase, local, ..."
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Output Directory</label>
              <Input
                value={outputDirectory}
                onChange={(e) => setOutputDirectory(e.target.value)}
                placeholder="assets"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Stages</label>
              <div className="flex gap-2 flex-wrap">
                {defaultStages.map((stage) => (
                  <label key={stage} className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={stages.includes(stage)}
                      onChange={() => handleStageToggle(stage)}
                    />
                    Stage {stage}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block font-medium mb-1">Options (JSON)</label>
              <Textarea
                value={options}
                onChange={(e) => setOptions(e.target.value)}
                placeholder="{\n  \"key\": \"value\"\n}"
                rows={4}
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Running..." : "Run Pipeline"}
            </Button>
          </form>
          {error && <div className="text-red-500 mt-4">{error}</div>}
          {result && (
            <pre className="bg-gray-100 p-2 rounded mt-4 text-xs overflow-x-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
