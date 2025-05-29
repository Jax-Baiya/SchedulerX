"""
📊 Data Tools
Simple reusable utilities for list or data cleaning.
"""

def deduplicate_list(seq):
    return list(dict.fromkeys(seq))