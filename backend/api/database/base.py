from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from contextlib import contextmanager
from typing import Generator, Optional
import logging
import backoff
from sqlalchemy.exc import SQLAlchemyError, OperationalError

logger = logging.getLogger(__name__)

Base = declarative_base()

class Database:
    def __init__(self, url: str, pool_size: int = 5, max_overflow: int = 10, pool_timeout: int = 30, pool_recycle: int = 1800):
        """Initialize database connection with connection pooling and retry logic.
        
        Args:
            url: Database connection URL
            pool_size: Number of connections to keep open
            max_overflow: Maximum number of connections that can be created beyond pool_size
            pool_timeout: Seconds to wait before giving up on getting a connection from the pool
            pool_recycle: Seconds after which a connection is automatically recycled
        """
        self.engine = create_engine(
            url,
            pool_size=pool_size,
            max_overflow=max_overflow,
            pool_timeout=pool_timeout,
            pool_recycle=pool_recycle,
            pool_pre_ping=True  # Enable connection health checks
        )
        self.SessionLocal = sessionmaker(
            autocommit=False,
            autoflush=False,
            bind=self.engine
        )

    @backoff.on_exception(
        backoff.expo,
        (OperationalError, SQLAlchemyError),
        max_tries=3,
        max_time=30
    )
    @contextmanager
    def get_session(self) -> Generator:
        """Get a database session with automatic retry and error handling.
        
        Yields:
            SQLAlchemy session object
        """
        session = self.SessionLocal()
        try:
            yield session
            session.commit()
        except Exception as e:
            session.rollback()
            logger.error(f"Database session error: {str(e)}")
            raise
        finally:
            session.close()

    def init_db(self):
        """Initialize database tables."""
        try:
            Base.metadata.create_all(bind=self.engine)
            logger.info("Database tables created successfully")
        except Exception as e:
            logger.error(f"Failed to create database tables: {str(e)}")
            raise

    def get_connection(self):
        """Get a raw database connection for low-level operations."""
        return self.engine.connect()

    def execute_query(self, query: str, params: Optional[dict] = None):
        """Execute a raw SQL query with parameters.
        
        Args:
            query: SQL query string
            params: Optional parameters for the query
            
        Returns:
            Query result
        """
        with self.get_session() as session:
            result = session.execute(query, params or {})
            return result.fetchall()
