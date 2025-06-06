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
    setError(null);
    setSuccess(null);
    try {
      // TODO: Replace with real API call
      await new Promise(r => setTimeout(r, 500));
      setFiles(prev => prev.filter(f => f.id !== id));
      setSuccess("File deleted");
    } catch {
      setError("Failed to delete file");
    } finally {
      setDeleting(null);
    }
  };

  const handleDownload = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Media Library</h1>
      <div className="flex gap-2 mb-4">
        <input
          className="border rounded px-2 py-1"
          placeholder="Search filename..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="border rounded px-2 py-1"
          value={filterType}
          onChange={e => setFilterType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="image">Images</option>
          <option value="video">Videos</option>
          <option value="audio">Audio</option>
        </select>
      </div>
      {success && <div className="text-green-600 mb-2">{success}</div>}
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filtered.map(file => (
          <div key={file.id} className="border rounded p-2 flex flex-col items-center">
            {file.type.startsWith('image') ? (
              <img src={file.url} alt={file.filename} className="w-32 h-32 object-cover mb-2 cursor-pointer" onClick={() => setSelected(file)} />
            ) : (
              <div className="w-32 h-32 flex items-center justify-center bg-gray-100 mb-2 cursor-pointer" onClick={() => setSelected(file)}>{file.type}</div>
            )}
            <div className="text-xs break-all mb-2">{file.filename}</div>
            <div className="flex gap-2">
              <button className="text-blue-600 underline text-xs" onClick={() => handleDownload(file.url)}>Download</button>
              <button className="text-red-600 underline text-xs" disabled={deleting === file.id} onClick={() => handleDelete(file.id)}>{deleting === file.id ? "Deleting..." : "Delete"}</button>
            </div>
          </div>
        ))}
      </div>
      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg p-6 w-full max-w-md relative">
            <button className="absolute top-2 right-2 text-lg" onClick={() => setSelected(null)}>&times;</button>
            <h2 className="text-lg font-bold mb-2">{selected.filename}</h2>
            {selected.type.startsWith('image') ? (
              <img src={selected.url} alt={selected.filename} className="w-full max-h-64 object-contain mb-2" />
            ) : (
              <div className="w-full h-40 flex items-center justify-center bg-gray-100 mb-2">{selected.type}</div>
            )}
            <div className="mb-2">Type: {selected.type}</div>
            <div className="mb-2">URL: <a href={selected.url} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Open</a></div>
            <div className="flex gap-2 mt-4">
              <button className="text-blue-600 underline text-xs" onClick={() => handleDownload(selected.url)}>Download</button>
              <button className="text-red-600 underline text-xs" onClick={() => { handleDelete(selected.id); setSelected(null); }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
