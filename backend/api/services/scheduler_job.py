from apscheduler.schedulers.background import BackgroundScheduler
from backend.api.services.scheduler_runner import run_scheduler
from backend.api.dependencies import SessionLocal  # PATCH: import from dependencies, not database
import logging

logger = logging.getLogger(__name__)
scheduler = BackgroundScheduler()

def start_scheduler():
    scheduler.add_job(lambda: run_scheduler(SessionLocal()), 'interval', minutes=1, id='scheduled_posts_job', replace_existing=True)
    scheduler.start()
    logger.info("Scheduler started for scheduled posts.")
