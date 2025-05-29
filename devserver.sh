#!/bin/bash
# Run the FastAPI backend dev server
PYTHONPATH=. uvicorn backend.api.main:app --reload