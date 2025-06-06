
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.AuthorsScalarFieldEnum = {
  authors_id: 'authors_id',
  authors_uniqueids: 'authors_uniqueids',
  authors_nicknames: 'authors_nicknames',
  authors_followercount: 'authors_followercount',
  authors_heartcount: 'authors_heartcount',
  authors_videocount: 'authors_videocount',
  authors_signature: 'authors_signature',
  authors_privateaccount: 'authors_privateaccount'
};

exports.Prisma.BookmarksScalarFieldEnum = {
  bookmarks_officiallist: 'bookmarks_officiallist',
  bookmarks_downloaded: 'bookmarks_downloaded',
  bookmarks_total: 'bookmarks_total',
  bookmarks_numdisappeared: 'bookmarks_numdisappeared',
  bookmarks_lastrun: 'bookmarks_lastrun'
};

exports.Prisma.ConsolidatedScalarFieldEnum = {
  c_videos_id: 'c_videos_id',
  c_videos_authorid: 'c_videos_authorid',
  c_videos_audioid: 'c_videos_audioid',
  c_authors_id: 'c_authors_id',
  c_authors_nicknames: 'c_authors_nicknames',
  c_authors_uniqueids: 'c_authors_uniqueids',
  c_texts_text_content: 'c_texts_text_content'
};

exports.Prisma.FollowingScalarFieldEnum = {
  following_author_id: 'following_author_id',
  following_official: 'following_official',
  following_started: 'following_started',
  following_not_interested: 'following_not_interested',
  following_infolder: 'following_infolder',
  following_disappeared: 'following_disappeared',
  following_last_run_start: 'following_last_run_start',
  following_last_run_finish: 'following_last_run_finish',
  following_last_run_bottom: 'following_last_run_bottom',
  following_last_run_firstadded: 'following_last_run_firstadded'
};

exports.Prisma.LikesScalarFieldEnum = {
  likes_schemaversion: 'likes_schemaversion',
  likes_user: 'likes_user',
  likes_likes: 'likes_likes'
};

exports.Prisma.MediaScalarFieldEnum = {
  video_id: 'video_id',
  author_id: 'author_id',
  video_path: 'video_path',
  cover_path: 'cover_path',
  title: 'title',
  description: 'description',
  tags: 'tags'
};

exports.Prisma.TextsScalarFieldEnum = {
  texts_text_id: 'texts_text_id',
  texts_text_content: 'texts_text_content'
};

exports.Prisma.Upload_statusScalarFieldEnum = {
  id: 'id',
  video_id: 'video_id',
  status: 'status',
  upload_timestamp: 'upload_timestamp',
  r2_video_url: 'r2_video_url',
  r2_cover_url: 'r2_cover_url',
  retry_count: 'retry_count',
  last_error: 'last_error'
};

exports.Prisma.VideosScalarFieldEnum = {
  videos_id: 'videos_id',
  videos_authorid: 'videos_authorid',
  videos_createtime: 'videos_createtime',
  videos_diggcount: 'videos_diggcount',
  videos_playcount: 'videos_playcount',
  videos_audioid: 'videos_audioid',
  videos_size: 'videos_size',
  videos_itemmute: 'videos_itemmute'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  authors: 'authors',
  bookmarks: 'bookmarks',
  consolidated: 'consolidated',
  following: 'following',
  likes: 'likes',
  media: 'media',
  texts: 'texts',
  upload_status: 'upload_status',
  videos: 'videos'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
