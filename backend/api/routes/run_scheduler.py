from backend.api.utils.bootstrap import bootstrap_api
bootstrap_api()

from backend.api.services.scheduler_runner import run_scheduler
from backend.api.database import SessionLocal

def main():
    db = SessionLocal()
    run_scheduler(db)

if __name__ == "__main__":
    main()
