from typing import Optional, Any, Dict
import backoff
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import text
import time
import logging
from .base import Database

logger = logging.getLogger(__name__)

class DatabaseManager:
    def __init__(self, db: Database):
        self.db = db
        self._query_stats: Dict[str, Any] = {
            'total_queries': 0,
            'slow_queries': 0,
            'failed_queries': 0
        }
    
    @backoff.on_exception(
        backoff.expo,
        SQLAlchemyError,
        max_tries=3,
        max_time=30
    )
    def execute_query(self, query: str, params: Optional[dict] = None) -> Any:
        """Execute a query with retry logic and performance monitoring.
        
        Args:
            query: SQL query string
            params: Optional parameters for the query
            
        Returns:
            Query result
        """
        start_time = time.time()
        self._query_stats['total_queries'] += 1
        
        try:
            with self.db.get_session() as session:
                result = session.execute(text(query), params or {})
                execution_time = time.time() - start_time
                
                # Log slow queries (taking more than 1 second)
                if execution_time > 1.0:
                    self._query_stats['slow_queries'] += 1
                    logger.warning(
                        f"Slow query detected ({execution_time:.2f}s): {query[:100]}..."
                    )
                
                self.log_query(query, params, execution_time)
                return result.fetchall()
                
        except SQLAlchemyError as e:
            self._query_stats['failed_queries'] += 1
            logger.error(f"Query failed: {str(e)}\nQuery: {query}")
            raise
    
    def log_query(self, query: str, params: Optional[dict] = None, execution_time: Optional[float] = None):
        """Log query details for debugging and monitoring.
        
        Args:
            query: SQL query string
            params: Optional parameters for the query
            execution_time: Optional query execution time in seconds
        """
        log_msg = f"Executing query: {query[:100]}..."
        if params:
            log_msg += f"\nParameters: {params}"
        if execution_time:
            log_msg += f"\nExecution time: {execution_time:.2f}s"
        
        logger.debug(log_msg)
    
    def get_query_stats(self) -> Dict[str, Any]:
        """Get query performance statistics.
        
        Returns:
            Dictionary containing query statistics
        """
        return self._query_stats
    
    def reset_stats(self):
        """Reset query statistics."""
        self._query_stats = {
            'total_queries': 0,
            'slow_queries': 0,
            'failed_queries': 0
        }
    
    def check_connection(self) -> bool:
        """Check if database connection is healthy.
        
        Returns:
            True if connection is healthy, False otherwise
        """
        try:
            with self.db.get_session() as session:
                session.execute(text("SELECT 1"))
            return True
        except SQLAlchemyError as e:
            logger.error(f"Database connection check failed: {str(e)}")
            return False
