"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { uploadMediaFiles } from "@/lib/api/media";
import { useToast } from "@/components/ui/toast";

export default function MediaUploadPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files);
    setUploadResult(null);
  };

  const handleUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) return;
    setUploading(true);
    setUploadResult(null);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) throw new Error("Not authenticated");
      await uploadMediaFiles(selectedFiles, token);
      setUploadResult("Upload successful!");
      toast({ title: "Upload successful!", description: `${selectedFiles.length} file(s) uploaded.` });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Upload failed";
      setUploadResult(msg);
      toast({ title: "Upload failed", description: msg, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Media Upload</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            type="file"
            multiple
            accept=".mp4,.mov,.avi,.jpg,.jpeg,.png"
            ref={fileInputRef}
            onChange={handleFileChange}
            disabled={uploading}
          />
          <Button className="mt-4" onClick={handleUpload} disabled={uploading || !selectedFiles}>
            {uploading ? "Uploading..." : "Upload"}
          </Button>
          {uploadResult && (
            <div className="mt-4 text-sm text-muted-foreground">{uploadResult}</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
