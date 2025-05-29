// Next.js API route for media upload (Cloudflare R2)
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false, // Required for file uploads
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ detail: "Method not allowed" });
  }
  // TODO: Connect to backend R2 upload endpoint
  // For now, just return a stub response
  return res.status(200).json({ success: true, message: "Upload endpoint ready for backend integration." });
}
