#!/bin/bash
# Run the pipeline system in the backend

PYTHONPATH=backend/pipeline_v2:. python3 backend/pipeline_v2/runners/run_all.py