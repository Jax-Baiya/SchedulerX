# Core Directory

This directory contains core infrastructure definitions and schemas that are essential to the pipeline's operation.

## Purpose

The core directory is for:
- Database schema definitions
- Data models
- Core infrastructure components
- Essential definitions that are not optional features

## Components

1. **table_definitions.py**: Defines database table schemas using SQLAlchemy

## Guidelines

1. **Not Features**: These are not optional features that can be enabled/disabled
2. **Essential Only**: Only place essential infrastructure components here
3. **No Runtime Logic**: Avoid placing runtime execution logic in core components
4. **Clear Dependencies**: Document dependencies between core components

## Usage

Import core components directly in your code:

```python
from core.table_definitions import define_tables
``` 

