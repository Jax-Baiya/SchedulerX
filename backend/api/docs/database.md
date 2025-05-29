# Database Integration Documentation

The SchedulerX backend uses SQLAlchemy ORM for database access, with Alembic for migrations and Prisma for schema sync. See the [Backend API README](./README.md) for API usage and integration details.

## Overview
The database system is built using SQLAlchemy ORM with a focus on modularity, performance, and maintainability.

## Architecture
- Base layer: Common database operations and session management
- Models layer: SQLAlchemy ORM models and Pydantic schemas
- Migration layer: Alembic-based schema management
- Utilities layer: Connection management and query optimization

## Key Features
- Connection pooling for efficient resource usage
- Transaction management with automatic rollback
- Query optimization with indexes and caching
- Comprehensive error handling and logging
- Migration system for schema versioning

## Usage Example
```python
# Initialize database
db = Database(settings.DATABASE_URL)

# Use in FastAPI dependency
def get_db():
    with db.get_session() as session:
        yield session

# Use in service
class MediaService:
    def __init__(self, db: Session):
        self.db = db
    
    def get_media(self, video_id: str):
        return self.db.query(Media).filter_by(video_id=video_id).first()
```

## Best Practices
1. Always use the session context manager
2. Implement proper error handling
3. Use appropriate indexes for frequent queries
4. Keep migrations atomic and reversible
5. Monitor query performance

---

## See Also
- [Backend API Docs](README.md)
- [Project Plan](../../../docs/plan.md)

See also: [Backend API README](./README.md)
