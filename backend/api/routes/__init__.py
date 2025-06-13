from fastapi import APIRouter

from .authors import router as authors_router
from .videos import router as videos_router
from .texts import router as texts_router
from .bookmarks import router as bookmarks_router
from .following import router as following_router
from .likes import router as likes_router
from .consolidated import router as consolidated_router
from .upload_status import router as upload_status_router
from .media import router as media_router

api_router = APIRouter()

api_router.include_router(authors_router, prefix="/authors", tags=["authors"])
api_router.include_router(videos_router, prefix="/videos", tags=["videos"])
api_router.include_router(texts_router, prefix="/texts", tags=["texts"])
api_router.include_router(bookmarks_router, prefix="/bookmarks", tags=["bookmarks"])
api_router.include_router(following_router, prefix="/following", tags=["following"])
api_router.include_router(likes_router, prefix="/likes", tags=["likes"])
api_router.include_router(consolidated_router, prefix="/consolidated", tags=["consolidated"])
api_router.include_router(upload_status_router, prefix="/upload_status", tags=["upload_status"])
api_router.include_router(media_router, prefix="/media", tags=["media"])