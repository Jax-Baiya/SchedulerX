# runtime/pinterest_stub.py

import requests
from pprint import pprint

def post_to_pinterest_stub(media_url, title, description, tags):
    payload = {
        "title": title,
        "description": description,
        "tags": tags,
        "media_url": media_url,
    }
    try:
        response = requests.post("https://httpbin.org/post", json=payload)
        pprint(response.json())
    except Exception as e:
        print(f"[Pinterest ❌] Failed: {e}")
