from .base import SocialMediaBase, SocialPostStatus
from datetime import datetime

class TikTokService(SocialMediaBase):
    def simulate_post(self, content, schedule_time=None):
        # TikTok-specific content validation (require description, video_url)
        if not content.get("description") or not content.get("video_url"):
            return {"status": SocialPostStatus.FAILED, "error": "Missing description or video_url"}
        post_id = f"tt_{len(self.posts)+1}"
        status = SocialPostStatus.SCHEDULED if schedule_time else SocialPostStatus.PENDING
        self.posts[post_id] = {
            "content": content,
            "status": status,
            "schedule_time": schedule_time,
            "created_at": datetime.utcnow(),
            "error": None,
            "retries": 0
        }
        return {"post_id": post_id, "status": status}

    def post(self, post_obj):
        """Stub for TikTok posting logic."""
        # Simulate failure for demonstration
        return {"success": False, "platform": "tiktok", "error": "Not implemented"}

tiktok_service = TikTokService()
