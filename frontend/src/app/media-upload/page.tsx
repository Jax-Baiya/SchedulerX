"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
// import { mockUploadFiles } from "@/lib/api/media";

export default function MediaUploadPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<string | null>(null);

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
      // TODO: Implement real upload API call here using the backend endpoint
      // await uploadMediaFiles(selectedFiles, token);
      setUploadResult("Upload successful! (mocked)");
    } catch (e: unknown) {
      setUploadResult(e instanceof Error ? e.message : "Upload failed");
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
