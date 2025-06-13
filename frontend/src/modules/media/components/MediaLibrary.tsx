// Media library page component for media module
"use client";

import React, { useEffect, useState } from "react";

interface MediaFile {
  id: string;
  filename: string;
  url: string;
  type: string;
}

export default function MediaLibrary() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [selected, setSelected] = useState<MediaFile | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/v1/r2/files')
      .then(res => res.json())
      .then(data => {
        setFiles(data.files || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load media files');
        setLoading(false);
      });
  }, []);

  const filtered = files.filter(f =>
    (!search || f.filename.toLowerCase().includes(search.toLowerCase())) &&
    (!filterType || f.type.startsWith(filterType))
  );

  const handleDelete = async (id: string) => {
    setDeleting(id);
    // ...existing code...
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Media Library</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : files.length === 0 ? (
        <div>No media files found.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {files.map((file) => (
            <div key={file.id} className="border rounded p-2 flex flex-col items-center">
              <img src={file.url} alt={file.filename} className="w-full h-32 object-cover mb-2 rounded" />
              <div className="text-xs font-medium truncate w-full">{file.filename}</div>
              <div className="text-xs text-gray-500">{file.type}</div>
              <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs mt-1">Open</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
