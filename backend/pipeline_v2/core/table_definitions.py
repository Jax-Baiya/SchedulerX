from sqlalchemy import Table, Column, String, Boolean, MetaData, Integer, DateTime, Text, ForeignKey
from datetime import datetime

def define_tables(metadata: MetaData):
    return {
        "videos": Table("videos", metadata,
            Column('videos_id', String, primary_key=True),
            Column('videos_authorid', String),
            Column('videos_createtime', String),
            Column('videos_diggcount', String),
            Column('videos_playcount', String),
            Column('videos_audioid', String),
            Column('videos_size', String),
            Column('videos_itemmute', String),
        ),
        "authors": Table("authors", metadata,
            Column("authors_id", String, primary_key=True),
            Column("authors_uniqueids", String),
            Column("authors_nicknames", String),
            Column("authors_followercount", String),
            Column("authors_heartcount", String),
            Column("authors_videocount", String),
            Column("authors_signature", String),
            Column("authors_privateaccount", Boolean)
        ),
        "texts": Table("texts", metadata,
            Column("texts_text_id", String, primary_key=True),
            Column("texts_text_content", String)
        ),
        "likes": Table("likes", metadata,
            Column("likes_schemaversion", String),
            Column("likes_user", String, primary_key=True),
            Column("likes_likes", String)
        ),
        "bookmarks": Table("bookmarks", metadata,
            Column("bookmarks_officiallist", String, primary_key=True),
            Column("bookmarks_downloaded", String),
            Column("bookmarks_total", String),
            Column("bookmarks_numdisappeared", String),
            Column("bookmarks_lastrun", String)
        ),
        "following": Table("following", metadata,
            Column("following_author_id", String, primary_key=True),
            Column("following_official", Boolean),
            Column("following_started", Boolean),
            Column("following_not_interested", Boolean),
            Column("following_infolder", String),
            Column("following_disappeared", String),
            Column("following_last_run_start", String),
            Column("following_last_run_finish", String),
            Column("following_last_run_bottom", String),
            Column("following_last_run_firstadded", String)
        ),
        "consolidated": Table("consolidated", metadata,
            Column("c_videos_id", String, primary_key=True),
            Column("c_videos_authorid", String),
            Column("c_videos_audioid", String),
            Column("c_authors_id", String),
            Column("c_authors_nicknames", String),
            Column("c_authors_uniqueids", String),
            Column("c_texts_text_content", String)
        ),
        # New: Media table definition
        "media_table": Table("media", metadata,
            Column("video_id", String, primary_key=True),
            Column("author_id", String),
            Column("video_path", String),
            Column("cover_path", String),
            Column("title", String),
            Column("description", String),
            Column("tags", String),
        ),
        # New: Upload Status table
        "upload_status_table": Table("upload_status", metadata,
            Column("id", Integer, primary_key=True, autoincrement=True),
            Column("video_id", String, ForeignKey("media.video_id")),
            Column("status", String),  # pending, in_progress, completed, failed
            Column("upload_timestamp", DateTime, default=datetime.utcnow),
            Column("r2_video_url", Text),
            Column("r2_cover_url", Text),
            Column("retry_count", Integer, default=0),
            Column("last_error", Text)
        )
    }