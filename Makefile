# Define the  project root
PROJECT_ROOT := $(shell pwd)

run:
	python3 $(PROJECT_ROOT)/backend/pipeline/run_all.py
