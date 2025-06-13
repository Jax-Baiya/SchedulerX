"use client";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { triggerPipeline } from "@/lib/api/pipeline";
import { useToast } from "@/components/ui/toast";
import { getDbProfiles, getActiveDbProfile } from "@/lib/api/db_profiles";
import { Tooltip } from "@/components/ui/tooltip";

const defaultStages = [0, 1, 2, 3, 4, 5, 6];
const SOURCE_DIRS_KEY = "schedulerx_source_dirs";
const PIPELINE_CONFIG_KEY = "schedulerx_pipeline_config";

export default function PipelinePage() {
  const [runMode, setRunMode] = useState("step");
  const [srcProfile, setSrcProfile] = useState("");
  const [dbProfile, setDbProfile] = useState("");
  const [outputDirectory, setOutputDirectory] = useState("assets");
  const [stages, setStages] = useState<number[]>(defaultStages);
  const [options, setOptions] = useState("{}");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sourceDirs, setSourceDirs] = useState<string[]>([]);
  const [showAddSource, setShowAddSource] = useState(false);
  const [newSourceDir, setNewSourceDir] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [dbProfiles, setDbProfiles] = useState<{ name: string; display_name: string }[]>([]);
  const [excelFileName, setExcelFileName] = useState("data.xlsx");
  const [activeDbProfile, setActiveDbProfile] = useState<string>("");
  const [showOptions, setShowOptions] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const dirs = localStorage.getItem(SOURCE_DIRS_KEY);
    if (dirs) setSourceDirs(JSON.parse(dirs));
  }, []);

  useEffect(() => {
    fetch("/api/v1/pipeline/features")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setFeatures(data);
        else if (Array.isArray(data.features)) setFeatures(data.features);
      })
      .catch(() => setFeatures([]));
  }, []);

  useEffect(() => {
    getDbProfiles()
      .then((profiles) => {
        if (Array.isArray(profiles)) setDbProfiles(profiles);
      })
      .catch(() => setDbProfiles([]));
  }, []);

  // Restore config from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(PIPELINE_CONFIG_KEY);
    if (saved) {
      try {
        const cfg = JSON.parse(saved);
        setRunMode(cfg.runMode || "step");
        setSrcProfile(cfg.srcProfile || "");
        setDbProfile(cfg.dbProfile || "");
        setOutputDirectory(cfg.outputDirectory || "assets");
        setStages(cfg.stages || defaultStages);
        setOptions(cfg.options || "{}");
        setSelectedFeatures(cfg.selectedFeatures || []);
        setExcelFileName(cfg.excelFileName || "data.xlsx");
      } catch {}
    }
  }, []);

  // Save config to localStorage on change
  useEffect(() => {
    const config = {
      runMode,
      srcProfile,
      dbProfile,
      outputDirectory,
      stages,
      options,
      selectedFeatures,
      excelFileName,
    };
    localStorage.setItem(PIPELINE_CONFIG_KEY, JSON.stringify(config));
  }, [runMode, srcProfile, dbProfile, outputDirectory, stages, options, selectedFeatures, excelFileName]);

  // Fetch active DB profile
  useEffect(() => {
    getActiveDbProfile()
      .then((res) => setActiveDbProfile(res.active_profile || ""))
      .catch(() => setActiveDbProfile(""));
  }, [dbProfile]);

  // Handle DB profile change
  const handleDbProfileChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setDbProfile(value);
    if (value) {
      try {
        await setDbProfile(value);
        setActiveDbProfile(value);
        toast({ title: "DB profile activated", description: value });
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        toast({ title: "Failed to activate DB profile", description: msg, variant: "destructive" });
      }
    }
  };

  const handleStageToggle = (stage: number) => {
    setStages((prev) =>
      prev.includes(stage) ? prev.filter((s) => s !== stage) : [...prev, stage]
    );
  };

  const handleAddSourceDir = () => {
    if (!newSourceDir.trim()) return;
    if (sourceDirs.includes(newSourceDir.trim())) {
      toast({ title: "Already exists", description: "This source directory is already saved." });
      return;
    }
    const updated = [...sourceDirs, newSourceDir.trim()];
    setSourceDirs(updated);
    localStorage.setItem(SOURCE_DIRS_KEY, JSON.stringify(updated));
    setNewSourceDir("");
    setShowAddSource(false);
    setSrcProfile(newSourceDir.trim());
    toast({ title: "Source directory added", description: newSourceDir.trim() });
  };

  const handleRemoveSourceDir = (dir: string) => {
    const updated = sourceDirs.filter((d) => d !== dir);
    setSourceDirs(updated);
    localStorage.setItem(SOURCE_DIRS_KEY, JSON.stringify(updated));
    if (srcProfile === dir) setSrcProfile("");
  };

  const handleFeatureToggle = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
    );
  };

  const validate = () => {
    if (!srcProfile) return "Source directory is required.";
    if (!outputDirectory) return "Output directory is required.";
    if (!stages.length) return "At least one stage must be selected.";
    try {
      if (options) JSON.parse(options);
    } catch {
      return "Options must be valid JSON.";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    let parsedOptions: Record<string, unknown> = {};
    try {
      parsedOptions = options ? JSON.parse(options) : {};
    } catch {
      setError("Options must be valid JSON");
      setLoading(false);
      return;
    }
    (parsedOptions as Record<string, unknown>)["xlsx_file"] = excelFileName;
    try {
      const config = {
        stages,
        src_profile: srcProfile || undefined,
        db_profile: dbProfile || undefined,
        output_directory: outputDirectory,
        run_mode: runMode,
        options: parsedOptions,
        enabled_features: selectedFeatures.length ? selectedFeatures : undefined,
      };
      const res = await triggerPipeline(config);
      setResult(res as Record<string, unknown>);
      toast({ title: "Pipeline started", description: "Pipeline run triggered." });
    } catch (e) {
      setError(e instanceof Error ? e.message : JSON.stringify(e));
      toast({ title: "Pipeline error", description: e instanceof Error ? e.message : JSON.stringify(e), variant: "destructive" });
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
              <label className="block font-medium mb-1 flex items-center justify-between">
                Source Directory
                <button type="button" className="text-xs underline ml-2" onClick={() => setShowAddSource((v) => !v)}>
                  {showAddSource ? "Cancel" : "Add New"}
                </button>
              </label>
              {showAddSource ? (
                <div className="flex gap-2 mt-1">
                  <Input
                    value={newSourceDir}
                    onChange={(e) => setNewSourceDir(e.target.value)}
                    placeholder="/path/to/data"
                  />
                  <Button type="button" onClick={handleAddSourceDir}>
                    Save
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <select
                    className="w-full p-2 rounded border"
                    value={srcProfile}
                    onChange={(e) => setSrcProfile(e.target.value)}
                  >
                    {sourceDirs.map((dir, idx) => (
                      <option key={dir} value={dir}>
                        [{idx + 1}] {dir}
                      </option>
                    ))}
                    <option value="__custom__">[0] Enter custom path</option>
                  </select>
                  {srcProfile && srcProfile !== "__custom__" && (
                    <Button
                      type="button"
                      size="sm"
                      variant="destructive"
                      className="w-fit"
                      onClick={() => handleRemoveSourceDir(srcProfile)}
                    >
                      Remove Selected
                    </Button>
                  )}
                  {srcProfile === "__custom__" && !showAddSource && (
                    <div className="flex gap-2 mt-1">
                      <Input
                        value={newSourceDir}
                        onChange={(e) => setNewSourceDir(e.target.value)}
                        placeholder="/path/to/data"
                      />
                      <Button type="button" onClick={handleAddSourceDir}>
                        Save
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div>
              <label className="block font-medium mb-1 flex items-center gap-2">
                DB Profile
                {dbProfile && (
                  <span title={dbProfile === activeDbProfile ? "Active" : "Not active"}>
                    <span className={`inline-block w-2 h-2 rounded-full ml-1 ${dbProfile === activeDbProfile ? "bg-green-500" : "bg-gray-300"}`}></span>
                  </span>
                )}
              </label>
              <select
                className="w-full p-2 rounded border"
                value={dbProfile}
                onChange={handleDbProfileChange}
              >
                <option value="">Select DB Profile</option>
                {dbProfiles.map((profile) => (
                  <option key={profile.name} value={profile.name}>
                    {profile.display_name}
                  </option>
                ))}
              </select>
              {activeDbProfile && (
                <div className="text-xs text-gray-500 mt-1">Active: {activeDbProfile}</div>
              )}
            </div>
            <div>
              <label className="block font-medium mb-1 flex items-center justify-between">
                Output Directory
                <span className="text-xs text-gray-500 ml-2">Default: assets</span>
              </label>
              <Input
                value={outputDirectory}
                onChange={(e) => setOutputDirectory(e.target.value)}
                placeholder="assets"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Excel File Name</label>
              <Input
                value={excelFileName}
                onChange={(e) => setExcelFileName(e.target.value)}
                placeholder="data.xlsx"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Stages</label>
              <div className="flex gap-2 flex-wrap">
                {defaultStages.map((stage) => (
                  <Tooltip key={stage} content={`Stage ${stage}: ${stageDescriptions[stage] || ""}`}> {/* Add descriptions as needed */}
                    <label className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        checked={stages.includes(stage)}
                        onChange={() => handleStageToggle(stage)}
                      />
                      Stage {stage}
                    </label>
                  </Tooltip>
                ))}
              </div>
            </div>
            <div>
              <label className="block font-medium mb-1">Features</label>
              <div className="flex gap-2 flex-wrap">
                {features.map((feature) => (
                  <Tooltip key={feature} content={`Feature: ${feature}`}> {/* Add real descriptions if available */}
                    <label className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        checked={selectedFeatures.includes(feature)}
                        onChange={() => handleFeatureToggle(feature)}
                      />
                      {feature}
                    </label>
                  </Tooltip>
                ))}
              </div>
            </div>
            <div>
              <label className="block font-medium mb-1 flex items-center gap-2">
                Options (JSON)
                <Button type="button" size="sm" variant="ghost" onClick={() => setShowOptions((v) => !v)}>
                  {showOptions ? "Collapse" : "Expand"}
                </Button>
              </label>
              {showOptions && (
                <Textarea
                  value={options}
                  onChange={(e) => setOptions(e.target.value)}
                  placeholder={'{\n  "key": "value"\n}'}
                  rows={4}
                />
              )}
            </div>
            {error && <div className="text-red-600">{error}</div>}
            {result && (
              <div className="bg-green-100 text-green-800 p-2 rounded text-sm whitespace-pre-wrap mt-2">
                {JSON.stringify(result, null, 2)}
              </div>
            )}
            <div className="flex gap-2">
              <Button type="submit" disabled={loading}>
                {loading ? "Running..." : "Run Pipeline"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// Add simple stage descriptions for tooltips
const stageDescriptions: Record<number, string> = {
  0: "Copy appdata",
  1: "Import media",
  2: "Process data",
  3: "Analyze",
  4: "Export",
  5: "Upload",
  6: "Cleanup",
};
