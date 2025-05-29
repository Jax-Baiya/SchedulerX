from .pinterest import pinterest_service
from .tiktok import tiktok_service
from .instagram import instagram_service
from .x import post as x_post

PLATFORM_SERVICES = {
    "pinterest": pinterest_service.post,
    "tiktok": tiktok_service.post,
    "instagram": instagram_service.post,
    "x": x_post
}