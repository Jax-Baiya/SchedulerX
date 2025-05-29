import logging
from datetime import datetime
from sqlalchemy.orm import Session
from backend.api.models.scheduled_post import ScheduledPost, PostStatus
from backend.api.services import media_utils
from backend.api.services.social import PLATFORM_SERVICES

logger = logging.getLogger(__name__)

def run_scheduler(db: Session):
    now = datetime.utcnow()
    posts = db.query(ScheduledPost).filter(
        ScheduledPost.scheduled_time <= now,
        ScheduledPost.status == PostStatus.PENDING
    ).all()
    for post in posts:
        try:
            post.status = PostStatus.PROCESSING
            db.commit()
            # Validate media
            if not media_utils.validate(post.media_path):
                post.status = PostStatus.FAILED
                post.result = {"error": "Media validation failed"}
                db.commit()
                continue
            # Dispatch to correct platform
            service = PLATFORM_SERVICES.get(post.platform)
            if not service:
                post.status = PostStatus.FAILED
                post.result = {"error": f"No service for platform {post.platform}"}
                db.commit()
                continue
            result = service(post)
            post.status = PostStatus.POSTED if result.get("success") else PostStatus.FAILED
            post.result = result
            db.commit()
        except Exception as e:
            logger.exception(f"Failed to post scheduled post {post.id}")
            post.status = PostStatus.FAILED
            post.result = {"error": str(e)}
            db.commit()
