
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model alembic_version
 * 
 */
export type alembic_version = $Result.DefaultSelection<Prisma.$alembic_versionPayload>
/**
 * Model authors
 * 
 */
export type authors = $Result.DefaultSelection<Prisma.$authorsPayload>
/**
 * Model bookmarks
 * 
 */
export type bookmarks = $Result.DefaultSelection<Prisma.$bookmarksPayload>
/**
 * Model consolidated
 * 
 */
export type consolidated = $Result.DefaultSelection<Prisma.$consolidatedPayload>
/**
 * Model following
 * 
 */
export type following = $Result.DefaultSelection<Prisma.$followingPayload>
/**
 * Model likes
 * 
 */
export type likes = $Result.DefaultSelection<Prisma.$likesPayload>
/**
 * Model media
 * 
 */
export type media = $Result.DefaultSelection<Prisma.$mediaPayload>
/**
 * Model texts
 * 
 */
export type texts = $Result.DefaultSelection<Prisma.$textsPayload>
/**
 * Model upload_status
 * 
 */
export type upload_status = $Result.DefaultSelection<Prisma.$upload_statusPayload>
/**
 * Model videos
 * 
 */
export type videos = $Result.DefaultSelection<Prisma.$videosPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const mediatype: {
  VIDEO: 'VIDEO',
  IMAGE: 'IMAGE'
};

export type mediatype = (typeof mediatype)[keyof typeof mediatype]

}

export type mediatype = $Enums.mediatype

export const mediatype: typeof $Enums.mediatype

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Alembic_versions
 * const alembic_versions = await prisma.alembic_version.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Alembic_versions
   * const alembic_versions = await prisma.alembic_version.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.alembic_version`: Exposes CRUD operations for the **alembic_version** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Alembic_versions
    * const alembic_versions = await prisma.alembic_version.findMany()
    * ```
    */
  get alembic_version(): Prisma.alembic_versionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.authors`: Exposes CRUD operations for the **authors** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Authors
    * const authors = await prisma.authors.findMany()
    * ```
    */
  get authors(): Prisma.authorsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bookmarks`: Exposes CRUD operations for the **bookmarks** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bookmarks
    * const bookmarks = await prisma.bookmarks.findMany()
    * ```
    */
  get bookmarks(): Prisma.bookmarksDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.consolidated`: Exposes CRUD operations for the **consolidated** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Consolidateds
    * const consolidateds = await prisma.consolidated.findMany()
    * ```
    */
  get consolidated(): Prisma.consolidatedDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.following`: Exposes CRUD operations for the **following** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Followings
    * const followings = await prisma.following.findMany()
    * ```
    */
  get following(): Prisma.followingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.likes`: Exposes CRUD operations for the **likes** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Likes
    * const likes = await prisma.likes.findMany()
    * ```
    */
  get likes(): Prisma.likesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.media`: Exposes CRUD operations for the **media** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Media
    * const media = await prisma.media.findMany()
    * ```
    */
  get media(): Prisma.mediaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.texts`: Exposes CRUD operations for the **texts** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Texts
    * const texts = await prisma.texts.findMany()
    * ```
    */
  get texts(): Prisma.textsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.upload_status`: Exposes CRUD operations for the **upload_status** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Upload_statuses
    * const upload_statuses = await prisma.upload_status.findMany()
    * ```
    */
  get upload_status(): Prisma.upload_statusDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.videos`: Exposes CRUD operations for the **videos** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Videos
    * const videos = await prisma.videos.findMany()
    * ```
    */
  get videos(): Prisma.videosDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    alembic_version: 'alembic_version',
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

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "alembic_version" | "authors" | "bookmarks" | "consolidated" | "following" | "likes" | "media" | "texts" | "upload_status" | "videos"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      alembic_version: {
        payload: Prisma.$alembic_versionPayload<ExtArgs>
        fields: Prisma.alembic_versionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.alembic_versionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$alembic_versionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.alembic_versionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$alembic_versionPayload>
          }
          findFirst: {
            args: Prisma.alembic_versionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$alembic_versionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.alembic_versionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$alembic_versionPayload>
          }
          findMany: {
            args: Prisma.alembic_versionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$alembic_versionPayload>[]
          }
          create: {
            args: Prisma.alembic_versionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$alembic_versionPayload>
          }
          createMany: {
            args: Prisma.alembic_versionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.alembic_versionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$alembic_versionPayload>[]
          }
          delete: {
            args: Prisma.alembic_versionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$alembic_versionPayload>
          }
          update: {
            args: Prisma.alembic_versionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$alembic_versionPayload>
          }
          deleteMany: {
            args: Prisma.alembic_versionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.alembic_versionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.alembic_versionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$alembic_versionPayload>[]
          }
          upsert: {
            args: Prisma.alembic_versionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$alembic_versionPayload>
          }
          aggregate: {
            args: Prisma.Alembic_versionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAlembic_version>
          }
          groupBy: {
            args: Prisma.alembic_versionGroupByArgs<ExtArgs>
            result: $Utils.Optional<Alembic_versionGroupByOutputType>[]
          }
          count: {
            args: Prisma.alembic_versionCountArgs<ExtArgs>
            result: $Utils.Optional<Alembic_versionCountAggregateOutputType> | number
          }
        }
      }
      authors: {
        payload: Prisma.$authorsPayload<ExtArgs>
        fields: Prisma.authorsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.authorsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$authorsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.authorsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$authorsPayload>
          }
          findFirst: {
            args: Prisma.authorsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$authorsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.authorsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$authorsPayload>
          }
          findMany: {
            args: Prisma.authorsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$authorsPayload>[]
          }
          create: {
            args: Prisma.authorsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$authorsPayload>
          }
          createMany: {
            args: Prisma.authorsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.authorsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$authorsPayload>[]
          }
          delete: {
            args: Prisma.authorsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$authorsPayload>
          }
          update: {
            args: Prisma.authorsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$authorsPayload>
          }
          deleteMany: {
            args: Prisma.authorsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.authorsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.authorsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$authorsPayload>[]
          }
          upsert: {
            args: Prisma.authorsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$authorsPayload>
          }
          aggregate: {
            args: Prisma.AuthorsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuthors>
          }
          groupBy: {
            args: Prisma.authorsGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuthorsGroupByOutputType>[]
          }
          count: {
            args: Prisma.authorsCountArgs<ExtArgs>
            result: $Utils.Optional<AuthorsCountAggregateOutputType> | number
          }
        }
      }
      bookmarks: {
        payload: Prisma.$bookmarksPayload<ExtArgs>
        fields: Prisma.bookmarksFieldRefs
        operations: {
          findUnique: {
            args: Prisma.bookmarksFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookmarksPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.bookmarksFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookmarksPayload>
          }
          findFirst: {
            args: Prisma.bookmarksFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookmarksPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.bookmarksFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookmarksPayload>
          }
          findMany: {
            args: Prisma.bookmarksFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookmarksPayload>[]
          }
          create: {
            args: Prisma.bookmarksCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookmarksPayload>
          }
          createMany: {
            args: Prisma.bookmarksCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.bookmarksCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookmarksPayload>[]
          }
          delete: {
            args: Prisma.bookmarksDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookmarksPayload>
          }
          update: {
            args: Prisma.bookmarksUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookmarksPayload>
          }
          deleteMany: {
            args: Prisma.bookmarksDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.bookmarksUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.bookmarksUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookmarksPayload>[]
          }
          upsert: {
            args: Prisma.bookmarksUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookmarksPayload>
          }
          aggregate: {
            args: Prisma.BookmarksAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBookmarks>
          }
          groupBy: {
            args: Prisma.bookmarksGroupByArgs<ExtArgs>
            result: $Utils.Optional<BookmarksGroupByOutputType>[]
          }
          count: {
            args: Prisma.bookmarksCountArgs<ExtArgs>
            result: $Utils.Optional<BookmarksCountAggregateOutputType> | number
          }
        }
      }
      consolidated: {
        payload: Prisma.$consolidatedPayload<ExtArgs>
        fields: Prisma.consolidatedFieldRefs
        operations: {
          findUnique: {
            args: Prisma.consolidatedFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$consolidatedPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.consolidatedFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$consolidatedPayload>
          }
          findFirst: {
            args: Prisma.consolidatedFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$consolidatedPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.consolidatedFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$consolidatedPayload>
          }
          findMany: {
            args: Prisma.consolidatedFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$consolidatedPayload>[]
          }
          create: {
            args: Prisma.consolidatedCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$consolidatedPayload>
          }
          createMany: {
            args: Prisma.consolidatedCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.consolidatedCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$consolidatedPayload>[]
          }
          delete: {
            args: Prisma.consolidatedDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$consolidatedPayload>
          }
          update: {
            args: Prisma.consolidatedUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$consolidatedPayload>
          }
          deleteMany: {
            args: Prisma.consolidatedDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.consolidatedUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.consolidatedUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$consolidatedPayload>[]
          }
          upsert: {
            args: Prisma.consolidatedUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$consolidatedPayload>
          }
          aggregate: {
            args: Prisma.ConsolidatedAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConsolidated>
          }
          groupBy: {
            args: Prisma.consolidatedGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConsolidatedGroupByOutputType>[]
          }
          count: {
            args: Prisma.consolidatedCountArgs<ExtArgs>
            result: $Utils.Optional<ConsolidatedCountAggregateOutputType> | number
          }
        }
      }
      following: {
        payload: Prisma.$followingPayload<ExtArgs>
        fields: Prisma.followingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.followingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$followingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.followingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$followingPayload>
          }
          findFirst: {
            args: Prisma.followingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$followingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.followingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$followingPayload>
          }
          findMany: {
            args: Prisma.followingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$followingPayload>[]
          }
          create: {
            args: Prisma.followingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$followingPayload>
          }
          createMany: {
            args: Prisma.followingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.followingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$followingPayload>[]
          }
          delete: {
            args: Prisma.followingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$followingPayload>
          }
          update: {
            args: Prisma.followingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$followingPayload>
          }
          deleteMany: {
            args: Prisma.followingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.followingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.followingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$followingPayload>[]
          }
          upsert: {
            args: Prisma.followingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$followingPayload>
          }
          aggregate: {
            args: Prisma.FollowingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFollowing>
          }
          groupBy: {
            args: Prisma.followingGroupByArgs<ExtArgs>
            result: $Utils.Optional<FollowingGroupByOutputType>[]
          }
          count: {
            args: Prisma.followingCountArgs<ExtArgs>
            result: $Utils.Optional<FollowingCountAggregateOutputType> | number
          }
        }
      }
      likes: {
        payload: Prisma.$likesPayload<ExtArgs>
        fields: Prisma.likesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.likesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$likesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.likesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$likesPayload>
          }
          findFirst: {
            args: Prisma.likesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$likesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.likesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$likesPayload>
          }
          findMany: {
            args: Prisma.likesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$likesPayload>[]
          }
          create: {
            args: Prisma.likesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$likesPayload>
          }
          createMany: {
            args: Prisma.likesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.likesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$likesPayload>[]
          }
          delete: {
            args: Prisma.likesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$likesPayload>
          }
          update: {
            args: Prisma.likesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$likesPayload>
          }
          deleteMany: {
            args: Prisma.likesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.likesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.likesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$likesPayload>[]
          }
          upsert: {
            args: Prisma.likesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$likesPayload>
          }
          aggregate: {
            args: Prisma.LikesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLikes>
          }
          groupBy: {
            args: Prisma.likesGroupByArgs<ExtArgs>
            result: $Utils.Optional<LikesGroupByOutputType>[]
          }
          count: {
            args: Prisma.likesCountArgs<ExtArgs>
            result: $Utils.Optional<LikesCountAggregateOutputType> | number
          }
        }
      }
      media: {
        payload: Prisma.$mediaPayload<ExtArgs>
        fields: Prisma.mediaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.mediaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mediaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.mediaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mediaPayload>
          }
          findFirst: {
            args: Prisma.mediaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mediaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.mediaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mediaPayload>
          }
          findMany: {
            args: Prisma.mediaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mediaPayload>[]
          }
          create: {
            args: Prisma.mediaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mediaPayload>
          }
          createMany: {
            args: Prisma.mediaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.mediaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mediaPayload>[]
          }
          delete: {
            args: Prisma.mediaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mediaPayload>
          }
          update: {
            args: Prisma.mediaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mediaPayload>
          }
          deleteMany: {
            args: Prisma.mediaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.mediaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.mediaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mediaPayload>[]
          }
          upsert: {
            args: Prisma.mediaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mediaPayload>
          }
          aggregate: {
            args: Prisma.MediaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMedia>
          }
          groupBy: {
            args: Prisma.mediaGroupByArgs<ExtArgs>
            result: $Utils.Optional<MediaGroupByOutputType>[]
          }
          count: {
            args: Prisma.mediaCountArgs<ExtArgs>
            result: $Utils.Optional<MediaCountAggregateOutputType> | number
          }
        }
      }
      texts: {
        payload: Prisma.$textsPayload<ExtArgs>
        fields: Prisma.textsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.textsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$textsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.textsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$textsPayload>
          }
          findFirst: {
            args: Prisma.textsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$textsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.textsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$textsPayload>
          }
          findMany: {
            args: Prisma.textsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$textsPayload>[]
          }
          create: {
            args: Prisma.textsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$textsPayload>
          }
          createMany: {
            args: Prisma.textsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.textsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$textsPayload>[]
          }
          delete: {
            args: Prisma.textsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$textsPayload>
          }
          update: {
            args: Prisma.textsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$textsPayload>
          }
          deleteMany: {
            args: Prisma.textsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.textsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.textsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$textsPayload>[]
          }
          upsert: {
            args: Prisma.textsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$textsPayload>
          }
          aggregate: {
            args: Prisma.TextsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTexts>
          }
          groupBy: {
            args: Prisma.textsGroupByArgs<ExtArgs>
            result: $Utils.Optional<TextsGroupByOutputType>[]
          }
          count: {
            args: Prisma.textsCountArgs<ExtArgs>
            result: $Utils.Optional<TextsCountAggregateOutputType> | number
          }
        }
      }
      upload_status: {
        payload: Prisma.$upload_statusPayload<ExtArgs>
        fields: Prisma.upload_statusFieldRefs
        operations: {
          findUnique: {
            args: Prisma.upload_statusFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$upload_statusPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.upload_statusFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$upload_statusPayload>
          }
          findFirst: {
            args: Prisma.upload_statusFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$upload_statusPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.upload_statusFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$upload_statusPayload>
          }
          findMany: {
            args: Prisma.upload_statusFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$upload_statusPayload>[]
          }
          create: {
            args: Prisma.upload_statusCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$upload_statusPayload>
          }
          createMany: {
            args: Prisma.upload_statusCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.upload_statusCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$upload_statusPayload>[]
          }
          delete: {
            args: Prisma.upload_statusDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$upload_statusPayload>
          }
          update: {
            args: Prisma.upload_statusUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$upload_statusPayload>
          }
          deleteMany: {
            args: Prisma.upload_statusDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.upload_statusUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.upload_statusUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$upload_statusPayload>[]
          }
          upsert: {
            args: Prisma.upload_statusUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$upload_statusPayload>
          }
          aggregate: {
            args: Prisma.Upload_statusAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUpload_status>
          }
          groupBy: {
            args: Prisma.upload_statusGroupByArgs<ExtArgs>
            result: $Utils.Optional<Upload_statusGroupByOutputType>[]
          }
          count: {
            args: Prisma.upload_statusCountArgs<ExtArgs>
            result: $Utils.Optional<Upload_statusCountAggregateOutputType> | number
          }
        }
      }
      videos: {
        payload: Prisma.$videosPayload<ExtArgs>
        fields: Prisma.videosFieldRefs
        operations: {
          findUnique: {
            args: Prisma.videosFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$videosPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.videosFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$videosPayload>
          }
          findFirst: {
            args: Prisma.videosFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$videosPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.videosFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$videosPayload>
          }
          findMany: {
            args: Prisma.videosFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$videosPayload>[]
          }
          create: {
            args: Prisma.videosCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$videosPayload>
          }
          createMany: {
            args: Prisma.videosCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.videosCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$videosPayload>[]
          }
          delete: {
            args: Prisma.videosDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$videosPayload>
          }
          update: {
            args: Prisma.videosUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$videosPayload>
          }
          deleteMany: {
            args: Prisma.videosDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.videosUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.videosUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$videosPayload>[]
          }
          upsert: {
            args: Prisma.videosUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$videosPayload>
          }
          aggregate: {
            args: Prisma.VideosAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVideos>
          }
          groupBy: {
            args: Prisma.videosGroupByArgs<ExtArgs>
            result: $Utils.Optional<VideosGroupByOutputType>[]
          }
          count: {
            args: Prisma.videosCountArgs<ExtArgs>
            result: $Utils.Optional<VideosCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    alembic_version?: alembic_versionOmit
    authors?: authorsOmit
    bookmarks?: bookmarksOmit
    consolidated?: consolidatedOmit
    following?: followingOmit
    likes?: likesOmit
    media?: mediaOmit
    texts?: textsOmit
    upload_status?: upload_statusOmit
    videos?: videosOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type MediaCountOutputType
   */

  export type MediaCountOutputType = {
    upload_status: number
  }

  export type MediaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    upload_status?: boolean | MediaCountOutputTypeCountUpload_statusArgs
  }

  // Custom InputTypes
  /**
   * MediaCountOutputType without action
   */
  export type MediaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaCountOutputType
     */
    select?: MediaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MediaCountOutputType without action
   */
  export type MediaCountOutputTypeCountUpload_statusArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: upload_statusWhereInput
  }


  /**
   * Models
   */

  /**
   * Model alembic_version
   */

  export type AggregateAlembic_version = {
    _count: Alembic_versionCountAggregateOutputType | null
    _min: Alembic_versionMinAggregateOutputType | null
    _max: Alembic_versionMaxAggregateOutputType | null
  }

  export type Alembic_versionMinAggregateOutputType = {
    version_num: string | null
  }

  export type Alembic_versionMaxAggregateOutputType = {
    version_num: string | null
  }

  export type Alembic_versionCountAggregateOutputType = {
    version_num: number
    _all: number
  }


  export type Alembic_versionMinAggregateInputType = {
    version_num?: true
  }

  export type Alembic_versionMaxAggregateInputType = {
    version_num?: true
  }

  export type Alembic_versionCountAggregateInputType = {
    version_num?: true
    _all?: true
  }

  export type Alembic_versionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which alembic_version to aggregate.
     */
    where?: alembic_versionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of alembic_versions to fetch.
     */
    orderBy?: alembic_versionOrderByWithRelationInput | alembic_versionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: alembic_versionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` alembic_versions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` alembic_versions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned alembic_versions
    **/
    _count?: true | Alembic_versionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Alembic_versionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Alembic_versionMaxAggregateInputType
  }

  export type GetAlembic_versionAggregateType<T extends Alembic_versionAggregateArgs> = {
        [P in keyof T & keyof AggregateAlembic_version]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAlembic_version[P]>
      : GetScalarType<T[P], AggregateAlembic_version[P]>
  }




  export type alembic_versionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: alembic_versionWhereInput
    orderBy?: alembic_versionOrderByWithAggregationInput | alembic_versionOrderByWithAggregationInput[]
    by: Alembic_versionScalarFieldEnum[] | Alembic_versionScalarFieldEnum
    having?: alembic_versionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Alembic_versionCountAggregateInputType | true
    _min?: Alembic_versionMinAggregateInputType
    _max?: Alembic_versionMaxAggregateInputType
  }

  export type Alembic_versionGroupByOutputType = {
    version_num: string
    _count: Alembic_versionCountAggregateOutputType | null
    _min: Alembic_versionMinAggregateOutputType | null
    _max: Alembic_versionMaxAggregateOutputType | null
  }

  type GetAlembic_versionGroupByPayload<T extends alembic_versionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Alembic_versionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Alembic_versionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Alembic_versionGroupByOutputType[P]>
            : GetScalarType<T[P], Alembic_versionGroupByOutputType[P]>
        }
      >
    >


  export type alembic_versionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    version_num?: boolean
  }, ExtArgs["result"]["alembic_version"]>

  export type alembic_versionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    version_num?: boolean
  }, ExtArgs["result"]["alembic_version"]>

  export type alembic_versionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    version_num?: boolean
  }, ExtArgs["result"]["alembic_version"]>

  export type alembic_versionSelectScalar = {
    version_num?: boolean
  }

  export type alembic_versionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"version_num", ExtArgs["result"]["alembic_version"]>

  export type $alembic_versionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "alembic_version"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      version_num: string
    }, ExtArgs["result"]["alembic_version"]>
    composites: {}
  }

  type alembic_versionGetPayload<S extends boolean | null | undefined | alembic_versionDefaultArgs> = $Result.GetResult<Prisma.$alembic_versionPayload, S>

  type alembic_versionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<alembic_versionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Alembic_versionCountAggregateInputType | true
    }

  export interface alembic_versionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['alembic_version'], meta: { name: 'alembic_version' } }
    /**
     * Find zero or one Alembic_version that matches the filter.
     * @param {alembic_versionFindUniqueArgs} args - Arguments to find a Alembic_version
     * @example
     * // Get one Alembic_version
     * const alembic_version = await prisma.alembic_version.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends alembic_versionFindUniqueArgs>(args: SelectSubset<T, alembic_versionFindUniqueArgs<ExtArgs>>): Prisma__alembic_versionClient<$Result.GetResult<Prisma.$alembic_versionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Alembic_version that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {alembic_versionFindUniqueOrThrowArgs} args - Arguments to find a Alembic_version
     * @example
     * // Get one Alembic_version
     * const alembic_version = await prisma.alembic_version.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends alembic_versionFindUniqueOrThrowArgs>(args: SelectSubset<T, alembic_versionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__alembic_versionClient<$Result.GetResult<Prisma.$alembic_versionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Alembic_version that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {alembic_versionFindFirstArgs} args - Arguments to find a Alembic_version
     * @example
     * // Get one Alembic_version
     * const alembic_version = await prisma.alembic_version.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends alembic_versionFindFirstArgs>(args?: SelectSubset<T, alembic_versionFindFirstArgs<ExtArgs>>): Prisma__alembic_versionClient<$Result.GetResult<Prisma.$alembic_versionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Alembic_version that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {alembic_versionFindFirstOrThrowArgs} args - Arguments to find a Alembic_version
     * @example
     * // Get one Alembic_version
     * const alembic_version = await prisma.alembic_version.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends alembic_versionFindFirstOrThrowArgs>(args?: SelectSubset<T, alembic_versionFindFirstOrThrowArgs<ExtArgs>>): Prisma__alembic_versionClient<$Result.GetResult<Prisma.$alembic_versionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Alembic_versions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {alembic_versionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Alembic_versions
     * const alembic_versions = await prisma.alembic_version.findMany()
     * 
     * // Get first 10 Alembic_versions
     * const alembic_versions = await prisma.alembic_version.findMany({ take: 10 })
     * 
     * // Only select the `version_num`
     * const alembic_versionWithVersion_numOnly = await prisma.alembic_version.findMany({ select: { version_num: true } })
     * 
     */
    findMany<T extends alembic_versionFindManyArgs>(args?: SelectSubset<T, alembic_versionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$alembic_versionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Alembic_version.
     * @param {alembic_versionCreateArgs} args - Arguments to create a Alembic_version.
     * @example
     * // Create one Alembic_version
     * const Alembic_version = await prisma.alembic_version.create({
     *   data: {
     *     // ... data to create a Alembic_version
     *   }
     * })
     * 
     */
    create<T extends alembic_versionCreateArgs>(args: SelectSubset<T, alembic_versionCreateArgs<ExtArgs>>): Prisma__alembic_versionClient<$Result.GetResult<Prisma.$alembic_versionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Alembic_versions.
     * @param {alembic_versionCreateManyArgs} args - Arguments to create many Alembic_versions.
     * @example
     * // Create many Alembic_versions
     * const alembic_version = await prisma.alembic_version.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends alembic_versionCreateManyArgs>(args?: SelectSubset<T, alembic_versionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Alembic_versions and returns the data saved in the database.
     * @param {alembic_versionCreateManyAndReturnArgs} args - Arguments to create many Alembic_versions.
     * @example
     * // Create many Alembic_versions
     * const alembic_version = await prisma.alembic_version.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Alembic_versions and only return the `version_num`
     * const alembic_versionWithVersion_numOnly = await prisma.alembic_version.createManyAndReturn({
     *   select: { version_num: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends alembic_versionCreateManyAndReturnArgs>(args?: SelectSubset<T, alembic_versionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$alembic_versionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Alembic_version.
     * @param {alembic_versionDeleteArgs} args - Arguments to delete one Alembic_version.
     * @example
     * // Delete one Alembic_version
     * const Alembic_version = await prisma.alembic_version.delete({
     *   where: {
     *     // ... filter to delete one Alembic_version
     *   }
     * })
     * 
     */
    delete<T extends alembic_versionDeleteArgs>(args: SelectSubset<T, alembic_versionDeleteArgs<ExtArgs>>): Prisma__alembic_versionClient<$Result.GetResult<Prisma.$alembic_versionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Alembic_version.
     * @param {alembic_versionUpdateArgs} args - Arguments to update one Alembic_version.
     * @example
     * // Update one Alembic_version
     * const alembic_version = await prisma.alembic_version.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends alembic_versionUpdateArgs>(args: SelectSubset<T, alembic_versionUpdateArgs<ExtArgs>>): Prisma__alembic_versionClient<$Result.GetResult<Prisma.$alembic_versionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Alembic_versions.
     * @param {alembic_versionDeleteManyArgs} args - Arguments to filter Alembic_versions to delete.
     * @example
     * // Delete a few Alembic_versions
     * const { count } = await prisma.alembic_version.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends alembic_versionDeleteManyArgs>(args?: SelectSubset<T, alembic_versionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Alembic_versions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {alembic_versionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Alembic_versions
     * const alembic_version = await prisma.alembic_version.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends alembic_versionUpdateManyArgs>(args: SelectSubset<T, alembic_versionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Alembic_versions and returns the data updated in the database.
     * @param {alembic_versionUpdateManyAndReturnArgs} args - Arguments to update many Alembic_versions.
     * @example
     * // Update many Alembic_versions
     * const alembic_version = await prisma.alembic_version.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Alembic_versions and only return the `version_num`
     * const alembic_versionWithVersion_numOnly = await prisma.alembic_version.updateManyAndReturn({
     *   select: { version_num: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends alembic_versionUpdateManyAndReturnArgs>(args: SelectSubset<T, alembic_versionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$alembic_versionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Alembic_version.
     * @param {alembic_versionUpsertArgs} args - Arguments to update or create a Alembic_version.
     * @example
     * // Update or create a Alembic_version
     * const alembic_version = await prisma.alembic_version.upsert({
     *   create: {
     *     // ... data to create a Alembic_version
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Alembic_version we want to update
     *   }
     * })
     */
    upsert<T extends alembic_versionUpsertArgs>(args: SelectSubset<T, alembic_versionUpsertArgs<ExtArgs>>): Prisma__alembic_versionClient<$Result.GetResult<Prisma.$alembic_versionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Alembic_versions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {alembic_versionCountArgs} args - Arguments to filter Alembic_versions to count.
     * @example
     * // Count the number of Alembic_versions
     * const count = await prisma.alembic_version.count({
     *   where: {
     *     // ... the filter for the Alembic_versions we want to count
     *   }
     * })
    **/
    count<T extends alembic_versionCountArgs>(
      args?: Subset<T, alembic_versionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Alembic_versionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Alembic_version.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Alembic_versionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Alembic_versionAggregateArgs>(args: Subset<T, Alembic_versionAggregateArgs>): Prisma.PrismaPromise<GetAlembic_versionAggregateType<T>>

    /**
     * Group by Alembic_version.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {alembic_versionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends alembic_versionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: alembic_versionGroupByArgs['orderBy'] }
        : { orderBy?: alembic_versionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, alembic_versionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAlembic_versionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the alembic_version model
   */
  readonly fields: alembic_versionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for alembic_version.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__alembic_versionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the alembic_version model
   */
  interface alembic_versionFieldRefs {
    readonly version_num: FieldRef<"alembic_version", 'String'>
  }
    

  // Custom InputTypes
  /**
   * alembic_version findUnique
   */
  export type alembic_versionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alembic_version
     */
    select?: alembic_versionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the alembic_version
     */
    omit?: alembic_versionOmit<ExtArgs> | null
    /**
     * Filter, which alembic_version to fetch.
     */
    where: alembic_versionWhereUniqueInput
  }

  /**
   * alembic_version findUniqueOrThrow
   */
  export type alembic_versionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alembic_version
     */
    select?: alembic_versionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the alembic_version
     */
    omit?: alembic_versionOmit<ExtArgs> | null
    /**
     * Filter, which alembic_version to fetch.
     */
    where: alembic_versionWhereUniqueInput
  }

  /**
   * alembic_version findFirst
   */
  export type alembic_versionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alembic_version
     */
    select?: alembic_versionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the alembic_version
     */
    omit?: alembic_versionOmit<ExtArgs> | null
    /**
     * Filter, which alembic_version to fetch.
     */
    where?: alembic_versionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of alembic_versions to fetch.
     */
    orderBy?: alembic_versionOrderByWithRelationInput | alembic_versionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for alembic_versions.
     */
    cursor?: alembic_versionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` alembic_versions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` alembic_versions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of alembic_versions.
     */
    distinct?: Alembic_versionScalarFieldEnum | Alembic_versionScalarFieldEnum[]
  }

  /**
   * alembic_version findFirstOrThrow
   */
  export type alembic_versionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alembic_version
     */
    select?: alembic_versionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the alembic_version
     */
    omit?: alembic_versionOmit<ExtArgs> | null
    /**
     * Filter, which alembic_version to fetch.
     */
    where?: alembic_versionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of alembic_versions to fetch.
     */
    orderBy?: alembic_versionOrderByWithRelationInput | alembic_versionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for alembic_versions.
     */
    cursor?: alembic_versionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` alembic_versions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` alembic_versions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of alembic_versions.
     */
    distinct?: Alembic_versionScalarFieldEnum | Alembic_versionScalarFieldEnum[]
  }

  /**
   * alembic_version findMany
   */
  export type alembic_versionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alembic_version
     */
    select?: alembic_versionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the alembic_version
     */
    omit?: alembic_versionOmit<ExtArgs> | null
    /**
     * Filter, which alembic_versions to fetch.
     */
    where?: alembic_versionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of alembic_versions to fetch.
     */
    orderBy?: alembic_versionOrderByWithRelationInput | alembic_versionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing alembic_versions.
     */
    cursor?: alembic_versionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` alembic_versions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` alembic_versions.
     */
    skip?: number
    distinct?: Alembic_versionScalarFieldEnum | Alembic_versionScalarFieldEnum[]
  }

  /**
   * alembic_version create
   */
  export type alembic_versionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alembic_version
     */
    select?: alembic_versionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the alembic_version
     */
    omit?: alembic_versionOmit<ExtArgs> | null
    /**
     * The data needed to create a alembic_version.
     */
    data: XOR<alembic_versionCreateInput, alembic_versionUncheckedCreateInput>
  }

  /**
   * alembic_version createMany
   */
  export type alembic_versionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many alembic_versions.
     */
    data: alembic_versionCreateManyInput | alembic_versionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * alembic_version createManyAndReturn
   */
  export type alembic_versionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alembic_version
     */
    select?: alembic_versionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the alembic_version
     */
    omit?: alembic_versionOmit<ExtArgs> | null
    /**
     * The data used to create many alembic_versions.
     */
    data: alembic_versionCreateManyInput | alembic_versionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * alembic_version update
   */
  export type alembic_versionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alembic_version
     */
    select?: alembic_versionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the alembic_version
     */
    omit?: alembic_versionOmit<ExtArgs> | null
    /**
     * The data needed to update a alembic_version.
     */
    data: XOR<alembic_versionUpdateInput, alembic_versionUncheckedUpdateInput>
    /**
     * Choose, which alembic_version to update.
     */
    where: alembic_versionWhereUniqueInput
  }

  /**
   * alembic_version updateMany
   */
  export type alembic_versionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update alembic_versions.
     */
    data: XOR<alembic_versionUpdateManyMutationInput, alembic_versionUncheckedUpdateManyInput>
    /**
     * Filter which alembic_versions to update
     */
    where?: alembic_versionWhereInput
    /**
     * Limit how many alembic_versions to update.
     */
    limit?: number
  }

  /**
   * alembic_version updateManyAndReturn
   */
  export type alembic_versionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alembic_version
     */
    select?: alembic_versionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the alembic_version
     */
    omit?: alembic_versionOmit<ExtArgs> | null
    /**
     * The data used to update alembic_versions.
     */
    data: XOR<alembic_versionUpdateManyMutationInput, alembic_versionUncheckedUpdateManyInput>
    /**
     * Filter which alembic_versions to update
     */
    where?: alembic_versionWhereInput
    /**
     * Limit how many alembic_versions to update.
     */
    limit?: number
  }

  /**
   * alembic_version upsert
   */
  export type alembic_versionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alembic_version
     */
    select?: alembic_versionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the alembic_version
     */
    omit?: alembic_versionOmit<ExtArgs> | null
    /**
     * The filter to search for the alembic_version to update in case it exists.
     */
    where: alembic_versionWhereUniqueInput
    /**
     * In case the alembic_version found by the `where` argument doesn't exist, create a new alembic_version with this data.
     */
    create: XOR<alembic_versionCreateInput, alembic_versionUncheckedCreateInput>
    /**
     * In case the alembic_version was found with the provided `where` argument, update it with this data.
     */
    update: XOR<alembic_versionUpdateInput, alembic_versionUncheckedUpdateInput>
  }

  /**
   * alembic_version delete
   */
  export type alembic_versionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alembic_version
     */
    select?: alembic_versionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the alembic_version
     */
    omit?: alembic_versionOmit<ExtArgs> | null
    /**
     * Filter which alembic_version to delete.
     */
    where: alembic_versionWhereUniqueInput
  }

  /**
   * alembic_version deleteMany
   */
  export type alembic_versionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which alembic_versions to delete
     */
    where?: alembic_versionWhereInput
    /**
     * Limit how many alembic_versions to delete.
     */
    limit?: number
  }

  /**
   * alembic_version without action
   */
  export type alembic_versionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alembic_version
     */
    select?: alembic_versionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the alembic_version
     */
    omit?: alembic_versionOmit<ExtArgs> | null
  }


  /**
   * Model authors
   */

  export type AggregateAuthors = {
    _count: AuthorsCountAggregateOutputType | null
    _min: AuthorsMinAggregateOutputType | null
    _max: AuthorsMaxAggregateOutputType | null
  }

  export type AuthorsMinAggregateOutputType = {
    authors_id: string | null
    authors_uniqueids: string | null
    authors_nicknames: string | null
    authors_followercount: string | null
    authors_heartcount: string | null
    authors_videocount: string | null
    authors_signature: string | null
    authors_privateaccount: boolean | null
  }

  export type AuthorsMaxAggregateOutputType = {
    authors_id: string | null
    authors_uniqueids: string | null
    authors_nicknames: string | null
    authors_followercount: string | null
    authors_heartcount: string | null
    authors_videocount: string | null
    authors_signature: string | null
    authors_privateaccount: boolean | null
  }

  export type AuthorsCountAggregateOutputType = {
    authors_id: number
    authors_uniqueids: number
    authors_nicknames: number
    authors_followercount: number
    authors_heartcount: number
    authors_videocount: number
    authors_signature: number
    authors_privateaccount: number
    _all: number
  }


  export type AuthorsMinAggregateInputType = {
    authors_id?: true
    authors_uniqueids?: true
    authors_nicknames?: true
    authors_followercount?: true
    authors_heartcount?: true
    authors_videocount?: true
    authors_signature?: true
    authors_privateaccount?: true
  }

  export type AuthorsMaxAggregateInputType = {
    authors_id?: true
    authors_uniqueids?: true
    authors_nicknames?: true
    authors_followercount?: true
    authors_heartcount?: true
    authors_videocount?: true
    authors_signature?: true
    authors_privateaccount?: true
  }

  export type AuthorsCountAggregateInputType = {
    authors_id?: true
    authors_uniqueids?: true
    authors_nicknames?: true
    authors_followercount?: true
    authors_heartcount?: true
    authors_videocount?: true
    authors_signature?: true
    authors_privateaccount?: true
    _all?: true
  }

  export type AuthorsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which authors to aggregate.
     */
    where?: authorsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of authors to fetch.
     */
    orderBy?: authorsOrderByWithRelationInput | authorsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: authorsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` authors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` authors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned authors
    **/
    _count?: true | AuthorsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuthorsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuthorsMaxAggregateInputType
  }

  export type GetAuthorsAggregateType<T extends AuthorsAggregateArgs> = {
        [P in keyof T & keyof AggregateAuthors]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuthors[P]>
      : GetScalarType<T[P], AggregateAuthors[P]>
  }




  export type authorsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: authorsWhereInput
    orderBy?: authorsOrderByWithAggregationInput | authorsOrderByWithAggregationInput[]
    by: AuthorsScalarFieldEnum[] | AuthorsScalarFieldEnum
    having?: authorsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuthorsCountAggregateInputType | true
    _min?: AuthorsMinAggregateInputType
    _max?: AuthorsMaxAggregateInputType
  }

  export type AuthorsGroupByOutputType = {
    authors_id: string
    authors_uniqueids: string | null
    authors_nicknames: string | null
    authors_followercount: string | null
    authors_heartcount: string | null
    authors_videocount: string | null
    authors_signature: string | null
    authors_privateaccount: boolean | null
    _count: AuthorsCountAggregateOutputType | null
    _min: AuthorsMinAggregateOutputType | null
    _max: AuthorsMaxAggregateOutputType | null
  }

  type GetAuthorsGroupByPayload<T extends authorsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuthorsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuthorsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuthorsGroupByOutputType[P]>
            : GetScalarType<T[P], AuthorsGroupByOutputType[P]>
        }
      >
    >


  export type authorsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    authors_id?: boolean
    authors_uniqueids?: boolean
    authors_nicknames?: boolean
    authors_followercount?: boolean
    authors_heartcount?: boolean
    authors_videocount?: boolean
    authors_signature?: boolean
    authors_privateaccount?: boolean
  }, ExtArgs["result"]["authors"]>

  export type authorsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    authors_id?: boolean
    authors_uniqueids?: boolean
    authors_nicknames?: boolean
    authors_followercount?: boolean
    authors_heartcount?: boolean
    authors_videocount?: boolean
    authors_signature?: boolean
    authors_privateaccount?: boolean
  }, ExtArgs["result"]["authors"]>

  export type authorsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    authors_id?: boolean
    authors_uniqueids?: boolean
    authors_nicknames?: boolean
    authors_followercount?: boolean
    authors_heartcount?: boolean
    authors_videocount?: boolean
    authors_signature?: boolean
    authors_privateaccount?: boolean
  }, ExtArgs["result"]["authors"]>

  export type authorsSelectScalar = {
    authors_id?: boolean
    authors_uniqueids?: boolean
    authors_nicknames?: boolean
    authors_followercount?: boolean
    authors_heartcount?: boolean
    authors_videocount?: boolean
    authors_signature?: boolean
    authors_privateaccount?: boolean
  }

  export type authorsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"authors_id" | "authors_uniqueids" | "authors_nicknames" | "authors_followercount" | "authors_heartcount" | "authors_videocount" | "authors_signature" | "authors_privateaccount", ExtArgs["result"]["authors"]>

  export type $authorsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "authors"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      authors_id: string
      authors_uniqueids: string | null
      authors_nicknames: string | null
      authors_followercount: string | null
      authors_heartcount: string | null
      authors_videocount: string | null
      authors_signature: string | null
      authors_privateaccount: boolean | null
    }, ExtArgs["result"]["authors"]>
    composites: {}
  }

  type authorsGetPayload<S extends boolean | null | undefined | authorsDefaultArgs> = $Result.GetResult<Prisma.$authorsPayload, S>

  type authorsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<authorsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuthorsCountAggregateInputType | true
    }

  export interface authorsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['authors'], meta: { name: 'authors' } }
    /**
     * Find zero or one Authors that matches the filter.
     * @param {authorsFindUniqueArgs} args - Arguments to find a Authors
     * @example
     * // Get one Authors
     * const authors = await prisma.authors.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends authorsFindUniqueArgs>(args: SelectSubset<T, authorsFindUniqueArgs<ExtArgs>>): Prisma__authorsClient<$Result.GetResult<Prisma.$authorsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Authors that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {authorsFindUniqueOrThrowArgs} args - Arguments to find a Authors
     * @example
     * // Get one Authors
     * const authors = await prisma.authors.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends authorsFindUniqueOrThrowArgs>(args: SelectSubset<T, authorsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__authorsClient<$Result.GetResult<Prisma.$authorsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Authors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {authorsFindFirstArgs} args - Arguments to find a Authors
     * @example
     * // Get one Authors
     * const authors = await prisma.authors.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends authorsFindFirstArgs>(args?: SelectSubset<T, authorsFindFirstArgs<ExtArgs>>): Prisma__authorsClient<$Result.GetResult<Prisma.$authorsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Authors that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {authorsFindFirstOrThrowArgs} args - Arguments to find a Authors
     * @example
     * // Get one Authors
     * const authors = await prisma.authors.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends authorsFindFirstOrThrowArgs>(args?: SelectSubset<T, authorsFindFirstOrThrowArgs<ExtArgs>>): Prisma__authorsClient<$Result.GetResult<Prisma.$authorsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Authors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {authorsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Authors
     * const authors = await prisma.authors.findMany()
     * 
     * // Get first 10 Authors
     * const authors = await prisma.authors.findMany({ take: 10 })
     * 
     * // Only select the `authors_id`
     * const authorsWithAuthors_idOnly = await prisma.authors.findMany({ select: { authors_id: true } })
     * 
     */
    findMany<T extends authorsFindManyArgs>(args?: SelectSubset<T, authorsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$authorsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Authors.
     * @param {authorsCreateArgs} args - Arguments to create a Authors.
     * @example
     * // Create one Authors
     * const Authors = await prisma.authors.create({
     *   data: {
     *     // ... data to create a Authors
     *   }
     * })
     * 
     */
    create<T extends authorsCreateArgs>(args: SelectSubset<T, authorsCreateArgs<ExtArgs>>): Prisma__authorsClient<$Result.GetResult<Prisma.$authorsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Authors.
     * @param {authorsCreateManyArgs} args - Arguments to create many Authors.
     * @example
     * // Create many Authors
     * const authors = await prisma.authors.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends authorsCreateManyArgs>(args?: SelectSubset<T, authorsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Authors and returns the data saved in the database.
     * @param {authorsCreateManyAndReturnArgs} args - Arguments to create many Authors.
     * @example
     * // Create many Authors
     * const authors = await prisma.authors.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Authors and only return the `authors_id`
     * const authorsWithAuthors_idOnly = await prisma.authors.createManyAndReturn({
     *   select: { authors_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends authorsCreateManyAndReturnArgs>(args?: SelectSubset<T, authorsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$authorsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Authors.
     * @param {authorsDeleteArgs} args - Arguments to delete one Authors.
     * @example
     * // Delete one Authors
     * const Authors = await prisma.authors.delete({
     *   where: {
     *     // ... filter to delete one Authors
     *   }
     * })
     * 
     */
    delete<T extends authorsDeleteArgs>(args: SelectSubset<T, authorsDeleteArgs<ExtArgs>>): Prisma__authorsClient<$Result.GetResult<Prisma.$authorsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Authors.
     * @param {authorsUpdateArgs} args - Arguments to update one Authors.
     * @example
     * // Update one Authors
     * const authors = await prisma.authors.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends authorsUpdateArgs>(args: SelectSubset<T, authorsUpdateArgs<ExtArgs>>): Prisma__authorsClient<$Result.GetResult<Prisma.$authorsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Authors.
     * @param {authorsDeleteManyArgs} args - Arguments to filter Authors to delete.
     * @example
     * // Delete a few Authors
     * const { count } = await prisma.authors.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends authorsDeleteManyArgs>(args?: SelectSubset<T, authorsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Authors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {authorsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Authors
     * const authors = await prisma.authors.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends authorsUpdateManyArgs>(args: SelectSubset<T, authorsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Authors and returns the data updated in the database.
     * @param {authorsUpdateManyAndReturnArgs} args - Arguments to update many Authors.
     * @example
     * // Update many Authors
     * const authors = await prisma.authors.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Authors and only return the `authors_id`
     * const authorsWithAuthors_idOnly = await prisma.authors.updateManyAndReturn({
     *   select: { authors_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends authorsUpdateManyAndReturnArgs>(args: SelectSubset<T, authorsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$authorsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Authors.
     * @param {authorsUpsertArgs} args - Arguments to update or create a Authors.
     * @example
     * // Update or create a Authors
     * const authors = await prisma.authors.upsert({
     *   create: {
     *     // ... data to create a Authors
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Authors we want to update
     *   }
     * })
     */
    upsert<T extends authorsUpsertArgs>(args: SelectSubset<T, authorsUpsertArgs<ExtArgs>>): Prisma__authorsClient<$Result.GetResult<Prisma.$authorsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Authors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {authorsCountArgs} args - Arguments to filter Authors to count.
     * @example
     * // Count the number of Authors
     * const count = await prisma.authors.count({
     *   where: {
     *     // ... the filter for the Authors we want to count
     *   }
     * })
    **/
    count<T extends authorsCountArgs>(
      args?: Subset<T, authorsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuthorsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Authors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuthorsAggregateArgs>(args: Subset<T, AuthorsAggregateArgs>): Prisma.PrismaPromise<GetAuthorsAggregateType<T>>

    /**
     * Group by Authors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {authorsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends authorsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: authorsGroupByArgs['orderBy'] }
        : { orderBy?: authorsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, authorsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuthorsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the authors model
   */
  readonly fields: authorsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for authors.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__authorsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the authors model
   */
  interface authorsFieldRefs {
    readonly authors_id: FieldRef<"authors", 'String'>
    readonly authors_uniqueids: FieldRef<"authors", 'String'>
    readonly authors_nicknames: FieldRef<"authors", 'String'>
    readonly authors_followercount: FieldRef<"authors", 'String'>
    readonly authors_heartcount: FieldRef<"authors", 'String'>
    readonly authors_videocount: FieldRef<"authors", 'String'>
    readonly authors_signature: FieldRef<"authors", 'String'>
    readonly authors_privateaccount: FieldRef<"authors", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * authors findUnique
   */
  export type authorsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the authors
     */
    select?: authorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the authors
     */
    omit?: authorsOmit<ExtArgs> | null
    /**
     * Filter, which authors to fetch.
     */
    where: authorsWhereUniqueInput
  }

  /**
   * authors findUniqueOrThrow
   */
  export type authorsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the authors
     */
    select?: authorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the authors
     */
    omit?: authorsOmit<ExtArgs> | null
    /**
     * Filter, which authors to fetch.
     */
    where: authorsWhereUniqueInput
  }

  /**
   * authors findFirst
   */
  export type authorsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the authors
     */
    select?: authorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the authors
     */
    omit?: authorsOmit<ExtArgs> | null
    /**
     * Filter, which authors to fetch.
     */
    where?: authorsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of authors to fetch.
     */
    orderBy?: authorsOrderByWithRelationInput | authorsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for authors.
     */
    cursor?: authorsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` authors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` authors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of authors.
     */
    distinct?: AuthorsScalarFieldEnum | AuthorsScalarFieldEnum[]
  }

  /**
   * authors findFirstOrThrow
   */
  export type authorsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the authors
     */
    select?: authorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the authors
     */
    omit?: authorsOmit<ExtArgs> | null
    /**
     * Filter, which authors to fetch.
     */
    where?: authorsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of authors to fetch.
     */
    orderBy?: authorsOrderByWithRelationInput | authorsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for authors.
     */
    cursor?: authorsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` authors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` authors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of authors.
     */
    distinct?: AuthorsScalarFieldEnum | AuthorsScalarFieldEnum[]
  }

  /**
   * authors findMany
   */
  export type authorsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the authors
     */
    select?: authorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the authors
     */
    omit?: authorsOmit<ExtArgs> | null
    /**
     * Filter, which authors to fetch.
     */
    where?: authorsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of authors to fetch.
     */
    orderBy?: authorsOrderByWithRelationInput | authorsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing authors.
     */
    cursor?: authorsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` authors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` authors.
     */
    skip?: number
    distinct?: AuthorsScalarFieldEnum | AuthorsScalarFieldEnum[]
  }

  /**
   * authors create
   */
  export type authorsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the authors
     */
    select?: authorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the authors
     */
    omit?: authorsOmit<ExtArgs> | null
    /**
     * The data needed to create a authors.
     */
    data: XOR<authorsCreateInput, authorsUncheckedCreateInput>
  }

  /**
   * authors createMany
   */
  export type authorsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many authors.
     */
    data: authorsCreateManyInput | authorsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * authors createManyAndReturn
   */
  export type authorsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the authors
     */
    select?: authorsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the authors
     */
    omit?: authorsOmit<ExtArgs> | null
    /**
     * The data used to create many authors.
     */
    data: authorsCreateManyInput | authorsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * authors update
   */
  export type authorsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the authors
     */
    select?: authorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the authors
     */
    omit?: authorsOmit<ExtArgs> | null
    /**
     * The data needed to update a authors.
     */
    data: XOR<authorsUpdateInput, authorsUncheckedUpdateInput>
    /**
     * Choose, which authors to update.
     */
    where: authorsWhereUniqueInput
  }

  /**
   * authors updateMany
   */
  export type authorsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update authors.
     */
    data: XOR<authorsUpdateManyMutationInput, authorsUncheckedUpdateManyInput>
    /**
     * Filter which authors to update
     */
    where?: authorsWhereInput
    /**
     * Limit how many authors to update.
     */
    limit?: number
  }

  /**
   * authors updateManyAndReturn
   */
  export type authorsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the authors
     */
    select?: authorsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the authors
     */
    omit?: authorsOmit<ExtArgs> | null
    /**
     * The data used to update authors.
     */
    data: XOR<authorsUpdateManyMutationInput, authorsUncheckedUpdateManyInput>
    /**
     * Filter which authors to update
     */
    where?: authorsWhereInput
    /**
     * Limit how many authors to update.
     */
    limit?: number
  }

  /**
   * authors upsert
   */
  export type authorsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the authors
     */
    select?: authorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the authors
     */
    omit?: authorsOmit<ExtArgs> | null
    /**
     * The filter to search for the authors to update in case it exists.
     */
    where: authorsWhereUniqueInput
    /**
     * In case the authors found by the `where` argument doesn't exist, create a new authors with this data.
     */
    create: XOR<authorsCreateInput, authorsUncheckedCreateInput>
    /**
     * In case the authors was found with the provided `where` argument, update it with this data.
     */
    update: XOR<authorsUpdateInput, authorsUncheckedUpdateInput>
  }

  /**
   * authors delete
   */
  export type authorsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the authors
     */
    select?: authorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the authors
     */
    omit?: authorsOmit<ExtArgs> | null
    /**
     * Filter which authors to delete.
     */
    where: authorsWhereUniqueInput
  }

  /**
   * authors deleteMany
   */
  export type authorsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which authors to delete
     */
    where?: authorsWhereInput
    /**
     * Limit how many authors to delete.
     */
    limit?: number
  }

  /**
   * authors without action
   */
  export type authorsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the authors
     */
    select?: authorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the authors
     */
    omit?: authorsOmit<ExtArgs> | null
  }


  /**
   * Model bookmarks
   */

  export type AggregateBookmarks = {
    _count: BookmarksCountAggregateOutputType | null
    _min: BookmarksMinAggregateOutputType | null
    _max: BookmarksMaxAggregateOutputType | null
  }

  export type BookmarksMinAggregateOutputType = {
    bookmarks_officiallist: string | null
    bookmarks_downloaded: string | null
    bookmarks_total: string | null
    bookmarks_numdisappeared: string | null
    bookmarks_lastrun: string | null
  }

  export type BookmarksMaxAggregateOutputType = {
    bookmarks_officiallist: string | null
    bookmarks_downloaded: string | null
    bookmarks_total: string | null
    bookmarks_numdisappeared: string | null
    bookmarks_lastrun: string | null
  }

  export type BookmarksCountAggregateOutputType = {
    bookmarks_officiallist: number
    bookmarks_downloaded: number
    bookmarks_total: number
    bookmarks_numdisappeared: number
    bookmarks_lastrun: number
    _all: number
  }


  export type BookmarksMinAggregateInputType = {
    bookmarks_officiallist?: true
    bookmarks_downloaded?: true
    bookmarks_total?: true
    bookmarks_numdisappeared?: true
    bookmarks_lastrun?: true
  }

  export type BookmarksMaxAggregateInputType = {
    bookmarks_officiallist?: true
    bookmarks_downloaded?: true
    bookmarks_total?: true
    bookmarks_numdisappeared?: true
    bookmarks_lastrun?: true
  }

  export type BookmarksCountAggregateInputType = {
    bookmarks_officiallist?: true
    bookmarks_downloaded?: true
    bookmarks_total?: true
    bookmarks_numdisappeared?: true
    bookmarks_lastrun?: true
    _all?: true
  }

  export type BookmarksAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which bookmarks to aggregate.
     */
    where?: bookmarksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bookmarks to fetch.
     */
    orderBy?: bookmarksOrderByWithRelationInput | bookmarksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: bookmarksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bookmarks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bookmarks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned bookmarks
    **/
    _count?: true | BookmarksCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookmarksMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookmarksMaxAggregateInputType
  }

  export type GetBookmarksAggregateType<T extends BookmarksAggregateArgs> = {
        [P in keyof T & keyof AggregateBookmarks]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBookmarks[P]>
      : GetScalarType<T[P], AggregateBookmarks[P]>
  }




  export type bookmarksGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: bookmarksWhereInput
    orderBy?: bookmarksOrderByWithAggregationInput | bookmarksOrderByWithAggregationInput[]
    by: BookmarksScalarFieldEnum[] | BookmarksScalarFieldEnum
    having?: bookmarksScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookmarksCountAggregateInputType | true
    _min?: BookmarksMinAggregateInputType
    _max?: BookmarksMaxAggregateInputType
  }

  export type BookmarksGroupByOutputType = {
    bookmarks_officiallist: string
    bookmarks_downloaded: string | null
    bookmarks_total: string | null
    bookmarks_numdisappeared: string | null
    bookmarks_lastrun: string | null
    _count: BookmarksCountAggregateOutputType | null
    _min: BookmarksMinAggregateOutputType | null
    _max: BookmarksMaxAggregateOutputType | null
  }

  type GetBookmarksGroupByPayload<T extends bookmarksGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BookmarksGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookmarksGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookmarksGroupByOutputType[P]>
            : GetScalarType<T[P], BookmarksGroupByOutputType[P]>
        }
      >
    >


  export type bookmarksSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    bookmarks_officiallist?: boolean
    bookmarks_downloaded?: boolean
    bookmarks_total?: boolean
    bookmarks_numdisappeared?: boolean
    bookmarks_lastrun?: boolean
  }, ExtArgs["result"]["bookmarks"]>

  export type bookmarksSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    bookmarks_officiallist?: boolean
    bookmarks_downloaded?: boolean
    bookmarks_total?: boolean
    bookmarks_numdisappeared?: boolean
    bookmarks_lastrun?: boolean
  }, ExtArgs["result"]["bookmarks"]>

  export type bookmarksSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    bookmarks_officiallist?: boolean
    bookmarks_downloaded?: boolean
    bookmarks_total?: boolean
    bookmarks_numdisappeared?: boolean
    bookmarks_lastrun?: boolean
  }, ExtArgs["result"]["bookmarks"]>

  export type bookmarksSelectScalar = {
    bookmarks_officiallist?: boolean
    bookmarks_downloaded?: boolean
    bookmarks_total?: boolean
    bookmarks_numdisappeared?: boolean
    bookmarks_lastrun?: boolean
  }

  export type bookmarksOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"bookmarks_officiallist" | "bookmarks_downloaded" | "bookmarks_total" | "bookmarks_numdisappeared" | "bookmarks_lastrun", ExtArgs["result"]["bookmarks"]>

  export type $bookmarksPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "bookmarks"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      bookmarks_officiallist: string
      bookmarks_downloaded: string | null
      bookmarks_total: string | null
      bookmarks_numdisappeared: string | null
      bookmarks_lastrun: string | null
    }, ExtArgs["result"]["bookmarks"]>
    composites: {}
  }

  type bookmarksGetPayload<S extends boolean | null | undefined | bookmarksDefaultArgs> = $Result.GetResult<Prisma.$bookmarksPayload, S>

  type bookmarksCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<bookmarksFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BookmarksCountAggregateInputType | true
    }

  export interface bookmarksDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['bookmarks'], meta: { name: 'bookmarks' } }
    /**
     * Find zero or one Bookmarks that matches the filter.
     * @param {bookmarksFindUniqueArgs} args - Arguments to find a Bookmarks
     * @example
     * // Get one Bookmarks
     * const bookmarks = await prisma.bookmarks.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends bookmarksFindUniqueArgs>(args: SelectSubset<T, bookmarksFindUniqueArgs<ExtArgs>>): Prisma__bookmarksClient<$Result.GetResult<Prisma.$bookmarksPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Bookmarks that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {bookmarksFindUniqueOrThrowArgs} args - Arguments to find a Bookmarks
     * @example
     * // Get one Bookmarks
     * const bookmarks = await prisma.bookmarks.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends bookmarksFindUniqueOrThrowArgs>(args: SelectSubset<T, bookmarksFindUniqueOrThrowArgs<ExtArgs>>): Prisma__bookmarksClient<$Result.GetResult<Prisma.$bookmarksPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bookmarks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bookmarksFindFirstArgs} args - Arguments to find a Bookmarks
     * @example
     * // Get one Bookmarks
     * const bookmarks = await prisma.bookmarks.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends bookmarksFindFirstArgs>(args?: SelectSubset<T, bookmarksFindFirstArgs<ExtArgs>>): Prisma__bookmarksClient<$Result.GetResult<Prisma.$bookmarksPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bookmarks that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bookmarksFindFirstOrThrowArgs} args - Arguments to find a Bookmarks
     * @example
     * // Get one Bookmarks
     * const bookmarks = await prisma.bookmarks.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends bookmarksFindFirstOrThrowArgs>(args?: SelectSubset<T, bookmarksFindFirstOrThrowArgs<ExtArgs>>): Prisma__bookmarksClient<$Result.GetResult<Prisma.$bookmarksPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Bookmarks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bookmarksFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bookmarks
     * const bookmarks = await prisma.bookmarks.findMany()
     * 
     * // Get first 10 Bookmarks
     * const bookmarks = await prisma.bookmarks.findMany({ take: 10 })
     * 
     * // Only select the `bookmarks_officiallist`
     * const bookmarksWithBookmarks_officiallistOnly = await prisma.bookmarks.findMany({ select: { bookmarks_officiallist: true } })
     * 
     */
    findMany<T extends bookmarksFindManyArgs>(args?: SelectSubset<T, bookmarksFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bookmarksPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Bookmarks.
     * @param {bookmarksCreateArgs} args - Arguments to create a Bookmarks.
     * @example
     * // Create one Bookmarks
     * const Bookmarks = await prisma.bookmarks.create({
     *   data: {
     *     // ... data to create a Bookmarks
     *   }
     * })
     * 
     */
    create<T extends bookmarksCreateArgs>(args: SelectSubset<T, bookmarksCreateArgs<ExtArgs>>): Prisma__bookmarksClient<$Result.GetResult<Prisma.$bookmarksPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Bookmarks.
     * @param {bookmarksCreateManyArgs} args - Arguments to create many Bookmarks.
     * @example
     * // Create many Bookmarks
     * const bookmarks = await prisma.bookmarks.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends bookmarksCreateManyArgs>(args?: SelectSubset<T, bookmarksCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bookmarks and returns the data saved in the database.
     * @param {bookmarksCreateManyAndReturnArgs} args - Arguments to create many Bookmarks.
     * @example
     * // Create many Bookmarks
     * const bookmarks = await prisma.bookmarks.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bookmarks and only return the `bookmarks_officiallist`
     * const bookmarksWithBookmarks_officiallistOnly = await prisma.bookmarks.createManyAndReturn({
     *   select: { bookmarks_officiallist: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends bookmarksCreateManyAndReturnArgs>(args?: SelectSubset<T, bookmarksCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bookmarksPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Bookmarks.
     * @param {bookmarksDeleteArgs} args - Arguments to delete one Bookmarks.
     * @example
     * // Delete one Bookmarks
     * const Bookmarks = await prisma.bookmarks.delete({
     *   where: {
     *     // ... filter to delete one Bookmarks
     *   }
     * })
     * 
     */
    delete<T extends bookmarksDeleteArgs>(args: SelectSubset<T, bookmarksDeleteArgs<ExtArgs>>): Prisma__bookmarksClient<$Result.GetResult<Prisma.$bookmarksPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Bookmarks.
     * @param {bookmarksUpdateArgs} args - Arguments to update one Bookmarks.
     * @example
     * // Update one Bookmarks
     * const bookmarks = await prisma.bookmarks.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends bookmarksUpdateArgs>(args: SelectSubset<T, bookmarksUpdateArgs<ExtArgs>>): Prisma__bookmarksClient<$Result.GetResult<Prisma.$bookmarksPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Bookmarks.
     * @param {bookmarksDeleteManyArgs} args - Arguments to filter Bookmarks to delete.
     * @example
     * // Delete a few Bookmarks
     * const { count } = await prisma.bookmarks.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends bookmarksDeleteManyArgs>(args?: SelectSubset<T, bookmarksDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookmarks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bookmarksUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bookmarks
     * const bookmarks = await prisma.bookmarks.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends bookmarksUpdateManyArgs>(args: SelectSubset<T, bookmarksUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookmarks and returns the data updated in the database.
     * @param {bookmarksUpdateManyAndReturnArgs} args - Arguments to update many Bookmarks.
     * @example
     * // Update many Bookmarks
     * const bookmarks = await prisma.bookmarks.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Bookmarks and only return the `bookmarks_officiallist`
     * const bookmarksWithBookmarks_officiallistOnly = await prisma.bookmarks.updateManyAndReturn({
     *   select: { bookmarks_officiallist: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends bookmarksUpdateManyAndReturnArgs>(args: SelectSubset<T, bookmarksUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bookmarksPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Bookmarks.
     * @param {bookmarksUpsertArgs} args - Arguments to update or create a Bookmarks.
     * @example
     * // Update or create a Bookmarks
     * const bookmarks = await prisma.bookmarks.upsert({
     *   create: {
     *     // ... data to create a Bookmarks
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Bookmarks we want to update
     *   }
     * })
     */
    upsert<T extends bookmarksUpsertArgs>(args: SelectSubset<T, bookmarksUpsertArgs<ExtArgs>>): Prisma__bookmarksClient<$Result.GetResult<Prisma.$bookmarksPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Bookmarks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bookmarksCountArgs} args - Arguments to filter Bookmarks to count.
     * @example
     * // Count the number of Bookmarks
     * const count = await prisma.bookmarks.count({
     *   where: {
     *     // ... the filter for the Bookmarks we want to count
     *   }
     * })
    **/
    count<T extends bookmarksCountArgs>(
      args?: Subset<T, bookmarksCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookmarksCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Bookmarks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookmarksAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BookmarksAggregateArgs>(args: Subset<T, BookmarksAggregateArgs>): Prisma.PrismaPromise<GetBookmarksAggregateType<T>>

    /**
     * Group by Bookmarks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bookmarksGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends bookmarksGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: bookmarksGroupByArgs['orderBy'] }
        : { orderBy?: bookmarksGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, bookmarksGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookmarksGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the bookmarks model
   */
  readonly fields: bookmarksFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for bookmarks.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__bookmarksClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the bookmarks model
   */
  interface bookmarksFieldRefs {
    readonly bookmarks_officiallist: FieldRef<"bookmarks", 'String'>
    readonly bookmarks_downloaded: FieldRef<"bookmarks", 'String'>
    readonly bookmarks_total: FieldRef<"bookmarks", 'String'>
    readonly bookmarks_numdisappeared: FieldRef<"bookmarks", 'String'>
    readonly bookmarks_lastrun: FieldRef<"bookmarks", 'String'>
  }
    

  // Custom InputTypes
  /**
   * bookmarks findUnique
   */
  export type bookmarksFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookmarks
     */
    select?: bookmarksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookmarks
     */
    omit?: bookmarksOmit<ExtArgs> | null
    /**
     * Filter, which bookmarks to fetch.
     */
    where: bookmarksWhereUniqueInput
  }

  /**
   * bookmarks findUniqueOrThrow
   */
  export type bookmarksFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookmarks
     */
    select?: bookmarksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookmarks
     */
    omit?: bookmarksOmit<ExtArgs> | null
    /**
     * Filter, which bookmarks to fetch.
     */
    where: bookmarksWhereUniqueInput
  }

  /**
   * bookmarks findFirst
   */
  export type bookmarksFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookmarks
     */
    select?: bookmarksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookmarks
     */
    omit?: bookmarksOmit<ExtArgs> | null
    /**
     * Filter, which bookmarks to fetch.
     */
    where?: bookmarksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bookmarks to fetch.
     */
    orderBy?: bookmarksOrderByWithRelationInput | bookmarksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for bookmarks.
     */
    cursor?: bookmarksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bookmarks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bookmarks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of bookmarks.
     */
    distinct?: BookmarksScalarFieldEnum | BookmarksScalarFieldEnum[]
  }

  /**
   * bookmarks findFirstOrThrow
   */
  export type bookmarksFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookmarks
     */
    select?: bookmarksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookmarks
     */
    omit?: bookmarksOmit<ExtArgs> | null
    /**
     * Filter, which bookmarks to fetch.
     */
    where?: bookmarksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bookmarks to fetch.
     */
    orderBy?: bookmarksOrderByWithRelationInput | bookmarksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for bookmarks.
     */
    cursor?: bookmarksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bookmarks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bookmarks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of bookmarks.
     */
    distinct?: BookmarksScalarFieldEnum | BookmarksScalarFieldEnum[]
  }

  /**
   * bookmarks findMany
   */
  export type bookmarksFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookmarks
     */
    select?: bookmarksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookmarks
     */
    omit?: bookmarksOmit<ExtArgs> | null
    /**
     * Filter, which bookmarks to fetch.
     */
    where?: bookmarksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bookmarks to fetch.
     */
    orderBy?: bookmarksOrderByWithRelationInput | bookmarksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing bookmarks.
     */
    cursor?: bookmarksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bookmarks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bookmarks.
     */
    skip?: number
    distinct?: BookmarksScalarFieldEnum | BookmarksScalarFieldEnum[]
  }

  /**
   * bookmarks create
   */
  export type bookmarksCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookmarks
     */
    select?: bookmarksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookmarks
     */
    omit?: bookmarksOmit<ExtArgs> | null
    /**
     * The data needed to create a bookmarks.
     */
    data: XOR<bookmarksCreateInput, bookmarksUncheckedCreateInput>
  }

  /**
   * bookmarks createMany
   */
  export type bookmarksCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many bookmarks.
     */
    data: bookmarksCreateManyInput | bookmarksCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * bookmarks createManyAndReturn
   */
  export type bookmarksCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookmarks
     */
    select?: bookmarksSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the bookmarks
     */
    omit?: bookmarksOmit<ExtArgs> | null
    /**
     * The data used to create many bookmarks.
     */
    data: bookmarksCreateManyInput | bookmarksCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * bookmarks update
   */
  export type bookmarksUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookmarks
     */
    select?: bookmarksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookmarks
     */
    omit?: bookmarksOmit<ExtArgs> | null
    /**
     * The data needed to update a bookmarks.
     */
    data: XOR<bookmarksUpdateInput, bookmarksUncheckedUpdateInput>
    /**
     * Choose, which bookmarks to update.
     */
    where: bookmarksWhereUniqueInput
  }

  /**
   * bookmarks updateMany
   */
  export type bookmarksUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update bookmarks.
     */
    data: XOR<bookmarksUpdateManyMutationInput, bookmarksUncheckedUpdateManyInput>
    /**
     * Filter which bookmarks to update
     */
    where?: bookmarksWhereInput
    /**
     * Limit how many bookmarks to update.
     */
    limit?: number
  }

  /**
   * bookmarks updateManyAndReturn
   */
  export type bookmarksUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookmarks
     */
    select?: bookmarksSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the bookmarks
     */
    omit?: bookmarksOmit<ExtArgs> | null
    /**
     * The data used to update bookmarks.
     */
    data: XOR<bookmarksUpdateManyMutationInput, bookmarksUncheckedUpdateManyInput>
    /**
     * Filter which bookmarks to update
     */
    where?: bookmarksWhereInput
    /**
     * Limit how many bookmarks to update.
     */
    limit?: number
  }

  /**
   * bookmarks upsert
   */
  export type bookmarksUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookmarks
     */
    select?: bookmarksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookmarks
     */
    omit?: bookmarksOmit<ExtArgs> | null
    /**
     * The filter to search for the bookmarks to update in case it exists.
     */
    where: bookmarksWhereUniqueInput
    /**
     * In case the bookmarks found by the `where` argument doesn't exist, create a new bookmarks with this data.
     */
    create: XOR<bookmarksCreateInput, bookmarksUncheckedCreateInput>
    /**
     * In case the bookmarks was found with the provided `where` argument, update it with this data.
     */
    update: XOR<bookmarksUpdateInput, bookmarksUncheckedUpdateInput>
  }

  /**
   * bookmarks delete
   */
  export type bookmarksDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookmarks
     */
    select?: bookmarksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookmarks
     */
    omit?: bookmarksOmit<ExtArgs> | null
    /**
     * Filter which bookmarks to delete.
     */
    where: bookmarksWhereUniqueInput
  }

  /**
   * bookmarks deleteMany
   */
  export type bookmarksDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which bookmarks to delete
     */
    where?: bookmarksWhereInput
    /**
     * Limit how many bookmarks to delete.
     */
    limit?: number
  }

  /**
   * bookmarks without action
   */
  export type bookmarksDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookmarks
     */
    select?: bookmarksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookmarks
     */
    omit?: bookmarksOmit<ExtArgs> | null
  }


  /**
   * Model consolidated
   */

  export type AggregateConsolidated = {
    _count: ConsolidatedCountAggregateOutputType | null
    _min: ConsolidatedMinAggregateOutputType | null
    _max: ConsolidatedMaxAggregateOutputType | null
  }

  export type ConsolidatedMinAggregateOutputType = {
    c_videos_id: string | null
    c_videos_authorid: string | null
    c_videos_audioid: string | null
    c_authors_id: string | null
    c_authors_nicknames: string | null
    c_authors_uniqueids: string | null
    c_texts_text_content: string | null
  }

  export type ConsolidatedMaxAggregateOutputType = {
    c_videos_id: string | null
    c_videos_authorid: string | null
    c_videos_audioid: string | null
    c_authors_id: string | null
    c_authors_nicknames: string | null
    c_authors_uniqueids: string | null
    c_texts_text_content: string | null
  }

  export type ConsolidatedCountAggregateOutputType = {
    c_videos_id: number
    c_videos_authorid: number
    c_videos_audioid: number
    c_authors_id: number
    c_authors_nicknames: number
    c_authors_uniqueids: number
    c_texts_text_content: number
    _all: number
  }


  export type ConsolidatedMinAggregateInputType = {
    c_videos_id?: true
    c_videos_authorid?: true
    c_videos_audioid?: true
    c_authors_id?: true
    c_authors_nicknames?: true
    c_authors_uniqueids?: true
    c_texts_text_content?: true
  }

  export type ConsolidatedMaxAggregateInputType = {
    c_videos_id?: true
    c_videos_authorid?: true
    c_videos_audioid?: true
    c_authors_id?: true
    c_authors_nicknames?: true
    c_authors_uniqueids?: true
    c_texts_text_content?: true
  }

  export type ConsolidatedCountAggregateInputType = {
    c_videos_id?: true
    c_videos_authorid?: true
    c_videos_audioid?: true
    c_authors_id?: true
    c_authors_nicknames?: true
    c_authors_uniqueids?: true
    c_texts_text_content?: true
    _all?: true
  }

  export type ConsolidatedAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which consolidated to aggregate.
     */
    where?: consolidatedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of consolidateds to fetch.
     */
    orderBy?: consolidatedOrderByWithRelationInput | consolidatedOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: consolidatedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` consolidateds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` consolidateds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned consolidateds
    **/
    _count?: true | ConsolidatedCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConsolidatedMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConsolidatedMaxAggregateInputType
  }

  export type GetConsolidatedAggregateType<T extends ConsolidatedAggregateArgs> = {
        [P in keyof T & keyof AggregateConsolidated]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConsolidated[P]>
      : GetScalarType<T[P], AggregateConsolidated[P]>
  }




  export type consolidatedGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: consolidatedWhereInput
    orderBy?: consolidatedOrderByWithAggregationInput | consolidatedOrderByWithAggregationInput[]
    by: ConsolidatedScalarFieldEnum[] | ConsolidatedScalarFieldEnum
    having?: consolidatedScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConsolidatedCountAggregateInputType | true
    _min?: ConsolidatedMinAggregateInputType
    _max?: ConsolidatedMaxAggregateInputType
  }

  export type ConsolidatedGroupByOutputType = {
    c_videos_id: string
    c_videos_authorid: string | null
    c_videos_audioid: string | null
    c_authors_id: string | null
    c_authors_nicknames: string | null
    c_authors_uniqueids: string | null
    c_texts_text_content: string | null
    _count: ConsolidatedCountAggregateOutputType | null
    _min: ConsolidatedMinAggregateOutputType | null
    _max: ConsolidatedMaxAggregateOutputType | null
  }

  type GetConsolidatedGroupByPayload<T extends consolidatedGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConsolidatedGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConsolidatedGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConsolidatedGroupByOutputType[P]>
            : GetScalarType<T[P], ConsolidatedGroupByOutputType[P]>
        }
      >
    >


  export type consolidatedSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    c_videos_id?: boolean
    c_videos_authorid?: boolean
    c_videos_audioid?: boolean
    c_authors_id?: boolean
    c_authors_nicknames?: boolean
    c_authors_uniqueids?: boolean
    c_texts_text_content?: boolean
  }, ExtArgs["result"]["consolidated"]>

  export type consolidatedSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    c_videos_id?: boolean
    c_videos_authorid?: boolean
    c_videos_audioid?: boolean
    c_authors_id?: boolean
    c_authors_nicknames?: boolean
    c_authors_uniqueids?: boolean
    c_texts_text_content?: boolean
  }, ExtArgs["result"]["consolidated"]>

  export type consolidatedSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    c_videos_id?: boolean
    c_videos_authorid?: boolean
    c_videos_audioid?: boolean
    c_authors_id?: boolean
    c_authors_nicknames?: boolean
    c_authors_uniqueids?: boolean
    c_texts_text_content?: boolean
  }, ExtArgs["result"]["consolidated"]>

  export type consolidatedSelectScalar = {
    c_videos_id?: boolean
    c_videos_authorid?: boolean
    c_videos_audioid?: boolean
    c_authors_id?: boolean
    c_authors_nicknames?: boolean
    c_authors_uniqueids?: boolean
    c_texts_text_content?: boolean
  }

  export type consolidatedOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"c_videos_id" | "c_videos_authorid" | "c_videos_audioid" | "c_authors_id" | "c_authors_nicknames" | "c_authors_uniqueids" | "c_texts_text_content", ExtArgs["result"]["consolidated"]>

  export type $consolidatedPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "consolidated"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      c_videos_id: string
      c_videos_authorid: string | null
      c_videos_audioid: string | null
      c_authors_id: string | null
      c_authors_nicknames: string | null
      c_authors_uniqueids: string | null
      c_texts_text_content: string | null
    }, ExtArgs["result"]["consolidated"]>
    composites: {}
  }

  type consolidatedGetPayload<S extends boolean | null | undefined | consolidatedDefaultArgs> = $Result.GetResult<Prisma.$consolidatedPayload, S>

  type consolidatedCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<consolidatedFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConsolidatedCountAggregateInputType | true
    }

  export interface consolidatedDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['consolidated'], meta: { name: 'consolidated' } }
    /**
     * Find zero or one Consolidated that matches the filter.
     * @param {consolidatedFindUniqueArgs} args - Arguments to find a Consolidated
     * @example
     * // Get one Consolidated
     * const consolidated = await prisma.consolidated.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends consolidatedFindUniqueArgs>(args: SelectSubset<T, consolidatedFindUniqueArgs<ExtArgs>>): Prisma__consolidatedClient<$Result.GetResult<Prisma.$consolidatedPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Consolidated that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {consolidatedFindUniqueOrThrowArgs} args - Arguments to find a Consolidated
     * @example
     * // Get one Consolidated
     * const consolidated = await prisma.consolidated.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends consolidatedFindUniqueOrThrowArgs>(args: SelectSubset<T, consolidatedFindUniqueOrThrowArgs<ExtArgs>>): Prisma__consolidatedClient<$Result.GetResult<Prisma.$consolidatedPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Consolidated that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {consolidatedFindFirstArgs} args - Arguments to find a Consolidated
     * @example
     * // Get one Consolidated
     * const consolidated = await prisma.consolidated.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends consolidatedFindFirstArgs>(args?: SelectSubset<T, consolidatedFindFirstArgs<ExtArgs>>): Prisma__consolidatedClient<$Result.GetResult<Prisma.$consolidatedPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Consolidated that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {consolidatedFindFirstOrThrowArgs} args - Arguments to find a Consolidated
     * @example
     * // Get one Consolidated
     * const consolidated = await prisma.consolidated.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends consolidatedFindFirstOrThrowArgs>(args?: SelectSubset<T, consolidatedFindFirstOrThrowArgs<ExtArgs>>): Prisma__consolidatedClient<$Result.GetResult<Prisma.$consolidatedPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Consolidateds that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {consolidatedFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Consolidateds
     * const consolidateds = await prisma.consolidated.findMany()
     * 
     * // Get first 10 Consolidateds
     * const consolidateds = await prisma.consolidated.findMany({ take: 10 })
     * 
     * // Only select the `c_videos_id`
     * const consolidatedWithC_videos_idOnly = await prisma.consolidated.findMany({ select: { c_videos_id: true } })
     * 
     */
    findMany<T extends consolidatedFindManyArgs>(args?: SelectSubset<T, consolidatedFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$consolidatedPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Consolidated.
     * @param {consolidatedCreateArgs} args - Arguments to create a Consolidated.
     * @example
     * // Create one Consolidated
     * const Consolidated = await prisma.consolidated.create({
     *   data: {
     *     // ... data to create a Consolidated
     *   }
     * })
     * 
     */
    create<T extends consolidatedCreateArgs>(args: SelectSubset<T, consolidatedCreateArgs<ExtArgs>>): Prisma__consolidatedClient<$Result.GetResult<Prisma.$consolidatedPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Consolidateds.
     * @param {consolidatedCreateManyArgs} args - Arguments to create many Consolidateds.
     * @example
     * // Create many Consolidateds
     * const consolidated = await prisma.consolidated.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends consolidatedCreateManyArgs>(args?: SelectSubset<T, consolidatedCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Consolidateds and returns the data saved in the database.
     * @param {consolidatedCreateManyAndReturnArgs} args - Arguments to create many Consolidateds.
     * @example
     * // Create many Consolidateds
     * const consolidated = await prisma.consolidated.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Consolidateds and only return the `c_videos_id`
     * const consolidatedWithC_videos_idOnly = await prisma.consolidated.createManyAndReturn({
     *   select: { c_videos_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends consolidatedCreateManyAndReturnArgs>(args?: SelectSubset<T, consolidatedCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$consolidatedPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Consolidated.
     * @param {consolidatedDeleteArgs} args - Arguments to delete one Consolidated.
     * @example
     * // Delete one Consolidated
     * const Consolidated = await prisma.consolidated.delete({
     *   where: {
     *     // ... filter to delete one Consolidated
     *   }
     * })
     * 
     */
    delete<T extends consolidatedDeleteArgs>(args: SelectSubset<T, consolidatedDeleteArgs<ExtArgs>>): Prisma__consolidatedClient<$Result.GetResult<Prisma.$consolidatedPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Consolidated.
     * @param {consolidatedUpdateArgs} args - Arguments to update one Consolidated.
     * @example
     * // Update one Consolidated
     * const consolidated = await prisma.consolidated.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends consolidatedUpdateArgs>(args: SelectSubset<T, consolidatedUpdateArgs<ExtArgs>>): Prisma__consolidatedClient<$Result.GetResult<Prisma.$consolidatedPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Consolidateds.
     * @param {consolidatedDeleteManyArgs} args - Arguments to filter Consolidateds to delete.
     * @example
     * // Delete a few Consolidateds
     * const { count } = await prisma.consolidated.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends consolidatedDeleteManyArgs>(args?: SelectSubset<T, consolidatedDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Consolidateds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {consolidatedUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Consolidateds
     * const consolidated = await prisma.consolidated.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends consolidatedUpdateManyArgs>(args: SelectSubset<T, consolidatedUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Consolidateds and returns the data updated in the database.
     * @param {consolidatedUpdateManyAndReturnArgs} args - Arguments to update many Consolidateds.
     * @example
     * // Update many Consolidateds
     * const consolidated = await prisma.consolidated.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Consolidateds and only return the `c_videos_id`
     * const consolidatedWithC_videos_idOnly = await prisma.consolidated.updateManyAndReturn({
     *   select: { c_videos_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends consolidatedUpdateManyAndReturnArgs>(args: SelectSubset<T, consolidatedUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$consolidatedPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Consolidated.
     * @param {consolidatedUpsertArgs} args - Arguments to update or create a Consolidated.
     * @example
     * // Update or create a Consolidated
     * const consolidated = await prisma.consolidated.upsert({
     *   create: {
     *     // ... data to create a Consolidated
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Consolidated we want to update
     *   }
     * })
     */
    upsert<T extends consolidatedUpsertArgs>(args: SelectSubset<T, consolidatedUpsertArgs<ExtArgs>>): Prisma__consolidatedClient<$Result.GetResult<Prisma.$consolidatedPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Consolidateds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {consolidatedCountArgs} args - Arguments to filter Consolidateds to count.
     * @example
     * // Count the number of Consolidateds
     * const count = await prisma.consolidated.count({
     *   where: {
     *     // ... the filter for the Consolidateds we want to count
     *   }
     * })
    **/
    count<T extends consolidatedCountArgs>(
      args?: Subset<T, consolidatedCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConsolidatedCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Consolidated.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsolidatedAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConsolidatedAggregateArgs>(args: Subset<T, ConsolidatedAggregateArgs>): Prisma.PrismaPromise<GetConsolidatedAggregateType<T>>

    /**
     * Group by Consolidated.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {consolidatedGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends consolidatedGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: consolidatedGroupByArgs['orderBy'] }
        : { orderBy?: consolidatedGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, consolidatedGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConsolidatedGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the consolidated model
   */
  readonly fields: consolidatedFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for consolidated.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__consolidatedClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the consolidated model
   */
  interface consolidatedFieldRefs {
    readonly c_videos_id: FieldRef<"consolidated", 'String'>
    readonly c_videos_authorid: FieldRef<"consolidated", 'String'>
    readonly c_videos_audioid: FieldRef<"consolidated", 'String'>
    readonly c_authors_id: FieldRef<"consolidated", 'String'>
    readonly c_authors_nicknames: FieldRef<"consolidated", 'String'>
    readonly c_authors_uniqueids: FieldRef<"consolidated", 'String'>
    readonly c_texts_text_content: FieldRef<"consolidated", 'String'>
  }
    

  // Custom InputTypes
  /**
   * consolidated findUnique
   */
  export type consolidatedFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the consolidated
     */
    select?: consolidatedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the consolidated
     */
    omit?: consolidatedOmit<ExtArgs> | null
    /**
     * Filter, which consolidated to fetch.
     */
    where: consolidatedWhereUniqueInput
  }

  /**
   * consolidated findUniqueOrThrow
   */
  export type consolidatedFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the consolidated
     */
    select?: consolidatedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the consolidated
     */
    omit?: consolidatedOmit<ExtArgs> | null
    /**
     * Filter, which consolidated to fetch.
     */
    where: consolidatedWhereUniqueInput
  }

  /**
   * consolidated findFirst
   */
  export type consolidatedFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the consolidated
     */
    select?: consolidatedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the consolidated
     */
    omit?: consolidatedOmit<ExtArgs> | null
    /**
     * Filter, which consolidated to fetch.
     */
    where?: consolidatedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of consolidateds to fetch.
     */
    orderBy?: consolidatedOrderByWithRelationInput | consolidatedOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for consolidateds.
     */
    cursor?: consolidatedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` consolidateds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` consolidateds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of consolidateds.
     */
    distinct?: ConsolidatedScalarFieldEnum | ConsolidatedScalarFieldEnum[]
  }

  /**
   * consolidated findFirstOrThrow
   */
  export type consolidatedFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the consolidated
     */
    select?: consolidatedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the consolidated
     */
    omit?: consolidatedOmit<ExtArgs> | null
    /**
     * Filter, which consolidated to fetch.
     */
    where?: consolidatedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of consolidateds to fetch.
     */
    orderBy?: consolidatedOrderByWithRelationInput | consolidatedOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for consolidateds.
     */
    cursor?: consolidatedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` consolidateds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` consolidateds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of consolidateds.
     */
    distinct?: ConsolidatedScalarFieldEnum | ConsolidatedScalarFieldEnum[]
  }

  /**
   * consolidated findMany
   */
  export type consolidatedFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the consolidated
     */
    select?: consolidatedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the consolidated
     */
    omit?: consolidatedOmit<ExtArgs> | null
    /**
     * Filter, which consolidateds to fetch.
     */
    where?: consolidatedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of consolidateds to fetch.
     */
    orderBy?: consolidatedOrderByWithRelationInput | consolidatedOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing consolidateds.
     */
    cursor?: consolidatedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` consolidateds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` consolidateds.
     */
    skip?: number
    distinct?: ConsolidatedScalarFieldEnum | ConsolidatedScalarFieldEnum[]
  }

  /**
   * consolidated create
   */
  export type consolidatedCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the consolidated
     */
    select?: consolidatedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the consolidated
     */
    omit?: consolidatedOmit<ExtArgs> | null
    /**
     * The data needed to create a consolidated.
     */
    data: XOR<consolidatedCreateInput, consolidatedUncheckedCreateInput>
  }

  /**
   * consolidated createMany
   */
  export type consolidatedCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many consolidateds.
     */
    data: consolidatedCreateManyInput | consolidatedCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * consolidated createManyAndReturn
   */
  export type consolidatedCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the consolidated
     */
    select?: consolidatedSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the consolidated
     */
    omit?: consolidatedOmit<ExtArgs> | null
    /**
     * The data used to create many consolidateds.
     */
    data: consolidatedCreateManyInput | consolidatedCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * consolidated update
   */
  export type consolidatedUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the consolidated
     */
    select?: consolidatedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the consolidated
     */
    omit?: consolidatedOmit<ExtArgs> | null
    /**
     * The data needed to update a consolidated.
     */
    data: XOR<consolidatedUpdateInput, consolidatedUncheckedUpdateInput>
    /**
     * Choose, which consolidated to update.
     */
    where: consolidatedWhereUniqueInput
  }

  /**
   * consolidated updateMany
   */
  export type consolidatedUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update consolidateds.
     */
    data: XOR<consolidatedUpdateManyMutationInput, consolidatedUncheckedUpdateManyInput>
    /**
     * Filter which consolidateds to update
     */
    where?: consolidatedWhereInput
    /**
     * Limit how many consolidateds to update.
     */
    limit?: number
  }

  /**
   * consolidated updateManyAndReturn
   */
  export type consolidatedUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the consolidated
     */
    select?: consolidatedSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the consolidated
     */
    omit?: consolidatedOmit<ExtArgs> | null
    /**
     * The data used to update consolidateds.
     */
    data: XOR<consolidatedUpdateManyMutationInput, consolidatedUncheckedUpdateManyInput>
    /**
     * Filter which consolidateds to update
     */
    where?: consolidatedWhereInput
    /**
     * Limit how many consolidateds to update.
     */
    limit?: number
  }

  /**
   * consolidated upsert
   */
  export type consolidatedUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the consolidated
     */
    select?: consolidatedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the consolidated
     */
    omit?: consolidatedOmit<ExtArgs> | null
    /**
     * The filter to search for the consolidated to update in case it exists.
     */
    where: consolidatedWhereUniqueInput
    /**
     * In case the consolidated found by the `where` argument doesn't exist, create a new consolidated with this data.
     */
    create: XOR<consolidatedCreateInput, consolidatedUncheckedCreateInput>
    /**
     * In case the consolidated was found with the provided `where` argument, update it with this data.
     */
    update: XOR<consolidatedUpdateInput, consolidatedUncheckedUpdateInput>
  }

  /**
   * consolidated delete
   */
  export type consolidatedDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the consolidated
     */
    select?: consolidatedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the consolidated
     */
    omit?: consolidatedOmit<ExtArgs> | null
    /**
     * Filter which consolidated to delete.
     */
    where: consolidatedWhereUniqueInput
  }

  /**
   * consolidated deleteMany
   */
  export type consolidatedDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which consolidateds to delete
     */
    where?: consolidatedWhereInput
    /**
     * Limit how many consolidateds to delete.
     */
    limit?: number
  }

  /**
   * consolidated without action
   */
  export type consolidatedDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the consolidated
     */
    select?: consolidatedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the consolidated
     */
    omit?: consolidatedOmit<ExtArgs> | null
  }


  /**
   * Model following
   */

  export type AggregateFollowing = {
    _count: FollowingCountAggregateOutputType | null
    _min: FollowingMinAggregateOutputType | null
    _max: FollowingMaxAggregateOutputType | null
  }

  export type FollowingMinAggregateOutputType = {
    following_author_id: string | null
    following_official: boolean | null
    following_started: boolean | null
    following_not_interested: boolean | null
    following_infolder: string | null
    following_disappeared: string | null
    following_last_run_start: string | null
    following_last_run_finish: string | null
    following_last_run_bottom: string | null
    following_last_run_firstadded: string | null
  }

  export type FollowingMaxAggregateOutputType = {
    following_author_id: string | null
    following_official: boolean | null
    following_started: boolean | null
    following_not_interested: boolean | null
    following_infolder: string | null
    following_disappeared: string | null
    following_last_run_start: string | null
    following_last_run_finish: string | null
    following_last_run_bottom: string | null
    following_last_run_firstadded: string | null
  }

  export type FollowingCountAggregateOutputType = {
    following_author_id: number
    following_official: number
    following_started: number
    following_not_interested: number
    following_infolder: number
    following_disappeared: number
    following_last_run_start: number
    following_last_run_finish: number
    following_last_run_bottom: number
    following_last_run_firstadded: number
    _all: number
  }


  export type FollowingMinAggregateInputType = {
    following_author_id?: true
    following_official?: true
    following_started?: true
    following_not_interested?: true
    following_infolder?: true
    following_disappeared?: true
    following_last_run_start?: true
    following_last_run_finish?: true
    following_last_run_bottom?: true
    following_last_run_firstadded?: true
  }

  export type FollowingMaxAggregateInputType = {
    following_author_id?: true
    following_official?: true
    following_started?: true
    following_not_interested?: true
    following_infolder?: true
    following_disappeared?: true
    following_last_run_start?: true
    following_last_run_finish?: true
    following_last_run_bottom?: true
    following_last_run_firstadded?: true
  }

  export type FollowingCountAggregateInputType = {
    following_author_id?: true
    following_official?: true
    following_started?: true
    following_not_interested?: true
    following_infolder?: true
    following_disappeared?: true
    following_last_run_start?: true
    following_last_run_finish?: true
    following_last_run_bottom?: true
    following_last_run_firstadded?: true
    _all?: true
  }

  export type FollowingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which following to aggregate.
     */
    where?: followingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of followings to fetch.
     */
    orderBy?: followingOrderByWithRelationInput | followingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: followingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` followings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` followings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned followings
    **/
    _count?: true | FollowingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FollowingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FollowingMaxAggregateInputType
  }

  export type GetFollowingAggregateType<T extends FollowingAggregateArgs> = {
        [P in keyof T & keyof AggregateFollowing]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFollowing[P]>
      : GetScalarType<T[P], AggregateFollowing[P]>
  }




  export type followingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: followingWhereInput
    orderBy?: followingOrderByWithAggregationInput | followingOrderByWithAggregationInput[]
    by: FollowingScalarFieldEnum[] | FollowingScalarFieldEnum
    having?: followingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FollowingCountAggregateInputType | true
    _min?: FollowingMinAggregateInputType
    _max?: FollowingMaxAggregateInputType
  }

  export type FollowingGroupByOutputType = {
    following_author_id: string
    following_official: boolean | null
    following_started: boolean | null
    following_not_interested: boolean | null
    following_infolder: string | null
    following_disappeared: string | null
    following_last_run_start: string | null
    following_last_run_finish: string | null
    following_last_run_bottom: string | null
    following_last_run_firstadded: string | null
    _count: FollowingCountAggregateOutputType | null
    _min: FollowingMinAggregateOutputType | null
    _max: FollowingMaxAggregateOutputType | null
  }

  type GetFollowingGroupByPayload<T extends followingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FollowingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FollowingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FollowingGroupByOutputType[P]>
            : GetScalarType<T[P], FollowingGroupByOutputType[P]>
        }
      >
    >


  export type followingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    following_author_id?: boolean
    following_official?: boolean
    following_started?: boolean
    following_not_interested?: boolean
    following_infolder?: boolean
    following_disappeared?: boolean
    following_last_run_start?: boolean
    following_last_run_finish?: boolean
    following_last_run_bottom?: boolean
    following_last_run_firstadded?: boolean
  }, ExtArgs["result"]["following"]>

  export type followingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    following_author_id?: boolean
    following_official?: boolean
    following_started?: boolean
    following_not_interested?: boolean
    following_infolder?: boolean
    following_disappeared?: boolean
    following_last_run_start?: boolean
    following_last_run_finish?: boolean
    following_last_run_bottom?: boolean
    following_last_run_firstadded?: boolean
  }, ExtArgs["result"]["following"]>

  export type followingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    following_author_id?: boolean
    following_official?: boolean
    following_started?: boolean
    following_not_interested?: boolean
    following_infolder?: boolean
    following_disappeared?: boolean
    following_last_run_start?: boolean
    following_last_run_finish?: boolean
    following_last_run_bottom?: boolean
    following_last_run_firstadded?: boolean
  }, ExtArgs["result"]["following"]>

  export type followingSelectScalar = {
    following_author_id?: boolean
    following_official?: boolean
    following_started?: boolean
    following_not_interested?: boolean
    following_infolder?: boolean
    following_disappeared?: boolean
    following_last_run_start?: boolean
    following_last_run_finish?: boolean
    following_last_run_bottom?: boolean
    following_last_run_firstadded?: boolean
  }

  export type followingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"following_author_id" | "following_official" | "following_started" | "following_not_interested" | "following_infolder" | "following_disappeared" | "following_last_run_start" | "following_last_run_finish" | "following_last_run_bottom" | "following_last_run_firstadded", ExtArgs["result"]["following"]>

  export type $followingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "following"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      following_author_id: string
      following_official: boolean | null
      following_started: boolean | null
      following_not_interested: boolean | null
      following_infolder: string | null
      following_disappeared: string | null
      following_last_run_start: string | null
      following_last_run_finish: string | null
      following_last_run_bottom: string | null
      following_last_run_firstadded: string | null
    }, ExtArgs["result"]["following"]>
    composites: {}
  }

  type followingGetPayload<S extends boolean | null | undefined | followingDefaultArgs> = $Result.GetResult<Prisma.$followingPayload, S>

  type followingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<followingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FollowingCountAggregateInputType | true
    }

  export interface followingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['following'], meta: { name: 'following' } }
    /**
     * Find zero or one Following that matches the filter.
     * @param {followingFindUniqueArgs} args - Arguments to find a Following
     * @example
     * // Get one Following
     * const following = await prisma.following.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends followingFindUniqueArgs>(args: SelectSubset<T, followingFindUniqueArgs<ExtArgs>>): Prisma__followingClient<$Result.GetResult<Prisma.$followingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Following that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {followingFindUniqueOrThrowArgs} args - Arguments to find a Following
     * @example
     * // Get one Following
     * const following = await prisma.following.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends followingFindUniqueOrThrowArgs>(args: SelectSubset<T, followingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__followingClient<$Result.GetResult<Prisma.$followingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Following that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {followingFindFirstArgs} args - Arguments to find a Following
     * @example
     * // Get one Following
     * const following = await prisma.following.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends followingFindFirstArgs>(args?: SelectSubset<T, followingFindFirstArgs<ExtArgs>>): Prisma__followingClient<$Result.GetResult<Prisma.$followingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Following that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {followingFindFirstOrThrowArgs} args - Arguments to find a Following
     * @example
     * // Get one Following
     * const following = await prisma.following.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends followingFindFirstOrThrowArgs>(args?: SelectSubset<T, followingFindFirstOrThrowArgs<ExtArgs>>): Prisma__followingClient<$Result.GetResult<Prisma.$followingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Followings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {followingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Followings
     * const followings = await prisma.following.findMany()
     * 
     * // Get first 10 Followings
     * const followings = await prisma.following.findMany({ take: 10 })
     * 
     * // Only select the `following_author_id`
     * const followingWithFollowing_author_idOnly = await prisma.following.findMany({ select: { following_author_id: true } })
     * 
     */
    findMany<T extends followingFindManyArgs>(args?: SelectSubset<T, followingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$followingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Following.
     * @param {followingCreateArgs} args - Arguments to create a Following.
     * @example
     * // Create one Following
     * const Following = await prisma.following.create({
     *   data: {
     *     // ... data to create a Following
     *   }
     * })
     * 
     */
    create<T extends followingCreateArgs>(args: SelectSubset<T, followingCreateArgs<ExtArgs>>): Prisma__followingClient<$Result.GetResult<Prisma.$followingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Followings.
     * @param {followingCreateManyArgs} args - Arguments to create many Followings.
     * @example
     * // Create many Followings
     * const following = await prisma.following.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends followingCreateManyArgs>(args?: SelectSubset<T, followingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Followings and returns the data saved in the database.
     * @param {followingCreateManyAndReturnArgs} args - Arguments to create many Followings.
     * @example
     * // Create many Followings
     * const following = await prisma.following.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Followings and only return the `following_author_id`
     * const followingWithFollowing_author_idOnly = await prisma.following.createManyAndReturn({
     *   select: { following_author_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends followingCreateManyAndReturnArgs>(args?: SelectSubset<T, followingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$followingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Following.
     * @param {followingDeleteArgs} args - Arguments to delete one Following.
     * @example
     * // Delete one Following
     * const Following = await prisma.following.delete({
     *   where: {
     *     // ... filter to delete one Following
     *   }
     * })
     * 
     */
    delete<T extends followingDeleteArgs>(args: SelectSubset<T, followingDeleteArgs<ExtArgs>>): Prisma__followingClient<$Result.GetResult<Prisma.$followingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Following.
     * @param {followingUpdateArgs} args - Arguments to update one Following.
     * @example
     * // Update one Following
     * const following = await prisma.following.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends followingUpdateArgs>(args: SelectSubset<T, followingUpdateArgs<ExtArgs>>): Prisma__followingClient<$Result.GetResult<Prisma.$followingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Followings.
     * @param {followingDeleteManyArgs} args - Arguments to filter Followings to delete.
     * @example
     * // Delete a few Followings
     * const { count } = await prisma.following.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends followingDeleteManyArgs>(args?: SelectSubset<T, followingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Followings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {followingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Followings
     * const following = await prisma.following.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends followingUpdateManyArgs>(args: SelectSubset<T, followingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Followings and returns the data updated in the database.
     * @param {followingUpdateManyAndReturnArgs} args - Arguments to update many Followings.
     * @example
     * // Update many Followings
     * const following = await prisma.following.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Followings and only return the `following_author_id`
     * const followingWithFollowing_author_idOnly = await prisma.following.updateManyAndReturn({
     *   select: { following_author_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends followingUpdateManyAndReturnArgs>(args: SelectSubset<T, followingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$followingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Following.
     * @param {followingUpsertArgs} args - Arguments to update or create a Following.
     * @example
     * // Update or create a Following
     * const following = await prisma.following.upsert({
     *   create: {
     *     // ... data to create a Following
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Following we want to update
     *   }
     * })
     */
    upsert<T extends followingUpsertArgs>(args: SelectSubset<T, followingUpsertArgs<ExtArgs>>): Prisma__followingClient<$Result.GetResult<Prisma.$followingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Followings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {followingCountArgs} args - Arguments to filter Followings to count.
     * @example
     * // Count the number of Followings
     * const count = await prisma.following.count({
     *   where: {
     *     // ... the filter for the Followings we want to count
     *   }
     * })
    **/
    count<T extends followingCountArgs>(
      args?: Subset<T, followingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FollowingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Following.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FollowingAggregateArgs>(args: Subset<T, FollowingAggregateArgs>): Prisma.PrismaPromise<GetFollowingAggregateType<T>>

    /**
     * Group by Following.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {followingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends followingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: followingGroupByArgs['orderBy'] }
        : { orderBy?: followingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, followingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFollowingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the following model
   */
  readonly fields: followingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for following.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__followingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the following model
   */
  interface followingFieldRefs {
    readonly following_author_id: FieldRef<"following", 'String'>
    readonly following_official: FieldRef<"following", 'Boolean'>
    readonly following_started: FieldRef<"following", 'Boolean'>
    readonly following_not_interested: FieldRef<"following", 'Boolean'>
    readonly following_infolder: FieldRef<"following", 'String'>
    readonly following_disappeared: FieldRef<"following", 'String'>
    readonly following_last_run_start: FieldRef<"following", 'String'>
    readonly following_last_run_finish: FieldRef<"following", 'String'>
    readonly following_last_run_bottom: FieldRef<"following", 'String'>
    readonly following_last_run_firstadded: FieldRef<"following", 'String'>
  }
    

  // Custom InputTypes
  /**
   * following findUnique
   */
  export type followingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the following
     */
    select?: followingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the following
     */
    omit?: followingOmit<ExtArgs> | null
    /**
     * Filter, which following to fetch.
     */
    where: followingWhereUniqueInput
  }

  /**
   * following findUniqueOrThrow
   */
  export type followingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the following
     */
    select?: followingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the following
     */
    omit?: followingOmit<ExtArgs> | null
    /**
     * Filter, which following to fetch.
     */
    where: followingWhereUniqueInput
  }

  /**
   * following findFirst
   */
  export type followingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the following
     */
    select?: followingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the following
     */
    omit?: followingOmit<ExtArgs> | null
    /**
     * Filter, which following to fetch.
     */
    where?: followingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of followings to fetch.
     */
    orderBy?: followingOrderByWithRelationInput | followingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for followings.
     */
    cursor?: followingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` followings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` followings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of followings.
     */
    distinct?: FollowingScalarFieldEnum | FollowingScalarFieldEnum[]
  }

  /**
   * following findFirstOrThrow
   */
  export type followingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the following
     */
    select?: followingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the following
     */
    omit?: followingOmit<ExtArgs> | null
    /**
     * Filter, which following to fetch.
     */
    where?: followingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of followings to fetch.
     */
    orderBy?: followingOrderByWithRelationInput | followingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for followings.
     */
    cursor?: followingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` followings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` followings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of followings.
     */
    distinct?: FollowingScalarFieldEnum | FollowingScalarFieldEnum[]
  }

  /**
   * following findMany
   */
  export type followingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the following
     */
    select?: followingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the following
     */
    omit?: followingOmit<ExtArgs> | null
    /**
     * Filter, which followings to fetch.
     */
    where?: followingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of followings to fetch.
     */
    orderBy?: followingOrderByWithRelationInput | followingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing followings.
     */
    cursor?: followingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` followings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` followings.
     */
    skip?: number
    distinct?: FollowingScalarFieldEnum | FollowingScalarFieldEnum[]
  }

  /**
   * following create
   */
  export type followingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the following
     */
    select?: followingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the following
     */
    omit?: followingOmit<ExtArgs> | null
    /**
     * The data needed to create a following.
     */
    data: XOR<followingCreateInput, followingUncheckedCreateInput>
  }

  /**
   * following createMany
   */
  export type followingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many followings.
     */
    data: followingCreateManyInput | followingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * following createManyAndReturn
   */
  export type followingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the following
     */
    select?: followingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the following
     */
    omit?: followingOmit<ExtArgs> | null
    /**
     * The data used to create many followings.
     */
    data: followingCreateManyInput | followingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * following update
   */
  export type followingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the following
     */
    select?: followingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the following
     */
    omit?: followingOmit<ExtArgs> | null
    /**
     * The data needed to update a following.
     */
    data: XOR<followingUpdateInput, followingUncheckedUpdateInput>
    /**
     * Choose, which following to update.
     */
    where: followingWhereUniqueInput
  }

  /**
   * following updateMany
   */
  export type followingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update followings.
     */
    data: XOR<followingUpdateManyMutationInput, followingUncheckedUpdateManyInput>
    /**
     * Filter which followings to update
     */
    where?: followingWhereInput
    /**
     * Limit how many followings to update.
     */
    limit?: number
  }

  /**
   * following updateManyAndReturn
   */
  export type followingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the following
     */
    select?: followingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the following
     */
    omit?: followingOmit<ExtArgs> | null
    /**
     * The data used to update followings.
     */
    data: XOR<followingUpdateManyMutationInput, followingUncheckedUpdateManyInput>
    /**
     * Filter which followings to update
     */
    where?: followingWhereInput
    /**
     * Limit how many followings to update.
     */
    limit?: number
  }

  /**
   * following upsert
   */
  export type followingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the following
     */
    select?: followingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the following
     */
    omit?: followingOmit<ExtArgs> | null
    /**
     * The filter to search for the following to update in case it exists.
     */
    where: followingWhereUniqueInput
    /**
     * In case the following found by the `where` argument doesn't exist, create a new following with this data.
     */
    create: XOR<followingCreateInput, followingUncheckedCreateInput>
    /**
     * In case the following was found with the provided `where` argument, update it with this data.
     */
    update: XOR<followingUpdateInput, followingUncheckedUpdateInput>
  }

  /**
   * following delete
   */
  export type followingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the following
     */
    select?: followingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the following
     */
    omit?: followingOmit<ExtArgs> | null
    /**
     * Filter which following to delete.
     */
    where: followingWhereUniqueInput
  }

  /**
   * following deleteMany
   */
  export type followingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which followings to delete
     */
    where?: followingWhereInput
    /**
     * Limit how many followings to delete.
     */
    limit?: number
  }

  /**
   * following without action
   */
  export type followingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the following
     */
    select?: followingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the following
     */
    omit?: followingOmit<ExtArgs> | null
  }


  /**
   * Model likes
   */

  export type AggregateLikes = {
    _count: LikesCountAggregateOutputType | null
    _min: LikesMinAggregateOutputType | null
    _max: LikesMaxAggregateOutputType | null
  }

  export type LikesMinAggregateOutputType = {
    likes_schemaversion: string | null
    likes_user: string | null
    likes_likes: string | null
  }

  export type LikesMaxAggregateOutputType = {
    likes_schemaversion: string | null
    likes_user: string | null
    likes_likes: string | null
  }

  export type LikesCountAggregateOutputType = {
    likes_schemaversion: number
    likes_user: number
    likes_likes: number
    _all: number
  }


  export type LikesMinAggregateInputType = {
    likes_schemaversion?: true
    likes_user?: true
    likes_likes?: true
  }

  export type LikesMaxAggregateInputType = {
    likes_schemaversion?: true
    likes_user?: true
    likes_likes?: true
  }

  export type LikesCountAggregateInputType = {
    likes_schemaversion?: true
    likes_user?: true
    likes_likes?: true
    _all?: true
  }

  export type LikesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which likes to aggregate.
     */
    where?: likesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of likes to fetch.
     */
    orderBy?: likesOrderByWithRelationInput | likesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: likesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` likes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` likes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned likes
    **/
    _count?: true | LikesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LikesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LikesMaxAggregateInputType
  }

  export type GetLikesAggregateType<T extends LikesAggregateArgs> = {
        [P in keyof T & keyof AggregateLikes]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLikes[P]>
      : GetScalarType<T[P], AggregateLikes[P]>
  }




  export type likesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: likesWhereInput
    orderBy?: likesOrderByWithAggregationInput | likesOrderByWithAggregationInput[]
    by: LikesScalarFieldEnum[] | LikesScalarFieldEnum
    having?: likesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LikesCountAggregateInputType | true
    _min?: LikesMinAggregateInputType
    _max?: LikesMaxAggregateInputType
  }

  export type LikesGroupByOutputType = {
    likes_schemaversion: string | null
    likes_user: string
    likes_likes: string | null
    _count: LikesCountAggregateOutputType | null
    _min: LikesMinAggregateOutputType | null
    _max: LikesMaxAggregateOutputType | null
  }

  type GetLikesGroupByPayload<T extends likesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LikesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LikesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LikesGroupByOutputType[P]>
            : GetScalarType<T[P], LikesGroupByOutputType[P]>
        }
      >
    >


  export type likesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    likes_schemaversion?: boolean
    likes_user?: boolean
    likes_likes?: boolean
  }, ExtArgs["result"]["likes"]>

  export type likesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    likes_schemaversion?: boolean
    likes_user?: boolean
    likes_likes?: boolean
  }, ExtArgs["result"]["likes"]>

  export type likesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    likes_schemaversion?: boolean
    likes_user?: boolean
    likes_likes?: boolean
  }, ExtArgs["result"]["likes"]>

  export type likesSelectScalar = {
    likes_schemaversion?: boolean
    likes_user?: boolean
    likes_likes?: boolean
  }

  export type likesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"likes_schemaversion" | "likes_user" | "likes_likes", ExtArgs["result"]["likes"]>

  export type $likesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "likes"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      likes_schemaversion: string | null
      likes_user: string
      likes_likes: string | null
    }, ExtArgs["result"]["likes"]>
    composites: {}
  }

  type likesGetPayload<S extends boolean | null | undefined | likesDefaultArgs> = $Result.GetResult<Prisma.$likesPayload, S>

  type likesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<likesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LikesCountAggregateInputType | true
    }

  export interface likesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['likes'], meta: { name: 'likes' } }
    /**
     * Find zero or one Likes that matches the filter.
     * @param {likesFindUniqueArgs} args - Arguments to find a Likes
     * @example
     * // Get one Likes
     * const likes = await prisma.likes.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends likesFindUniqueArgs>(args: SelectSubset<T, likesFindUniqueArgs<ExtArgs>>): Prisma__likesClient<$Result.GetResult<Prisma.$likesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Likes that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {likesFindUniqueOrThrowArgs} args - Arguments to find a Likes
     * @example
     * // Get one Likes
     * const likes = await prisma.likes.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends likesFindUniqueOrThrowArgs>(args: SelectSubset<T, likesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__likesClient<$Result.GetResult<Prisma.$likesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Likes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {likesFindFirstArgs} args - Arguments to find a Likes
     * @example
     * // Get one Likes
     * const likes = await prisma.likes.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends likesFindFirstArgs>(args?: SelectSubset<T, likesFindFirstArgs<ExtArgs>>): Prisma__likesClient<$Result.GetResult<Prisma.$likesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Likes that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {likesFindFirstOrThrowArgs} args - Arguments to find a Likes
     * @example
     * // Get one Likes
     * const likes = await prisma.likes.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends likesFindFirstOrThrowArgs>(args?: SelectSubset<T, likesFindFirstOrThrowArgs<ExtArgs>>): Prisma__likesClient<$Result.GetResult<Prisma.$likesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Likes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {likesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Likes
     * const likes = await prisma.likes.findMany()
     * 
     * // Get first 10 Likes
     * const likes = await prisma.likes.findMany({ take: 10 })
     * 
     * // Only select the `likes_schemaversion`
     * const likesWithLikes_schemaversionOnly = await prisma.likes.findMany({ select: { likes_schemaversion: true } })
     * 
     */
    findMany<T extends likesFindManyArgs>(args?: SelectSubset<T, likesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$likesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Likes.
     * @param {likesCreateArgs} args - Arguments to create a Likes.
     * @example
     * // Create one Likes
     * const Likes = await prisma.likes.create({
     *   data: {
     *     // ... data to create a Likes
     *   }
     * })
     * 
     */
    create<T extends likesCreateArgs>(args: SelectSubset<T, likesCreateArgs<ExtArgs>>): Prisma__likesClient<$Result.GetResult<Prisma.$likesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Likes.
     * @param {likesCreateManyArgs} args - Arguments to create many Likes.
     * @example
     * // Create many Likes
     * const likes = await prisma.likes.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends likesCreateManyArgs>(args?: SelectSubset<T, likesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Likes and returns the data saved in the database.
     * @param {likesCreateManyAndReturnArgs} args - Arguments to create many Likes.
     * @example
     * // Create many Likes
     * const likes = await prisma.likes.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Likes and only return the `likes_schemaversion`
     * const likesWithLikes_schemaversionOnly = await prisma.likes.createManyAndReturn({
     *   select: { likes_schemaversion: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends likesCreateManyAndReturnArgs>(args?: SelectSubset<T, likesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$likesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Likes.
     * @param {likesDeleteArgs} args - Arguments to delete one Likes.
     * @example
     * // Delete one Likes
     * const Likes = await prisma.likes.delete({
     *   where: {
     *     // ... filter to delete one Likes
     *   }
     * })
     * 
     */
    delete<T extends likesDeleteArgs>(args: SelectSubset<T, likesDeleteArgs<ExtArgs>>): Prisma__likesClient<$Result.GetResult<Prisma.$likesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Likes.
     * @param {likesUpdateArgs} args - Arguments to update one Likes.
     * @example
     * // Update one Likes
     * const likes = await prisma.likes.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends likesUpdateArgs>(args: SelectSubset<T, likesUpdateArgs<ExtArgs>>): Prisma__likesClient<$Result.GetResult<Prisma.$likesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Likes.
     * @param {likesDeleteManyArgs} args - Arguments to filter Likes to delete.
     * @example
     * // Delete a few Likes
     * const { count } = await prisma.likes.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends likesDeleteManyArgs>(args?: SelectSubset<T, likesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Likes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {likesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Likes
     * const likes = await prisma.likes.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends likesUpdateManyArgs>(args: SelectSubset<T, likesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Likes and returns the data updated in the database.
     * @param {likesUpdateManyAndReturnArgs} args - Arguments to update many Likes.
     * @example
     * // Update many Likes
     * const likes = await prisma.likes.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Likes and only return the `likes_schemaversion`
     * const likesWithLikes_schemaversionOnly = await prisma.likes.updateManyAndReturn({
     *   select: { likes_schemaversion: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends likesUpdateManyAndReturnArgs>(args: SelectSubset<T, likesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$likesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Likes.
     * @param {likesUpsertArgs} args - Arguments to update or create a Likes.
     * @example
     * // Update or create a Likes
     * const likes = await prisma.likes.upsert({
     *   create: {
     *     // ... data to create a Likes
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Likes we want to update
     *   }
     * })
     */
    upsert<T extends likesUpsertArgs>(args: SelectSubset<T, likesUpsertArgs<ExtArgs>>): Prisma__likesClient<$Result.GetResult<Prisma.$likesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Likes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {likesCountArgs} args - Arguments to filter Likes to count.
     * @example
     * // Count the number of Likes
     * const count = await prisma.likes.count({
     *   where: {
     *     // ... the filter for the Likes we want to count
     *   }
     * })
    **/
    count<T extends likesCountArgs>(
      args?: Subset<T, likesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LikesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Likes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LikesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LikesAggregateArgs>(args: Subset<T, LikesAggregateArgs>): Prisma.PrismaPromise<GetLikesAggregateType<T>>

    /**
     * Group by Likes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {likesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends likesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: likesGroupByArgs['orderBy'] }
        : { orderBy?: likesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, likesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLikesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the likes model
   */
  readonly fields: likesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for likes.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__likesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the likes model
   */
  interface likesFieldRefs {
    readonly likes_schemaversion: FieldRef<"likes", 'String'>
    readonly likes_user: FieldRef<"likes", 'String'>
    readonly likes_likes: FieldRef<"likes", 'String'>
  }
    

  // Custom InputTypes
  /**
   * likes findUnique
   */
  export type likesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the likes
     */
    select?: likesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the likes
     */
    omit?: likesOmit<ExtArgs> | null
    /**
     * Filter, which likes to fetch.
     */
    where: likesWhereUniqueInput
  }

  /**
   * likes findUniqueOrThrow
   */
  export type likesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the likes
     */
    select?: likesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the likes
     */
    omit?: likesOmit<ExtArgs> | null
    /**
     * Filter, which likes to fetch.
     */
    where: likesWhereUniqueInput
  }

  /**
   * likes findFirst
   */
  export type likesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the likes
     */
    select?: likesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the likes
     */
    omit?: likesOmit<ExtArgs> | null
    /**
     * Filter, which likes to fetch.
     */
    where?: likesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of likes to fetch.
     */
    orderBy?: likesOrderByWithRelationInput | likesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for likes.
     */
    cursor?: likesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` likes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` likes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of likes.
     */
    distinct?: LikesScalarFieldEnum | LikesScalarFieldEnum[]
  }

  /**
   * likes findFirstOrThrow
   */
  export type likesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the likes
     */
    select?: likesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the likes
     */
    omit?: likesOmit<ExtArgs> | null
    /**
     * Filter, which likes to fetch.
     */
    where?: likesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of likes to fetch.
     */
    orderBy?: likesOrderByWithRelationInput | likesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for likes.
     */
    cursor?: likesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` likes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` likes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of likes.
     */
    distinct?: LikesScalarFieldEnum | LikesScalarFieldEnum[]
  }

  /**
   * likes findMany
   */
  export type likesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the likes
     */
    select?: likesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the likes
     */
    omit?: likesOmit<ExtArgs> | null
    /**
     * Filter, which likes to fetch.
     */
    where?: likesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of likes to fetch.
     */
    orderBy?: likesOrderByWithRelationInput | likesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing likes.
     */
    cursor?: likesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` likes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` likes.
     */
    skip?: number
    distinct?: LikesScalarFieldEnum | LikesScalarFieldEnum[]
  }

  /**
   * likes create
   */
  export type likesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the likes
     */
    select?: likesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the likes
     */
    omit?: likesOmit<ExtArgs> | null
    /**
     * The data needed to create a likes.
     */
    data: XOR<likesCreateInput, likesUncheckedCreateInput>
  }

  /**
   * likes createMany
   */
  export type likesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many likes.
     */
    data: likesCreateManyInput | likesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * likes createManyAndReturn
   */
  export type likesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the likes
     */
    select?: likesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the likes
     */
    omit?: likesOmit<ExtArgs> | null
    /**
     * The data used to create many likes.
     */
    data: likesCreateManyInput | likesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * likes update
   */
  export type likesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the likes
     */
    select?: likesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the likes
     */
    omit?: likesOmit<ExtArgs> | null
    /**
     * The data needed to update a likes.
     */
    data: XOR<likesUpdateInput, likesUncheckedUpdateInput>
    /**
     * Choose, which likes to update.
     */
    where: likesWhereUniqueInput
  }

  /**
   * likes updateMany
   */
  export type likesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update likes.
     */
    data: XOR<likesUpdateManyMutationInput, likesUncheckedUpdateManyInput>
    /**
     * Filter which likes to update
     */
    where?: likesWhereInput
    /**
     * Limit how many likes to update.
     */
    limit?: number
  }

  /**
   * likes updateManyAndReturn
   */
  export type likesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the likes
     */
    select?: likesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the likes
     */
    omit?: likesOmit<ExtArgs> | null
    /**
     * The data used to update likes.
     */
    data: XOR<likesUpdateManyMutationInput, likesUncheckedUpdateManyInput>
    /**
     * Filter which likes to update
     */
    where?: likesWhereInput
    /**
     * Limit how many likes to update.
     */
    limit?: number
  }

  /**
   * likes upsert
   */
  export type likesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the likes
     */
    select?: likesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the likes
     */
    omit?: likesOmit<ExtArgs> | null
    /**
     * The filter to search for the likes to update in case it exists.
     */
    where: likesWhereUniqueInput
    /**
     * In case the likes found by the `where` argument doesn't exist, create a new likes with this data.
     */
    create: XOR<likesCreateInput, likesUncheckedCreateInput>
    /**
     * In case the likes was found with the provided `where` argument, update it with this data.
     */
    update: XOR<likesUpdateInput, likesUncheckedUpdateInput>
  }

  /**
   * likes delete
   */
  export type likesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the likes
     */
    select?: likesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the likes
     */
    omit?: likesOmit<ExtArgs> | null
    /**
     * Filter which likes to delete.
     */
    where: likesWhereUniqueInput
  }

  /**
   * likes deleteMany
   */
  export type likesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which likes to delete
     */
    where?: likesWhereInput
    /**
     * Limit how many likes to delete.
     */
    limit?: number
  }

  /**
   * likes without action
   */
  export type likesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the likes
     */
    select?: likesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the likes
     */
    omit?: likesOmit<ExtArgs> | null
  }


  /**
   * Model media
   */

  export type AggregateMedia = {
    _count: MediaCountAggregateOutputType | null
    _min: MediaMinAggregateOutputType | null
    _max: MediaMaxAggregateOutputType | null
  }

  export type MediaMinAggregateOutputType = {
    video_id: string | null
    author_id: string | null
    video_path: string | null
    cover_path: string | null
    title: string | null
    description: string | null
    tags: string | null
  }

  export type MediaMaxAggregateOutputType = {
    video_id: string | null
    author_id: string | null
    video_path: string | null
    cover_path: string | null
    title: string | null
    description: string | null
    tags: string | null
  }

  export type MediaCountAggregateOutputType = {
    video_id: number
    author_id: number
    video_path: number
    cover_path: number
    title: number
    description: number
    tags: number
    _all: number
  }


  export type MediaMinAggregateInputType = {
    video_id?: true
    author_id?: true
    video_path?: true
    cover_path?: true
    title?: true
    description?: true
    tags?: true
  }

  export type MediaMaxAggregateInputType = {
    video_id?: true
    author_id?: true
    video_path?: true
    cover_path?: true
    title?: true
    description?: true
    tags?: true
  }

  export type MediaCountAggregateInputType = {
    video_id?: true
    author_id?: true
    video_path?: true
    cover_path?: true
    title?: true
    description?: true
    tags?: true
    _all?: true
  }

  export type MediaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which media to aggregate.
     */
    where?: mediaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of media to fetch.
     */
    orderBy?: mediaOrderByWithRelationInput | mediaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: mediaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` media from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` media.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned media
    **/
    _count?: true | MediaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MediaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MediaMaxAggregateInputType
  }

  export type GetMediaAggregateType<T extends MediaAggregateArgs> = {
        [P in keyof T & keyof AggregateMedia]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMedia[P]>
      : GetScalarType<T[P], AggregateMedia[P]>
  }




  export type mediaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: mediaWhereInput
    orderBy?: mediaOrderByWithAggregationInput | mediaOrderByWithAggregationInput[]
    by: MediaScalarFieldEnum[] | MediaScalarFieldEnum
    having?: mediaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MediaCountAggregateInputType | true
    _min?: MediaMinAggregateInputType
    _max?: MediaMaxAggregateInputType
  }

  export type MediaGroupByOutputType = {
    video_id: string
    author_id: string | null
    video_path: string | null
    cover_path: string | null
    title: string | null
    description: string | null
    tags: string | null
    _count: MediaCountAggregateOutputType | null
    _min: MediaMinAggregateOutputType | null
    _max: MediaMaxAggregateOutputType | null
  }

  type GetMediaGroupByPayload<T extends mediaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MediaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MediaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MediaGroupByOutputType[P]>
            : GetScalarType<T[P], MediaGroupByOutputType[P]>
        }
      >
    >


  export type mediaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    video_id?: boolean
    author_id?: boolean
    video_path?: boolean
    cover_path?: boolean
    title?: boolean
    description?: boolean
    tags?: boolean
    upload_status?: boolean | media$upload_statusArgs<ExtArgs>
    _count?: boolean | MediaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["media"]>

  export type mediaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    video_id?: boolean
    author_id?: boolean
    video_path?: boolean
    cover_path?: boolean
    title?: boolean
    description?: boolean
    tags?: boolean
  }, ExtArgs["result"]["media"]>

  export type mediaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    video_id?: boolean
    author_id?: boolean
    video_path?: boolean
    cover_path?: boolean
    title?: boolean
    description?: boolean
    tags?: boolean
  }, ExtArgs["result"]["media"]>

  export type mediaSelectScalar = {
    video_id?: boolean
    author_id?: boolean
    video_path?: boolean
    cover_path?: boolean
    title?: boolean
    description?: boolean
    tags?: boolean
  }

  export type mediaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"video_id" | "author_id" | "video_path" | "cover_path" | "title" | "description" | "tags", ExtArgs["result"]["media"]>
  export type mediaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    upload_status?: boolean | media$upload_statusArgs<ExtArgs>
    _count?: boolean | MediaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type mediaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type mediaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $mediaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "media"
    objects: {
      upload_status: Prisma.$upload_statusPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      video_id: string
      author_id: string | null
      video_path: string | null
      cover_path: string | null
      title: string | null
      description: string | null
      tags: string | null
    }, ExtArgs["result"]["media"]>
    composites: {}
  }

  type mediaGetPayload<S extends boolean | null | undefined | mediaDefaultArgs> = $Result.GetResult<Prisma.$mediaPayload, S>

  type mediaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<mediaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MediaCountAggregateInputType | true
    }

  export interface mediaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['media'], meta: { name: 'media' } }
    /**
     * Find zero or one Media that matches the filter.
     * @param {mediaFindUniqueArgs} args - Arguments to find a Media
     * @example
     * // Get one Media
     * const media = await prisma.media.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends mediaFindUniqueArgs>(args: SelectSubset<T, mediaFindUniqueArgs<ExtArgs>>): Prisma__mediaClient<$Result.GetResult<Prisma.$mediaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Media that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {mediaFindUniqueOrThrowArgs} args - Arguments to find a Media
     * @example
     * // Get one Media
     * const media = await prisma.media.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends mediaFindUniqueOrThrowArgs>(args: SelectSubset<T, mediaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__mediaClient<$Result.GetResult<Prisma.$mediaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Media that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mediaFindFirstArgs} args - Arguments to find a Media
     * @example
     * // Get one Media
     * const media = await prisma.media.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends mediaFindFirstArgs>(args?: SelectSubset<T, mediaFindFirstArgs<ExtArgs>>): Prisma__mediaClient<$Result.GetResult<Prisma.$mediaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Media that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mediaFindFirstOrThrowArgs} args - Arguments to find a Media
     * @example
     * // Get one Media
     * const media = await prisma.media.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends mediaFindFirstOrThrowArgs>(args?: SelectSubset<T, mediaFindFirstOrThrowArgs<ExtArgs>>): Prisma__mediaClient<$Result.GetResult<Prisma.$mediaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Media that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mediaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Media
     * const media = await prisma.media.findMany()
     * 
     * // Get first 10 Media
     * const media = await prisma.media.findMany({ take: 10 })
     * 
     * // Only select the `video_id`
     * const mediaWithVideo_idOnly = await prisma.media.findMany({ select: { video_id: true } })
     * 
     */
    findMany<T extends mediaFindManyArgs>(args?: SelectSubset<T, mediaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$mediaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Media.
     * @param {mediaCreateArgs} args - Arguments to create a Media.
     * @example
     * // Create one Media
     * const Media = await prisma.media.create({
     *   data: {
     *     // ... data to create a Media
     *   }
     * })
     * 
     */
    create<T extends mediaCreateArgs>(args: SelectSubset<T, mediaCreateArgs<ExtArgs>>): Prisma__mediaClient<$Result.GetResult<Prisma.$mediaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Media.
     * @param {mediaCreateManyArgs} args - Arguments to create many Media.
     * @example
     * // Create many Media
     * const media = await prisma.media.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends mediaCreateManyArgs>(args?: SelectSubset<T, mediaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Media and returns the data saved in the database.
     * @param {mediaCreateManyAndReturnArgs} args - Arguments to create many Media.
     * @example
     * // Create many Media
     * const media = await prisma.media.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Media and only return the `video_id`
     * const mediaWithVideo_idOnly = await prisma.media.createManyAndReturn({
     *   select: { video_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends mediaCreateManyAndReturnArgs>(args?: SelectSubset<T, mediaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$mediaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Media.
     * @param {mediaDeleteArgs} args - Arguments to delete one Media.
     * @example
     * // Delete one Media
     * const Media = await prisma.media.delete({
     *   where: {
     *     // ... filter to delete one Media
     *   }
     * })
     * 
     */
    delete<T extends mediaDeleteArgs>(args: SelectSubset<T, mediaDeleteArgs<ExtArgs>>): Prisma__mediaClient<$Result.GetResult<Prisma.$mediaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Media.
     * @param {mediaUpdateArgs} args - Arguments to update one Media.
     * @example
     * // Update one Media
     * const media = await prisma.media.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends mediaUpdateArgs>(args: SelectSubset<T, mediaUpdateArgs<ExtArgs>>): Prisma__mediaClient<$Result.GetResult<Prisma.$mediaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Media.
     * @param {mediaDeleteManyArgs} args - Arguments to filter Media to delete.
     * @example
     * // Delete a few Media
     * const { count } = await prisma.media.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends mediaDeleteManyArgs>(args?: SelectSubset<T, mediaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Media.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mediaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Media
     * const media = await prisma.media.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends mediaUpdateManyArgs>(args: SelectSubset<T, mediaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Media and returns the data updated in the database.
     * @param {mediaUpdateManyAndReturnArgs} args - Arguments to update many Media.
     * @example
     * // Update many Media
     * const media = await prisma.media.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Media and only return the `video_id`
     * const mediaWithVideo_idOnly = await prisma.media.updateManyAndReturn({
     *   select: { video_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends mediaUpdateManyAndReturnArgs>(args: SelectSubset<T, mediaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$mediaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Media.
     * @param {mediaUpsertArgs} args - Arguments to update or create a Media.
     * @example
     * // Update or create a Media
     * const media = await prisma.media.upsert({
     *   create: {
     *     // ... data to create a Media
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Media we want to update
     *   }
     * })
     */
    upsert<T extends mediaUpsertArgs>(args: SelectSubset<T, mediaUpsertArgs<ExtArgs>>): Prisma__mediaClient<$Result.GetResult<Prisma.$mediaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Media.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mediaCountArgs} args - Arguments to filter Media to count.
     * @example
     * // Count the number of Media
     * const count = await prisma.media.count({
     *   where: {
     *     // ... the filter for the Media we want to count
     *   }
     * })
    **/
    count<T extends mediaCountArgs>(
      args?: Subset<T, mediaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MediaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Media.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MediaAggregateArgs>(args: Subset<T, MediaAggregateArgs>): Prisma.PrismaPromise<GetMediaAggregateType<T>>

    /**
     * Group by Media.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mediaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends mediaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: mediaGroupByArgs['orderBy'] }
        : { orderBy?: mediaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, mediaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMediaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the media model
   */
  readonly fields: mediaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for media.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__mediaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    upload_status<T extends media$upload_statusArgs<ExtArgs> = {}>(args?: Subset<T, media$upload_statusArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$upload_statusPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the media model
   */
  interface mediaFieldRefs {
    readonly video_id: FieldRef<"media", 'String'>
    readonly author_id: FieldRef<"media", 'String'>
    readonly video_path: FieldRef<"media", 'String'>
    readonly cover_path: FieldRef<"media", 'String'>
    readonly title: FieldRef<"media", 'String'>
    readonly description: FieldRef<"media", 'String'>
    readonly tags: FieldRef<"media", 'String'>
  }
    

  // Custom InputTypes
  /**
   * media findUnique
   */
  export type mediaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the media
     */
    select?: mediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the media
     */
    omit?: mediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mediaInclude<ExtArgs> | null
    /**
     * Filter, which media to fetch.
     */
    where: mediaWhereUniqueInput
  }

  /**
   * media findUniqueOrThrow
   */
  export type mediaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the media
     */
    select?: mediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the media
     */
    omit?: mediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mediaInclude<ExtArgs> | null
    /**
     * Filter, which media to fetch.
     */
    where: mediaWhereUniqueInput
  }

  /**
   * media findFirst
   */
  export type mediaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the media
     */
    select?: mediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the media
     */
    omit?: mediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mediaInclude<ExtArgs> | null
    /**
     * Filter, which media to fetch.
     */
    where?: mediaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of media to fetch.
     */
    orderBy?: mediaOrderByWithRelationInput | mediaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for media.
     */
    cursor?: mediaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` media from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` media.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of media.
     */
    distinct?: MediaScalarFieldEnum | MediaScalarFieldEnum[]
  }

  /**
   * media findFirstOrThrow
   */
  export type mediaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the media
     */
    select?: mediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the media
     */
    omit?: mediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mediaInclude<ExtArgs> | null
    /**
     * Filter, which media to fetch.
     */
    where?: mediaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of media to fetch.
     */
    orderBy?: mediaOrderByWithRelationInput | mediaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for media.
     */
    cursor?: mediaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` media from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` media.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of media.
     */
    distinct?: MediaScalarFieldEnum | MediaScalarFieldEnum[]
  }

  /**
   * media findMany
   */
  export type mediaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the media
     */
    select?: mediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the media
     */
    omit?: mediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mediaInclude<ExtArgs> | null
    /**
     * Filter, which media to fetch.
     */
    where?: mediaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of media to fetch.
     */
    orderBy?: mediaOrderByWithRelationInput | mediaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing media.
     */
    cursor?: mediaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` media from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` media.
     */
    skip?: number
    distinct?: MediaScalarFieldEnum | MediaScalarFieldEnum[]
  }

  /**
   * media create
   */
  export type mediaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the media
     */
    select?: mediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the media
     */
    omit?: mediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mediaInclude<ExtArgs> | null
    /**
     * The data needed to create a media.
     */
    data: XOR<mediaCreateInput, mediaUncheckedCreateInput>
  }

  /**
   * media createMany
   */
  export type mediaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many media.
     */
    data: mediaCreateManyInput | mediaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * media createManyAndReturn
   */
  export type mediaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the media
     */
    select?: mediaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the media
     */
    omit?: mediaOmit<ExtArgs> | null
    /**
     * The data used to create many media.
     */
    data: mediaCreateManyInput | mediaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * media update
   */
  export type mediaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the media
     */
    select?: mediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the media
     */
    omit?: mediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mediaInclude<ExtArgs> | null
    /**
     * The data needed to update a media.
     */
    data: XOR<mediaUpdateInput, mediaUncheckedUpdateInput>
    /**
     * Choose, which media to update.
     */
    where: mediaWhereUniqueInput
  }

  /**
   * media updateMany
   */
  export type mediaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update media.
     */
    data: XOR<mediaUpdateManyMutationInput, mediaUncheckedUpdateManyInput>
    /**
     * Filter which media to update
     */
    where?: mediaWhereInput
    /**
     * Limit how many media to update.
     */
    limit?: number
  }

  /**
   * media updateManyAndReturn
   */
  export type mediaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the media
     */
    select?: mediaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the media
     */
    omit?: mediaOmit<ExtArgs> | null
    /**
     * The data used to update media.
     */
    data: XOR<mediaUpdateManyMutationInput, mediaUncheckedUpdateManyInput>
    /**
     * Filter which media to update
     */
    where?: mediaWhereInput
    /**
     * Limit how many media to update.
     */
    limit?: number
  }

  /**
   * media upsert
   */
  export type mediaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the media
     */
    select?: mediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the media
     */
    omit?: mediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mediaInclude<ExtArgs> | null
    /**
     * The filter to search for the media to update in case it exists.
     */
    where: mediaWhereUniqueInput
    /**
     * In case the media found by the `where` argument doesn't exist, create a new media with this data.
     */
    create: XOR<mediaCreateInput, mediaUncheckedCreateInput>
    /**
     * In case the media was found with the provided `where` argument, update it with this data.
     */
    update: XOR<mediaUpdateInput, mediaUncheckedUpdateInput>
  }

  /**
   * media delete
   */
  export type mediaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the media
     */
    select?: mediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the media
     */
    omit?: mediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mediaInclude<ExtArgs> | null
    /**
     * Filter which media to delete.
     */
    where: mediaWhereUniqueInput
  }

  /**
   * media deleteMany
   */
  export type mediaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which media to delete
     */
    where?: mediaWhereInput
    /**
     * Limit how many media to delete.
     */
    limit?: number
  }

  /**
   * media.upload_status
   */
  export type media$upload_statusArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the upload_status
     */
    select?: upload_statusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the upload_status
     */
    omit?: upload_statusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: upload_statusInclude<ExtArgs> | null
    where?: upload_statusWhereInput
    orderBy?: upload_statusOrderByWithRelationInput | upload_statusOrderByWithRelationInput[]
    cursor?: upload_statusWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Upload_statusScalarFieldEnum | Upload_statusScalarFieldEnum[]
  }

  /**
   * media without action
   */
  export type mediaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the media
     */
    select?: mediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the media
     */
    omit?: mediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mediaInclude<ExtArgs> | null
  }


  /**
   * Model texts
   */

  export type AggregateTexts = {
    _count: TextsCountAggregateOutputType | null
    _min: TextsMinAggregateOutputType | null
    _max: TextsMaxAggregateOutputType | null
  }

  export type TextsMinAggregateOutputType = {
    texts_text_id: string | null
    texts_text_content: string | null
  }

  export type TextsMaxAggregateOutputType = {
    texts_text_id: string | null
    texts_text_content: string | null
  }

  export type TextsCountAggregateOutputType = {
    texts_text_id: number
    texts_text_content: number
    _all: number
  }


  export type TextsMinAggregateInputType = {
    texts_text_id?: true
    texts_text_content?: true
  }

  export type TextsMaxAggregateInputType = {
    texts_text_id?: true
    texts_text_content?: true
  }

  export type TextsCountAggregateInputType = {
    texts_text_id?: true
    texts_text_content?: true
    _all?: true
  }

  export type TextsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which texts to aggregate.
     */
    where?: textsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of texts to fetch.
     */
    orderBy?: textsOrderByWithRelationInput | textsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: textsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` texts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` texts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned texts
    **/
    _count?: true | TextsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TextsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TextsMaxAggregateInputType
  }

  export type GetTextsAggregateType<T extends TextsAggregateArgs> = {
        [P in keyof T & keyof AggregateTexts]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTexts[P]>
      : GetScalarType<T[P], AggregateTexts[P]>
  }




  export type textsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: textsWhereInput
    orderBy?: textsOrderByWithAggregationInput | textsOrderByWithAggregationInput[]
    by: TextsScalarFieldEnum[] | TextsScalarFieldEnum
    having?: textsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TextsCountAggregateInputType | true
    _min?: TextsMinAggregateInputType
    _max?: TextsMaxAggregateInputType
  }

  export type TextsGroupByOutputType = {
    texts_text_id: string
    texts_text_content: string | null
    _count: TextsCountAggregateOutputType | null
    _min: TextsMinAggregateOutputType | null
    _max: TextsMaxAggregateOutputType | null
  }

  type GetTextsGroupByPayload<T extends textsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TextsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TextsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TextsGroupByOutputType[P]>
            : GetScalarType<T[P], TextsGroupByOutputType[P]>
        }
      >
    >


  export type textsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    texts_text_id?: boolean
    texts_text_content?: boolean
  }, ExtArgs["result"]["texts"]>

  export type textsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    texts_text_id?: boolean
    texts_text_content?: boolean
  }, ExtArgs["result"]["texts"]>

  export type textsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    texts_text_id?: boolean
    texts_text_content?: boolean
  }, ExtArgs["result"]["texts"]>

  export type textsSelectScalar = {
    texts_text_id?: boolean
    texts_text_content?: boolean
  }

  export type textsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"texts_text_id" | "texts_text_content", ExtArgs["result"]["texts"]>

  export type $textsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "texts"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      texts_text_id: string
      texts_text_content: string | null
    }, ExtArgs["result"]["texts"]>
    composites: {}
  }

  type textsGetPayload<S extends boolean | null | undefined | textsDefaultArgs> = $Result.GetResult<Prisma.$textsPayload, S>

  type textsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<textsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TextsCountAggregateInputType | true
    }

  export interface textsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['texts'], meta: { name: 'texts' } }
    /**
     * Find zero or one Texts that matches the filter.
     * @param {textsFindUniqueArgs} args - Arguments to find a Texts
     * @example
     * // Get one Texts
     * const texts = await prisma.texts.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends textsFindUniqueArgs>(args: SelectSubset<T, textsFindUniqueArgs<ExtArgs>>): Prisma__textsClient<$Result.GetResult<Prisma.$textsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Texts that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {textsFindUniqueOrThrowArgs} args - Arguments to find a Texts
     * @example
     * // Get one Texts
     * const texts = await prisma.texts.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends textsFindUniqueOrThrowArgs>(args: SelectSubset<T, textsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__textsClient<$Result.GetResult<Prisma.$textsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Texts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {textsFindFirstArgs} args - Arguments to find a Texts
     * @example
     * // Get one Texts
     * const texts = await prisma.texts.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends textsFindFirstArgs>(args?: SelectSubset<T, textsFindFirstArgs<ExtArgs>>): Prisma__textsClient<$Result.GetResult<Prisma.$textsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Texts that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {textsFindFirstOrThrowArgs} args - Arguments to find a Texts
     * @example
     * // Get one Texts
     * const texts = await prisma.texts.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends textsFindFirstOrThrowArgs>(args?: SelectSubset<T, textsFindFirstOrThrowArgs<ExtArgs>>): Prisma__textsClient<$Result.GetResult<Prisma.$textsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Texts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {textsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Texts
     * const texts = await prisma.texts.findMany()
     * 
     * // Get first 10 Texts
     * const texts = await prisma.texts.findMany({ take: 10 })
     * 
     * // Only select the `texts_text_id`
     * const textsWithTexts_text_idOnly = await prisma.texts.findMany({ select: { texts_text_id: true } })
     * 
     */
    findMany<T extends textsFindManyArgs>(args?: SelectSubset<T, textsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$textsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Texts.
     * @param {textsCreateArgs} args - Arguments to create a Texts.
     * @example
     * // Create one Texts
     * const Texts = await prisma.texts.create({
     *   data: {
     *     // ... data to create a Texts
     *   }
     * })
     * 
     */
    create<T extends textsCreateArgs>(args: SelectSubset<T, textsCreateArgs<ExtArgs>>): Prisma__textsClient<$Result.GetResult<Prisma.$textsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Texts.
     * @param {textsCreateManyArgs} args - Arguments to create many Texts.
     * @example
     * // Create many Texts
     * const texts = await prisma.texts.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends textsCreateManyArgs>(args?: SelectSubset<T, textsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Texts and returns the data saved in the database.
     * @param {textsCreateManyAndReturnArgs} args - Arguments to create many Texts.
     * @example
     * // Create many Texts
     * const texts = await prisma.texts.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Texts and only return the `texts_text_id`
     * const textsWithTexts_text_idOnly = await prisma.texts.createManyAndReturn({
     *   select: { texts_text_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends textsCreateManyAndReturnArgs>(args?: SelectSubset<T, textsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$textsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Texts.
     * @param {textsDeleteArgs} args - Arguments to delete one Texts.
     * @example
     * // Delete one Texts
     * const Texts = await prisma.texts.delete({
     *   where: {
     *     // ... filter to delete one Texts
     *   }
     * })
     * 
     */
    delete<T extends textsDeleteArgs>(args: SelectSubset<T, textsDeleteArgs<ExtArgs>>): Prisma__textsClient<$Result.GetResult<Prisma.$textsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Texts.
     * @param {textsUpdateArgs} args - Arguments to update one Texts.
     * @example
     * // Update one Texts
     * const texts = await prisma.texts.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends textsUpdateArgs>(args: SelectSubset<T, textsUpdateArgs<ExtArgs>>): Prisma__textsClient<$Result.GetResult<Prisma.$textsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Texts.
     * @param {textsDeleteManyArgs} args - Arguments to filter Texts to delete.
     * @example
     * // Delete a few Texts
     * const { count } = await prisma.texts.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends textsDeleteManyArgs>(args?: SelectSubset<T, textsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Texts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {textsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Texts
     * const texts = await prisma.texts.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends textsUpdateManyArgs>(args: SelectSubset<T, textsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Texts and returns the data updated in the database.
     * @param {textsUpdateManyAndReturnArgs} args - Arguments to update many Texts.
     * @example
     * // Update many Texts
     * const texts = await prisma.texts.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Texts and only return the `texts_text_id`
     * const textsWithTexts_text_idOnly = await prisma.texts.updateManyAndReturn({
     *   select: { texts_text_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends textsUpdateManyAndReturnArgs>(args: SelectSubset<T, textsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$textsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Texts.
     * @param {textsUpsertArgs} args - Arguments to update or create a Texts.
     * @example
     * // Update or create a Texts
     * const texts = await prisma.texts.upsert({
     *   create: {
     *     // ... data to create a Texts
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Texts we want to update
     *   }
     * })
     */
    upsert<T extends textsUpsertArgs>(args: SelectSubset<T, textsUpsertArgs<ExtArgs>>): Prisma__textsClient<$Result.GetResult<Prisma.$textsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Texts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {textsCountArgs} args - Arguments to filter Texts to count.
     * @example
     * // Count the number of Texts
     * const count = await prisma.texts.count({
     *   where: {
     *     // ... the filter for the Texts we want to count
     *   }
     * })
    **/
    count<T extends textsCountArgs>(
      args?: Subset<T, textsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TextsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Texts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TextsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TextsAggregateArgs>(args: Subset<T, TextsAggregateArgs>): Prisma.PrismaPromise<GetTextsAggregateType<T>>

    /**
     * Group by Texts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {textsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends textsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: textsGroupByArgs['orderBy'] }
        : { orderBy?: textsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, textsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTextsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the texts model
   */
  readonly fields: textsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for texts.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__textsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the texts model
   */
  interface textsFieldRefs {
    readonly texts_text_id: FieldRef<"texts", 'String'>
    readonly texts_text_content: FieldRef<"texts", 'String'>
  }
    

  // Custom InputTypes
  /**
   * texts findUnique
   */
  export type textsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the texts
     */
    select?: textsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the texts
     */
    omit?: textsOmit<ExtArgs> | null
    /**
     * Filter, which texts to fetch.
     */
    where: textsWhereUniqueInput
  }

  /**
   * texts findUniqueOrThrow
   */
  export type textsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the texts
     */
    select?: textsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the texts
     */
    omit?: textsOmit<ExtArgs> | null
    /**
     * Filter, which texts to fetch.
     */
    where: textsWhereUniqueInput
  }

  /**
   * texts findFirst
   */
  export type textsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the texts
     */
    select?: textsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the texts
     */
    omit?: textsOmit<ExtArgs> | null
    /**
     * Filter, which texts to fetch.
     */
    where?: textsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of texts to fetch.
     */
    orderBy?: textsOrderByWithRelationInput | textsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for texts.
     */
    cursor?: textsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` texts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` texts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of texts.
     */
    distinct?: TextsScalarFieldEnum | TextsScalarFieldEnum[]
  }

  /**
   * texts findFirstOrThrow
   */
  export type textsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the texts
     */
    select?: textsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the texts
     */
    omit?: textsOmit<ExtArgs> | null
    /**
     * Filter, which texts to fetch.
     */
    where?: textsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of texts to fetch.
     */
    orderBy?: textsOrderByWithRelationInput | textsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for texts.
     */
    cursor?: textsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` texts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` texts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of texts.
     */
    distinct?: TextsScalarFieldEnum | TextsScalarFieldEnum[]
  }

  /**
   * texts findMany
   */
  export type textsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the texts
     */
    select?: textsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the texts
     */
    omit?: textsOmit<ExtArgs> | null
    /**
     * Filter, which texts to fetch.
     */
    where?: textsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of texts to fetch.
     */
    orderBy?: textsOrderByWithRelationInput | textsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing texts.
     */
    cursor?: textsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` texts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` texts.
     */
    skip?: number
    distinct?: TextsScalarFieldEnum | TextsScalarFieldEnum[]
  }

  /**
   * texts create
   */
  export type textsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the texts
     */
    select?: textsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the texts
     */
    omit?: textsOmit<ExtArgs> | null
    /**
     * The data needed to create a texts.
     */
    data: XOR<textsCreateInput, textsUncheckedCreateInput>
  }

  /**
   * texts createMany
   */
  export type textsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many texts.
     */
    data: textsCreateManyInput | textsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * texts createManyAndReturn
   */
  export type textsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the texts
     */
    select?: textsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the texts
     */
    omit?: textsOmit<ExtArgs> | null
    /**
     * The data used to create many texts.
     */
    data: textsCreateManyInput | textsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * texts update
   */
  export type textsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the texts
     */
    select?: textsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the texts
     */
    omit?: textsOmit<ExtArgs> | null
    /**
     * The data needed to update a texts.
     */
    data: XOR<textsUpdateInput, textsUncheckedUpdateInput>
    /**
     * Choose, which texts to update.
     */
    where: textsWhereUniqueInput
  }

  /**
   * texts updateMany
   */
  export type textsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update texts.
     */
    data: XOR<textsUpdateManyMutationInput, textsUncheckedUpdateManyInput>
    /**
     * Filter which texts to update
     */
    where?: textsWhereInput
    /**
     * Limit how many texts to update.
     */
    limit?: number
  }

  /**
   * texts updateManyAndReturn
   */
  export type textsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the texts
     */
    select?: textsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the texts
     */
    omit?: textsOmit<ExtArgs> | null
    /**
     * The data used to update texts.
     */
    data: XOR<textsUpdateManyMutationInput, textsUncheckedUpdateManyInput>
    /**
     * Filter which texts to update
     */
    where?: textsWhereInput
    /**
     * Limit how many texts to update.
     */
    limit?: number
  }

  /**
   * texts upsert
   */
  export type textsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the texts
     */
    select?: textsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the texts
     */
    omit?: textsOmit<ExtArgs> | null
    /**
     * The filter to search for the texts to update in case it exists.
     */
    where: textsWhereUniqueInput
    /**
     * In case the texts found by the `where` argument doesn't exist, create a new texts with this data.
     */
    create: XOR<textsCreateInput, textsUncheckedCreateInput>
    /**
     * In case the texts was found with the provided `where` argument, update it with this data.
     */
    update: XOR<textsUpdateInput, textsUncheckedUpdateInput>
  }

  /**
   * texts delete
   */
  export type textsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the texts
     */
    select?: textsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the texts
     */
    omit?: textsOmit<ExtArgs> | null
    /**
     * Filter which texts to delete.
     */
    where: textsWhereUniqueInput
  }

  /**
   * texts deleteMany
   */
  export type textsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which texts to delete
     */
    where?: textsWhereInput
    /**
     * Limit how many texts to delete.
     */
    limit?: number
  }

  /**
   * texts without action
   */
  export type textsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the texts
     */
    select?: textsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the texts
     */
    omit?: textsOmit<ExtArgs> | null
  }


  /**
   * Model upload_status
   */

  export type AggregateUpload_status = {
    _count: Upload_statusCountAggregateOutputType | null
    _avg: Upload_statusAvgAggregateOutputType | null
    _sum: Upload_statusSumAggregateOutputType | null
    _min: Upload_statusMinAggregateOutputType | null
    _max: Upload_statusMaxAggregateOutputType | null
  }

  export type Upload_statusAvgAggregateOutputType = {
    id: number | null
    retry_count: number | null
  }

  export type Upload_statusSumAggregateOutputType = {
    id: number | null
    retry_count: number | null
  }

  export type Upload_statusMinAggregateOutputType = {
    id: number | null
    video_id: string | null
    status: string | null
    upload_timestamp: Date | null
    r2_video_url: string | null
    r2_cover_url: string | null
    retry_count: number | null
    last_error: string | null
  }

  export type Upload_statusMaxAggregateOutputType = {
    id: number | null
    video_id: string | null
    status: string | null
    upload_timestamp: Date | null
    r2_video_url: string | null
    r2_cover_url: string | null
    retry_count: number | null
    last_error: string | null
  }

  export type Upload_statusCountAggregateOutputType = {
    id: number
    video_id: number
    status: number
    upload_timestamp: number
    r2_video_url: number
    r2_cover_url: number
    retry_count: number
    last_error: number
    _all: number
  }


  export type Upload_statusAvgAggregateInputType = {
    id?: true
    retry_count?: true
  }

  export type Upload_statusSumAggregateInputType = {
    id?: true
    retry_count?: true
  }

  export type Upload_statusMinAggregateInputType = {
    id?: true
    video_id?: true
    status?: true
    upload_timestamp?: true
    r2_video_url?: true
    r2_cover_url?: true
    retry_count?: true
    last_error?: true
  }

  export type Upload_statusMaxAggregateInputType = {
    id?: true
    video_id?: true
    status?: true
    upload_timestamp?: true
    r2_video_url?: true
    r2_cover_url?: true
    retry_count?: true
    last_error?: true
  }

  export type Upload_statusCountAggregateInputType = {
    id?: true
    video_id?: true
    status?: true
    upload_timestamp?: true
    r2_video_url?: true
    r2_cover_url?: true
    retry_count?: true
    last_error?: true
    _all?: true
  }

  export type Upload_statusAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which upload_status to aggregate.
     */
    where?: upload_statusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of upload_statuses to fetch.
     */
    orderBy?: upload_statusOrderByWithRelationInput | upload_statusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: upload_statusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` upload_statuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` upload_statuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned upload_statuses
    **/
    _count?: true | Upload_statusCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Upload_statusAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Upload_statusSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Upload_statusMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Upload_statusMaxAggregateInputType
  }

  export type GetUpload_statusAggregateType<T extends Upload_statusAggregateArgs> = {
        [P in keyof T & keyof AggregateUpload_status]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUpload_status[P]>
      : GetScalarType<T[P], AggregateUpload_status[P]>
  }




  export type upload_statusGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: upload_statusWhereInput
    orderBy?: upload_statusOrderByWithAggregationInput | upload_statusOrderByWithAggregationInput[]
    by: Upload_statusScalarFieldEnum[] | Upload_statusScalarFieldEnum
    having?: upload_statusScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Upload_statusCountAggregateInputType | true
    _avg?: Upload_statusAvgAggregateInputType
    _sum?: Upload_statusSumAggregateInputType
    _min?: Upload_statusMinAggregateInputType
    _max?: Upload_statusMaxAggregateInputType
  }

  export type Upload_statusGroupByOutputType = {
    id: number
    video_id: string | null
    status: string | null
    upload_timestamp: Date | null
    r2_video_url: string | null
    r2_cover_url: string | null
    retry_count: number | null
    last_error: string | null
    _count: Upload_statusCountAggregateOutputType | null
    _avg: Upload_statusAvgAggregateOutputType | null
    _sum: Upload_statusSumAggregateOutputType | null
    _min: Upload_statusMinAggregateOutputType | null
    _max: Upload_statusMaxAggregateOutputType | null
  }

  type GetUpload_statusGroupByPayload<T extends upload_statusGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Upload_statusGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Upload_statusGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Upload_statusGroupByOutputType[P]>
            : GetScalarType<T[P], Upload_statusGroupByOutputType[P]>
        }
      >
    >


  export type upload_statusSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    video_id?: boolean
    status?: boolean
    upload_timestamp?: boolean
    r2_video_url?: boolean
    r2_cover_url?: boolean
    retry_count?: boolean
    last_error?: boolean
    media?: boolean | upload_status$mediaArgs<ExtArgs>
  }, ExtArgs["result"]["upload_status"]>

  export type upload_statusSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    video_id?: boolean
    status?: boolean
    upload_timestamp?: boolean
    r2_video_url?: boolean
    r2_cover_url?: boolean
    retry_count?: boolean
    last_error?: boolean
    media?: boolean | upload_status$mediaArgs<ExtArgs>
  }, ExtArgs["result"]["upload_status"]>

  export type upload_statusSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    video_id?: boolean
    status?: boolean
    upload_timestamp?: boolean
    r2_video_url?: boolean
    r2_cover_url?: boolean
    retry_count?: boolean
    last_error?: boolean
    media?: boolean | upload_status$mediaArgs<ExtArgs>
  }, ExtArgs["result"]["upload_status"]>

  export type upload_statusSelectScalar = {
    id?: boolean
    video_id?: boolean
    status?: boolean
    upload_timestamp?: boolean
    r2_video_url?: boolean
    r2_cover_url?: boolean
    retry_count?: boolean
    last_error?: boolean
  }

  export type upload_statusOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "video_id" | "status" | "upload_timestamp" | "r2_video_url" | "r2_cover_url" | "retry_count" | "last_error", ExtArgs["result"]["upload_status"]>
  export type upload_statusInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    media?: boolean | upload_status$mediaArgs<ExtArgs>
  }
  export type upload_statusIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    media?: boolean | upload_status$mediaArgs<ExtArgs>
  }
  export type upload_statusIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    media?: boolean | upload_status$mediaArgs<ExtArgs>
  }

  export type $upload_statusPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "upload_status"
    objects: {
      media: Prisma.$mediaPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      video_id: string | null
      status: string | null
      upload_timestamp: Date | null
      r2_video_url: string | null
      r2_cover_url: string | null
      retry_count: number | null
      last_error: string | null
    }, ExtArgs["result"]["upload_status"]>
    composites: {}
  }

  type upload_statusGetPayload<S extends boolean | null | undefined | upload_statusDefaultArgs> = $Result.GetResult<Prisma.$upload_statusPayload, S>

  type upload_statusCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<upload_statusFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Upload_statusCountAggregateInputType | true
    }

  export interface upload_statusDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['upload_status'], meta: { name: 'upload_status' } }
    /**
     * Find zero or one Upload_status that matches the filter.
     * @param {upload_statusFindUniqueArgs} args - Arguments to find a Upload_status
     * @example
     * // Get one Upload_status
     * const upload_status = await prisma.upload_status.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends upload_statusFindUniqueArgs>(args: SelectSubset<T, upload_statusFindUniqueArgs<ExtArgs>>): Prisma__upload_statusClient<$Result.GetResult<Prisma.$upload_statusPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Upload_status that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {upload_statusFindUniqueOrThrowArgs} args - Arguments to find a Upload_status
     * @example
     * // Get one Upload_status
     * const upload_status = await prisma.upload_status.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends upload_statusFindUniqueOrThrowArgs>(args: SelectSubset<T, upload_statusFindUniqueOrThrowArgs<ExtArgs>>): Prisma__upload_statusClient<$Result.GetResult<Prisma.$upload_statusPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Upload_status that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {upload_statusFindFirstArgs} args - Arguments to find a Upload_status
     * @example
     * // Get one Upload_status
     * const upload_status = await prisma.upload_status.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends upload_statusFindFirstArgs>(args?: SelectSubset<T, upload_statusFindFirstArgs<ExtArgs>>): Prisma__upload_statusClient<$Result.GetResult<Prisma.$upload_statusPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Upload_status that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {upload_statusFindFirstOrThrowArgs} args - Arguments to find a Upload_status
     * @example
     * // Get one Upload_status
     * const upload_status = await prisma.upload_status.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends upload_statusFindFirstOrThrowArgs>(args?: SelectSubset<T, upload_statusFindFirstOrThrowArgs<ExtArgs>>): Prisma__upload_statusClient<$Result.GetResult<Prisma.$upload_statusPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Upload_statuses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {upload_statusFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Upload_statuses
     * const upload_statuses = await prisma.upload_status.findMany()
     * 
     * // Get first 10 Upload_statuses
     * const upload_statuses = await prisma.upload_status.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const upload_statusWithIdOnly = await prisma.upload_status.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends upload_statusFindManyArgs>(args?: SelectSubset<T, upload_statusFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$upload_statusPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Upload_status.
     * @param {upload_statusCreateArgs} args - Arguments to create a Upload_status.
     * @example
     * // Create one Upload_status
     * const Upload_status = await prisma.upload_status.create({
     *   data: {
     *     // ... data to create a Upload_status
     *   }
     * })
     * 
     */
    create<T extends upload_statusCreateArgs>(args: SelectSubset<T, upload_statusCreateArgs<ExtArgs>>): Prisma__upload_statusClient<$Result.GetResult<Prisma.$upload_statusPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Upload_statuses.
     * @param {upload_statusCreateManyArgs} args - Arguments to create many Upload_statuses.
     * @example
     * // Create many Upload_statuses
     * const upload_status = await prisma.upload_status.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends upload_statusCreateManyArgs>(args?: SelectSubset<T, upload_statusCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Upload_statuses and returns the data saved in the database.
     * @param {upload_statusCreateManyAndReturnArgs} args - Arguments to create many Upload_statuses.
     * @example
     * // Create many Upload_statuses
     * const upload_status = await prisma.upload_status.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Upload_statuses and only return the `id`
     * const upload_statusWithIdOnly = await prisma.upload_status.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends upload_statusCreateManyAndReturnArgs>(args?: SelectSubset<T, upload_statusCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$upload_statusPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Upload_status.
     * @param {upload_statusDeleteArgs} args - Arguments to delete one Upload_status.
     * @example
     * // Delete one Upload_status
     * const Upload_status = await prisma.upload_status.delete({
     *   where: {
     *     // ... filter to delete one Upload_status
     *   }
     * })
     * 
     */
    delete<T extends upload_statusDeleteArgs>(args: SelectSubset<T, upload_statusDeleteArgs<ExtArgs>>): Prisma__upload_statusClient<$Result.GetResult<Prisma.$upload_statusPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Upload_status.
     * @param {upload_statusUpdateArgs} args - Arguments to update one Upload_status.
     * @example
     * // Update one Upload_status
     * const upload_status = await prisma.upload_status.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends upload_statusUpdateArgs>(args: SelectSubset<T, upload_statusUpdateArgs<ExtArgs>>): Prisma__upload_statusClient<$Result.GetResult<Prisma.$upload_statusPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Upload_statuses.
     * @param {upload_statusDeleteManyArgs} args - Arguments to filter Upload_statuses to delete.
     * @example
     * // Delete a few Upload_statuses
     * const { count } = await prisma.upload_status.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends upload_statusDeleteManyArgs>(args?: SelectSubset<T, upload_statusDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Upload_statuses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {upload_statusUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Upload_statuses
     * const upload_status = await prisma.upload_status.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends upload_statusUpdateManyArgs>(args: SelectSubset<T, upload_statusUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Upload_statuses and returns the data updated in the database.
     * @param {upload_statusUpdateManyAndReturnArgs} args - Arguments to update many Upload_statuses.
     * @example
     * // Update many Upload_statuses
     * const upload_status = await prisma.upload_status.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Upload_statuses and only return the `id`
     * const upload_statusWithIdOnly = await prisma.upload_status.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends upload_statusUpdateManyAndReturnArgs>(args: SelectSubset<T, upload_statusUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$upload_statusPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Upload_status.
     * @param {upload_statusUpsertArgs} args - Arguments to update or create a Upload_status.
     * @example
     * // Update or create a Upload_status
     * const upload_status = await prisma.upload_status.upsert({
     *   create: {
     *     // ... data to create a Upload_status
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Upload_status we want to update
     *   }
     * })
     */
    upsert<T extends upload_statusUpsertArgs>(args: SelectSubset<T, upload_statusUpsertArgs<ExtArgs>>): Prisma__upload_statusClient<$Result.GetResult<Prisma.$upload_statusPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Upload_statuses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {upload_statusCountArgs} args - Arguments to filter Upload_statuses to count.
     * @example
     * // Count the number of Upload_statuses
     * const count = await prisma.upload_status.count({
     *   where: {
     *     // ... the filter for the Upload_statuses we want to count
     *   }
     * })
    **/
    count<T extends upload_statusCountArgs>(
      args?: Subset<T, upload_statusCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Upload_statusCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Upload_status.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Upload_statusAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Upload_statusAggregateArgs>(args: Subset<T, Upload_statusAggregateArgs>): Prisma.PrismaPromise<GetUpload_statusAggregateType<T>>

    /**
     * Group by Upload_status.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {upload_statusGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends upload_statusGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: upload_statusGroupByArgs['orderBy'] }
        : { orderBy?: upload_statusGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, upload_statusGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUpload_statusGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the upload_status model
   */
  readonly fields: upload_statusFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for upload_status.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__upload_statusClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    media<T extends upload_status$mediaArgs<ExtArgs> = {}>(args?: Subset<T, upload_status$mediaArgs<ExtArgs>>): Prisma__mediaClient<$Result.GetResult<Prisma.$mediaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the upload_status model
   */
  interface upload_statusFieldRefs {
    readonly id: FieldRef<"upload_status", 'Int'>
    readonly video_id: FieldRef<"upload_status", 'String'>
    readonly status: FieldRef<"upload_status", 'String'>
    readonly upload_timestamp: FieldRef<"upload_status", 'DateTime'>
    readonly r2_video_url: FieldRef<"upload_status", 'String'>
    readonly r2_cover_url: FieldRef<"upload_status", 'String'>
    readonly retry_count: FieldRef<"upload_status", 'Int'>
    readonly last_error: FieldRef<"upload_status", 'String'>
  }
    

  // Custom InputTypes
  /**
   * upload_status findUnique
   */
  export type upload_statusFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the upload_status
     */
    select?: upload_statusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the upload_status
     */
    omit?: upload_statusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: upload_statusInclude<ExtArgs> | null
    /**
     * Filter, which upload_status to fetch.
     */
    where: upload_statusWhereUniqueInput
  }

  /**
   * upload_status findUniqueOrThrow
   */
  export type upload_statusFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the upload_status
     */
    select?: upload_statusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the upload_status
     */
    omit?: upload_statusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: upload_statusInclude<ExtArgs> | null
    /**
     * Filter, which upload_status to fetch.
     */
    where: upload_statusWhereUniqueInput
  }

  /**
   * upload_status findFirst
   */
  export type upload_statusFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the upload_status
     */
    select?: upload_statusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the upload_status
     */
    omit?: upload_statusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: upload_statusInclude<ExtArgs> | null
    /**
     * Filter, which upload_status to fetch.
     */
    where?: upload_statusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of upload_statuses to fetch.
     */
    orderBy?: upload_statusOrderByWithRelationInput | upload_statusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for upload_statuses.
     */
    cursor?: upload_statusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` upload_statuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` upload_statuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of upload_statuses.
     */
    distinct?: Upload_statusScalarFieldEnum | Upload_statusScalarFieldEnum[]
  }

  /**
   * upload_status findFirstOrThrow
   */
  export type upload_statusFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the upload_status
     */
    select?: upload_statusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the upload_status
     */
    omit?: upload_statusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: upload_statusInclude<ExtArgs> | null
    /**
     * Filter, which upload_status to fetch.
     */
    where?: upload_statusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of upload_statuses to fetch.
     */
    orderBy?: upload_statusOrderByWithRelationInput | upload_statusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for upload_statuses.
     */
    cursor?: upload_statusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` upload_statuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` upload_statuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of upload_statuses.
     */
    distinct?: Upload_statusScalarFieldEnum | Upload_statusScalarFieldEnum[]
  }

  /**
   * upload_status findMany
   */
  export type upload_statusFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the upload_status
     */
    select?: upload_statusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the upload_status
     */
    omit?: upload_statusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: upload_statusInclude<ExtArgs> | null
    /**
     * Filter, which upload_statuses to fetch.
     */
    where?: upload_statusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of upload_statuses to fetch.
     */
    orderBy?: upload_statusOrderByWithRelationInput | upload_statusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing upload_statuses.
     */
    cursor?: upload_statusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` upload_statuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` upload_statuses.
     */
    skip?: number
    distinct?: Upload_statusScalarFieldEnum | Upload_statusScalarFieldEnum[]
  }

  /**
   * upload_status create
   */
  export type upload_statusCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the upload_status
     */
    select?: upload_statusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the upload_status
     */
    omit?: upload_statusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: upload_statusInclude<ExtArgs> | null
    /**
     * The data needed to create a upload_status.
     */
    data?: XOR<upload_statusCreateInput, upload_statusUncheckedCreateInput>
  }

  /**
   * upload_status createMany
   */
  export type upload_statusCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many upload_statuses.
     */
    data: upload_statusCreateManyInput | upload_statusCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * upload_status createManyAndReturn
   */
  export type upload_statusCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the upload_status
     */
    select?: upload_statusSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the upload_status
     */
    omit?: upload_statusOmit<ExtArgs> | null
    /**
     * The data used to create many upload_statuses.
     */
    data: upload_statusCreateManyInput | upload_statusCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: upload_statusIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * upload_status update
   */
  export type upload_statusUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the upload_status
     */
    select?: upload_statusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the upload_status
     */
    omit?: upload_statusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: upload_statusInclude<ExtArgs> | null
    /**
     * The data needed to update a upload_status.
     */
    data: XOR<upload_statusUpdateInput, upload_statusUncheckedUpdateInput>
    /**
     * Choose, which upload_status to update.
     */
    where: upload_statusWhereUniqueInput
  }

  /**
   * upload_status updateMany
   */
  export type upload_statusUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update upload_statuses.
     */
    data: XOR<upload_statusUpdateManyMutationInput, upload_statusUncheckedUpdateManyInput>
    /**
     * Filter which upload_statuses to update
     */
    where?: upload_statusWhereInput
    /**
     * Limit how many upload_statuses to update.
     */
    limit?: number
  }

  /**
   * upload_status updateManyAndReturn
   */
  export type upload_statusUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the upload_status
     */
    select?: upload_statusSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the upload_status
     */
    omit?: upload_statusOmit<ExtArgs> | null
    /**
     * The data used to update upload_statuses.
     */
    data: XOR<upload_statusUpdateManyMutationInput, upload_statusUncheckedUpdateManyInput>
    /**
     * Filter which upload_statuses to update
     */
    where?: upload_statusWhereInput
    /**
     * Limit how many upload_statuses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: upload_statusIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * upload_status upsert
   */
  export type upload_statusUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the upload_status
     */
    select?: upload_statusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the upload_status
     */
    omit?: upload_statusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: upload_statusInclude<ExtArgs> | null
    /**
     * The filter to search for the upload_status to update in case it exists.
     */
    where: upload_statusWhereUniqueInput
    /**
     * In case the upload_status found by the `where` argument doesn't exist, create a new upload_status with this data.
     */
    create: XOR<upload_statusCreateInput, upload_statusUncheckedCreateInput>
    /**
     * In case the upload_status was found with the provided `where` argument, update it with this data.
     */
    update: XOR<upload_statusUpdateInput, upload_statusUncheckedUpdateInput>
  }

  /**
   * upload_status delete
   */
  export type upload_statusDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the upload_status
     */
    select?: upload_statusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the upload_status
     */
    omit?: upload_statusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: upload_statusInclude<ExtArgs> | null
    /**
     * Filter which upload_status to delete.
     */
    where: upload_statusWhereUniqueInput
  }

  /**
   * upload_status deleteMany
   */
  export type upload_statusDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which upload_statuses to delete
     */
    where?: upload_statusWhereInput
    /**
     * Limit how many upload_statuses to delete.
     */
    limit?: number
  }

  /**
   * upload_status.media
   */
  export type upload_status$mediaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the media
     */
    select?: mediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the media
     */
    omit?: mediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mediaInclude<ExtArgs> | null
    where?: mediaWhereInput
  }

  /**
   * upload_status without action
   */
  export type upload_statusDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the upload_status
     */
    select?: upload_statusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the upload_status
     */
    omit?: upload_statusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: upload_statusInclude<ExtArgs> | null
  }


  /**
   * Model videos
   */

  export type AggregateVideos = {
    _count: VideosCountAggregateOutputType | null
    _min: VideosMinAggregateOutputType | null
    _max: VideosMaxAggregateOutputType | null
  }

  export type VideosMinAggregateOutputType = {
    videos_id: string | null
    videos_authorid: string | null
    videos_createtime: string | null
    videos_diggcount: string | null
    videos_playcount: string | null
    videos_audioid: string | null
    videos_size: string | null
    videos_itemmute: string | null
  }

  export type VideosMaxAggregateOutputType = {
    videos_id: string | null
    videos_authorid: string | null
    videos_createtime: string | null
    videos_diggcount: string | null
    videos_playcount: string | null
    videos_audioid: string | null
    videos_size: string | null
    videos_itemmute: string | null
  }

  export type VideosCountAggregateOutputType = {
    videos_id: number
    videos_authorid: number
    videos_createtime: number
    videos_diggcount: number
    videos_playcount: number
    videos_audioid: number
    videos_size: number
    videos_itemmute: number
    _all: number
  }


  export type VideosMinAggregateInputType = {
    videos_id?: true
    videos_authorid?: true
    videos_createtime?: true
    videos_diggcount?: true
    videos_playcount?: true
    videos_audioid?: true
    videos_size?: true
    videos_itemmute?: true
  }

  export type VideosMaxAggregateInputType = {
    videos_id?: true
    videos_authorid?: true
    videos_createtime?: true
    videos_diggcount?: true
    videos_playcount?: true
    videos_audioid?: true
    videos_size?: true
    videos_itemmute?: true
  }

  export type VideosCountAggregateInputType = {
    videos_id?: true
    videos_authorid?: true
    videos_createtime?: true
    videos_diggcount?: true
    videos_playcount?: true
    videos_audioid?: true
    videos_size?: true
    videos_itemmute?: true
    _all?: true
  }

  export type VideosAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which videos to aggregate.
     */
    where?: videosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of videos to fetch.
     */
    orderBy?: videosOrderByWithRelationInput | videosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: videosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` videos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` videos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned videos
    **/
    _count?: true | VideosCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VideosMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VideosMaxAggregateInputType
  }

  export type GetVideosAggregateType<T extends VideosAggregateArgs> = {
        [P in keyof T & keyof AggregateVideos]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVideos[P]>
      : GetScalarType<T[P], AggregateVideos[P]>
  }




  export type videosGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: videosWhereInput
    orderBy?: videosOrderByWithAggregationInput | videosOrderByWithAggregationInput[]
    by: VideosScalarFieldEnum[] | VideosScalarFieldEnum
    having?: videosScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VideosCountAggregateInputType | true
    _min?: VideosMinAggregateInputType
    _max?: VideosMaxAggregateInputType
  }

  export type VideosGroupByOutputType = {
    videos_id: string
    videos_authorid: string | null
    videos_createtime: string | null
    videos_diggcount: string | null
    videos_playcount: string | null
    videos_audioid: string | null
    videos_size: string | null
    videos_itemmute: string | null
    _count: VideosCountAggregateOutputType | null
    _min: VideosMinAggregateOutputType | null
    _max: VideosMaxAggregateOutputType | null
  }

  type GetVideosGroupByPayload<T extends videosGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VideosGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VideosGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VideosGroupByOutputType[P]>
            : GetScalarType<T[P], VideosGroupByOutputType[P]>
        }
      >
    >


  export type videosSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    videos_id?: boolean
    videos_authorid?: boolean
    videos_createtime?: boolean
    videos_diggcount?: boolean
    videos_playcount?: boolean
    videos_audioid?: boolean
    videos_size?: boolean
    videos_itemmute?: boolean
  }, ExtArgs["result"]["videos"]>

  export type videosSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    videos_id?: boolean
    videos_authorid?: boolean
    videos_createtime?: boolean
    videos_diggcount?: boolean
    videos_playcount?: boolean
    videos_audioid?: boolean
    videos_size?: boolean
    videos_itemmute?: boolean
  }, ExtArgs["result"]["videos"]>

  export type videosSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    videos_id?: boolean
    videos_authorid?: boolean
    videos_createtime?: boolean
    videos_diggcount?: boolean
    videos_playcount?: boolean
    videos_audioid?: boolean
    videos_size?: boolean
    videos_itemmute?: boolean
  }, ExtArgs["result"]["videos"]>

  export type videosSelectScalar = {
    videos_id?: boolean
    videos_authorid?: boolean
    videos_createtime?: boolean
    videos_diggcount?: boolean
    videos_playcount?: boolean
    videos_audioid?: boolean
    videos_size?: boolean
    videos_itemmute?: boolean
  }

  export type videosOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"videos_id" | "videos_authorid" | "videos_createtime" | "videos_diggcount" | "videos_playcount" | "videos_audioid" | "videos_size" | "videos_itemmute", ExtArgs["result"]["videos"]>

  export type $videosPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "videos"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      videos_id: string
      videos_authorid: string | null
      videos_createtime: string | null
      videos_diggcount: string | null
      videos_playcount: string | null
      videos_audioid: string | null
      videos_size: string | null
      videos_itemmute: string | null
    }, ExtArgs["result"]["videos"]>
    composites: {}
  }

  type videosGetPayload<S extends boolean | null | undefined | videosDefaultArgs> = $Result.GetResult<Prisma.$videosPayload, S>

  type videosCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<videosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VideosCountAggregateInputType | true
    }

  export interface videosDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['videos'], meta: { name: 'videos' } }
    /**
     * Find zero or one Videos that matches the filter.
     * @param {videosFindUniqueArgs} args - Arguments to find a Videos
     * @example
     * // Get one Videos
     * const videos = await prisma.videos.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends videosFindUniqueArgs>(args: SelectSubset<T, videosFindUniqueArgs<ExtArgs>>): Prisma__videosClient<$Result.GetResult<Prisma.$videosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Videos that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {videosFindUniqueOrThrowArgs} args - Arguments to find a Videos
     * @example
     * // Get one Videos
     * const videos = await prisma.videos.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends videosFindUniqueOrThrowArgs>(args: SelectSubset<T, videosFindUniqueOrThrowArgs<ExtArgs>>): Prisma__videosClient<$Result.GetResult<Prisma.$videosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Videos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {videosFindFirstArgs} args - Arguments to find a Videos
     * @example
     * // Get one Videos
     * const videos = await prisma.videos.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends videosFindFirstArgs>(args?: SelectSubset<T, videosFindFirstArgs<ExtArgs>>): Prisma__videosClient<$Result.GetResult<Prisma.$videosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Videos that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {videosFindFirstOrThrowArgs} args - Arguments to find a Videos
     * @example
     * // Get one Videos
     * const videos = await prisma.videos.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends videosFindFirstOrThrowArgs>(args?: SelectSubset<T, videosFindFirstOrThrowArgs<ExtArgs>>): Prisma__videosClient<$Result.GetResult<Prisma.$videosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Videos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {videosFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Videos
     * const videos = await prisma.videos.findMany()
     * 
     * // Get first 10 Videos
     * const videos = await prisma.videos.findMany({ take: 10 })
     * 
     * // Only select the `videos_id`
     * const videosWithVideos_idOnly = await prisma.videos.findMany({ select: { videos_id: true } })
     * 
     */
    findMany<T extends videosFindManyArgs>(args?: SelectSubset<T, videosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$videosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Videos.
     * @param {videosCreateArgs} args - Arguments to create a Videos.
     * @example
     * // Create one Videos
     * const Videos = await prisma.videos.create({
     *   data: {
     *     // ... data to create a Videos
     *   }
     * })
     * 
     */
    create<T extends videosCreateArgs>(args: SelectSubset<T, videosCreateArgs<ExtArgs>>): Prisma__videosClient<$Result.GetResult<Prisma.$videosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Videos.
     * @param {videosCreateManyArgs} args - Arguments to create many Videos.
     * @example
     * // Create many Videos
     * const videos = await prisma.videos.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends videosCreateManyArgs>(args?: SelectSubset<T, videosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Videos and returns the data saved in the database.
     * @param {videosCreateManyAndReturnArgs} args - Arguments to create many Videos.
     * @example
     * // Create many Videos
     * const videos = await prisma.videos.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Videos and only return the `videos_id`
     * const videosWithVideos_idOnly = await prisma.videos.createManyAndReturn({
     *   select: { videos_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends videosCreateManyAndReturnArgs>(args?: SelectSubset<T, videosCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$videosPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Videos.
     * @param {videosDeleteArgs} args - Arguments to delete one Videos.
     * @example
     * // Delete one Videos
     * const Videos = await prisma.videos.delete({
     *   where: {
     *     // ... filter to delete one Videos
     *   }
     * })
     * 
     */
    delete<T extends videosDeleteArgs>(args: SelectSubset<T, videosDeleteArgs<ExtArgs>>): Prisma__videosClient<$Result.GetResult<Prisma.$videosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Videos.
     * @param {videosUpdateArgs} args - Arguments to update one Videos.
     * @example
     * // Update one Videos
     * const videos = await prisma.videos.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends videosUpdateArgs>(args: SelectSubset<T, videosUpdateArgs<ExtArgs>>): Prisma__videosClient<$Result.GetResult<Prisma.$videosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Videos.
     * @param {videosDeleteManyArgs} args - Arguments to filter Videos to delete.
     * @example
     * // Delete a few Videos
     * const { count } = await prisma.videos.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends videosDeleteManyArgs>(args?: SelectSubset<T, videosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Videos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {videosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Videos
     * const videos = await prisma.videos.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends videosUpdateManyArgs>(args: SelectSubset<T, videosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Videos and returns the data updated in the database.
     * @param {videosUpdateManyAndReturnArgs} args - Arguments to update many Videos.
     * @example
     * // Update many Videos
     * const videos = await prisma.videos.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Videos and only return the `videos_id`
     * const videosWithVideos_idOnly = await prisma.videos.updateManyAndReturn({
     *   select: { videos_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends videosUpdateManyAndReturnArgs>(args: SelectSubset<T, videosUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$videosPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Videos.
     * @param {videosUpsertArgs} args - Arguments to update or create a Videos.
     * @example
     * // Update or create a Videos
     * const videos = await prisma.videos.upsert({
     *   create: {
     *     // ... data to create a Videos
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Videos we want to update
     *   }
     * })
     */
    upsert<T extends videosUpsertArgs>(args: SelectSubset<T, videosUpsertArgs<ExtArgs>>): Prisma__videosClient<$Result.GetResult<Prisma.$videosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Videos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {videosCountArgs} args - Arguments to filter Videos to count.
     * @example
     * // Count the number of Videos
     * const count = await prisma.videos.count({
     *   where: {
     *     // ... the filter for the Videos we want to count
     *   }
     * })
    **/
    count<T extends videosCountArgs>(
      args?: Subset<T, videosCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VideosCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Videos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VideosAggregateArgs>(args: Subset<T, VideosAggregateArgs>): Prisma.PrismaPromise<GetVideosAggregateType<T>>

    /**
     * Group by Videos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {videosGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends videosGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: videosGroupByArgs['orderBy'] }
        : { orderBy?: videosGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, videosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVideosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the videos model
   */
  readonly fields: videosFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for videos.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__videosClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the videos model
   */
  interface videosFieldRefs {
    readonly videos_id: FieldRef<"videos", 'String'>
    readonly videos_authorid: FieldRef<"videos", 'String'>
    readonly videos_createtime: FieldRef<"videos", 'String'>
    readonly videos_diggcount: FieldRef<"videos", 'String'>
    readonly videos_playcount: FieldRef<"videos", 'String'>
    readonly videos_audioid: FieldRef<"videos", 'String'>
    readonly videos_size: FieldRef<"videos", 'String'>
    readonly videos_itemmute: FieldRef<"videos", 'String'>
  }
    

  // Custom InputTypes
  /**
   * videos findUnique
   */
  export type videosFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the videos
     */
    select?: videosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the videos
     */
    omit?: videosOmit<ExtArgs> | null
    /**
     * Filter, which videos to fetch.
     */
    where: videosWhereUniqueInput
  }

  /**
   * videos findUniqueOrThrow
   */
  export type videosFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the videos
     */
    select?: videosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the videos
     */
    omit?: videosOmit<ExtArgs> | null
    /**
     * Filter, which videos to fetch.
     */
    where: videosWhereUniqueInput
  }

  /**
   * videos findFirst
   */
  export type videosFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the videos
     */
    select?: videosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the videos
     */
    omit?: videosOmit<ExtArgs> | null
    /**
     * Filter, which videos to fetch.
     */
    where?: videosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of videos to fetch.
     */
    orderBy?: videosOrderByWithRelationInput | videosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for videos.
     */
    cursor?: videosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` videos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` videos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of videos.
     */
    distinct?: VideosScalarFieldEnum | VideosScalarFieldEnum[]
  }

  /**
   * videos findFirstOrThrow
   */
  export type videosFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the videos
     */
    select?: videosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the videos
     */
    omit?: videosOmit<ExtArgs> | null
    /**
     * Filter, which videos to fetch.
     */
    where?: videosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of videos to fetch.
     */
    orderBy?: videosOrderByWithRelationInput | videosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for videos.
     */
    cursor?: videosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` videos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` videos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of videos.
     */
    distinct?: VideosScalarFieldEnum | VideosScalarFieldEnum[]
  }

  /**
   * videos findMany
   */
  export type videosFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the videos
     */
    select?: videosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the videos
     */
    omit?: videosOmit<ExtArgs> | null
    /**
     * Filter, which videos to fetch.
     */
    where?: videosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of videos to fetch.
     */
    orderBy?: videosOrderByWithRelationInput | videosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing videos.
     */
    cursor?: videosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` videos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` videos.
     */
    skip?: number
    distinct?: VideosScalarFieldEnum | VideosScalarFieldEnum[]
  }

  /**
   * videos create
   */
  export type videosCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the videos
     */
    select?: videosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the videos
     */
    omit?: videosOmit<ExtArgs> | null
    /**
     * The data needed to create a videos.
     */
    data: XOR<videosCreateInput, videosUncheckedCreateInput>
  }

  /**
   * videos createMany
   */
  export type videosCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many videos.
     */
    data: videosCreateManyInput | videosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * videos createManyAndReturn
   */
  export type videosCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the videos
     */
    select?: videosSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the videos
     */
    omit?: videosOmit<ExtArgs> | null
    /**
     * The data used to create many videos.
     */
    data: videosCreateManyInput | videosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * videos update
   */
  export type videosUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the videos
     */
    select?: videosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the videos
     */
    omit?: videosOmit<ExtArgs> | null
    /**
     * The data needed to update a videos.
     */
    data: XOR<videosUpdateInput, videosUncheckedUpdateInput>
    /**
     * Choose, which videos to update.
     */
    where: videosWhereUniqueInput
  }

  /**
   * videos updateMany
   */
  export type videosUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update videos.
     */
    data: XOR<videosUpdateManyMutationInput, videosUncheckedUpdateManyInput>
    /**
     * Filter which videos to update
     */
    where?: videosWhereInput
    /**
     * Limit how many videos to update.
     */
    limit?: number
  }

  /**
   * videos updateManyAndReturn
   */
  export type videosUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the videos
     */
    select?: videosSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the videos
     */
    omit?: videosOmit<ExtArgs> | null
    /**
     * The data used to update videos.
     */
    data: XOR<videosUpdateManyMutationInput, videosUncheckedUpdateManyInput>
    /**
     * Filter which videos to update
     */
    where?: videosWhereInput
    /**
     * Limit how many videos to update.
     */
    limit?: number
  }

  /**
   * videos upsert
   */
  export type videosUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the videos
     */
    select?: videosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the videos
     */
    omit?: videosOmit<ExtArgs> | null
    /**
     * The filter to search for the videos to update in case it exists.
     */
    where: videosWhereUniqueInput
    /**
     * In case the videos found by the `where` argument doesn't exist, create a new videos with this data.
     */
    create: XOR<videosCreateInput, videosUncheckedCreateInput>
    /**
     * In case the videos was found with the provided `where` argument, update it with this data.
     */
    update: XOR<videosUpdateInput, videosUncheckedUpdateInput>
  }

  /**
   * videos delete
   */
  export type videosDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the videos
     */
    select?: videosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the videos
     */
    omit?: videosOmit<ExtArgs> | null
    /**
     * Filter which videos to delete.
     */
    where: videosWhereUniqueInput
  }

  /**
   * videos deleteMany
   */
  export type videosDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which videos to delete
     */
    where?: videosWhereInput
    /**
     * Limit how many videos to delete.
     */
    limit?: number
  }

  /**
   * videos without action
   */
  export type videosDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the videos
     */
    select?: videosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the videos
     */
    omit?: videosOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const Alembic_versionScalarFieldEnum: {
    version_num: 'version_num'
  };

  export type Alembic_versionScalarFieldEnum = (typeof Alembic_versionScalarFieldEnum)[keyof typeof Alembic_versionScalarFieldEnum]


  export const AuthorsScalarFieldEnum: {
    authors_id: 'authors_id',
    authors_uniqueids: 'authors_uniqueids',
    authors_nicknames: 'authors_nicknames',
    authors_followercount: 'authors_followercount',
    authors_heartcount: 'authors_heartcount',
    authors_videocount: 'authors_videocount',
    authors_signature: 'authors_signature',
    authors_privateaccount: 'authors_privateaccount'
  };

  export type AuthorsScalarFieldEnum = (typeof AuthorsScalarFieldEnum)[keyof typeof AuthorsScalarFieldEnum]


  export const BookmarksScalarFieldEnum: {
    bookmarks_officiallist: 'bookmarks_officiallist',
    bookmarks_downloaded: 'bookmarks_downloaded',
    bookmarks_total: 'bookmarks_total',
    bookmarks_numdisappeared: 'bookmarks_numdisappeared',
    bookmarks_lastrun: 'bookmarks_lastrun'
  };

  export type BookmarksScalarFieldEnum = (typeof BookmarksScalarFieldEnum)[keyof typeof BookmarksScalarFieldEnum]


  export const ConsolidatedScalarFieldEnum: {
    c_videos_id: 'c_videos_id',
    c_videos_authorid: 'c_videos_authorid',
    c_videos_audioid: 'c_videos_audioid',
    c_authors_id: 'c_authors_id',
    c_authors_nicknames: 'c_authors_nicknames',
    c_authors_uniqueids: 'c_authors_uniqueids',
    c_texts_text_content: 'c_texts_text_content'
  };

  export type ConsolidatedScalarFieldEnum = (typeof ConsolidatedScalarFieldEnum)[keyof typeof ConsolidatedScalarFieldEnum]


  export const FollowingScalarFieldEnum: {
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

  export type FollowingScalarFieldEnum = (typeof FollowingScalarFieldEnum)[keyof typeof FollowingScalarFieldEnum]


  export const LikesScalarFieldEnum: {
    likes_schemaversion: 'likes_schemaversion',
    likes_user: 'likes_user',
    likes_likes: 'likes_likes'
  };

  export type LikesScalarFieldEnum = (typeof LikesScalarFieldEnum)[keyof typeof LikesScalarFieldEnum]


  export const MediaScalarFieldEnum: {
    video_id: 'video_id',
    author_id: 'author_id',
    video_path: 'video_path',
    cover_path: 'cover_path',
    title: 'title',
    description: 'description',
    tags: 'tags'
  };

  export type MediaScalarFieldEnum = (typeof MediaScalarFieldEnum)[keyof typeof MediaScalarFieldEnum]


  export const TextsScalarFieldEnum: {
    texts_text_id: 'texts_text_id',
    texts_text_content: 'texts_text_content'
  };

  export type TextsScalarFieldEnum = (typeof TextsScalarFieldEnum)[keyof typeof TextsScalarFieldEnum]


  export const Upload_statusScalarFieldEnum: {
    id: 'id',
    video_id: 'video_id',
    status: 'status',
    upload_timestamp: 'upload_timestamp',
    r2_video_url: 'r2_video_url',
    r2_cover_url: 'r2_cover_url',
    retry_count: 'retry_count',
    last_error: 'last_error'
  };

  export type Upload_statusScalarFieldEnum = (typeof Upload_statusScalarFieldEnum)[keyof typeof Upload_statusScalarFieldEnum]


  export const VideosScalarFieldEnum: {
    videos_id: 'videos_id',
    videos_authorid: 'videos_authorid',
    videos_createtime: 'videos_createtime',
    videos_diggcount: 'videos_diggcount',
    videos_playcount: 'videos_playcount',
    videos_audioid: 'videos_audioid',
    videos_size: 'videos_size',
    videos_itemmute: 'videos_itemmute'
  };

  export type VideosScalarFieldEnum = (typeof VideosScalarFieldEnum)[keyof typeof VideosScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type alembic_versionWhereInput = {
    AND?: alembic_versionWhereInput | alembic_versionWhereInput[]
    OR?: alembic_versionWhereInput[]
    NOT?: alembic_versionWhereInput | alembic_versionWhereInput[]
    version_num?: StringFilter<"alembic_version"> | string
  }

  export type alembic_versionOrderByWithRelationInput = {
    version_num?: SortOrder
  }

  export type alembic_versionWhereUniqueInput = Prisma.AtLeast<{
    version_num?: string
    AND?: alembic_versionWhereInput | alembic_versionWhereInput[]
    OR?: alembic_versionWhereInput[]
    NOT?: alembic_versionWhereInput | alembic_versionWhereInput[]
  }, "version_num">

  export type alembic_versionOrderByWithAggregationInput = {
    version_num?: SortOrder
    _count?: alembic_versionCountOrderByAggregateInput
    _max?: alembic_versionMaxOrderByAggregateInput
    _min?: alembic_versionMinOrderByAggregateInput
  }

  export type alembic_versionScalarWhereWithAggregatesInput = {
    AND?: alembic_versionScalarWhereWithAggregatesInput | alembic_versionScalarWhereWithAggregatesInput[]
    OR?: alembic_versionScalarWhereWithAggregatesInput[]
    NOT?: alembic_versionScalarWhereWithAggregatesInput | alembic_versionScalarWhereWithAggregatesInput[]
    version_num?: StringWithAggregatesFilter<"alembic_version"> | string
  }

  export type authorsWhereInput = {
    AND?: authorsWhereInput | authorsWhereInput[]
    OR?: authorsWhereInput[]
    NOT?: authorsWhereInput | authorsWhereInput[]
    authors_id?: StringFilter<"authors"> | string
    authors_uniqueids?: StringNullableFilter<"authors"> | string | null
    authors_nicknames?: StringNullableFilter<"authors"> | string | null
    authors_followercount?: StringNullableFilter<"authors"> | string | null
    authors_heartcount?: StringNullableFilter<"authors"> | string | null
    authors_videocount?: StringNullableFilter<"authors"> | string | null
    authors_signature?: StringNullableFilter<"authors"> | string | null
    authors_privateaccount?: BoolNullableFilter<"authors"> | boolean | null
  }

  export type authorsOrderByWithRelationInput = {
    authors_id?: SortOrder
    authors_uniqueids?: SortOrderInput | SortOrder
    authors_nicknames?: SortOrderInput | SortOrder
    authors_followercount?: SortOrderInput | SortOrder
    authors_heartcount?: SortOrderInput | SortOrder
    authors_videocount?: SortOrderInput | SortOrder
    authors_signature?: SortOrderInput | SortOrder
    authors_privateaccount?: SortOrderInput | SortOrder
  }

  export type authorsWhereUniqueInput = Prisma.AtLeast<{
    authors_id?: string
    AND?: authorsWhereInput | authorsWhereInput[]
    OR?: authorsWhereInput[]
    NOT?: authorsWhereInput | authorsWhereInput[]
    authors_uniqueids?: StringNullableFilter<"authors"> | string | null
    authors_nicknames?: StringNullableFilter<"authors"> | string | null
    authors_followercount?: StringNullableFilter<"authors"> | string | null
    authors_heartcount?: StringNullableFilter<"authors"> | string | null
    authors_videocount?: StringNullableFilter<"authors"> | string | null
    authors_signature?: StringNullableFilter<"authors"> | string | null
    authors_privateaccount?: BoolNullableFilter<"authors"> | boolean | null
  }, "authors_id">

  export type authorsOrderByWithAggregationInput = {
    authors_id?: SortOrder
    authors_uniqueids?: SortOrderInput | SortOrder
    authors_nicknames?: SortOrderInput | SortOrder
    authors_followercount?: SortOrderInput | SortOrder
    authors_heartcount?: SortOrderInput | SortOrder
    authors_videocount?: SortOrderInput | SortOrder
    authors_signature?: SortOrderInput | SortOrder
    authors_privateaccount?: SortOrderInput | SortOrder
    _count?: authorsCountOrderByAggregateInput
    _max?: authorsMaxOrderByAggregateInput
    _min?: authorsMinOrderByAggregateInput
  }

  export type authorsScalarWhereWithAggregatesInput = {
    AND?: authorsScalarWhereWithAggregatesInput | authorsScalarWhereWithAggregatesInput[]
    OR?: authorsScalarWhereWithAggregatesInput[]
    NOT?: authorsScalarWhereWithAggregatesInput | authorsScalarWhereWithAggregatesInput[]
    authors_id?: StringWithAggregatesFilter<"authors"> | string
    authors_uniqueids?: StringNullableWithAggregatesFilter<"authors"> | string | null
    authors_nicknames?: StringNullableWithAggregatesFilter<"authors"> | string | null
    authors_followercount?: StringNullableWithAggregatesFilter<"authors"> | string | null
    authors_heartcount?: StringNullableWithAggregatesFilter<"authors"> | string | null
    authors_videocount?: StringNullableWithAggregatesFilter<"authors"> | string | null
    authors_signature?: StringNullableWithAggregatesFilter<"authors"> | string | null
    authors_privateaccount?: BoolNullableWithAggregatesFilter<"authors"> | boolean | null
  }

  export type bookmarksWhereInput = {
    AND?: bookmarksWhereInput | bookmarksWhereInput[]
    OR?: bookmarksWhereInput[]
    NOT?: bookmarksWhereInput | bookmarksWhereInput[]
    bookmarks_officiallist?: StringFilter<"bookmarks"> | string
    bookmarks_downloaded?: StringNullableFilter<"bookmarks"> | string | null
    bookmarks_total?: StringNullableFilter<"bookmarks"> | string | null
    bookmarks_numdisappeared?: StringNullableFilter<"bookmarks"> | string | null
    bookmarks_lastrun?: StringNullableFilter<"bookmarks"> | string | null
  }

  export type bookmarksOrderByWithRelationInput = {
    bookmarks_officiallist?: SortOrder
    bookmarks_downloaded?: SortOrderInput | SortOrder
    bookmarks_total?: SortOrderInput | SortOrder
    bookmarks_numdisappeared?: SortOrderInput | SortOrder
    bookmarks_lastrun?: SortOrderInput | SortOrder
  }

  export type bookmarksWhereUniqueInput = Prisma.AtLeast<{
    bookmarks_officiallist?: string
    AND?: bookmarksWhereInput | bookmarksWhereInput[]
    OR?: bookmarksWhereInput[]
    NOT?: bookmarksWhereInput | bookmarksWhereInput[]
    bookmarks_downloaded?: StringNullableFilter<"bookmarks"> | string | null
    bookmarks_total?: StringNullableFilter<"bookmarks"> | string | null
    bookmarks_numdisappeared?: StringNullableFilter<"bookmarks"> | string | null
    bookmarks_lastrun?: StringNullableFilter<"bookmarks"> | string | null
  }, "bookmarks_officiallist">

  export type bookmarksOrderByWithAggregationInput = {
    bookmarks_officiallist?: SortOrder
    bookmarks_downloaded?: SortOrderInput | SortOrder
    bookmarks_total?: SortOrderInput | SortOrder
    bookmarks_numdisappeared?: SortOrderInput | SortOrder
    bookmarks_lastrun?: SortOrderInput | SortOrder
    _count?: bookmarksCountOrderByAggregateInput
    _max?: bookmarksMaxOrderByAggregateInput
    _min?: bookmarksMinOrderByAggregateInput
  }

  export type bookmarksScalarWhereWithAggregatesInput = {
    AND?: bookmarksScalarWhereWithAggregatesInput | bookmarksScalarWhereWithAggregatesInput[]
    OR?: bookmarksScalarWhereWithAggregatesInput[]
    NOT?: bookmarksScalarWhereWithAggregatesInput | bookmarksScalarWhereWithAggregatesInput[]
    bookmarks_officiallist?: StringWithAggregatesFilter<"bookmarks"> | string
    bookmarks_downloaded?: StringNullableWithAggregatesFilter<"bookmarks"> | string | null
    bookmarks_total?: StringNullableWithAggregatesFilter<"bookmarks"> | string | null
    bookmarks_numdisappeared?: StringNullableWithAggregatesFilter<"bookmarks"> | string | null
    bookmarks_lastrun?: StringNullableWithAggregatesFilter<"bookmarks"> | string | null
  }

  export type consolidatedWhereInput = {
    AND?: consolidatedWhereInput | consolidatedWhereInput[]
    OR?: consolidatedWhereInput[]
    NOT?: consolidatedWhereInput | consolidatedWhereInput[]
    c_videos_id?: StringFilter<"consolidated"> | string
    c_videos_authorid?: StringNullableFilter<"consolidated"> | string | null
    c_videos_audioid?: StringNullableFilter<"consolidated"> | string | null
    c_authors_id?: StringNullableFilter<"consolidated"> | string | null
    c_authors_nicknames?: StringNullableFilter<"consolidated"> | string | null
    c_authors_uniqueids?: StringNullableFilter<"consolidated"> | string | null
    c_texts_text_content?: StringNullableFilter<"consolidated"> | string | null
  }

  export type consolidatedOrderByWithRelationInput = {
    c_videos_id?: SortOrder
    c_videos_authorid?: SortOrderInput | SortOrder
    c_videos_audioid?: SortOrderInput | SortOrder
    c_authors_id?: SortOrderInput | SortOrder
    c_authors_nicknames?: SortOrderInput | SortOrder
    c_authors_uniqueids?: SortOrderInput | SortOrder
    c_texts_text_content?: SortOrderInput | SortOrder
  }

  export type consolidatedWhereUniqueInput = Prisma.AtLeast<{
    c_videos_id?: string
    AND?: consolidatedWhereInput | consolidatedWhereInput[]
    OR?: consolidatedWhereInput[]
    NOT?: consolidatedWhereInput | consolidatedWhereInput[]
    c_videos_authorid?: StringNullableFilter<"consolidated"> | string | null
    c_videos_audioid?: StringNullableFilter<"consolidated"> | string | null
    c_authors_id?: StringNullableFilter<"consolidated"> | string | null
    c_authors_nicknames?: StringNullableFilter<"consolidated"> | string | null
    c_authors_uniqueids?: StringNullableFilter<"consolidated"> | string | null
    c_texts_text_content?: StringNullableFilter<"consolidated"> | string | null
  }, "c_videos_id">

  export type consolidatedOrderByWithAggregationInput = {
    c_videos_id?: SortOrder
    c_videos_authorid?: SortOrderInput | SortOrder
    c_videos_audioid?: SortOrderInput | SortOrder
    c_authors_id?: SortOrderInput | SortOrder
    c_authors_nicknames?: SortOrderInput | SortOrder
    c_authors_uniqueids?: SortOrderInput | SortOrder
    c_texts_text_content?: SortOrderInput | SortOrder
    _count?: consolidatedCountOrderByAggregateInput
    _max?: consolidatedMaxOrderByAggregateInput
    _min?: consolidatedMinOrderByAggregateInput
  }

  export type consolidatedScalarWhereWithAggregatesInput = {
    AND?: consolidatedScalarWhereWithAggregatesInput | consolidatedScalarWhereWithAggregatesInput[]
    OR?: consolidatedScalarWhereWithAggregatesInput[]
    NOT?: consolidatedScalarWhereWithAggregatesInput | consolidatedScalarWhereWithAggregatesInput[]
    c_videos_id?: StringWithAggregatesFilter<"consolidated"> | string
    c_videos_authorid?: StringNullableWithAggregatesFilter<"consolidated"> | string | null
    c_videos_audioid?: StringNullableWithAggregatesFilter<"consolidated"> | string | null
    c_authors_id?: StringNullableWithAggregatesFilter<"consolidated"> | string | null
    c_authors_nicknames?: StringNullableWithAggregatesFilter<"consolidated"> | string | null
    c_authors_uniqueids?: StringNullableWithAggregatesFilter<"consolidated"> | string | null
    c_texts_text_content?: StringNullableWithAggregatesFilter<"consolidated"> | string | null
  }

  export type followingWhereInput = {
    AND?: followingWhereInput | followingWhereInput[]
    OR?: followingWhereInput[]
    NOT?: followingWhereInput | followingWhereInput[]
    following_author_id?: StringFilter<"following"> | string
    following_official?: BoolNullableFilter<"following"> | boolean | null
    following_started?: BoolNullableFilter<"following"> | boolean | null
    following_not_interested?: BoolNullableFilter<"following"> | boolean | null
    following_infolder?: StringNullableFilter<"following"> | string | null
    following_disappeared?: StringNullableFilter<"following"> | string | null
    following_last_run_start?: StringNullableFilter<"following"> | string | null
    following_last_run_finish?: StringNullableFilter<"following"> | string | null
    following_last_run_bottom?: StringNullableFilter<"following"> | string | null
    following_last_run_firstadded?: StringNullableFilter<"following"> | string | null
  }

  export type followingOrderByWithRelationInput = {
    following_author_id?: SortOrder
    following_official?: SortOrderInput | SortOrder
    following_started?: SortOrderInput | SortOrder
    following_not_interested?: SortOrderInput | SortOrder
    following_infolder?: SortOrderInput | SortOrder
    following_disappeared?: SortOrderInput | SortOrder
    following_last_run_start?: SortOrderInput | SortOrder
    following_last_run_finish?: SortOrderInput | SortOrder
    following_last_run_bottom?: SortOrderInput | SortOrder
    following_last_run_firstadded?: SortOrderInput | SortOrder
  }

  export type followingWhereUniqueInput = Prisma.AtLeast<{
    following_author_id?: string
    AND?: followingWhereInput | followingWhereInput[]
    OR?: followingWhereInput[]
    NOT?: followingWhereInput | followingWhereInput[]
    following_official?: BoolNullableFilter<"following"> | boolean | null
    following_started?: BoolNullableFilter<"following"> | boolean | null
    following_not_interested?: BoolNullableFilter<"following"> | boolean | null
    following_infolder?: StringNullableFilter<"following"> | string | null
    following_disappeared?: StringNullableFilter<"following"> | string | null
    following_last_run_start?: StringNullableFilter<"following"> | string | null
    following_last_run_finish?: StringNullableFilter<"following"> | string | null
    following_last_run_bottom?: StringNullableFilter<"following"> | string | null
    following_last_run_firstadded?: StringNullableFilter<"following"> | string | null
  }, "following_author_id">

  export type followingOrderByWithAggregationInput = {
    following_author_id?: SortOrder
    following_official?: SortOrderInput | SortOrder
    following_started?: SortOrderInput | SortOrder
    following_not_interested?: SortOrderInput | SortOrder
    following_infolder?: SortOrderInput | SortOrder
    following_disappeared?: SortOrderInput | SortOrder
    following_last_run_start?: SortOrderInput | SortOrder
    following_last_run_finish?: SortOrderInput | SortOrder
    following_last_run_bottom?: SortOrderInput | SortOrder
    following_last_run_firstadded?: SortOrderInput | SortOrder
    _count?: followingCountOrderByAggregateInput
    _max?: followingMaxOrderByAggregateInput
    _min?: followingMinOrderByAggregateInput
  }

  export type followingScalarWhereWithAggregatesInput = {
    AND?: followingScalarWhereWithAggregatesInput | followingScalarWhereWithAggregatesInput[]
    OR?: followingScalarWhereWithAggregatesInput[]
    NOT?: followingScalarWhereWithAggregatesInput | followingScalarWhereWithAggregatesInput[]
    following_author_id?: StringWithAggregatesFilter<"following"> | string
    following_official?: BoolNullableWithAggregatesFilter<"following"> | boolean | null
    following_started?: BoolNullableWithAggregatesFilter<"following"> | boolean | null
    following_not_interested?: BoolNullableWithAggregatesFilter<"following"> | boolean | null
    following_infolder?: StringNullableWithAggregatesFilter<"following"> | string | null
    following_disappeared?: StringNullableWithAggregatesFilter<"following"> | string | null
    following_last_run_start?: StringNullableWithAggregatesFilter<"following"> | string | null
    following_last_run_finish?: StringNullableWithAggregatesFilter<"following"> | string | null
    following_last_run_bottom?: StringNullableWithAggregatesFilter<"following"> | string | null
    following_last_run_firstadded?: StringNullableWithAggregatesFilter<"following"> | string | null
  }

  export type likesWhereInput = {
    AND?: likesWhereInput | likesWhereInput[]
    OR?: likesWhereInput[]
    NOT?: likesWhereInput | likesWhereInput[]
    likes_schemaversion?: StringNullableFilter<"likes"> | string | null
    likes_user?: StringFilter<"likes"> | string
    likes_likes?: StringNullableFilter<"likes"> | string | null
  }

  export type likesOrderByWithRelationInput = {
    likes_schemaversion?: SortOrderInput | SortOrder
    likes_user?: SortOrder
    likes_likes?: SortOrderInput | SortOrder
  }

  export type likesWhereUniqueInput = Prisma.AtLeast<{
    likes_user?: string
    AND?: likesWhereInput | likesWhereInput[]
    OR?: likesWhereInput[]
    NOT?: likesWhereInput | likesWhereInput[]
    likes_schemaversion?: StringNullableFilter<"likes"> | string | null
    likes_likes?: StringNullableFilter<"likes"> | string | null
  }, "likes_user">

  export type likesOrderByWithAggregationInput = {
    likes_schemaversion?: SortOrderInput | SortOrder
    likes_user?: SortOrder
    likes_likes?: SortOrderInput | SortOrder
    _count?: likesCountOrderByAggregateInput
    _max?: likesMaxOrderByAggregateInput
    _min?: likesMinOrderByAggregateInput
  }

  export type likesScalarWhereWithAggregatesInput = {
    AND?: likesScalarWhereWithAggregatesInput | likesScalarWhereWithAggregatesInput[]
    OR?: likesScalarWhereWithAggregatesInput[]
    NOT?: likesScalarWhereWithAggregatesInput | likesScalarWhereWithAggregatesInput[]
    likes_schemaversion?: StringNullableWithAggregatesFilter<"likes"> | string | null
    likes_user?: StringWithAggregatesFilter<"likes"> | string
    likes_likes?: StringNullableWithAggregatesFilter<"likes"> | string | null
  }

  export type mediaWhereInput = {
    AND?: mediaWhereInput | mediaWhereInput[]
    OR?: mediaWhereInput[]
    NOT?: mediaWhereInput | mediaWhereInput[]
    video_id?: StringFilter<"media"> | string
    author_id?: StringNullableFilter<"media"> | string | null
    video_path?: StringNullableFilter<"media"> | string | null
    cover_path?: StringNullableFilter<"media"> | string | null
    title?: StringNullableFilter<"media"> | string | null
    description?: StringNullableFilter<"media"> | string | null
    tags?: StringNullableFilter<"media"> | string | null
    upload_status?: Upload_statusListRelationFilter
  }

  export type mediaOrderByWithRelationInput = {
    video_id?: SortOrder
    author_id?: SortOrderInput | SortOrder
    video_path?: SortOrderInput | SortOrder
    cover_path?: SortOrderInput | SortOrder
    title?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    tags?: SortOrderInput | SortOrder
    upload_status?: upload_statusOrderByRelationAggregateInput
  }

  export type mediaWhereUniqueInput = Prisma.AtLeast<{
    video_id?: string
    AND?: mediaWhereInput | mediaWhereInput[]
    OR?: mediaWhereInput[]
    NOT?: mediaWhereInput | mediaWhereInput[]
    author_id?: StringNullableFilter<"media"> | string | null
    video_path?: StringNullableFilter<"media"> | string | null
    cover_path?: StringNullableFilter<"media"> | string | null
    title?: StringNullableFilter<"media"> | string | null
    description?: StringNullableFilter<"media"> | string | null
    tags?: StringNullableFilter<"media"> | string | null
    upload_status?: Upload_statusListRelationFilter
  }, "video_id">

  export type mediaOrderByWithAggregationInput = {
    video_id?: SortOrder
    author_id?: SortOrderInput | SortOrder
    video_path?: SortOrderInput | SortOrder
    cover_path?: SortOrderInput | SortOrder
    title?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    tags?: SortOrderInput | SortOrder
    _count?: mediaCountOrderByAggregateInput
    _max?: mediaMaxOrderByAggregateInput
    _min?: mediaMinOrderByAggregateInput
  }

  export type mediaScalarWhereWithAggregatesInput = {
    AND?: mediaScalarWhereWithAggregatesInput | mediaScalarWhereWithAggregatesInput[]
    OR?: mediaScalarWhereWithAggregatesInput[]
    NOT?: mediaScalarWhereWithAggregatesInput | mediaScalarWhereWithAggregatesInput[]
    video_id?: StringWithAggregatesFilter<"media"> | string
    author_id?: StringNullableWithAggregatesFilter<"media"> | string | null
    video_path?: StringNullableWithAggregatesFilter<"media"> | string | null
    cover_path?: StringNullableWithAggregatesFilter<"media"> | string | null
    title?: StringNullableWithAggregatesFilter<"media"> | string | null
    description?: StringNullableWithAggregatesFilter<"media"> | string | null
    tags?: StringNullableWithAggregatesFilter<"media"> | string | null
  }

  export type textsWhereInput = {
    AND?: textsWhereInput | textsWhereInput[]
    OR?: textsWhereInput[]
    NOT?: textsWhereInput | textsWhereInput[]
    texts_text_id?: StringFilter<"texts"> | string
    texts_text_content?: StringNullableFilter<"texts"> | string | null
  }

  export type textsOrderByWithRelationInput = {
    texts_text_id?: SortOrder
    texts_text_content?: SortOrderInput | SortOrder
  }

  export type textsWhereUniqueInput = Prisma.AtLeast<{
    texts_text_id?: string
    AND?: textsWhereInput | textsWhereInput[]
    OR?: textsWhereInput[]
    NOT?: textsWhereInput | textsWhereInput[]
    texts_text_content?: StringNullableFilter<"texts"> | string | null
  }, "texts_text_id">

  export type textsOrderByWithAggregationInput = {
    texts_text_id?: SortOrder
    texts_text_content?: SortOrderInput | SortOrder
    _count?: textsCountOrderByAggregateInput
    _max?: textsMaxOrderByAggregateInput
    _min?: textsMinOrderByAggregateInput
  }

  export type textsScalarWhereWithAggregatesInput = {
    AND?: textsScalarWhereWithAggregatesInput | textsScalarWhereWithAggregatesInput[]
    OR?: textsScalarWhereWithAggregatesInput[]
    NOT?: textsScalarWhereWithAggregatesInput | textsScalarWhereWithAggregatesInput[]
    texts_text_id?: StringWithAggregatesFilter<"texts"> | string
    texts_text_content?: StringNullableWithAggregatesFilter<"texts"> | string | null
  }

  export type upload_statusWhereInput = {
    AND?: upload_statusWhereInput | upload_statusWhereInput[]
    OR?: upload_statusWhereInput[]
    NOT?: upload_statusWhereInput | upload_statusWhereInput[]
    id?: IntFilter<"upload_status"> | number
    video_id?: StringNullableFilter<"upload_status"> | string | null
    status?: StringNullableFilter<"upload_status"> | string | null
    upload_timestamp?: DateTimeNullableFilter<"upload_status"> | Date | string | null
    r2_video_url?: StringNullableFilter<"upload_status"> | string | null
    r2_cover_url?: StringNullableFilter<"upload_status"> | string | null
    retry_count?: IntNullableFilter<"upload_status"> | number | null
    last_error?: StringNullableFilter<"upload_status"> | string | null
    media?: XOR<MediaNullableScalarRelationFilter, mediaWhereInput> | null
  }

  export type upload_statusOrderByWithRelationInput = {
    id?: SortOrder
    video_id?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    upload_timestamp?: SortOrderInput | SortOrder
    r2_video_url?: SortOrderInput | SortOrder
    r2_cover_url?: SortOrderInput | SortOrder
    retry_count?: SortOrderInput | SortOrder
    last_error?: SortOrderInput | SortOrder
    media?: mediaOrderByWithRelationInput
  }

  export type upload_statusWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: upload_statusWhereInput | upload_statusWhereInput[]
    OR?: upload_statusWhereInput[]
    NOT?: upload_statusWhereInput | upload_statusWhereInput[]
    video_id?: StringNullableFilter<"upload_status"> | string | null
    status?: StringNullableFilter<"upload_status"> | string | null
    upload_timestamp?: DateTimeNullableFilter<"upload_status"> | Date | string | null
    r2_video_url?: StringNullableFilter<"upload_status"> | string | null
    r2_cover_url?: StringNullableFilter<"upload_status"> | string | null
    retry_count?: IntNullableFilter<"upload_status"> | number | null
    last_error?: StringNullableFilter<"upload_status"> | string | null
    media?: XOR<MediaNullableScalarRelationFilter, mediaWhereInput> | null
  }, "id">

  export type upload_statusOrderByWithAggregationInput = {
    id?: SortOrder
    video_id?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    upload_timestamp?: SortOrderInput | SortOrder
    r2_video_url?: SortOrderInput | SortOrder
    r2_cover_url?: SortOrderInput | SortOrder
    retry_count?: SortOrderInput | SortOrder
    last_error?: SortOrderInput | SortOrder
    _count?: upload_statusCountOrderByAggregateInput
    _avg?: upload_statusAvgOrderByAggregateInput
    _max?: upload_statusMaxOrderByAggregateInput
    _min?: upload_statusMinOrderByAggregateInput
    _sum?: upload_statusSumOrderByAggregateInput
  }

  export type upload_statusScalarWhereWithAggregatesInput = {
    AND?: upload_statusScalarWhereWithAggregatesInput | upload_statusScalarWhereWithAggregatesInput[]
    OR?: upload_statusScalarWhereWithAggregatesInput[]
    NOT?: upload_statusScalarWhereWithAggregatesInput | upload_statusScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"upload_status"> | number
    video_id?: StringNullableWithAggregatesFilter<"upload_status"> | string | null
    status?: StringNullableWithAggregatesFilter<"upload_status"> | string | null
    upload_timestamp?: DateTimeNullableWithAggregatesFilter<"upload_status"> | Date | string | null
    r2_video_url?: StringNullableWithAggregatesFilter<"upload_status"> | string | null
    r2_cover_url?: StringNullableWithAggregatesFilter<"upload_status"> | string | null
    retry_count?: IntNullableWithAggregatesFilter<"upload_status"> | number | null
    last_error?: StringNullableWithAggregatesFilter<"upload_status"> | string | null
  }

  export type videosWhereInput = {
    AND?: videosWhereInput | videosWhereInput[]
    OR?: videosWhereInput[]
    NOT?: videosWhereInput | videosWhereInput[]
    videos_id?: StringFilter<"videos"> | string
    videos_authorid?: StringNullableFilter<"videos"> | string | null
    videos_createtime?: StringNullableFilter<"videos"> | string | null
    videos_diggcount?: StringNullableFilter<"videos"> | string | null
    videos_playcount?: StringNullableFilter<"videos"> | string | null
    videos_audioid?: StringNullableFilter<"videos"> | string | null
    videos_size?: StringNullableFilter<"videos"> | string | null
    videos_itemmute?: StringNullableFilter<"videos"> | string | null
  }

  export type videosOrderByWithRelationInput = {
    videos_id?: SortOrder
    videos_authorid?: SortOrderInput | SortOrder
    videos_createtime?: SortOrderInput | SortOrder
    videos_diggcount?: SortOrderInput | SortOrder
    videos_playcount?: SortOrderInput | SortOrder
    videos_audioid?: SortOrderInput | SortOrder
    videos_size?: SortOrderInput | SortOrder
    videos_itemmute?: SortOrderInput | SortOrder
  }

  export type videosWhereUniqueInput = Prisma.AtLeast<{
    videos_id?: string
    AND?: videosWhereInput | videosWhereInput[]
    OR?: videosWhereInput[]
    NOT?: videosWhereInput | videosWhereInput[]
    videos_authorid?: StringNullableFilter<"videos"> | string | null
    videos_createtime?: StringNullableFilter<"videos"> | string | null
    videos_diggcount?: StringNullableFilter<"videos"> | string | null
    videos_playcount?: StringNullableFilter<"videos"> | string | null
    videos_audioid?: StringNullableFilter<"videos"> | string | null
    videos_size?: StringNullableFilter<"videos"> | string | null
    videos_itemmute?: StringNullableFilter<"videos"> | string | null
  }, "videos_id">

  export type videosOrderByWithAggregationInput = {
    videos_id?: SortOrder
    videos_authorid?: SortOrderInput | SortOrder
    videos_createtime?: SortOrderInput | SortOrder
    videos_diggcount?: SortOrderInput | SortOrder
    videos_playcount?: SortOrderInput | SortOrder
    videos_audioid?: SortOrderInput | SortOrder
    videos_size?: SortOrderInput | SortOrder
    videos_itemmute?: SortOrderInput | SortOrder
    _count?: videosCountOrderByAggregateInput
    _max?: videosMaxOrderByAggregateInput
    _min?: videosMinOrderByAggregateInput
  }

  export type videosScalarWhereWithAggregatesInput = {
    AND?: videosScalarWhereWithAggregatesInput | videosScalarWhereWithAggregatesInput[]
    OR?: videosScalarWhereWithAggregatesInput[]
    NOT?: videosScalarWhereWithAggregatesInput | videosScalarWhereWithAggregatesInput[]
    videos_id?: StringWithAggregatesFilter<"videos"> | string
    videos_authorid?: StringNullableWithAggregatesFilter<"videos"> | string | null
    videos_createtime?: StringNullableWithAggregatesFilter<"videos"> | string | null
    videos_diggcount?: StringNullableWithAggregatesFilter<"videos"> | string | null
    videos_playcount?: StringNullableWithAggregatesFilter<"videos"> | string | null
    videos_audioid?: StringNullableWithAggregatesFilter<"videos"> | string | null
    videos_size?: StringNullableWithAggregatesFilter<"videos"> | string | null
    videos_itemmute?: StringNullableWithAggregatesFilter<"videos"> | string | null
  }

  export type alembic_versionCreateInput = {
    version_num: string
  }

  export type alembic_versionUncheckedCreateInput = {
    version_num: string
  }

  export type alembic_versionUpdateInput = {
    version_num?: StringFieldUpdateOperationsInput | string
  }

  export type alembic_versionUncheckedUpdateInput = {
    version_num?: StringFieldUpdateOperationsInput | string
  }

  export type alembic_versionCreateManyInput = {
    version_num: string
  }

  export type alembic_versionUpdateManyMutationInput = {
    version_num?: StringFieldUpdateOperationsInput | string
  }

  export type alembic_versionUncheckedUpdateManyInput = {
    version_num?: StringFieldUpdateOperationsInput | string
  }

  export type authorsCreateInput = {
    authors_id: string
    authors_uniqueids?: string | null
    authors_nicknames?: string | null
    authors_followercount?: string | null
    authors_heartcount?: string | null
    authors_videocount?: string | null
    authors_signature?: string | null
    authors_privateaccount?: boolean | null
  }

  export type authorsUncheckedCreateInput = {
    authors_id: string
    authors_uniqueids?: string | null
    authors_nicknames?: string | null
    authors_followercount?: string | null
    authors_heartcount?: string | null
    authors_videocount?: string | null
    authors_signature?: string | null
    authors_privateaccount?: boolean | null
  }

  export type authorsUpdateInput = {
    authors_id?: StringFieldUpdateOperationsInput | string
    authors_uniqueids?: NullableStringFieldUpdateOperationsInput | string | null
    authors_nicknames?: NullableStringFieldUpdateOperationsInput | string | null
    authors_followercount?: NullableStringFieldUpdateOperationsInput | string | null
    authors_heartcount?: NullableStringFieldUpdateOperationsInput | string | null
    authors_videocount?: NullableStringFieldUpdateOperationsInput | string | null
    authors_signature?: NullableStringFieldUpdateOperationsInput | string | null
    authors_privateaccount?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type authorsUncheckedUpdateInput = {
    authors_id?: StringFieldUpdateOperationsInput | string
    authors_uniqueids?: NullableStringFieldUpdateOperationsInput | string | null
    authors_nicknames?: NullableStringFieldUpdateOperationsInput | string | null
    authors_followercount?: NullableStringFieldUpdateOperationsInput | string | null
    authors_heartcount?: NullableStringFieldUpdateOperationsInput | string | null
    authors_videocount?: NullableStringFieldUpdateOperationsInput | string | null
    authors_signature?: NullableStringFieldUpdateOperationsInput | string | null
    authors_privateaccount?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type authorsCreateManyInput = {
    authors_id: string
    authors_uniqueids?: string | null
    authors_nicknames?: string | null
    authors_followercount?: string | null
    authors_heartcount?: string | null
    authors_videocount?: string | null
    authors_signature?: string | null
    authors_privateaccount?: boolean | null
  }

  export type authorsUpdateManyMutationInput = {
    authors_id?: StringFieldUpdateOperationsInput | string
    authors_uniqueids?: NullableStringFieldUpdateOperationsInput | string | null
    authors_nicknames?: NullableStringFieldUpdateOperationsInput | string | null
    authors_followercount?: NullableStringFieldUpdateOperationsInput | string | null
    authors_heartcount?: NullableStringFieldUpdateOperationsInput | string | null
    authors_videocount?: NullableStringFieldUpdateOperationsInput | string | null
    authors_signature?: NullableStringFieldUpdateOperationsInput | string | null
    authors_privateaccount?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type authorsUncheckedUpdateManyInput = {
    authors_id?: StringFieldUpdateOperationsInput | string
    authors_uniqueids?: NullableStringFieldUpdateOperationsInput | string | null
    authors_nicknames?: NullableStringFieldUpdateOperationsInput | string | null
    authors_followercount?: NullableStringFieldUpdateOperationsInput | string | null
    authors_heartcount?: NullableStringFieldUpdateOperationsInput | string | null
    authors_videocount?: NullableStringFieldUpdateOperationsInput | string | null
    authors_signature?: NullableStringFieldUpdateOperationsInput | string | null
    authors_privateaccount?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type bookmarksCreateInput = {
    bookmarks_officiallist: string
    bookmarks_downloaded?: string | null
    bookmarks_total?: string | null
    bookmarks_numdisappeared?: string | null
    bookmarks_lastrun?: string | null
  }

  export type bookmarksUncheckedCreateInput = {
    bookmarks_officiallist: string
    bookmarks_downloaded?: string | null
    bookmarks_total?: string | null
    bookmarks_numdisappeared?: string | null
    bookmarks_lastrun?: string | null
  }

  export type bookmarksUpdateInput = {
    bookmarks_officiallist?: StringFieldUpdateOperationsInput | string
    bookmarks_downloaded?: NullableStringFieldUpdateOperationsInput | string | null
    bookmarks_total?: NullableStringFieldUpdateOperationsInput | string | null
    bookmarks_numdisappeared?: NullableStringFieldUpdateOperationsInput | string | null
    bookmarks_lastrun?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type bookmarksUncheckedUpdateInput = {
    bookmarks_officiallist?: StringFieldUpdateOperationsInput | string
    bookmarks_downloaded?: NullableStringFieldUpdateOperationsInput | string | null
    bookmarks_total?: NullableStringFieldUpdateOperationsInput | string | null
    bookmarks_numdisappeared?: NullableStringFieldUpdateOperationsInput | string | null
    bookmarks_lastrun?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type bookmarksCreateManyInput = {
    bookmarks_officiallist: string
    bookmarks_downloaded?: string | null
    bookmarks_total?: string | null
    bookmarks_numdisappeared?: string | null
    bookmarks_lastrun?: string | null
  }

  export type bookmarksUpdateManyMutationInput = {
    bookmarks_officiallist?: StringFieldUpdateOperationsInput | string
    bookmarks_downloaded?: NullableStringFieldUpdateOperationsInput | string | null
    bookmarks_total?: NullableStringFieldUpdateOperationsInput | string | null
    bookmarks_numdisappeared?: NullableStringFieldUpdateOperationsInput | string | null
    bookmarks_lastrun?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type bookmarksUncheckedUpdateManyInput = {
    bookmarks_officiallist?: StringFieldUpdateOperationsInput | string
    bookmarks_downloaded?: NullableStringFieldUpdateOperationsInput | string | null
    bookmarks_total?: NullableStringFieldUpdateOperationsInput | string | null
    bookmarks_numdisappeared?: NullableStringFieldUpdateOperationsInput | string | null
    bookmarks_lastrun?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type consolidatedCreateInput = {
    c_videos_id: string
    c_videos_authorid?: string | null
    c_videos_audioid?: string | null
    c_authors_id?: string | null
    c_authors_nicknames?: string | null
    c_authors_uniqueids?: string | null
    c_texts_text_content?: string | null
  }

  export type consolidatedUncheckedCreateInput = {
    c_videos_id: string
    c_videos_authorid?: string | null
    c_videos_audioid?: string | null
    c_authors_id?: string | null
    c_authors_nicknames?: string | null
    c_authors_uniqueids?: string | null
    c_texts_text_content?: string | null
  }

  export type consolidatedUpdateInput = {
    c_videos_id?: StringFieldUpdateOperationsInput | string
    c_videos_authorid?: NullableStringFieldUpdateOperationsInput | string | null
    c_videos_audioid?: NullableStringFieldUpdateOperationsInput | string | null
    c_authors_id?: NullableStringFieldUpdateOperationsInput | string | null
    c_authors_nicknames?: NullableStringFieldUpdateOperationsInput | string | null
    c_authors_uniqueids?: NullableStringFieldUpdateOperationsInput | string | null
    c_texts_text_content?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type consolidatedUncheckedUpdateInput = {
    c_videos_id?: StringFieldUpdateOperationsInput | string
    c_videos_authorid?: NullableStringFieldUpdateOperationsInput | string | null
    c_videos_audioid?: NullableStringFieldUpdateOperationsInput | string | null
    c_authors_id?: NullableStringFieldUpdateOperationsInput | string | null
    c_authors_nicknames?: NullableStringFieldUpdateOperationsInput | string | null
    c_authors_uniqueids?: NullableStringFieldUpdateOperationsInput | string | null
    c_texts_text_content?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type consolidatedCreateManyInput = {
    c_videos_id: string
    c_videos_authorid?: string | null
    c_videos_audioid?: string | null
    c_authors_id?: string | null
    c_authors_nicknames?: string | null
    c_authors_uniqueids?: string | null
    c_texts_text_content?: string | null
  }

  export type consolidatedUpdateManyMutationInput = {
    c_videos_id?: StringFieldUpdateOperationsInput | string
    c_videos_authorid?: NullableStringFieldUpdateOperationsInput | string | null
    c_videos_audioid?: NullableStringFieldUpdateOperationsInput | string | null
    c_authors_id?: NullableStringFieldUpdateOperationsInput | string | null
    c_authors_nicknames?: NullableStringFieldUpdateOperationsInput | string | null
    c_authors_uniqueids?: NullableStringFieldUpdateOperationsInput | string | null
    c_texts_text_content?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type consolidatedUncheckedUpdateManyInput = {
    c_videos_id?: StringFieldUpdateOperationsInput | string
    c_videos_authorid?: NullableStringFieldUpdateOperationsInput | string | null
    c_videos_audioid?: NullableStringFieldUpdateOperationsInput | string | null
    c_authors_id?: NullableStringFieldUpdateOperationsInput | string | null
    c_authors_nicknames?: NullableStringFieldUpdateOperationsInput | string | null
    c_authors_uniqueids?: NullableStringFieldUpdateOperationsInput | string | null
    c_texts_text_content?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type followingCreateInput = {
    following_author_id: string
    following_official?: boolean | null
    following_started?: boolean | null
    following_not_interested?: boolean | null
    following_infolder?: string | null
    following_disappeared?: string | null
    following_last_run_start?: string | null
    following_last_run_finish?: string | null
    following_last_run_bottom?: string | null
    following_last_run_firstadded?: string | null
  }

  export type followingUncheckedCreateInput = {
    following_author_id: string
    following_official?: boolean | null
    following_started?: boolean | null
    following_not_interested?: boolean | null
    following_infolder?: string | null
    following_disappeared?: string | null
    following_last_run_start?: string | null
    following_last_run_finish?: string | null
    following_last_run_bottom?: string | null
    following_last_run_firstadded?: string | null
  }

  export type followingUpdateInput = {
    following_author_id?: StringFieldUpdateOperationsInput | string
    following_official?: NullableBoolFieldUpdateOperationsInput | boolean | null
    following_started?: NullableBoolFieldUpdateOperationsInput | boolean | null
    following_not_interested?: NullableBoolFieldUpdateOperationsInput | boolean | null
    following_infolder?: NullableStringFieldUpdateOperationsInput | string | null
    following_disappeared?: NullableStringFieldUpdateOperationsInput | string | null
    following_last_run_start?: NullableStringFieldUpdateOperationsInput | string | null
    following_last_run_finish?: NullableStringFieldUpdateOperationsInput | string | null
    following_last_run_bottom?: NullableStringFieldUpdateOperationsInput | string | null
    following_last_run_firstadded?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type followingUncheckedUpdateInput = {
    following_author_id?: StringFieldUpdateOperationsInput | string
    following_official?: NullableBoolFieldUpdateOperationsInput | boolean | null
    following_started?: NullableBoolFieldUpdateOperationsInput | boolean | null
    following_not_interested?: NullableBoolFieldUpdateOperationsInput | boolean | null
    following_infolder?: NullableStringFieldUpdateOperationsInput | string | null
    following_disappeared?: NullableStringFieldUpdateOperationsInput | string | null
    following_last_run_start?: NullableStringFieldUpdateOperationsInput | string | null
    following_last_run_finish?: NullableStringFieldUpdateOperationsInput | string | null
    following_last_run_bottom?: NullableStringFieldUpdateOperationsInput | string | null
    following_last_run_firstadded?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type followingCreateManyInput = {
    following_author_id: string
    following_official?: boolean | null
    following_started?: boolean | null
    following_not_interested?: boolean | null
    following_infolder?: string | null
    following_disappeared?: string | null
    following_last_run_start?: string | null
    following_last_run_finish?: string | null
    following_last_run_bottom?: string | null
    following_last_run_firstadded?: string | null
  }

  export type followingUpdateManyMutationInput = {
    following_author_id?: StringFieldUpdateOperationsInput | string
    following_official?: NullableBoolFieldUpdateOperationsInput | boolean | null
    following_started?: NullableBoolFieldUpdateOperationsInput | boolean | null
    following_not_interested?: NullableBoolFieldUpdateOperationsInput | boolean | null
    following_infolder?: NullableStringFieldUpdateOperationsInput | string | null
    following_disappeared?: NullableStringFieldUpdateOperationsInput | string | null
    following_last_run_start?: NullableStringFieldUpdateOperationsInput | string | null
    following_last_run_finish?: NullableStringFieldUpdateOperationsInput | string | null
    following_last_run_bottom?: NullableStringFieldUpdateOperationsInput | string | null
    following_last_run_firstadded?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type followingUncheckedUpdateManyInput = {
    following_author_id?: StringFieldUpdateOperationsInput | string
    following_official?: NullableBoolFieldUpdateOperationsInput | boolean | null
    following_started?: NullableBoolFieldUpdateOperationsInput | boolean | null
    following_not_interested?: NullableBoolFieldUpdateOperationsInput | boolean | null
    following_infolder?: NullableStringFieldUpdateOperationsInput | string | null
    following_disappeared?: NullableStringFieldUpdateOperationsInput | string | null
    following_last_run_start?: NullableStringFieldUpdateOperationsInput | string | null
    following_last_run_finish?: NullableStringFieldUpdateOperationsInput | string | null
    following_last_run_bottom?: NullableStringFieldUpdateOperationsInput | string | null
    following_last_run_firstadded?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type likesCreateInput = {
    likes_schemaversion?: string | null
    likes_user: string
    likes_likes?: string | null
  }

  export type likesUncheckedCreateInput = {
    likes_schemaversion?: string | null
    likes_user: string
    likes_likes?: string | null
  }

  export type likesUpdateInput = {
    likes_schemaversion?: NullableStringFieldUpdateOperationsInput | string | null
    likes_user?: StringFieldUpdateOperationsInput | string
    likes_likes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type likesUncheckedUpdateInput = {
    likes_schemaversion?: NullableStringFieldUpdateOperationsInput | string | null
    likes_user?: StringFieldUpdateOperationsInput | string
    likes_likes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type likesCreateManyInput = {
    likes_schemaversion?: string | null
    likes_user: string
    likes_likes?: string | null
  }

  export type likesUpdateManyMutationInput = {
    likes_schemaversion?: NullableStringFieldUpdateOperationsInput | string | null
    likes_user?: StringFieldUpdateOperationsInput | string
    likes_likes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type likesUncheckedUpdateManyInput = {
    likes_schemaversion?: NullableStringFieldUpdateOperationsInput | string | null
    likes_user?: StringFieldUpdateOperationsInput | string
    likes_likes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type mediaCreateInput = {
    video_id: string
    author_id?: string | null
    video_path?: string | null
    cover_path?: string | null
    title?: string | null
    description?: string | null
    tags?: string | null
    upload_status?: upload_statusCreateNestedManyWithoutMediaInput
  }

  export type mediaUncheckedCreateInput = {
    video_id: string
    author_id?: string | null
    video_path?: string | null
    cover_path?: string | null
    title?: string | null
    description?: string | null
    tags?: string | null
    upload_status?: upload_statusUncheckedCreateNestedManyWithoutMediaInput
  }

  export type mediaUpdateInput = {
    video_id?: StringFieldUpdateOperationsInput | string
    author_id?: NullableStringFieldUpdateOperationsInput | string | null
    video_path?: NullableStringFieldUpdateOperationsInput | string | null
    cover_path?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    upload_status?: upload_statusUpdateManyWithoutMediaNestedInput
  }

  export type mediaUncheckedUpdateInput = {
    video_id?: StringFieldUpdateOperationsInput | string
    author_id?: NullableStringFieldUpdateOperationsInput | string | null
    video_path?: NullableStringFieldUpdateOperationsInput | string | null
    cover_path?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    upload_status?: upload_statusUncheckedUpdateManyWithoutMediaNestedInput
  }

  export type mediaCreateManyInput = {
    video_id: string
    author_id?: string | null
    video_path?: string | null
    cover_path?: string | null
    title?: string | null
    description?: string | null
    tags?: string | null
  }

  export type mediaUpdateManyMutationInput = {
    video_id?: StringFieldUpdateOperationsInput | string
    author_id?: NullableStringFieldUpdateOperationsInput | string | null
    video_path?: NullableStringFieldUpdateOperationsInput | string | null
    cover_path?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type mediaUncheckedUpdateManyInput = {
    video_id?: StringFieldUpdateOperationsInput | string
    author_id?: NullableStringFieldUpdateOperationsInput | string | null
    video_path?: NullableStringFieldUpdateOperationsInput | string | null
    cover_path?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type textsCreateInput = {
    texts_text_id: string
    texts_text_content?: string | null
  }

  export type textsUncheckedCreateInput = {
    texts_text_id: string
    texts_text_content?: string | null
  }

  export type textsUpdateInput = {
    texts_text_id?: StringFieldUpdateOperationsInput | string
    texts_text_content?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type textsUncheckedUpdateInput = {
    texts_text_id?: StringFieldUpdateOperationsInput | string
    texts_text_content?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type textsCreateManyInput = {
    texts_text_id: string
    texts_text_content?: string | null
  }

  export type textsUpdateManyMutationInput = {
    texts_text_id?: StringFieldUpdateOperationsInput | string
    texts_text_content?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type textsUncheckedUpdateManyInput = {
    texts_text_id?: StringFieldUpdateOperationsInput | string
    texts_text_content?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type upload_statusCreateInput = {
    status?: string | null
    upload_timestamp?: Date | string | null
    r2_video_url?: string | null
    r2_cover_url?: string | null
    retry_count?: number | null
    last_error?: string | null
    media?: mediaCreateNestedOneWithoutUpload_statusInput
  }

  export type upload_statusUncheckedCreateInput = {
    id?: number
    video_id?: string | null
    status?: string | null
    upload_timestamp?: Date | string | null
    r2_video_url?: string | null
    r2_cover_url?: string | null
    retry_count?: number | null
    last_error?: string | null
  }

  export type upload_statusUpdateInput = {
    status?: NullableStringFieldUpdateOperationsInput | string | null
    upload_timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    r2_video_url?: NullableStringFieldUpdateOperationsInput | string | null
    r2_cover_url?: NullableStringFieldUpdateOperationsInput | string | null
    retry_count?: NullableIntFieldUpdateOperationsInput | number | null
    last_error?: NullableStringFieldUpdateOperationsInput | string | null
    media?: mediaUpdateOneWithoutUpload_statusNestedInput
  }

  export type upload_statusUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    video_id?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    upload_timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    r2_video_url?: NullableStringFieldUpdateOperationsInput | string | null
    r2_cover_url?: NullableStringFieldUpdateOperationsInput | string | null
    retry_count?: NullableIntFieldUpdateOperationsInput | number | null
    last_error?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type upload_statusCreateManyInput = {
    id?: number
    video_id?: string | null
    status?: string | null
    upload_timestamp?: Date | string | null
    r2_video_url?: string | null
    r2_cover_url?: string | null
    retry_count?: number | null
    last_error?: string | null
  }

  export type upload_statusUpdateManyMutationInput = {
    status?: NullableStringFieldUpdateOperationsInput | string | null
    upload_timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    r2_video_url?: NullableStringFieldUpdateOperationsInput | string | null
    r2_cover_url?: NullableStringFieldUpdateOperationsInput | string | null
    retry_count?: NullableIntFieldUpdateOperationsInput | number | null
    last_error?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type upload_statusUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    video_id?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    upload_timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    r2_video_url?: NullableStringFieldUpdateOperationsInput | string | null
    r2_cover_url?: NullableStringFieldUpdateOperationsInput | string | null
    retry_count?: NullableIntFieldUpdateOperationsInput | number | null
    last_error?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type videosCreateInput = {
    videos_id: string
    videos_authorid?: string | null
    videos_createtime?: string | null
    videos_diggcount?: string | null
    videos_playcount?: string | null
    videos_audioid?: string | null
    videos_size?: string | null
    videos_itemmute?: string | null
  }

  export type videosUncheckedCreateInput = {
    videos_id: string
    videos_authorid?: string | null
    videos_createtime?: string | null
    videos_diggcount?: string | null
    videos_playcount?: string | null
    videos_audioid?: string | null
    videos_size?: string | null
    videos_itemmute?: string | null
  }

  export type videosUpdateInput = {
    videos_id?: StringFieldUpdateOperationsInput | string
    videos_authorid?: NullableStringFieldUpdateOperationsInput | string | null
    videos_createtime?: NullableStringFieldUpdateOperationsInput | string | null
    videos_diggcount?: NullableStringFieldUpdateOperationsInput | string | null
    videos_playcount?: NullableStringFieldUpdateOperationsInput | string | null
    videos_audioid?: NullableStringFieldUpdateOperationsInput | string | null
    videos_size?: NullableStringFieldUpdateOperationsInput | string | null
    videos_itemmute?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type videosUncheckedUpdateInput = {
    videos_id?: StringFieldUpdateOperationsInput | string
    videos_authorid?: NullableStringFieldUpdateOperationsInput | string | null
    videos_createtime?: NullableStringFieldUpdateOperationsInput | string | null
    videos_diggcount?: NullableStringFieldUpdateOperationsInput | string | null
    videos_playcount?: NullableStringFieldUpdateOperationsInput | string | null
    videos_audioid?: NullableStringFieldUpdateOperationsInput | string | null
    videos_size?: NullableStringFieldUpdateOperationsInput | string | null
    videos_itemmute?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type videosCreateManyInput = {
    videos_id: string
    videos_authorid?: string | null
    videos_createtime?: string | null
    videos_diggcount?: string | null
    videos_playcount?: string | null
    videos_audioid?: string | null
    videos_size?: string | null
    videos_itemmute?: string | null
  }

  export type videosUpdateManyMutationInput = {
    videos_id?: StringFieldUpdateOperationsInput | string
    videos_authorid?: NullableStringFieldUpdateOperationsInput | string | null
    videos_createtime?: NullableStringFieldUpdateOperationsInput | string | null
    videos_diggcount?: NullableStringFieldUpdateOperationsInput | string | null
    videos_playcount?: NullableStringFieldUpdateOperationsInput | string | null
    videos_audioid?: NullableStringFieldUpdateOperationsInput | string | null
    videos_size?: NullableStringFieldUpdateOperationsInput | string | null
    videos_itemmute?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type videosUncheckedUpdateManyInput = {
    videos_id?: StringFieldUpdateOperationsInput | string
    videos_authorid?: NullableStringFieldUpdateOperationsInput | string | null
    videos_createtime?: NullableStringFieldUpdateOperationsInput | string | null
    videos_diggcount?: NullableStringFieldUpdateOperationsInput | string | null
    videos_playcount?: NullableStringFieldUpdateOperationsInput | string | null
    videos_audioid?: NullableStringFieldUpdateOperationsInput | string | null
    videos_size?: NullableStringFieldUpdateOperationsInput | string | null
    videos_itemmute?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type alembic_versionCountOrderByAggregateInput = {
    version_num?: SortOrder
  }

  export type alembic_versionMaxOrderByAggregateInput = {
    version_num?: SortOrder
  }

  export type alembic_versionMinOrderByAggregateInput = {
    version_num?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type authorsCountOrderByAggregateInput = {
    authors_id?: SortOrder
    authors_uniqueids?: SortOrder
    authors_nicknames?: SortOrder
    authors_followercount?: SortOrder
    authors_heartcount?: SortOrder
    authors_videocount?: SortOrder
    authors_signature?: SortOrder
    authors_privateaccount?: SortOrder
  }

  export type authorsMaxOrderByAggregateInput = {
    authors_id?: SortOrder
    authors_uniqueids?: SortOrder
    authors_nicknames?: SortOrder
    authors_followercount?: SortOrder
    authors_heartcount?: SortOrder
    authors_videocount?: SortOrder
    authors_signature?: SortOrder
    authors_privateaccount?: SortOrder
  }

  export type authorsMinOrderByAggregateInput = {
    authors_id?: SortOrder
    authors_uniqueids?: SortOrder
    authors_nicknames?: SortOrder
    authors_followercount?: SortOrder
    authors_heartcount?: SortOrder
    authors_videocount?: SortOrder
    authors_signature?: SortOrder
    authors_privateaccount?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type bookmarksCountOrderByAggregateInput = {
    bookmarks_officiallist?: SortOrder
    bookmarks_downloaded?: SortOrder
    bookmarks_total?: SortOrder
    bookmarks_numdisappeared?: SortOrder
    bookmarks_lastrun?: SortOrder
  }

  export type bookmarksMaxOrderByAggregateInput = {
    bookmarks_officiallist?: SortOrder
    bookmarks_downloaded?: SortOrder
    bookmarks_total?: SortOrder
    bookmarks_numdisappeared?: SortOrder
    bookmarks_lastrun?: SortOrder
  }

  export type bookmarksMinOrderByAggregateInput = {
    bookmarks_officiallist?: SortOrder
    bookmarks_downloaded?: SortOrder
    bookmarks_total?: SortOrder
    bookmarks_numdisappeared?: SortOrder
    bookmarks_lastrun?: SortOrder
  }

  export type consolidatedCountOrderByAggregateInput = {
    c_videos_id?: SortOrder
    c_videos_authorid?: SortOrder
    c_videos_audioid?: SortOrder
    c_authors_id?: SortOrder
    c_authors_nicknames?: SortOrder
    c_authors_uniqueids?: SortOrder
    c_texts_text_content?: SortOrder
  }

  export type consolidatedMaxOrderByAggregateInput = {
    c_videos_id?: SortOrder
    c_videos_authorid?: SortOrder
    c_videos_audioid?: SortOrder
    c_authors_id?: SortOrder
    c_authors_nicknames?: SortOrder
    c_authors_uniqueids?: SortOrder
    c_texts_text_content?: SortOrder
  }

  export type consolidatedMinOrderByAggregateInput = {
    c_videos_id?: SortOrder
    c_videos_authorid?: SortOrder
    c_videos_audioid?: SortOrder
    c_authors_id?: SortOrder
    c_authors_nicknames?: SortOrder
    c_authors_uniqueids?: SortOrder
    c_texts_text_content?: SortOrder
  }

  export type followingCountOrderByAggregateInput = {
    following_author_id?: SortOrder
    following_official?: SortOrder
    following_started?: SortOrder
    following_not_interested?: SortOrder
    following_infolder?: SortOrder
    following_disappeared?: SortOrder
    following_last_run_start?: SortOrder
    following_last_run_finish?: SortOrder
    following_last_run_bottom?: SortOrder
    following_last_run_firstadded?: SortOrder
  }

  export type followingMaxOrderByAggregateInput = {
    following_author_id?: SortOrder
    following_official?: SortOrder
    following_started?: SortOrder
    following_not_interested?: SortOrder
    following_infolder?: SortOrder
    following_disappeared?: SortOrder
    following_last_run_start?: SortOrder
    following_last_run_finish?: SortOrder
    following_last_run_bottom?: SortOrder
    following_last_run_firstadded?: SortOrder
  }

  export type followingMinOrderByAggregateInput = {
    following_author_id?: SortOrder
    following_official?: SortOrder
    following_started?: SortOrder
    following_not_interested?: SortOrder
    following_infolder?: SortOrder
    following_disappeared?: SortOrder
    following_last_run_start?: SortOrder
    following_last_run_finish?: SortOrder
    following_last_run_bottom?: SortOrder
    following_last_run_firstadded?: SortOrder
  }

  export type likesCountOrderByAggregateInput = {
    likes_schemaversion?: SortOrder
    likes_user?: SortOrder
    likes_likes?: SortOrder
  }

  export type likesMaxOrderByAggregateInput = {
    likes_schemaversion?: SortOrder
    likes_user?: SortOrder
    likes_likes?: SortOrder
  }

  export type likesMinOrderByAggregateInput = {
    likes_schemaversion?: SortOrder
    likes_user?: SortOrder
    likes_likes?: SortOrder
  }

  export type Upload_statusListRelationFilter = {
    every?: upload_statusWhereInput
    some?: upload_statusWhereInput
    none?: upload_statusWhereInput
  }

  export type upload_statusOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type mediaCountOrderByAggregateInput = {
    video_id?: SortOrder
    author_id?: SortOrder
    video_path?: SortOrder
    cover_path?: SortOrder
    title?: SortOrder
    description?: SortOrder
    tags?: SortOrder
  }

  export type mediaMaxOrderByAggregateInput = {
    video_id?: SortOrder
    author_id?: SortOrder
    video_path?: SortOrder
    cover_path?: SortOrder
    title?: SortOrder
    description?: SortOrder
    tags?: SortOrder
  }

  export type mediaMinOrderByAggregateInput = {
    video_id?: SortOrder
    author_id?: SortOrder
    video_path?: SortOrder
    cover_path?: SortOrder
    title?: SortOrder
    description?: SortOrder
    tags?: SortOrder
  }

  export type textsCountOrderByAggregateInput = {
    texts_text_id?: SortOrder
    texts_text_content?: SortOrder
  }

  export type textsMaxOrderByAggregateInput = {
    texts_text_id?: SortOrder
    texts_text_content?: SortOrder
  }

  export type textsMinOrderByAggregateInput = {
    texts_text_id?: SortOrder
    texts_text_content?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type MediaNullableScalarRelationFilter = {
    is?: mediaWhereInput | null
    isNot?: mediaWhereInput | null
  }

  export type upload_statusCountOrderByAggregateInput = {
    id?: SortOrder
    video_id?: SortOrder
    status?: SortOrder
    upload_timestamp?: SortOrder
    r2_video_url?: SortOrder
    r2_cover_url?: SortOrder
    retry_count?: SortOrder
    last_error?: SortOrder
  }

  export type upload_statusAvgOrderByAggregateInput = {
    id?: SortOrder
    retry_count?: SortOrder
  }

  export type upload_statusMaxOrderByAggregateInput = {
    id?: SortOrder
    video_id?: SortOrder
    status?: SortOrder
    upload_timestamp?: SortOrder
    r2_video_url?: SortOrder
    r2_cover_url?: SortOrder
    retry_count?: SortOrder
    last_error?: SortOrder
  }

  export type upload_statusMinOrderByAggregateInput = {
    id?: SortOrder
    video_id?: SortOrder
    status?: SortOrder
    upload_timestamp?: SortOrder
    r2_video_url?: SortOrder
    r2_cover_url?: SortOrder
    retry_count?: SortOrder
    last_error?: SortOrder
  }

  export type upload_statusSumOrderByAggregateInput = {
    id?: SortOrder
    retry_count?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type videosCountOrderByAggregateInput = {
    videos_id?: SortOrder
    videos_authorid?: SortOrder
    videos_createtime?: SortOrder
    videos_diggcount?: SortOrder
    videos_playcount?: SortOrder
    videos_audioid?: SortOrder
    videos_size?: SortOrder
    videos_itemmute?: SortOrder
  }

  export type videosMaxOrderByAggregateInput = {
    videos_id?: SortOrder
    videos_authorid?: SortOrder
    videos_createtime?: SortOrder
    videos_diggcount?: SortOrder
    videos_playcount?: SortOrder
    videos_audioid?: SortOrder
    videos_size?: SortOrder
    videos_itemmute?: SortOrder
  }

  export type videosMinOrderByAggregateInput = {
    videos_id?: SortOrder
    videos_authorid?: SortOrder
    videos_createtime?: SortOrder
    videos_diggcount?: SortOrder
    videos_playcount?: SortOrder
    videos_audioid?: SortOrder
    videos_size?: SortOrder
    videos_itemmute?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type upload_statusCreateNestedManyWithoutMediaInput = {
    create?: XOR<upload_statusCreateWithoutMediaInput, upload_statusUncheckedCreateWithoutMediaInput> | upload_statusCreateWithoutMediaInput[] | upload_statusUncheckedCreateWithoutMediaInput[]
    connectOrCreate?: upload_statusCreateOrConnectWithoutMediaInput | upload_statusCreateOrConnectWithoutMediaInput[]
    createMany?: upload_statusCreateManyMediaInputEnvelope
    connect?: upload_statusWhereUniqueInput | upload_statusWhereUniqueInput[]
  }

  export type upload_statusUncheckedCreateNestedManyWithoutMediaInput = {
    create?: XOR<upload_statusCreateWithoutMediaInput, upload_statusUncheckedCreateWithoutMediaInput> | upload_statusCreateWithoutMediaInput[] | upload_statusUncheckedCreateWithoutMediaInput[]
    connectOrCreate?: upload_statusCreateOrConnectWithoutMediaInput | upload_statusCreateOrConnectWithoutMediaInput[]
    createMany?: upload_statusCreateManyMediaInputEnvelope
    connect?: upload_statusWhereUniqueInput | upload_statusWhereUniqueInput[]
  }

  export type upload_statusUpdateManyWithoutMediaNestedInput = {
    create?: XOR<upload_statusCreateWithoutMediaInput, upload_statusUncheckedCreateWithoutMediaInput> | upload_statusCreateWithoutMediaInput[] | upload_statusUncheckedCreateWithoutMediaInput[]
    connectOrCreate?: upload_statusCreateOrConnectWithoutMediaInput | upload_statusCreateOrConnectWithoutMediaInput[]
    upsert?: upload_statusUpsertWithWhereUniqueWithoutMediaInput | upload_statusUpsertWithWhereUniqueWithoutMediaInput[]
    createMany?: upload_statusCreateManyMediaInputEnvelope
    set?: upload_statusWhereUniqueInput | upload_statusWhereUniqueInput[]
    disconnect?: upload_statusWhereUniqueInput | upload_statusWhereUniqueInput[]
    delete?: upload_statusWhereUniqueInput | upload_statusWhereUniqueInput[]
    connect?: upload_statusWhereUniqueInput | upload_statusWhereUniqueInput[]
    update?: upload_statusUpdateWithWhereUniqueWithoutMediaInput | upload_statusUpdateWithWhereUniqueWithoutMediaInput[]
    updateMany?: upload_statusUpdateManyWithWhereWithoutMediaInput | upload_statusUpdateManyWithWhereWithoutMediaInput[]
    deleteMany?: upload_statusScalarWhereInput | upload_statusScalarWhereInput[]
  }

  export type upload_statusUncheckedUpdateManyWithoutMediaNestedInput = {
    create?: XOR<upload_statusCreateWithoutMediaInput, upload_statusUncheckedCreateWithoutMediaInput> | upload_statusCreateWithoutMediaInput[] | upload_statusUncheckedCreateWithoutMediaInput[]
    connectOrCreate?: upload_statusCreateOrConnectWithoutMediaInput | upload_statusCreateOrConnectWithoutMediaInput[]
    upsert?: upload_statusUpsertWithWhereUniqueWithoutMediaInput | upload_statusUpsertWithWhereUniqueWithoutMediaInput[]
    createMany?: upload_statusCreateManyMediaInputEnvelope
    set?: upload_statusWhereUniqueInput | upload_statusWhereUniqueInput[]
    disconnect?: upload_statusWhereUniqueInput | upload_statusWhereUniqueInput[]
    delete?: upload_statusWhereUniqueInput | upload_statusWhereUniqueInput[]
    connect?: upload_statusWhereUniqueInput | upload_statusWhereUniqueInput[]
    update?: upload_statusUpdateWithWhereUniqueWithoutMediaInput | upload_statusUpdateWithWhereUniqueWithoutMediaInput[]
    updateMany?: upload_statusUpdateManyWithWhereWithoutMediaInput | upload_statusUpdateManyWithWhereWithoutMediaInput[]
    deleteMany?: upload_statusScalarWhereInput | upload_statusScalarWhereInput[]
  }

  export type mediaCreateNestedOneWithoutUpload_statusInput = {
    create?: XOR<mediaCreateWithoutUpload_statusInput, mediaUncheckedCreateWithoutUpload_statusInput>
    connectOrCreate?: mediaCreateOrConnectWithoutUpload_statusInput
    connect?: mediaWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type mediaUpdateOneWithoutUpload_statusNestedInput = {
    create?: XOR<mediaCreateWithoutUpload_statusInput, mediaUncheckedCreateWithoutUpload_statusInput>
    connectOrCreate?: mediaCreateOrConnectWithoutUpload_statusInput
    upsert?: mediaUpsertWithoutUpload_statusInput
    disconnect?: mediaWhereInput | boolean
    delete?: mediaWhereInput | boolean
    connect?: mediaWhereUniqueInput
    update?: XOR<XOR<mediaUpdateToOneWithWhereWithoutUpload_statusInput, mediaUpdateWithoutUpload_statusInput>, mediaUncheckedUpdateWithoutUpload_statusInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type upload_statusCreateWithoutMediaInput = {
    status?: string | null
    upload_timestamp?: Date | string | null
    r2_video_url?: string | null
    r2_cover_url?: string | null
    retry_count?: number | null
    last_error?: string | null
  }

  export type upload_statusUncheckedCreateWithoutMediaInput = {
    id?: number
    status?: string | null
    upload_timestamp?: Date | string | null
    r2_video_url?: string | null
    r2_cover_url?: string | null
    retry_count?: number | null
    last_error?: string | null
  }

  export type upload_statusCreateOrConnectWithoutMediaInput = {
    where: upload_statusWhereUniqueInput
    create: XOR<upload_statusCreateWithoutMediaInput, upload_statusUncheckedCreateWithoutMediaInput>
  }

  export type upload_statusCreateManyMediaInputEnvelope = {
    data: upload_statusCreateManyMediaInput | upload_statusCreateManyMediaInput[]
    skipDuplicates?: boolean
  }

  export type upload_statusUpsertWithWhereUniqueWithoutMediaInput = {
    where: upload_statusWhereUniqueInput
    update: XOR<upload_statusUpdateWithoutMediaInput, upload_statusUncheckedUpdateWithoutMediaInput>
    create: XOR<upload_statusCreateWithoutMediaInput, upload_statusUncheckedCreateWithoutMediaInput>
  }

  export type upload_statusUpdateWithWhereUniqueWithoutMediaInput = {
    where: upload_statusWhereUniqueInput
    data: XOR<upload_statusUpdateWithoutMediaInput, upload_statusUncheckedUpdateWithoutMediaInput>
  }

  export type upload_statusUpdateManyWithWhereWithoutMediaInput = {
    where: upload_statusScalarWhereInput
    data: XOR<upload_statusUpdateManyMutationInput, upload_statusUncheckedUpdateManyWithoutMediaInput>
  }

  export type upload_statusScalarWhereInput = {
    AND?: upload_statusScalarWhereInput | upload_statusScalarWhereInput[]
    OR?: upload_statusScalarWhereInput[]
    NOT?: upload_statusScalarWhereInput | upload_statusScalarWhereInput[]
    id?: IntFilter<"upload_status"> | number
    video_id?: StringNullableFilter<"upload_status"> | string | null
    status?: StringNullableFilter<"upload_status"> | string | null
    upload_timestamp?: DateTimeNullableFilter<"upload_status"> | Date | string | null
    r2_video_url?: StringNullableFilter<"upload_status"> | string | null
    r2_cover_url?: StringNullableFilter<"upload_status"> | string | null
    retry_count?: IntNullableFilter<"upload_status"> | number | null
    last_error?: StringNullableFilter<"upload_status"> | string | null
  }

  export type mediaCreateWithoutUpload_statusInput = {
    video_id: string
    author_id?: string | null
    video_path?: string | null
    cover_path?: string | null
    title?: string | null
    description?: string | null
    tags?: string | null
  }

  export type mediaUncheckedCreateWithoutUpload_statusInput = {
    video_id: string
    author_id?: string | null
    video_path?: string | null
    cover_path?: string | null
    title?: string | null
    description?: string | null
    tags?: string | null
  }

  export type mediaCreateOrConnectWithoutUpload_statusInput = {
    where: mediaWhereUniqueInput
    create: XOR<mediaCreateWithoutUpload_statusInput, mediaUncheckedCreateWithoutUpload_statusInput>
  }

  export type mediaUpsertWithoutUpload_statusInput = {
    update: XOR<mediaUpdateWithoutUpload_statusInput, mediaUncheckedUpdateWithoutUpload_statusInput>
    create: XOR<mediaCreateWithoutUpload_statusInput, mediaUncheckedCreateWithoutUpload_statusInput>
    where?: mediaWhereInput
  }

  export type mediaUpdateToOneWithWhereWithoutUpload_statusInput = {
    where?: mediaWhereInput
    data: XOR<mediaUpdateWithoutUpload_statusInput, mediaUncheckedUpdateWithoutUpload_statusInput>
  }

  export type mediaUpdateWithoutUpload_statusInput = {
    video_id?: StringFieldUpdateOperationsInput | string
    author_id?: NullableStringFieldUpdateOperationsInput | string | null
    video_path?: NullableStringFieldUpdateOperationsInput | string | null
    cover_path?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type mediaUncheckedUpdateWithoutUpload_statusInput = {
    video_id?: StringFieldUpdateOperationsInput | string
    author_id?: NullableStringFieldUpdateOperationsInput | string | null
    video_path?: NullableStringFieldUpdateOperationsInput | string | null
    cover_path?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type upload_statusCreateManyMediaInput = {
    id?: number
    status?: string | null
    upload_timestamp?: Date | string | null
    r2_video_url?: string | null
    r2_cover_url?: string | null
    retry_count?: number | null
    last_error?: string | null
  }

  export type upload_statusUpdateWithoutMediaInput = {
    status?: NullableStringFieldUpdateOperationsInput | string | null
    upload_timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    r2_video_url?: NullableStringFieldUpdateOperationsInput | string | null
    r2_cover_url?: NullableStringFieldUpdateOperationsInput | string | null
    retry_count?: NullableIntFieldUpdateOperationsInput | number | null
    last_error?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type upload_statusUncheckedUpdateWithoutMediaInput = {
    id?: IntFieldUpdateOperationsInput | number
    status?: NullableStringFieldUpdateOperationsInput | string | null
    upload_timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    r2_video_url?: NullableStringFieldUpdateOperationsInput | string | null
    r2_cover_url?: NullableStringFieldUpdateOperationsInput | string | null
    retry_count?: NullableIntFieldUpdateOperationsInput | number | null
    last_error?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type upload_statusUncheckedUpdateManyWithoutMediaInput = {
    id?: IntFieldUpdateOperationsInput | number
    status?: NullableStringFieldUpdateOperationsInput | string | null
    upload_timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    r2_video_url?: NullableStringFieldUpdateOperationsInput | string | null
    r2_cover_url?: NullableStringFieldUpdateOperationsInput | string | null
    retry_count?: NullableIntFieldUpdateOperationsInput | number | null
    last_error?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}