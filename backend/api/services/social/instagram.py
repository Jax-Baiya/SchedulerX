from .base import SocialMediaBase, SocialPostStatus
from datetime import datetime

class InstagramService(SocialMediaBase):
    def simulate_post(self, content, schedule_time=None):
        # Instagram-specific content validation (require caption, image_url)
        if not content.get("caption") or not content.get("image_url"):
            return {"status": SocialPostStatus.FAILED, "error": "Missing caption or image_url"}
        post_id = f"ig_{len(self.posts)+1}"
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

    def post(post_obj):
        """Stub for Instagram posting logic."""
        return {"success": False, "platform": "instagram", "error": "Not implemented"}

instagram_service = InstagramService()
