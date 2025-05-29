import logging
import logging.handlers
import sys
from pathlib import Path
from typing import Optional
from ..config import settings

def setup_logging(log_file: Optional[str] = None) -> logging.Logger:
    """
    Configure logging with both file and console handlers
    
    Args:
        log_file: Optional path to log file. If None, uses settings.LOG_FILE
    
    Returns:
        Logger instance configured with both handlers
    """
    # Create logger
    logger = logging.getLogger("schedulerx")
    logger.setLevel(getattr(logging, settings.LOG_LEVEL.upper()))
    
    # Create formatters
    console_formatter = logging.Formatter(
        '%(levelname)s: %(message)s'
    )
    file_formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    
    # Console handler
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setFormatter(console_formatter)
    logger.addHandler(console_handler)
    
    # File handler (if log file is specified)
    log_file = log_file or settings.LOG_FILE
    if log_file:
        log_path = Path(log_file)
        log_path.parent.mkdir(parents=True, exist_ok=True)
        
        file_handler = logging.handlers.RotatingFileHandler(
            log_path,
            maxBytes=10485760,  # 10MB
            backupCount=5,
            encoding='utf-8'
        )
        file_handler.setFormatter(file_formatter)
        logger.addHandler(file_handler)
    
    return logger

# Create and export default logger instance
logger = setup_logging() 