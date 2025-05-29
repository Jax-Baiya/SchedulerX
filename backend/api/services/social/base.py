from enum import Enum
from datetime import datetime

class SocialPostStatus(str, Enum):
    PENDING = "pending"
    VALIDATING = "validating"
    SCHEDULED = "scheduled"
    POSTED = "posted"
    FAILED = "failed"
    RETRYING = "retrying"
    CLEANED = "cleaned"

class SocialMediaBase:
    def __init__(self):
        self.posts = {}

    def get_post(self, post_id):
        return self.posts.get(post_id)

    def simulate_post(self, content, schedule_time=None):
        if not content.get("title") or not content.get("image_url"):
            return {"status": SocialPostStatus.FAILED, "error": "Missing title or image_url"}
        post_id = f"post_{len(self.posts)+1}"
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

    def process_post(self, post_id):
        post = self.get_post(post_id)
        if not post:
            return None
        if post["status"] == SocialPostStatus.SCHEDULED:
            post["status"] = SocialPostStatus.POSTED
            post["posted_at"] = datetime.utcnow()
        elif post["status"] == SocialPostStatus.PENDING:
            post["status"] = SocialPostStatus.FAILED
            post["error"] = "Not scheduled"
        return post

    def retry_post(self, post_id):
        post = self.get_post(post_id)
        if not post:
            return None
        if post["status"] == SocialPostStatus.FAILED and post["retries"] < 3:
            post["status"] = SocialPostStatus.RETRYING
            post["retries"] += 1
            if post["retries"] == 2:
                post["status"] = SocialPostStatus.POSTED
                post["posted_at"] = datetime.utcnow()
                post["error"] = None
            else:
                post["error"] = "Retry failed"
        return post

    def cleanup_post(self, post_id):
        post = self.get_post(post_id)
        if not post:
            return None
        post["status"] = SocialPostStatus.CLEANED
        post["cleaned_at"] = datetime.utcnow()
        return post
