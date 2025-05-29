from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..dependencies import get_db
from backend.api.middleware.auth import get_current_user
from pydantic import BaseModel
from datetime import datetime
from ..models.task import Task

router = APIRouter()

class TaskOut(BaseModel):
    id: int
    name: str
    status: str
    created_at: datetime
    updated_at: datetime
    class Config:
        orm_mode = True

@router.get("/tasks", response_model=List[TaskOut], summary="List all tasks", description="Get a list of all automation tasks.")
def list_tasks(db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    """Get all tasks."""
    return db.query(Task).all()

@router.post("/tasks", response_model=TaskOut, summary="Create a new task", description="Create a new automation task.")
def create_task(task: TaskOut, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    """Create a new task."""
    db_task = Task(name=task.name, status=task.status)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@router.get("/tasks/{task_id}", response_model=TaskOut, summary="Get a task by ID", description="Get a single task by its ID.")
def get_task(task_id: int, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    """Get a task by ID."""
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.delete("/tasks/{task_id}", summary="Delete a task", description="Delete a task by its ID.")
def delete_task(task_id: int, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    """Delete a task by ID."""
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(task)
    db.commit()
    return {"message": "Deleted"}
