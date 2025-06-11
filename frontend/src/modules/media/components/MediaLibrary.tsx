// Media library page component for media module
"use client";

import React, { useEffect, useState } from 'react';

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
      {/* ...existing code for UI... */}
    </div>
  );
}
