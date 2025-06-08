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
  {
    name: "videos",
    displayName: "Videos",
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
    name: "texts",
    displayName: "Texts",
    fields: [
      { name: "text_id", type: "string" },
      { name: "content", type: "string" },
      { name: "author_id", type: "string" },
      { name: "created_at", type: "string" },
    ],
  },
  {
    name: "bookmarks",
    displayName: "Bookmarks",
    fields: [
      { name: "bookmark_id", type: "string" },
      { name: "user_id", type: "string" },
      { name: "media_id", type: "string" },
      { name: "created_at", type: "string" },
    ],
  },
  {
    name: "following",
    displayName: "Following",
    fields: [
      { name: "user_id", type: "string" },
      { name: "following_id", type: "string" },
      { name: "created_at", type: "string" },
    ],
  },
  {
    name: "likes",
    displayName: "Likes",
    fields: [
      { name: "like_id", type: "string" },
      { name: "user_id", type: "string" },
      { name: "media_id", type: "string" },
      { name: "created_at", type: "string" },
    ],
  },
  {
    name: "consolidated",
    displayName: "Consolidated",
    fields: [
      { name: "id", type: "string" },
      { name: "data", type: "string" },
      { name: "created_at", type: "string" },
    ],
  },
  {
    name: "upload_status",
    displayName: "Upload Status",
    fields: [
      { name: "id", type: "string" },
      { name: "status", type: "string" },
      { name: "created_at", type: "string" },
    ],
  },
];
