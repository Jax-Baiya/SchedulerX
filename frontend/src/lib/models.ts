// Model registry for dynamic DB browser UI
export const models = [
  {
    name: "media",
    displayName: "Media",
    fields: [
      { name: "video_id", type: "string" },
      { name: "author_id", type: "string" },
      { name: "video_path", type: "string" },
      { name: "cover_path", type: "string" },
      { name: "title", type: "string" },
      { name: "description", type: "string" },
      { name: "tags", type: "string" },
      { name: "upload_status", type: "string" },
    ],
  },
  {
    name: "authors",
    displayName: "Authors",
    fields: [
      { name: "author_id", type: "string" },
      { name: "unique_id", type: "string" },
      { name: "nickname", type: "string" },
      { name: "follower_count", type: "number" },
      { name: "heart_count", type: "number" },
      { name: "video_count", type: "number" },
      { name: "signature", type: "string" },
      { name: "private_account", type: "boolean" },
    ],
  },
  // Add more models as needed (videos, bookmarks, etc.)
];
