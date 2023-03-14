
/**
 * Client
**/

import * as runtime from './runtime/library';
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends Prisma.PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model User
 * 
 */
export type User = {
  id: number
  imageUrl: string | null
  nickname: string | null
  rank: number
  isTwoFactor: boolean
  ftId: string
  ftUsername: string | null
  ftAccessToken: string | null
  ftRefreshToken: string | null
  ftAccessExpiresAt: Date | null
  ftRefreshExpiresAt: Date | null
  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null
}

/**
 * Model GameResult
 * 
 */
export type GameResult = {
  id: number
  score: number
  isLadder: boolean
  winnerId: number
  loserId: number
  createdAt: Date
}

/**
 * Model FollowUser
 * 
 */
export type FollowUser = {
  id: number
  followerId: number
  followeeId: number
  createdAt: Date
}

/**
 * Model BlockUser
 * 
 */
export type BlockUser = {
  id: number
  blockerId: number
  blockedId: number
  createdAt: Date
}

/**
 * Model Channel
 * 
 */
export type Channel = {
  id: number
  title: string
  channelCode: string
  password: string | null
  idPublic: boolean
  isDm: boolean
  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null
}

/**
 * Model Channel_User
 * 
 */
export type Channel_User = {
  id: number
  channelId: number
  userId: number
  userType: number
  status: number
  createdAt: Date
}

/**
 * Model Message
 * 
 */
export type Message = {
  id: number
  senderId: number
  channelId: number
  text: string
  createdAt: Date
}

/**
 * Model Achievement
 * 
 */
export type Achievement = {
  id: number
  name: string
  description: string
}

/**
 * Model Achievement_User
 * 
 */
export type Achievement_User = {
  id: number
  userId: number
  achievementId: number
  createdAt: Date
}


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<this, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">) => Promise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<R>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<GlobalReject>;

  /**
   * `prisma.gameResult`: Exposes CRUD operations for the **GameResult** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GameResults
    * const gameResults = await prisma.gameResult.findMany()
    * ```
    */
  get gameResult(): Prisma.GameResultDelegate<GlobalReject>;

  /**
   * `prisma.followUser`: Exposes CRUD operations for the **FollowUser** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FollowUsers
    * const followUsers = await prisma.followUser.findMany()
    * ```
    */
  get followUser(): Prisma.FollowUserDelegate<GlobalReject>;

  /**
   * `prisma.blockUser`: Exposes CRUD operations for the **BlockUser** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BlockUsers
    * const blockUsers = await prisma.blockUser.findMany()
    * ```
    */
  get blockUser(): Prisma.BlockUserDelegate<GlobalReject>;

  /**
   * `prisma.channel`: Exposes CRUD operations for the **Channel** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Channels
    * const channels = await prisma.channel.findMany()
    * ```
    */
  get channel(): Prisma.ChannelDelegate<GlobalReject>;

  /**
   * `prisma.channel_User`: Exposes CRUD operations for the **Channel_User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Channel_Users
    * const channel_Users = await prisma.channel_User.findMany()
    * ```
    */
  get channel_User(): Prisma.Channel_UserDelegate<GlobalReject>;

  /**
   * `prisma.message`: Exposes CRUD operations for the **Message** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.message.findMany()
    * ```
    */
  get message(): Prisma.MessageDelegate<GlobalReject>;

  /**
   * `prisma.achievement`: Exposes CRUD operations for the **Achievement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Achievements
    * const achievements = await prisma.achievement.findMany()
    * ```
    */
  get achievement(): Prisma.AchievementDelegate<GlobalReject>;

  /**
   * `prisma.achievement_User`: Exposes CRUD operations for the **Achievement_User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Achievement_Users
    * const achievement_Users = await prisma.achievement_User.findMany()
    * ```
    */
  get achievement_User(): Prisma.Achievement_UserDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

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
   * Prisma Client JS version: 4.11.0
   * Query Engine version: 8fde8fef4033376662cad983758335009d522acb
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

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
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

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
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
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

  export function validator<V>(): <S>(select: runtime.Types.Utils.LegacyExact<S, V>) => S;

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
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    GameResult: 'GameResult',
    FollowUser: 'FollowUser',
    BlockUser: 'BlockUser',
    Channel: 'Channel',
    Channel_User: 'Channel_User',
    Message: 'Message',
    Achievement: 'Achievement',
    Achievement_User: 'Achievement_User'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type DefaultPrismaClient = PrismaClient
  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

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
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
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
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

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
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */


  export type UserCountOutputType = {
    winLogs: number
    loseLogs: number
    followers: number
    followees: number
    blockers: number
    blockeds: number
    channels: number
    achievements: number
    messages: number
  }

  export type UserCountOutputTypeSelect = {
    winLogs?: boolean
    loseLogs?: boolean
    followers?: boolean
    followees?: boolean
    blockers?: boolean
    blockeds?: boolean
    channels?: boolean
    achievements?: boolean
    messages?: boolean
  }

  export type UserCountOutputTypeGetPayload<S extends boolean | null | undefined | UserCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? UserCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (UserCountOutputTypeArgs)
    ? UserCountOutputType 
    : S extends { select: any } & (UserCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof UserCountOutputType ? UserCountOutputType[P] : never
  } 
      : UserCountOutputType




  // Custom InputTypes

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect | null
  }



  /**
   * Count Type ChannelCountOutputType
   */


  export type ChannelCountOutputType = {
    users: number
    messages: number
  }

  export type ChannelCountOutputTypeSelect = {
    users?: boolean
    messages?: boolean
  }

  export type ChannelCountOutputTypeGetPayload<S extends boolean | null | undefined | ChannelCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? ChannelCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (ChannelCountOutputTypeArgs)
    ? ChannelCountOutputType 
    : S extends { select: any } & (ChannelCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof ChannelCountOutputType ? ChannelCountOutputType[P] : never
  } 
      : ChannelCountOutputType




  // Custom InputTypes

  /**
   * ChannelCountOutputType without action
   */
  export type ChannelCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the ChannelCountOutputType
     */
    select?: ChannelCountOutputTypeSelect | null
  }



  /**
   * Count Type AchievementCountOutputType
   */


  export type AchievementCountOutputType = {
    users: number
  }

  export type AchievementCountOutputTypeSelect = {
    users?: boolean
  }

  export type AchievementCountOutputTypeGetPayload<S extends boolean | null | undefined | AchievementCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? AchievementCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (AchievementCountOutputTypeArgs)
    ? AchievementCountOutputType 
    : S extends { select: any } & (AchievementCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof AchievementCountOutputType ? AchievementCountOutputType[P] : never
  } 
      : AchievementCountOutputType




  // Custom InputTypes

  /**
   * AchievementCountOutputType without action
   */
  export type AchievementCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the AchievementCountOutputType
     */
    select?: AchievementCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model User
   */


  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
    rank: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
    rank: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    imageUrl: string | null
    nickname: string | null
    rank: number | null
    isTwoFactor: boolean | null
    ftId: string | null
    ftUsername: string | null
    ftAccessToken: string | null
    ftRefreshToken: string | null
    ftAccessExpiresAt: Date | null
    ftRefreshExpiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    imageUrl: string | null
    nickname: string | null
    rank: number | null
    isTwoFactor: boolean | null
    ftId: string | null
    ftUsername: string | null
    ftAccessToken: string | null
    ftRefreshToken: string | null
    ftAccessExpiresAt: Date | null
    ftRefreshExpiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    imageUrl: number
    nickname: number
    rank: number
    isTwoFactor: number
    ftId: number
    ftUsername: number
    ftAccessToken: number
    ftRefreshToken: number
    ftAccessExpiresAt: number
    ftRefreshExpiresAt: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
    rank?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
    rank?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    imageUrl?: true
    nickname?: true
    rank?: true
    isTwoFactor?: true
    ftId?: true
    ftUsername?: true
    ftAccessToken?: true
    ftRefreshToken?: true
    ftAccessExpiresAt?: true
    ftRefreshExpiresAt?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    imageUrl?: true
    nickname?: true
    rank?: true
    isTwoFactor?: true
    ftId?: true
    ftUsername?: true
    ftAccessToken?: true
    ftRefreshToken?: true
    ftAccessExpiresAt?: true
    ftRefreshExpiresAt?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    imageUrl?: true
    nickname?: true
    rank?: true
    isTwoFactor?: true
    ftId?: true
    ftUsername?: true
    ftAccessToken?: true
    ftRefreshToken?: true
    ftAccessExpiresAt?: true
    ftRefreshExpiresAt?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type UserAggregateArgs = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs = {
    where?: UserWhereInput
    orderBy?: Enumerable<UserOrderByWithAggregationInput>
    by: UserScalarFieldEnum[]
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }


  export type UserGroupByOutputType = {
    id: number
    imageUrl: string | null
    nickname: string | null
    rank: number
    isTwoFactor: boolean
    ftId: string
    ftUsername: string | null
    ftAccessToken: string | null
    ftRefreshToken: string | null
    ftAccessExpiresAt: Date | null
    ftRefreshExpiresAt: Date | null
    createdAt: Date
    updatedAt: Date | null
    deletedAt: Date | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect = {
    id?: boolean
    imageUrl?: boolean
    nickname?: boolean
    rank?: boolean
    isTwoFactor?: boolean
    ftId?: boolean
    ftUsername?: boolean
    ftAccessToken?: boolean
    ftRefreshToken?: boolean
    ftAccessExpiresAt?: boolean
    ftRefreshExpiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    winLogs?: boolean | User$winLogsArgs
    loseLogs?: boolean | User$loseLogsArgs
    followers?: boolean | User$followersArgs
    followees?: boolean | User$followeesArgs
    blockers?: boolean | User$blockersArgs
    blockeds?: boolean | User$blockedsArgs
    channels?: boolean | User$channelsArgs
    achievements?: boolean | User$achievementsArgs
    messages?: boolean | User$messagesArgs
    _count?: boolean | UserCountOutputTypeArgs
  }


  export type UserInclude = {
    winLogs?: boolean | User$winLogsArgs
    loseLogs?: boolean | User$loseLogsArgs
    followers?: boolean | User$followersArgs
    followees?: boolean | User$followeesArgs
    blockers?: boolean | User$blockersArgs
    blockeds?: boolean | User$blockedsArgs
    channels?: boolean | User$channelsArgs
    achievements?: boolean | User$achievementsArgs
    messages?: boolean | User$messagesArgs
    _count?: boolean | UserCountOutputTypeArgs
  }

  export type UserGetPayload<S extends boolean | null | undefined | UserArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? User :
    S extends undefined ? never :
    S extends { include: any } & (UserArgs | UserFindManyArgs)
    ? User  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'winLogs' ? Array < GameResultGetPayload<S['include'][P]>>  :
        P extends 'loseLogs' ? Array < GameResultGetPayload<S['include'][P]>>  :
        P extends 'followers' ? Array < FollowUserGetPayload<S['include'][P]>>  :
        P extends 'followees' ? Array < FollowUserGetPayload<S['include'][P]>>  :
        P extends 'blockers' ? Array < BlockUserGetPayload<S['include'][P]>>  :
        P extends 'blockeds' ? Array < BlockUserGetPayload<S['include'][P]>>  :
        P extends 'channels' ? Array < Channel_UserGetPayload<S['include'][P]>>  :
        P extends 'achievements' ? Array < Achievement_UserGetPayload<S['include'][P]>>  :
        P extends 'messages' ? Array < MessageGetPayload<S['include'][P]>>  :
        P extends '_count' ? UserCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (UserArgs | UserFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'winLogs' ? Array < GameResultGetPayload<S['select'][P]>>  :
        P extends 'loseLogs' ? Array < GameResultGetPayload<S['select'][P]>>  :
        P extends 'followers' ? Array < FollowUserGetPayload<S['select'][P]>>  :
        P extends 'followees' ? Array < FollowUserGetPayload<S['select'][P]>>  :
        P extends 'blockers' ? Array < BlockUserGetPayload<S['select'][P]>>  :
        P extends 'blockeds' ? Array < BlockUserGetPayload<S['select'][P]>>  :
        P extends 'channels' ? Array < Channel_UserGetPayload<S['select'][P]>>  :
        P extends 'achievements' ? Array < Achievement_UserGetPayload<S['select'][P]>>  :
        P extends 'messages' ? Array < MessageGetPayload<S['select'][P]>>  :
        P extends '_count' ? UserCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof User ? User[P] : never
  } 
      : User


  type UserCountArgs = 
    Omit<UserFindManyArgs, 'select' | 'include'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'User'> extends True ? Prisma__UserClient<UserGetPayload<T>> : Prisma__UserClient<UserGetPayload<T> | null, null>

    /**
     * Find one User that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, UserFindUniqueOrThrowArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'User'> extends True ? Prisma__UserClient<UserGetPayload<T>> : Prisma__UserClient<UserGetPayload<T> | null, null>

    /**
     * Find the first User that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs>
    ): Prisma.PrismaPromise<Array<UserGetPayload<T>>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
    **/
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Create many Users.
     *     @param {UserCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const user = await prisma.user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
    **/
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
    **/
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    winLogs<T extends User$winLogsArgs= {}>(args?: Subset<T, User$winLogsArgs>): Prisma.PrismaPromise<Array<GameResultGetPayload<T>>| Null>;

    loseLogs<T extends User$loseLogsArgs= {}>(args?: Subset<T, User$loseLogsArgs>): Prisma.PrismaPromise<Array<GameResultGetPayload<T>>| Null>;

    followers<T extends User$followersArgs= {}>(args?: Subset<T, User$followersArgs>): Prisma.PrismaPromise<Array<FollowUserGetPayload<T>>| Null>;

    followees<T extends User$followeesArgs= {}>(args?: Subset<T, User$followeesArgs>): Prisma.PrismaPromise<Array<FollowUserGetPayload<T>>| Null>;

    blockers<T extends User$blockersArgs= {}>(args?: Subset<T, User$blockersArgs>): Prisma.PrismaPromise<Array<BlockUserGetPayload<T>>| Null>;

    blockeds<T extends User$blockedsArgs= {}>(args?: Subset<T, User$blockedsArgs>): Prisma.PrismaPromise<Array<BlockUserGetPayload<T>>| Null>;

    channels<T extends User$channelsArgs= {}>(args?: Subset<T, User$channelsArgs>): Prisma.PrismaPromise<Array<Channel_UserGetPayload<T>>| Null>;

    achievements<T extends User$achievementsArgs= {}>(args?: Subset<T, User$achievementsArgs>): Prisma.PrismaPromise<Array<Achievement_UserGetPayload<T>>| Null>;

    messages<T extends User$messagesArgs= {}>(args?: Subset<T, User$messagesArgs>): Prisma.PrismaPromise<Array<MessageGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * User base type for findUnique actions
   */
  export type UserFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUnique
   */
  export interface UserFindUniqueArgs extends UserFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User base type for findFirst actions
   */
  export type UserFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: Enumerable<UserScalarFieldEnum>
  }

  /**
   * User findFirst
   */
  export interface UserFindFirstArgs extends UserFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User findMany
   */
  export type UserFindManyArgs = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User create
   */
  export type UserCreateArgs = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }


  /**
   * User createMany
   */
  export type UserCreateManyArgs = {
    /**
     * The data used to create many Users.
     */
    data: Enumerable<UserCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * User update
   */
  export type UserUpdateArgs = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User updateMany
   */
  export type UserUpdateManyArgs = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }


  /**
   * User upsert
   */
  export type UserUpsertArgs = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }


  /**
   * User delete
   */
  export type UserDeleteArgs = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }


  /**
   * User.winLogs
   */
  export type User$winLogsArgs = {
    /**
     * Select specific fields to fetch from the GameResult
     */
    select?: GameResultSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GameResultInclude | null
    where?: GameResultWhereInput
    orderBy?: Enumerable<GameResultOrderByWithRelationInput>
    cursor?: GameResultWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<GameResultScalarFieldEnum>
  }


  /**
   * User.loseLogs
   */
  export type User$loseLogsArgs = {
    /**
     * Select specific fields to fetch from the GameResult
     */
    select?: GameResultSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GameResultInclude | null
    where?: GameResultWhereInput
    orderBy?: Enumerable<GameResultOrderByWithRelationInput>
    cursor?: GameResultWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<GameResultScalarFieldEnum>
  }


  /**
   * User.followers
   */
  export type User$followersArgs = {
    /**
     * Select specific fields to fetch from the FollowUser
     */
    select?: FollowUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FollowUserInclude | null
    where?: FollowUserWhereInput
    orderBy?: Enumerable<FollowUserOrderByWithRelationInput>
    cursor?: FollowUserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<FollowUserScalarFieldEnum>
  }


  /**
   * User.followees
   */
  export type User$followeesArgs = {
    /**
     * Select specific fields to fetch from the FollowUser
     */
    select?: FollowUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FollowUserInclude | null
    where?: FollowUserWhereInput
    orderBy?: Enumerable<FollowUserOrderByWithRelationInput>
    cursor?: FollowUserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<FollowUserScalarFieldEnum>
  }


  /**
   * User.blockers
   */
  export type User$blockersArgs = {
    /**
     * Select specific fields to fetch from the BlockUser
     */
    select?: BlockUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: BlockUserInclude | null
    where?: BlockUserWhereInput
    orderBy?: Enumerable<BlockUserOrderByWithRelationInput>
    cursor?: BlockUserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<BlockUserScalarFieldEnum>
  }


  /**
   * User.blockeds
   */
  export type User$blockedsArgs = {
    /**
     * Select specific fields to fetch from the BlockUser
     */
    select?: BlockUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: BlockUserInclude | null
    where?: BlockUserWhereInput
    orderBy?: Enumerable<BlockUserOrderByWithRelationInput>
    cursor?: BlockUserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<BlockUserScalarFieldEnum>
  }


  /**
   * User.channels
   */
  export type User$channelsArgs = {
    /**
     * Select specific fields to fetch from the Channel_User
     */
    select?: Channel_UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Channel_UserInclude | null
    where?: Channel_UserWhereInput
    orderBy?: Enumerable<Channel_UserOrderByWithRelationInput>
    cursor?: Channel_UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<Channel_UserScalarFieldEnum>
  }


  /**
   * User.achievements
   */
  export type User$achievementsArgs = {
    /**
     * Select specific fields to fetch from the Achievement_User
     */
    select?: Achievement_UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Achievement_UserInclude | null
    where?: Achievement_UserWhereInput
    orderBy?: Enumerable<Achievement_UserOrderByWithRelationInput>
    cursor?: Achievement_UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<Achievement_UserScalarFieldEnum>
  }


  /**
   * User.messages
   */
  export type User$messagesArgs = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MessageInclude | null
    where?: MessageWhereInput
    orderBy?: Enumerable<MessageOrderByWithRelationInput>
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<MessageScalarFieldEnum>
  }


  /**
   * User without action
   */
  export type UserArgs = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
  }



  /**
   * Model GameResult
   */


  export type AggregateGameResult = {
    _count: GameResultCountAggregateOutputType | null
    _avg: GameResultAvgAggregateOutputType | null
    _sum: GameResultSumAggregateOutputType | null
    _min: GameResultMinAggregateOutputType | null
    _max: GameResultMaxAggregateOutputType | null
  }

  export type GameResultAvgAggregateOutputType = {
    id: number | null
    score: number | null
    winnerId: number | null
    loserId: number | null
  }

  export type GameResultSumAggregateOutputType = {
    id: number | null
    score: number | null
    winnerId: number | null
    loserId: number | null
  }

  export type GameResultMinAggregateOutputType = {
    id: number | null
    score: number | null
    isLadder: boolean | null
    winnerId: number | null
    loserId: number | null
    createdAt: Date | null
  }

  export type GameResultMaxAggregateOutputType = {
    id: number | null
    score: number | null
    isLadder: boolean | null
    winnerId: number | null
    loserId: number | null
    createdAt: Date | null
  }

  export type GameResultCountAggregateOutputType = {
    id: number
    score: number
    isLadder: number
    winnerId: number
    loserId: number
    createdAt: number
    _all: number
  }


  export type GameResultAvgAggregateInputType = {
    id?: true
    score?: true
    winnerId?: true
    loserId?: true
  }

  export type GameResultSumAggregateInputType = {
    id?: true
    score?: true
    winnerId?: true
    loserId?: true
  }

  export type GameResultMinAggregateInputType = {
    id?: true
    score?: true
    isLadder?: true
    winnerId?: true
    loserId?: true
    createdAt?: true
  }

  export type GameResultMaxAggregateInputType = {
    id?: true
    score?: true
    isLadder?: true
    winnerId?: true
    loserId?: true
    createdAt?: true
  }

  export type GameResultCountAggregateInputType = {
    id?: true
    score?: true
    isLadder?: true
    winnerId?: true
    loserId?: true
    createdAt?: true
    _all?: true
  }

  export type GameResultAggregateArgs = {
    /**
     * Filter which GameResult to aggregate.
     */
    where?: GameResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameResults to fetch.
     */
    orderBy?: Enumerable<GameResultOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GameResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GameResults
    **/
    _count?: true | GameResultCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GameResultAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GameResultSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GameResultMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GameResultMaxAggregateInputType
  }

  export type GetGameResultAggregateType<T extends GameResultAggregateArgs> = {
        [P in keyof T & keyof AggregateGameResult]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGameResult[P]>
      : GetScalarType<T[P], AggregateGameResult[P]>
  }




  export type GameResultGroupByArgs = {
    where?: GameResultWhereInput
    orderBy?: Enumerable<GameResultOrderByWithAggregationInput>
    by: GameResultScalarFieldEnum[]
    having?: GameResultScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GameResultCountAggregateInputType | true
    _avg?: GameResultAvgAggregateInputType
    _sum?: GameResultSumAggregateInputType
    _min?: GameResultMinAggregateInputType
    _max?: GameResultMaxAggregateInputType
  }


  export type GameResultGroupByOutputType = {
    id: number
    score: number
    isLadder: boolean
    winnerId: number
    loserId: number
    createdAt: Date
    _count: GameResultCountAggregateOutputType | null
    _avg: GameResultAvgAggregateOutputType | null
    _sum: GameResultSumAggregateOutputType | null
    _min: GameResultMinAggregateOutputType | null
    _max: GameResultMaxAggregateOutputType | null
  }

  type GetGameResultGroupByPayload<T extends GameResultGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<GameResultGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GameResultGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GameResultGroupByOutputType[P]>
            : GetScalarType<T[P], GameResultGroupByOutputType[P]>
        }
      >
    >


  export type GameResultSelect = {
    id?: boolean
    score?: boolean
    isLadder?: boolean
    winnerId?: boolean
    loserId?: boolean
    createdAt?: boolean
    winner?: boolean | UserArgs
    loser?: boolean | UserArgs
  }


  export type GameResultInclude = {
    winner?: boolean | UserArgs
    loser?: boolean | UserArgs
  }

  export type GameResultGetPayload<S extends boolean | null | undefined | GameResultArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? GameResult :
    S extends undefined ? never :
    S extends { include: any } & (GameResultArgs | GameResultFindManyArgs)
    ? GameResult  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'winner' ? UserGetPayload<S['include'][P]> :
        P extends 'loser' ? UserGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (GameResultArgs | GameResultFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'winner' ? UserGetPayload<S['select'][P]> :
        P extends 'loser' ? UserGetPayload<S['select'][P]> :  P extends keyof GameResult ? GameResult[P] : never
  } 
      : GameResult


  type GameResultCountArgs = 
    Omit<GameResultFindManyArgs, 'select' | 'include'> & {
      select?: GameResultCountAggregateInputType | true
    }

  export interface GameResultDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one GameResult that matches the filter.
     * @param {GameResultFindUniqueArgs} args - Arguments to find a GameResult
     * @example
     * // Get one GameResult
     * const gameResult = await prisma.gameResult.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends GameResultFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, GameResultFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'GameResult'> extends True ? Prisma__GameResultClient<GameResultGetPayload<T>> : Prisma__GameResultClient<GameResultGetPayload<T> | null, null>

    /**
     * Find one GameResult that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {GameResultFindUniqueOrThrowArgs} args - Arguments to find a GameResult
     * @example
     * // Get one GameResult
     * const gameResult = await prisma.gameResult.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends GameResultFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, GameResultFindUniqueOrThrowArgs>
    ): Prisma__GameResultClient<GameResultGetPayload<T>>

    /**
     * Find the first GameResult that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameResultFindFirstArgs} args - Arguments to find a GameResult
     * @example
     * // Get one GameResult
     * const gameResult = await prisma.gameResult.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends GameResultFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, GameResultFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'GameResult'> extends True ? Prisma__GameResultClient<GameResultGetPayload<T>> : Prisma__GameResultClient<GameResultGetPayload<T> | null, null>

    /**
     * Find the first GameResult that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameResultFindFirstOrThrowArgs} args - Arguments to find a GameResult
     * @example
     * // Get one GameResult
     * const gameResult = await prisma.gameResult.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends GameResultFindFirstOrThrowArgs>(
      args?: SelectSubset<T, GameResultFindFirstOrThrowArgs>
    ): Prisma__GameResultClient<GameResultGetPayload<T>>

    /**
     * Find zero or more GameResults that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameResultFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GameResults
     * const gameResults = await prisma.gameResult.findMany()
     * 
     * // Get first 10 GameResults
     * const gameResults = await prisma.gameResult.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gameResultWithIdOnly = await prisma.gameResult.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends GameResultFindManyArgs>(
      args?: SelectSubset<T, GameResultFindManyArgs>
    ): Prisma.PrismaPromise<Array<GameResultGetPayload<T>>>

    /**
     * Create a GameResult.
     * @param {GameResultCreateArgs} args - Arguments to create a GameResult.
     * @example
     * // Create one GameResult
     * const GameResult = await prisma.gameResult.create({
     *   data: {
     *     // ... data to create a GameResult
     *   }
     * })
     * 
    **/
    create<T extends GameResultCreateArgs>(
      args: SelectSubset<T, GameResultCreateArgs>
    ): Prisma__GameResultClient<GameResultGetPayload<T>>

    /**
     * Create many GameResults.
     *     @param {GameResultCreateManyArgs} args - Arguments to create many GameResults.
     *     @example
     *     // Create many GameResults
     *     const gameResult = await prisma.gameResult.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends GameResultCreateManyArgs>(
      args?: SelectSubset<T, GameResultCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a GameResult.
     * @param {GameResultDeleteArgs} args - Arguments to delete one GameResult.
     * @example
     * // Delete one GameResult
     * const GameResult = await prisma.gameResult.delete({
     *   where: {
     *     // ... filter to delete one GameResult
     *   }
     * })
     * 
    **/
    delete<T extends GameResultDeleteArgs>(
      args: SelectSubset<T, GameResultDeleteArgs>
    ): Prisma__GameResultClient<GameResultGetPayload<T>>

    /**
     * Update one GameResult.
     * @param {GameResultUpdateArgs} args - Arguments to update one GameResult.
     * @example
     * // Update one GameResult
     * const gameResult = await prisma.gameResult.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends GameResultUpdateArgs>(
      args: SelectSubset<T, GameResultUpdateArgs>
    ): Prisma__GameResultClient<GameResultGetPayload<T>>

    /**
     * Delete zero or more GameResults.
     * @param {GameResultDeleteManyArgs} args - Arguments to filter GameResults to delete.
     * @example
     * // Delete a few GameResults
     * const { count } = await prisma.gameResult.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends GameResultDeleteManyArgs>(
      args?: SelectSubset<T, GameResultDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GameResults.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameResultUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GameResults
     * const gameResult = await prisma.gameResult.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends GameResultUpdateManyArgs>(
      args: SelectSubset<T, GameResultUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one GameResult.
     * @param {GameResultUpsertArgs} args - Arguments to update or create a GameResult.
     * @example
     * // Update or create a GameResult
     * const gameResult = await prisma.gameResult.upsert({
     *   create: {
     *     // ... data to create a GameResult
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GameResult we want to update
     *   }
     * })
    **/
    upsert<T extends GameResultUpsertArgs>(
      args: SelectSubset<T, GameResultUpsertArgs>
    ): Prisma__GameResultClient<GameResultGetPayload<T>>

    /**
     * Count the number of GameResults.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameResultCountArgs} args - Arguments to filter GameResults to count.
     * @example
     * // Count the number of GameResults
     * const count = await prisma.gameResult.count({
     *   where: {
     *     // ... the filter for the GameResults we want to count
     *   }
     * })
    **/
    count<T extends GameResultCountArgs>(
      args?: Subset<T, GameResultCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GameResultCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GameResult.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameResultAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends GameResultAggregateArgs>(args: Subset<T, GameResultAggregateArgs>): Prisma.PrismaPromise<GetGameResultAggregateType<T>>

    /**
     * Group by GameResult.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameResultGroupByArgs} args - Group by arguments.
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
      T extends GameResultGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GameResultGroupByArgs['orderBy'] }
        : { orderBy?: GameResultGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, GameResultGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGameResultGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for GameResult.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__GameResultClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    winner<T extends UserArgs= {}>(args?: Subset<T, UserArgs>): Prisma__UserClient<UserGetPayload<T> | Null>;

    loser<T extends UserArgs= {}>(args?: Subset<T, UserArgs>): Prisma__UserClient<UserGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * GameResult base type for findUnique actions
   */
  export type GameResultFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the GameResult
     */
    select?: GameResultSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GameResultInclude | null
    /**
     * Filter, which GameResult to fetch.
     */
    where: GameResultWhereUniqueInput
  }

  /**
   * GameResult findUnique
   */
  export interface GameResultFindUniqueArgs extends GameResultFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * GameResult findUniqueOrThrow
   */
  export type GameResultFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the GameResult
     */
    select?: GameResultSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GameResultInclude | null
    /**
     * Filter, which GameResult to fetch.
     */
    where: GameResultWhereUniqueInput
  }


  /**
   * GameResult base type for findFirst actions
   */
  export type GameResultFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the GameResult
     */
    select?: GameResultSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GameResultInclude | null
    /**
     * Filter, which GameResult to fetch.
     */
    where?: GameResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameResults to fetch.
     */
    orderBy?: Enumerable<GameResultOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GameResults.
     */
    cursor?: GameResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GameResults.
     */
    distinct?: Enumerable<GameResultScalarFieldEnum>
  }

  /**
   * GameResult findFirst
   */
  export interface GameResultFindFirstArgs extends GameResultFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * GameResult findFirstOrThrow
   */
  export type GameResultFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the GameResult
     */
    select?: GameResultSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GameResultInclude | null
    /**
     * Filter, which GameResult to fetch.
     */
    where?: GameResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameResults to fetch.
     */
    orderBy?: Enumerable<GameResultOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GameResults.
     */
    cursor?: GameResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GameResults.
     */
    distinct?: Enumerable<GameResultScalarFieldEnum>
  }


  /**
   * GameResult findMany
   */
  export type GameResultFindManyArgs = {
    /**
     * Select specific fields to fetch from the GameResult
     */
    select?: GameResultSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GameResultInclude | null
    /**
     * Filter, which GameResults to fetch.
     */
    where?: GameResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameResults to fetch.
     */
    orderBy?: Enumerable<GameResultOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GameResults.
     */
    cursor?: GameResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameResults.
     */
    skip?: number
    distinct?: Enumerable<GameResultScalarFieldEnum>
  }


  /**
   * GameResult create
   */
  export type GameResultCreateArgs = {
    /**
     * Select specific fields to fetch from the GameResult
     */
    select?: GameResultSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GameResultInclude | null
    /**
     * The data needed to create a GameResult.
     */
    data: XOR<GameResultCreateInput, GameResultUncheckedCreateInput>
  }


  /**
   * GameResult createMany
   */
  export type GameResultCreateManyArgs = {
    /**
     * The data used to create many GameResults.
     */
    data: Enumerable<GameResultCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * GameResult update
   */
  export type GameResultUpdateArgs = {
    /**
     * Select specific fields to fetch from the GameResult
     */
    select?: GameResultSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GameResultInclude | null
    /**
     * The data needed to update a GameResult.
     */
    data: XOR<GameResultUpdateInput, GameResultUncheckedUpdateInput>
    /**
     * Choose, which GameResult to update.
     */
    where: GameResultWhereUniqueInput
  }


  /**
   * GameResult updateMany
   */
  export type GameResultUpdateManyArgs = {
    /**
     * The data used to update GameResults.
     */
    data: XOR<GameResultUpdateManyMutationInput, GameResultUncheckedUpdateManyInput>
    /**
     * Filter which GameResults to update
     */
    where?: GameResultWhereInput
  }


  /**
   * GameResult upsert
   */
  export type GameResultUpsertArgs = {
    /**
     * Select specific fields to fetch from the GameResult
     */
    select?: GameResultSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GameResultInclude | null
    /**
     * The filter to search for the GameResult to update in case it exists.
     */
    where: GameResultWhereUniqueInput
    /**
     * In case the GameResult found by the `where` argument doesn't exist, create a new GameResult with this data.
     */
    create: XOR<GameResultCreateInput, GameResultUncheckedCreateInput>
    /**
     * In case the GameResult was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GameResultUpdateInput, GameResultUncheckedUpdateInput>
  }


  /**
   * GameResult delete
   */
  export type GameResultDeleteArgs = {
    /**
     * Select specific fields to fetch from the GameResult
     */
    select?: GameResultSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GameResultInclude | null
    /**
     * Filter which GameResult to delete.
     */
    where: GameResultWhereUniqueInput
  }


  /**
   * GameResult deleteMany
   */
  export type GameResultDeleteManyArgs = {
    /**
     * Filter which GameResults to delete
     */
    where?: GameResultWhereInput
  }


  /**
   * GameResult without action
   */
  export type GameResultArgs = {
    /**
     * Select specific fields to fetch from the GameResult
     */
    select?: GameResultSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GameResultInclude | null
  }



  /**
   * Model FollowUser
   */


  export type AggregateFollowUser = {
    _count: FollowUserCountAggregateOutputType | null
    _avg: FollowUserAvgAggregateOutputType | null
    _sum: FollowUserSumAggregateOutputType | null
    _min: FollowUserMinAggregateOutputType | null
    _max: FollowUserMaxAggregateOutputType | null
  }

  export type FollowUserAvgAggregateOutputType = {
    id: number | null
    followerId: number | null
    followeeId: number | null
  }

  export type FollowUserSumAggregateOutputType = {
    id: number | null
    followerId: number | null
    followeeId: number | null
  }

  export type FollowUserMinAggregateOutputType = {
    id: number | null
    followerId: number | null
    followeeId: number | null
    createdAt: Date | null
  }

  export type FollowUserMaxAggregateOutputType = {
    id: number | null
    followerId: number | null
    followeeId: number | null
    createdAt: Date | null
  }

  export type FollowUserCountAggregateOutputType = {
    id: number
    followerId: number
    followeeId: number
    createdAt: number
    _all: number
  }


  export type FollowUserAvgAggregateInputType = {
    id?: true
    followerId?: true
    followeeId?: true
  }

  export type FollowUserSumAggregateInputType = {
    id?: true
    followerId?: true
    followeeId?: true
  }

  export type FollowUserMinAggregateInputType = {
    id?: true
    followerId?: true
    followeeId?: true
    createdAt?: true
  }

  export type FollowUserMaxAggregateInputType = {
    id?: true
    followerId?: true
    followeeId?: true
    createdAt?: true
  }

  export type FollowUserCountAggregateInputType = {
    id?: true
    followerId?: true
    followeeId?: true
    createdAt?: true
    _all?: true
  }

  export type FollowUserAggregateArgs = {
    /**
     * Filter which FollowUser to aggregate.
     */
    where?: FollowUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FollowUsers to fetch.
     */
    orderBy?: Enumerable<FollowUserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FollowUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FollowUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FollowUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FollowUsers
    **/
    _count?: true | FollowUserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FollowUserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FollowUserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FollowUserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FollowUserMaxAggregateInputType
  }

  export type GetFollowUserAggregateType<T extends FollowUserAggregateArgs> = {
        [P in keyof T & keyof AggregateFollowUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFollowUser[P]>
      : GetScalarType<T[P], AggregateFollowUser[P]>
  }




  export type FollowUserGroupByArgs = {
    where?: FollowUserWhereInput
    orderBy?: Enumerable<FollowUserOrderByWithAggregationInput>
    by: FollowUserScalarFieldEnum[]
    having?: FollowUserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FollowUserCountAggregateInputType | true
    _avg?: FollowUserAvgAggregateInputType
    _sum?: FollowUserSumAggregateInputType
    _min?: FollowUserMinAggregateInputType
    _max?: FollowUserMaxAggregateInputType
  }


  export type FollowUserGroupByOutputType = {
    id: number
    followerId: number
    followeeId: number
    createdAt: Date
    _count: FollowUserCountAggregateOutputType | null
    _avg: FollowUserAvgAggregateOutputType | null
    _sum: FollowUserSumAggregateOutputType | null
    _min: FollowUserMinAggregateOutputType | null
    _max: FollowUserMaxAggregateOutputType | null
  }

  type GetFollowUserGroupByPayload<T extends FollowUserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<FollowUserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FollowUserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FollowUserGroupByOutputType[P]>
            : GetScalarType<T[P], FollowUserGroupByOutputType[P]>
        }
      >
    >


  export type FollowUserSelect = {
    id?: boolean
    followerId?: boolean
    followeeId?: boolean
    createdAt?: boolean
    follewer?: boolean | UserArgs
    follewee?: boolean | UserArgs
  }


  export type FollowUserInclude = {
    follewer?: boolean | UserArgs
    follewee?: boolean | UserArgs
  }

  export type FollowUserGetPayload<S extends boolean | null | undefined | FollowUserArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? FollowUser :
    S extends undefined ? never :
    S extends { include: any } & (FollowUserArgs | FollowUserFindManyArgs)
    ? FollowUser  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'follewer' ? UserGetPayload<S['include'][P]> :
        P extends 'follewee' ? UserGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (FollowUserArgs | FollowUserFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'follewer' ? UserGetPayload<S['select'][P]> :
        P extends 'follewee' ? UserGetPayload<S['select'][P]> :  P extends keyof FollowUser ? FollowUser[P] : never
  } 
      : FollowUser


  type FollowUserCountArgs = 
    Omit<FollowUserFindManyArgs, 'select' | 'include'> & {
      select?: FollowUserCountAggregateInputType | true
    }

  export interface FollowUserDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one FollowUser that matches the filter.
     * @param {FollowUserFindUniqueArgs} args - Arguments to find a FollowUser
     * @example
     * // Get one FollowUser
     * const followUser = await prisma.followUser.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends FollowUserFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, FollowUserFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'FollowUser'> extends True ? Prisma__FollowUserClient<FollowUserGetPayload<T>> : Prisma__FollowUserClient<FollowUserGetPayload<T> | null, null>

    /**
     * Find one FollowUser that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {FollowUserFindUniqueOrThrowArgs} args - Arguments to find a FollowUser
     * @example
     * // Get one FollowUser
     * const followUser = await prisma.followUser.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends FollowUserFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, FollowUserFindUniqueOrThrowArgs>
    ): Prisma__FollowUserClient<FollowUserGetPayload<T>>

    /**
     * Find the first FollowUser that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowUserFindFirstArgs} args - Arguments to find a FollowUser
     * @example
     * // Get one FollowUser
     * const followUser = await prisma.followUser.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends FollowUserFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, FollowUserFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'FollowUser'> extends True ? Prisma__FollowUserClient<FollowUserGetPayload<T>> : Prisma__FollowUserClient<FollowUserGetPayload<T> | null, null>

    /**
     * Find the first FollowUser that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowUserFindFirstOrThrowArgs} args - Arguments to find a FollowUser
     * @example
     * // Get one FollowUser
     * const followUser = await prisma.followUser.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends FollowUserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, FollowUserFindFirstOrThrowArgs>
    ): Prisma__FollowUserClient<FollowUserGetPayload<T>>

    /**
     * Find zero or more FollowUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowUserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FollowUsers
     * const followUsers = await prisma.followUser.findMany()
     * 
     * // Get first 10 FollowUsers
     * const followUsers = await prisma.followUser.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const followUserWithIdOnly = await prisma.followUser.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends FollowUserFindManyArgs>(
      args?: SelectSubset<T, FollowUserFindManyArgs>
    ): Prisma.PrismaPromise<Array<FollowUserGetPayload<T>>>

    /**
     * Create a FollowUser.
     * @param {FollowUserCreateArgs} args - Arguments to create a FollowUser.
     * @example
     * // Create one FollowUser
     * const FollowUser = await prisma.followUser.create({
     *   data: {
     *     // ... data to create a FollowUser
     *   }
     * })
     * 
    **/
    create<T extends FollowUserCreateArgs>(
      args: SelectSubset<T, FollowUserCreateArgs>
    ): Prisma__FollowUserClient<FollowUserGetPayload<T>>

    /**
     * Create many FollowUsers.
     *     @param {FollowUserCreateManyArgs} args - Arguments to create many FollowUsers.
     *     @example
     *     // Create many FollowUsers
     *     const followUser = await prisma.followUser.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends FollowUserCreateManyArgs>(
      args?: SelectSubset<T, FollowUserCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a FollowUser.
     * @param {FollowUserDeleteArgs} args - Arguments to delete one FollowUser.
     * @example
     * // Delete one FollowUser
     * const FollowUser = await prisma.followUser.delete({
     *   where: {
     *     // ... filter to delete one FollowUser
     *   }
     * })
     * 
    **/
    delete<T extends FollowUserDeleteArgs>(
      args: SelectSubset<T, FollowUserDeleteArgs>
    ): Prisma__FollowUserClient<FollowUserGetPayload<T>>

    /**
     * Update one FollowUser.
     * @param {FollowUserUpdateArgs} args - Arguments to update one FollowUser.
     * @example
     * // Update one FollowUser
     * const followUser = await prisma.followUser.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends FollowUserUpdateArgs>(
      args: SelectSubset<T, FollowUserUpdateArgs>
    ): Prisma__FollowUserClient<FollowUserGetPayload<T>>

    /**
     * Delete zero or more FollowUsers.
     * @param {FollowUserDeleteManyArgs} args - Arguments to filter FollowUsers to delete.
     * @example
     * // Delete a few FollowUsers
     * const { count } = await prisma.followUser.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends FollowUserDeleteManyArgs>(
      args?: SelectSubset<T, FollowUserDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FollowUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowUserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FollowUsers
     * const followUser = await prisma.followUser.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends FollowUserUpdateManyArgs>(
      args: SelectSubset<T, FollowUserUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one FollowUser.
     * @param {FollowUserUpsertArgs} args - Arguments to update or create a FollowUser.
     * @example
     * // Update or create a FollowUser
     * const followUser = await prisma.followUser.upsert({
     *   create: {
     *     // ... data to create a FollowUser
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FollowUser we want to update
     *   }
     * })
    **/
    upsert<T extends FollowUserUpsertArgs>(
      args: SelectSubset<T, FollowUserUpsertArgs>
    ): Prisma__FollowUserClient<FollowUserGetPayload<T>>

    /**
     * Count the number of FollowUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowUserCountArgs} args - Arguments to filter FollowUsers to count.
     * @example
     * // Count the number of FollowUsers
     * const count = await prisma.followUser.count({
     *   where: {
     *     // ... the filter for the FollowUsers we want to count
     *   }
     * })
    **/
    count<T extends FollowUserCountArgs>(
      args?: Subset<T, FollowUserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FollowUserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FollowUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowUserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FollowUserAggregateArgs>(args: Subset<T, FollowUserAggregateArgs>): Prisma.PrismaPromise<GetFollowUserAggregateType<T>>

    /**
     * Group by FollowUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowUserGroupByArgs} args - Group by arguments.
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
      T extends FollowUserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FollowUserGroupByArgs['orderBy'] }
        : { orderBy?: FollowUserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, FollowUserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFollowUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for FollowUser.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__FollowUserClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    follewer<T extends UserArgs= {}>(args?: Subset<T, UserArgs>): Prisma__UserClient<UserGetPayload<T> | Null>;

    follewee<T extends UserArgs= {}>(args?: Subset<T, UserArgs>): Prisma__UserClient<UserGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * FollowUser base type for findUnique actions
   */
  export type FollowUserFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the FollowUser
     */
    select?: FollowUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FollowUserInclude | null
    /**
     * Filter, which FollowUser to fetch.
     */
    where: FollowUserWhereUniqueInput
  }

  /**
   * FollowUser findUnique
   */
  export interface FollowUserFindUniqueArgs extends FollowUserFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * FollowUser findUniqueOrThrow
   */
  export type FollowUserFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the FollowUser
     */
    select?: FollowUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FollowUserInclude | null
    /**
     * Filter, which FollowUser to fetch.
     */
    where: FollowUserWhereUniqueInput
  }


  /**
   * FollowUser base type for findFirst actions
   */
  export type FollowUserFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the FollowUser
     */
    select?: FollowUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FollowUserInclude | null
    /**
     * Filter, which FollowUser to fetch.
     */
    where?: FollowUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FollowUsers to fetch.
     */
    orderBy?: Enumerable<FollowUserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FollowUsers.
     */
    cursor?: FollowUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FollowUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FollowUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FollowUsers.
     */
    distinct?: Enumerable<FollowUserScalarFieldEnum>
  }

  /**
   * FollowUser findFirst
   */
  export interface FollowUserFindFirstArgs extends FollowUserFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * FollowUser findFirstOrThrow
   */
  export type FollowUserFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the FollowUser
     */
    select?: FollowUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FollowUserInclude | null
    /**
     * Filter, which FollowUser to fetch.
     */
    where?: FollowUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FollowUsers to fetch.
     */
    orderBy?: Enumerable<FollowUserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FollowUsers.
     */
    cursor?: FollowUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FollowUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FollowUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FollowUsers.
     */
    distinct?: Enumerable<FollowUserScalarFieldEnum>
  }


  /**
   * FollowUser findMany
   */
  export type FollowUserFindManyArgs = {
    /**
     * Select specific fields to fetch from the FollowUser
     */
    select?: FollowUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FollowUserInclude | null
    /**
     * Filter, which FollowUsers to fetch.
     */
    where?: FollowUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FollowUsers to fetch.
     */
    orderBy?: Enumerable<FollowUserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FollowUsers.
     */
    cursor?: FollowUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FollowUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FollowUsers.
     */
    skip?: number
    distinct?: Enumerable<FollowUserScalarFieldEnum>
  }


  /**
   * FollowUser create
   */
  export type FollowUserCreateArgs = {
    /**
     * Select specific fields to fetch from the FollowUser
     */
    select?: FollowUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FollowUserInclude | null
    /**
     * The data needed to create a FollowUser.
     */
    data: XOR<FollowUserCreateInput, FollowUserUncheckedCreateInput>
  }


  /**
   * FollowUser createMany
   */
  export type FollowUserCreateManyArgs = {
    /**
     * The data used to create many FollowUsers.
     */
    data: Enumerable<FollowUserCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * FollowUser update
   */
  export type FollowUserUpdateArgs = {
    /**
     * Select specific fields to fetch from the FollowUser
     */
    select?: FollowUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FollowUserInclude | null
    /**
     * The data needed to update a FollowUser.
     */
    data: XOR<FollowUserUpdateInput, FollowUserUncheckedUpdateInput>
    /**
     * Choose, which FollowUser to update.
     */
    where: FollowUserWhereUniqueInput
  }


  /**
   * FollowUser updateMany
   */
  export type FollowUserUpdateManyArgs = {
    /**
     * The data used to update FollowUsers.
     */
    data: XOR<FollowUserUpdateManyMutationInput, FollowUserUncheckedUpdateManyInput>
    /**
     * Filter which FollowUsers to update
     */
    where?: FollowUserWhereInput
  }


  /**
   * FollowUser upsert
   */
  export type FollowUserUpsertArgs = {
    /**
     * Select specific fields to fetch from the FollowUser
     */
    select?: FollowUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FollowUserInclude | null
    /**
     * The filter to search for the FollowUser to update in case it exists.
     */
    where: FollowUserWhereUniqueInput
    /**
     * In case the FollowUser found by the `where` argument doesn't exist, create a new FollowUser with this data.
     */
    create: XOR<FollowUserCreateInput, FollowUserUncheckedCreateInput>
    /**
     * In case the FollowUser was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FollowUserUpdateInput, FollowUserUncheckedUpdateInput>
  }


  /**
   * FollowUser delete
   */
  export type FollowUserDeleteArgs = {
    /**
     * Select specific fields to fetch from the FollowUser
     */
    select?: FollowUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FollowUserInclude | null
    /**
     * Filter which FollowUser to delete.
     */
    where: FollowUserWhereUniqueInput
  }


  /**
   * FollowUser deleteMany
   */
  export type FollowUserDeleteManyArgs = {
    /**
     * Filter which FollowUsers to delete
     */
    where?: FollowUserWhereInput
  }


  /**
   * FollowUser without action
   */
  export type FollowUserArgs = {
    /**
     * Select specific fields to fetch from the FollowUser
     */
    select?: FollowUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FollowUserInclude | null
  }



  /**
   * Model BlockUser
   */


  export type AggregateBlockUser = {
    _count: BlockUserCountAggregateOutputType | null
    _avg: BlockUserAvgAggregateOutputType | null
    _sum: BlockUserSumAggregateOutputType | null
    _min: BlockUserMinAggregateOutputType | null
    _max: BlockUserMaxAggregateOutputType | null
  }

  export type BlockUserAvgAggregateOutputType = {
    id: number | null
    blockerId: number | null
    blockedId: number | null
  }

  export type BlockUserSumAggregateOutputType = {
    id: number | null
    blockerId: number | null
    blockedId: number | null
  }

  export type BlockUserMinAggregateOutputType = {
    id: number | null
    blockerId: number | null
    blockedId: number | null
    createdAt: Date | null
  }

  export type BlockUserMaxAggregateOutputType = {
    id: number | null
    blockerId: number | null
    blockedId: number | null
    createdAt: Date | null
  }

  export type BlockUserCountAggregateOutputType = {
    id: number
    blockerId: number
    blockedId: number
    createdAt: number
    _all: number
  }


  export type BlockUserAvgAggregateInputType = {
    id?: true
    blockerId?: true
    blockedId?: true
  }

  export type BlockUserSumAggregateInputType = {
    id?: true
    blockerId?: true
    blockedId?: true
  }

  export type BlockUserMinAggregateInputType = {
    id?: true
    blockerId?: true
    blockedId?: true
    createdAt?: true
  }

  export type BlockUserMaxAggregateInputType = {
    id?: true
    blockerId?: true
    blockedId?: true
    createdAt?: true
  }

  export type BlockUserCountAggregateInputType = {
    id?: true
    blockerId?: true
    blockedId?: true
    createdAt?: true
    _all?: true
  }

  export type BlockUserAggregateArgs = {
    /**
     * Filter which BlockUser to aggregate.
     */
    where?: BlockUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlockUsers to fetch.
     */
    orderBy?: Enumerable<BlockUserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BlockUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlockUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlockUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BlockUsers
    **/
    _count?: true | BlockUserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BlockUserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BlockUserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BlockUserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BlockUserMaxAggregateInputType
  }

  export type GetBlockUserAggregateType<T extends BlockUserAggregateArgs> = {
        [P in keyof T & keyof AggregateBlockUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBlockUser[P]>
      : GetScalarType<T[P], AggregateBlockUser[P]>
  }




  export type BlockUserGroupByArgs = {
    where?: BlockUserWhereInput
    orderBy?: Enumerable<BlockUserOrderByWithAggregationInput>
    by: BlockUserScalarFieldEnum[]
    having?: BlockUserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BlockUserCountAggregateInputType | true
    _avg?: BlockUserAvgAggregateInputType
    _sum?: BlockUserSumAggregateInputType
    _min?: BlockUserMinAggregateInputType
    _max?: BlockUserMaxAggregateInputType
  }


  export type BlockUserGroupByOutputType = {
    id: number
    blockerId: number
    blockedId: number
    createdAt: Date
    _count: BlockUserCountAggregateOutputType | null
    _avg: BlockUserAvgAggregateOutputType | null
    _sum: BlockUserSumAggregateOutputType | null
    _min: BlockUserMinAggregateOutputType | null
    _max: BlockUserMaxAggregateOutputType | null
  }

  type GetBlockUserGroupByPayload<T extends BlockUserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<BlockUserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BlockUserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BlockUserGroupByOutputType[P]>
            : GetScalarType<T[P], BlockUserGroupByOutputType[P]>
        }
      >
    >


  export type BlockUserSelect = {
    id?: boolean
    blockerId?: boolean
    blockedId?: boolean
    createdAt?: boolean
    blocker?: boolean | UserArgs
    blocked?: boolean | UserArgs
  }


  export type BlockUserInclude = {
    blocker?: boolean | UserArgs
    blocked?: boolean | UserArgs
  }

  export type BlockUserGetPayload<S extends boolean | null | undefined | BlockUserArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? BlockUser :
    S extends undefined ? never :
    S extends { include: any } & (BlockUserArgs | BlockUserFindManyArgs)
    ? BlockUser  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'blocker' ? UserGetPayload<S['include'][P]> :
        P extends 'blocked' ? UserGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (BlockUserArgs | BlockUserFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'blocker' ? UserGetPayload<S['select'][P]> :
        P extends 'blocked' ? UserGetPayload<S['select'][P]> :  P extends keyof BlockUser ? BlockUser[P] : never
  } 
      : BlockUser


  type BlockUserCountArgs = 
    Omit<BlockUserFindManyArgs, 'select' | 'include'> & {
      select?: BlockUserCountAggregateInputType | true
    }

  export interface BlockUserDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one BlockUser that matches the filter.
     * @param {BlockUserFindUniqueArgs} args - Arguments to find a BlockUser
     * @example
     * // Get one BlockUser
     * const blockUser = await prisma.blockUser.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends BlockUserFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, BlockUserFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'BlockUser'> extends True ? Prisma__BlockUserClient<BlockUserGetPayload<T>> : Prisma__BlockUserClient<BlockUserGetPayload<T> | null, null>

    /**
     * Find one BlockUser that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {BlockUserFindUniqueOrThrowArgs} args - Arguments to find a BlockUser
     * @example
     * // Get one BlockUser
     * const blockUser = await prisma.blockUser.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends BlockUserFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, BlockUserFindUniqueOrThrowArgs>
    ): Prisma__BlockUserClient<BlockUserGetPayload<T>>

    /**
     * Find the first BlockUser that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockUserFindFirstArgs} args - Arguments to find a BlockUser
     * @example
     * // Get one BlockUser
     * const blockUser = await prisma.blockUser.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends BlockUserFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, BlockUserFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'BlockUser'> extends True ? Prisma__BlockUserClient<BlockUserGetPayload<T>> : Prisma__BlockUserClient<BlockUserGetPayload<T> | null, null>

    /**
     * Find the first BlockUser that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockUserFindFirstOrThrowArgs} args - Arguments to find a BlockUser
     * @example
     * // Get one BlockUser
     * const blockUser = await prisma.blockUser.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends BlockUserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, BlockUserFindFirstOrThrowArgs>
    ): Prisma__BlockUserClient<BlockUserGetPayload<T>>

    /**
     * Find zero or more BlockUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockUserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BlockUsers
     * const blockUsers = await prisma.blockUser.findMany()
     * 
     * // Get first 10 BlockUsers
     * const blockUsers = await prisma.blockUser.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const blockUserWithIdOnly = await prisma.blockUser.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends BlockUserFindManyArgs>(
      args?: SelectSubset<T, BlockUserFindManyArgs>
    ): Prisma.PrismaPromise<Array<BlockUserGetPayload<T>>>

    /**
     * Create a BlockUser.
     * @param {BlockUserCreateArgs} args - Arguments to create a BlockUser.
     * @example
     * // Create one BlockUser
     * const BlockUser = await prisma.blockUser.create({
     *   data: {
     *     // ... data to create a BlockUser
     *   }
     * })
     * 
    **/
    create<T extends BlockUserCreateArgs>(
      args: SelectSubset<T, BlockUserCreateArgs>
    ): Prisma__BlockUserClient<BlockUserGetPayload<T>>

    /**
     * Create many BlockUsers.
     *     @param {BlockUserCreateManyArgs} args - Arguments to create many BlockUsers.
     *     @example
     *     // Create many BlockUsers
     *     const blockUser = await prisma.blockUser.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends BlockUserCreateManyArgs>(
      args?: SelectSubset<T, BlockUserCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a BlockUser.
     * @param {BlockUserDeleteArgs} args - Arguments to delete one BlockUser.
     * @example
     * // Delete one BlockUser
     * const BlockUser = await prisma.blockUser.delete({
     *   where: {
     *     // ... filter to delete one BlockUser
     *   }
     * })
     * 
    **/
    delete<T extends BlockUserDeleteArgs>(
      args: SelectSubset<T, BlockUserDeleteArgs>
    ): Prisma__BlockUserClient<BlockUserGetPayload<T>>

    /**
     * Update one BlockUser.
     * @param {BlockUserUpdateArgs} args - Arguments to update one BlockUser.
     * @example
     * // Update one BlockUser
     * const blockUser = await prisma.blockUser.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends BlockUserUpdateArgs>(
      args: SelectSubset<T, BlockUserUpdateArgs>
    ): Prisma__BlockUserClient<BlockUserGetPayload<T>>

    /**
     * Delete zero or more BlockUsers.
     * @param {BlockUserDeleteManyArgs} args - Arguments to filter BlockUsers to delete.
     * @example
     * // Delete a few BlockUsers
     * const { count } = await prisma.blockUser.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends BlockUserDeleteManyArgs>(
      args?: SelectSubset<T, BlockUserDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BlockUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockUserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BlockUsers
     * const blockUser = await prisma.blockUser.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends BlockUserUpdateManyArgs>(
      args: SelectSubset<T, BlockUserUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one BlockUser.
     * @param {BlockUserUpsertArgs} args - Arguments to update or create a BlockUser.
     * @example
     * // Update or create a BlockUser
     * const blockUser = await prisma.blockUser.upsert({
     *   create: {
     *     // ... data to create a BlockUser
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BlockUser we want to update
     *   }
     * })
    **/
    upsert<T extends BlockUserUpsertArgs>(
      args: SelectSubset<T, BlockUserUpsertArgs>
    ): Prisma__BlockUserClient<BlockUserGetPayload<T>>

    /**
     * Count the number of BlockUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockUserCountArgs} args - Arguments to filter BlockUsers to count.
     * @example
     * // Count the number of BlockUsers
     * const count = await prisma.blockUser.count({
     *   where: {
     *     // ... the filter for the BlockUsers we want to count
     *   }
     * })
    **/
    count<T extends BlockUserCountArgs>(
      args?: Subset<T, BlockUserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BlockUserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BlockUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockUserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BlockUserAggregateArgs>(args: Subset<T, BlockUserAggregateArgs>): Prisma.PrismaPromise<GetBlockUserAggregateType<T>>

    /**
     * Group by BlockUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockUserGroupByArgs} args - Group by arguments.
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
      T extends BlockUserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BlockUserGroupByArgs['orderBy'] }
        : { orderBy?: BlockUserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, BlockUserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBlockUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for BlockUser.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__BlockUserClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    blocker<T extends UserArgs= {}>(args?: Subset<T, UserArgs>): Prisma__UserClient<UserGetPayload<T> | Null>;

    blocked<T extends UserArgs= {}>(args?: Subset<T, UserArgs>): Prisma__UserClient<UserGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * BlockUser base type for findUnique actions
   */
  export type BlockUserFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the BlockUser
     */
    select?: BlockUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: BlockUserInclude | null
    /**
     * Filter, which BlockUser to fetch.
     */
    where: BlockUserWhereUniqueInput
  }

  /**
   * BlockUser findUnique
   */
  export interface BlockUserFindUniqueArgs extends BlockUserFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * BlockUser findUniqueOrThrow
   */
  export type BlockUserFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the BlockUser
     */
    select?: BlockUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: BlockUserInclude | null
    /**
     * Filter, which BlockUser to fetch.
     */
    where: BlockUserWhereUniqueInput
  }


  /**
   * BlockUser base type for findFirst actions
   */
  export type BlockUserFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the BlockUser
     */
    select?: BlockUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: BlockUserInclude | null
    /**
     * Filter, which BlockUser to fetch.
     */
    where?: BlockUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlockUsers to fetch.
     */
    orderBy?: Enumerable<BlockUserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BlockUsers.
     */
    cursor?: BlockUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlockUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlockUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BlockUsers.
     */
    distinct?: Enumerable<BlockUserScalarFieldEnum>
  }

  /**
   * BlockUser findFirst
   */
  export interface BlockUserFindFirstArgs extends BlockUserFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * BlockUser findFirstOrThrow
   */
  export type BlockUserFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the BlockUser
     */
    select?: BlockUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: BlockUserInclude | null
    /**
     * Filter, which BlockUser to fetch.
     */
    where?: BlockUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlockUsers to fetch.
     */
    orderBy?: Enumerable<BlockUserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BlockUsers.
     */
    cursor?: BlockUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlockUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlockUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BlockUsers.
     */
    distinct?: Enumerable<BlockUserScalarFieldEnum>
  }


  /**
   * BlockUser findMany
   */
  export type BlockUserFindManyArgs = {
    /**
     * Select specific fields to fetch from the BlockUser
     */
    select?: BlockUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: BlockUserInclude | null
    /**
     * Filter, which BlockUsers to fetch.
     */
    where?: BlockUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlockUsers to fetch.
     */
    orderBy?: Enumerable<BlockUserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BlockUsers.
     */
    cursor?: BlockUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlockUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlockUsers.
     */
    skip?: number
    distinct?: Enumerable<BlockUserScalarFieldEnum>
  }


  /**
   * BlockUser create
   */
  export type BlockUserCreateArgs = {
    /**
     * Select specific fields to fetch from the BlockUser
     */
    select?: BlockUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: BlockUserInclude | null
    /**
     * The data needed to create a BlockUser.
     */
    data: XOR<BlockUserCreateInput, BlockUserUncheckedCreateInput>
  }


  /**
   * BlockUser createMany
   */
  export type BlockUserCreateManyArgs = {
    /**
     * The data used to create many BlockUsers.
     */
    data: Enumerable<BlockUserCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * BlockUser update
   */
  export type BlockUserUpdateArgs = {
    /**
     * Select specific fields to fetch from the BlockUser
     */
    select?: BlockUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: BlockUserInclude | null
    /**
     * The data needed to update a BlockUser.
     */
    data: XOR<BlockUserUpdateInput, BlockUserUncheckedUpdateInput>
    /**
     * Choose, which BlockUser to update.
     */
    where: BlockUserWhereUniqueInput
  }


  /**
   * BlockUser updateMany
   */
  export type BlockUserUpdateManyArgs = {
    /**
     * The data used to update BlockUsers.
     */
    data: XOR<BlockUserUpdateManyMutationInput, BlockUserUncheckedUpdateManyInput>
    /**
     * Filter which BlockUsers to update
     */
    where?: BlockUserWhereInput
  }


  /**
   * BlockUser upsert
   */
  export type BlockUserUpsertArgs = {
    /**
     * Select specific fields to fetch from the BlockUser
     */
    select?: BlockUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: BlockUserInclude | null
    /**
     * The filter to search for the BlockUser to update in case it exists.
     */
    where: BlockUserWhereUniqueInput
    /**
     * In case the BlockUser found by the `where` argument doesn't exist, create a new BlockUser with this data.
     */
    create: XOR<BlockUserCreateInput, BlockUserUncheckedCreateInput>
    /**
     * In case the BlockUser was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BlockUserUpdateInput, BlockUserUncheckedUpdateInput>
  }


  /**
   * BlockUser delete
   */
  export type BlockUserDeleteArgs = {
    /**
     * Select specific fields to fetch from the BlockUser
     */
    select?: BlockUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: BlockUserInclude | null
    /**
     * Filter which BlockUser to delete.
     */
    where: BlockUserWhereUniqueInput
  }


  /**
   * BlockUser deleteMany
   */
  export type BlockUserDeleteManyArgs = {
    /**
     * Filter which BlockUsers to delete
     */
    where?: BlockUserWhereInput
  }


  /**
   * BlockUser without action
   */
  export type BlockUserArgs = {
    /**
     * Select specific fields to fetch from the BlockUser
     */
    select?: BlockUserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: BlockUserInclude | null
  }



  /**
   * Model Channel
   */


  export type AggregateChannel = {
    _count: ChannelCountAggregateOutputType | null
    _avg: ChannelAvgAggregateOutputType | null
    _sum: ChannelSumAggregateOutputType | null
    _min: ChannelMinAggregateOutputType | null
    _max: ChannelMaxAggregateOutputType | null
  }

  export type ChannelAvgAggregateOutputType = {
    id: number | null
  }

  export type ChannelSumAggregateOutputType = {
    id: number | null
  }

  export type ChannelMinAggregateOutputType = {
    id: number | null
    title: string | null
    channelCode: string | null
    password: string | null
    idPublic: boolean | null
    isDm: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type ChannelMaxAggregateOutputType = {
    id: number | null
    title: string | null
    channelCode: string | null
    password: string | null
    idPublic: boolean | null
    isDm: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type ChannelCountAggregateOutputType = {
    id: number
    title: number
    channelCode: number
    password: number
    idPublic: number
    isDm: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type ChannelAvgAggregateInputType = {
    id?: true
  }

  export type ChannelSumAggregateInputType = {
    id?: true
  }

  export type ChannelMinAggregateInputType = {
    id?: true
    title?: true
    channelCode?: true
    password?: true
    idPublic?: true
    isDm?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type ChannelMaxAggregateInputType = {
    id?: true
    title?: true
    channelCode?: true
    password?: true
    idPublic?: true
    isDm?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type ChannelCountAggregateInputType = {
    id?: true
    title?: true
    channelCode?: true
    password?: true
    idPublic?: true
    isDm?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type ChannelAggregateArgs = {
    /**
     * Filter which Channel to aggregate.
     */
    where?: ChannelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Channels to fetch.
     */
    orderBy?: Enumerable<ChannelOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChannelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Channels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Channels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Channels
    **/
    _count?: true | ChannelCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ChannelAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ChannelSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChannelMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChannelMaxAggregateInputType
  }

  export type GetChannelAggregateType<T extends ChannelAggregateArgs> = {
        [P in keyof T & keyof AggregateChannel]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChannel[P]>
      : GetScalarType<T[P], AggregateChannel[P]>
  }




  export type ChannelGroupByArgs = {
    where?: ChannelWhereInput
    orderBy?: Enumerable<ChannelOrderByWithAggregationInput>
    by: ChannelScalarFieldEnum[]
    having?: ChannelScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChannelCountAggregateInputType | true
    _avg?: ChannelAvgAggregateInputType
    _sum?: ChannelSumAggregateInputType
    _min?: ChannelMinAggregateInputType
    _max?: ChannelMaxAggregateInputType
  }


  export type ChannelGroupByOutputType = {
    id: number
    title: string
    channelCode: string
    password: string | null
    idPublic: boolean
    isDm: boolean
    createdAt: Date
    updatedAt: Date | null
    deletedAt: Date | null
    _count: ChannelCountAggregateOutputType | null
    _avg: ChannelAvgAggregateOutputType | null
    _sum: ChannelSumAggregateOutputType | null
    _min: ChannelMinAggregateOutputType | null
    _max: ChannelMaxAggregateOutputType | null
  }

  type GetChannelGroupByPayload<T extends ChannelGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<ChannelGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChannelGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChannelGroupByOutputType[P]>
            : GetScalarType<T[P], ChannelGroupByOutputType[P]>
        }
      >
    >


  export type ChannelSelect = {
    id?: boolean
    title?: boolean
    channelCode?: boolean
    password?: boolean
    idPublic?: boolean
    isDm?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    users?: boolean | Channel$usersArgs
    messages?: boolean | Channel$messagesArgs
    _count?: boolean | ChannelCountOutputTypeArgs
  }


  export type ChannelInclude = {
    users?: boolean | Channel$usersArgs
    messages?: boolean | Channel$messagesArgs
    _count?: boolean | ChannelCountOutputTypeArgs
  }

  export type ChannelGetPayload<S extends boolean | null | undefined | ChannelArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Channel :
    S extends undefined ? never :
    S extends { include: any } & (ChannelArgs | ChannelFindManyArgs)
    ? Channel  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'users' ? Array < Channel_UserGetPayload<S['include'][P]>>  :
        P extends 'messages' ? Array < MessageGetPayload<S['include'][P]>>  :
        P extends '_count' ? ChannelCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (ChannelArgs | ChannelFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'users' ? Array < Channel_UserGetPayload<S['select'][P]>>  :
        P extends 'messages' ? Array < MessageGetPayload<S['select'][P]>>  :
        P extends '_count' ? ChannelCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Channel ? Channel[P] : never
  } 
      : Channel


  type ChannelCountArgs = 
    Omit<ChannelFindManyArgs, 'select' | 'include'> & {
      select?: ChannelCountAggregateInputType | true
    }

  export interface ChannelDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one Channel that matches the filter.
     * @param {ChannelFindUniqueArgs} args - Arguments to find a Channel
     * @example
     * // Get one Channel
     * const channel = await prisma.channel.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ChannelFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ChannelFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Channel'> extends True ? Prisma__ChannelClient<ChannelGetPayload<T>> : Prisma__ChannelClient<ChannelGetPayload<T> | null, null>

    /**
     * Find one Channel that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ChannelFindUniqueOrThrowArgs} args - Arguments to find a Channel
     * @example
     * // Get one Channel
     * const channel = await prisma.channel.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ChannelFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ChannelFindUniqueOrThrowArgs>
    ): Prisma__ChannelClient<ChannelGetPayload<T>>

    /**
     * Find the first Channel that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelFindFirstArgs} args - Arguments to find a Channel
     * @example
     * // Get one Channel
     * const channel = await prisma.channel.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ChannelFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ChannelFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Channel'> extends True ? Prisma__ChannelClient<ChannelGetPayload<T>> : Prisma__ChannelClient<ChannelGetPayload<T> | null, null>

    /**
     * Find the first Channel that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelFindFirstOrThrowArgs} args - Arguments to find a Channel
     * @example
     * // Get one Channel
     * const channel = await prisma.channel.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ChannelFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ChannelFindFirstOrThrowArgs>
    ): Prisma__ChannelClient<ChannelGetPayload<T>>

    /**
     * Find zero or more Channels that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Channels
     * const channels = await prisma.channel.findMany()
     * 
     * // Get first 10 Channels
     * const channels = await prisma.channel.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const channelWithIdOnly = await prisma.channel.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ChannelFindManyArgs>(
      args?: SelectSubset<T, ChannelFindManyArgs>
    ): Prisma.PrismaPromise<Array<ChannelGetPayload<T>>>

    /**
     * Create a Channel.
     * @param {ChannelCreateArgs} args - Arguments to create a Channel.
     * @example
     * // Create one Channel
     * const Channel = await prisma.channel.create({
     *   data: {
     *     // ... data to create a Channel
     *   }
     * })
     * 
    **/
    create<T extends ChannelCreateArgs>(
      args: SelectSubset<T, ChannelCreateArgs>
    ): Prisma__ChannelClient<ChannelGetPayload<T>>

    /**
     * Create many Channels.
     *     @param {ChannelCreateManyArgs} args - Arguments to create many Channels.
     *     @example
     *     // Create many Channels
     *     const channel = await prisma.channel.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ChannelCreateManyArgs>(
      args?: SelectSubset<T, ChannelCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Channel.
     * @param {ChannelDeleteArgs} args - Arguments to delete one Channel.
     * @example
     * // Delete one Channel
     * const Channel = await prisma.channel.delete({
     *   where: {
     *     // ... filter to delete one Channel
     *   }
     * })
     * 
    **/
    delete<T extends ChannelDeleteArgs>(
      args: SelectSubset<T, ChannelDeleteArgs>
    ): Prisma__ChannelClient<ChannelGetPayload<T>>

    /**
     * Update one Channel.
     * @param {ChannelUpdateArgs} args - Arguments to update one Channel.
     * @example
     * // Update one Channel
     * const channel = await prisma.channel.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ChannelUpdateArgs>(
      args: SelectSubset<T, ChannelUpdateArgs>
    ): Prisma__ChannelClient<ChannelGetPayload<T>>

    /**
     * Delete zero or more Channels.
     * @param {ChannelDeleteManyArgs} args - Arguments to filter Channels to delete.
     * @example
     * // Delete a few Channels
     * const { count } = await prisma.channel.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ChannelDeleteManyArgs>(
      args?: SelectSubset<T, ChannelDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Channels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Channels
     * const channel = await prisma.channel.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ChannelUpdateManyArgs>(
      args: SelectSubset<T, ChannelUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Channel.
     * @param {ChannelUpsertArgs} args - Arguments to update or create a Channel.
     * @example
     * // Update or create a Channel
     * const channel = await prisma.channel.upsert({
     *   create: {
     *     // ... data to create a Channel
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Channel we want to update
     *   }
     * })
    **/
    upsert<T extends ChannelUpsertArgs>(
      args: SelectSubset<T, ChannelUpsertArgs>
    ): Prisma__ChannelClient<ChannelGetPayload<T>>

    /**
     * Count the number of Channels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelCountArgs} args - Arguments to filter Channels to count.
     * @example
     * // Count the number of Channels
     * const count = await prisma.channel.count({
     *   where: {
     *     // ... the filter for the Channels we want to count
     *   }
     * })
    **/
    count<T extends ChannelCountArgs>(
      args?: Subset<T, ChannelCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChannelCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Channel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ChannelAggregateArgs>(args: Subset<T, ChannelAggregateArgs>): Prisma.PrismaPromise<GetChannelAggregateType<T>>

    /**
     * Group by Channel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelGroupByArgs} args - Group by arguments.
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
      T extends ChannelGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChannelGroupByArgs['orderBy'] }
        : { orderBy?: ChannelGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, ChannelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChannelGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Channel.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ChannelClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    users<T extends Channel$usersArgs= {}>(args?: Subset<T, Channel$usersArgs>): Prisma.PrismaPromise<Array<Channel_UserGetPayload<T>>| Null>;

    messages<T extends Channel$messagesArgs= {}>(args?: Subset<T, Channel$messagesArgs>): Prisma.PrismaPromise<Array<MessageGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Channel base type for findUnique actions
   */
  export type ChannelFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChannelInclude | null
    /**
     * Filter, which Channel to fetch.
     */
    where: ChannelWhereUniqueInput
  }

  /**
   * Channel findUnique
   */
  export interface ChannelFindUniqueArgs extends ChannelFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Channel findUniqueOrThrow
   */
  export type ChannelFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChannelInclude | null
    /**
     * Filter, which Channel to fetch.
     */
    where: ChannelWhereUniqueInput
  }


  /**
   * Channel base type for findFirst actions
   */
  export type ChannelFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChannelInclude | null
    /**
     * Filter, which Channel to fetch.
     */
    where?: ChannelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Channels to fetch.
     */
    orderBy?: Enumerable<ChannelOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Channels.
     */
    cursor?: ChannelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Channels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Channels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Channels.
     */
    distinct?: Enumerable<ChannelScalarFieldEnum>
  }

  /**
   * Channel findFirst
   */
  export interface ChannelFindFirstArgs extends ChannelFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Channel findFirstOrThrow
   */
  export type ChannelFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChannelInclude | null
    /**
     * Filter, which Channel to fetch.
     */
    where?: ChannelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Channels to fetch.
     */
    orderBy?: Enumerable<ChannelOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Channels.
     */
    cursor?: ChannelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Channels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Channels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Channels.
     */
    distinct?: Enumerable<ChannelScalarFieldEnum>
  }


  /**
   * Channel findMany
   */
  export type ChannelFindManyArgs = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChannelInclude | null
    /**
     * Filter, which Channels to fetch.
     */
    where?: ChannelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Channels to fetch.
     */
    orderBy?: Enumerable<ChannelOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Channels.
     */
    cursor?: ChannelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Channels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Channels.
     */
    skip?: number
    distinct?: Enumerable<ChannelScalarFieldEnum>
  }


  /**
   * Channel create
   */
  export type ChannelCreateArgs = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChannelInclude | null
    /**
     * The data needed to create a Channel.
     */
    data: XOR<ChannelCreateInput, ChannelUncheckedCreateInput>
  }


  /**
   * Channel createMany
   */
  export type ChannelCreateManyArgs = {
    /**
     * The data used to create many Channels.
     */
    data: Enumerable<ChannelCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Channel update
   */
  export type ChannelUpdateArgs = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChannelInclude | null
    /**
     * The data needed to update a Channel.
     */
    data: XOR<ChannelUpdateInput, ChannelUncheckedUpdateInput>
    /**
     * Choose, which Channel to update.
     */
    where: ChannelWhereUniqueInput
  }


  /**
   * Channel updateMany
   */
  export type ChannelUpdateManyArgs = {
    /**
     * The data used to update Channels.
     */
    data: XOR<ChannelUpdateManyMutationInput, ChannelUncheckedUpdateManyInput>
    /**
     * Filter which Channels to update
     */
    where?: ChannelWhereInput
  }


  /**
   * Channel upsert
   */
  export type ChannelUpsertArgs = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChannelInclude | null
    /**
     * The filter to search for the Channel to update in case it exists.
     */
    where: ChannelWhereUniqueInput
    /**
     * In case the Channel found by the `where` argument doesn't exist, create a new Channel with this data.
     */
    create: XOR<ChannelCreateInput, ChannelUncheckedCreateInput>
    /**
     * In case the Channel was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChannelUpdateInput, ChannelUncheckedUpdateInput>
  }


  /**
   * Channel delete
   */
  export type ChannelDeleteArgs = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChannelInclude | null
    /**
     * Filter which Channel to delete.
     */
    where: ChannelWhereUniqueInput
  }


  /**
   * Channel deleteMany
   */
  export type ChannelDeleteManyArgs = {
    /**
     * Filter which Channels to delete
     */
    where?: ChannelWhereInput
  }


  /**
   * Channel.users
   */
  export type Channel$usersArgs = {
    /**
     * Select specific fields to fetch from the Channel_User
     */
    select?: Channel_UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Channel_UserInclude | null
    where?: Channel_UserWhereInput
    orderBy?: Enumerable<Channel_UserOrderByWithRelationInput>
    cursor?: Channel_UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<Channel_UserScalarFieldEnum>
  }


  /**
   * Channel.messages
   */
  export type Channel$messagesArgs = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MessageInclude | null
    where?: MessageWhereInput
    orderBy?: Enumerable<MessageOrderByWithRelationInput>
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<MessageScalarFieldEnum>
  }


  /**
   * Channel without action
   */
  export type ChannelArgs = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChannelInclude | null
  }



  /**
   * Model Channel_User
   */


  export type AggregateChannel_User = {
    _count: Channel_UserCountAggregateOutputType | null
    _avg: Channel_UserAvgAggregateOutputType | null
    _sum: Channel_UserSumAggregateOutputType | null
    _min: Channel_UserMinAggregateOutputType | null
    _max: Channel_UserMaxAggregateOutputType | null
  }

  export type Channel_UserAvgAggregateOutputType = {
    id: number | null
    channelId: number | null
    userId: number | null
    userType: number | null
    status: number | null
  }

  export type Channel_UserSumAggregateOutputType = {
    id: number | null
    channelId: number | null
    userId: number | null
    userType: number | null
    status: number | null
  }

  export type Channel_UserMinAggregateOutputType = {
    id: number | null
    channelId: number | null
    userId: number | null
    userType: number | null
    status: number | null
    createdAt: Date | null
  }

  export type Channel_UserMaxAggregateOutputType = {
    id: number | null
    channelId: number | null
    userId: number | null
    userType: number | null
    status: number | null
    createdAt: Date | null
  }

  export type Channel_UserCountAggregateOutputType = {
    id: number
    channelId: number
    userId: number
    userType: number
    status: number
    createdAt: number
    _all: number
  }


  export type Channel_UserAvgAggregateInputType = {
    id?: true
    channelId?: true
    userId?: true
    userType?: true
    status?: true
  }

  export type Channel_UserSumAggregateInputType = {
    id?: true
    channelId?: true
    userId?: true
    userType?: true
    status?: true
  }

  export type Channel_UserMinAggregateInputType = {
    id?: true
    channelId?: true
    userId?: true
    userType?: true
    status?: true
    createdAt?: true
  }

  export type Channel_UserMaxAggregateInputType = {
    id?: true
    channelId?: true
    userId?: true
    userType?: true
    status?: true
    createdAt?: true
  }

  export type Channel_UserCountAggregateInputType = {
    id?: true
    channelId?: true
    userId?: true
    userType?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type Channel_UserAggregateArgs = {
    /**
     * Filter which Channel_User to aggregate.
     */
    where?: Channel_UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Channel_Users to fetch.
     */
    orderBy?: Enumerable<Channel_UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: Channel_UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Channel_Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Channel_Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Channel_Users
    **/
    _count?: true | Channel_UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Channel_UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Channel_UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Channel_UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Channel_UserMaxAggregateInputType
  }

  export type GetChannel_UserAggregateType<T extends Channel_UserAggregateArgs> = {
        [P in keyof T & keyof AggregateChannel_User]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChannel_User[P]>
      : GetScalarType<T[P], AggregateChannel_User[P]>
  }




  export type Channel_UserGroupByArgs = {
    where?: Channel_UserWhereInput
    orderBy?: Enumerable<Channel_UserOrderByWithAggregationInput>
    by: Channel_UserScalarFieldEnum[]
    having?: Channel_UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Channel_UserCountAggregateInputType | true
    _avg?: Channel_UserAvgAggregateInputType
    _sum?: Channel_UserSumAggregateInputType
    _min?: Channel_UserMinAggregateInputType
    _max?: Channel_UserMaxAggregateInputType
  }


  export type Channel_UserGroupByOutputType = {
    id: number
    channelId: number
    userId: number
    userType: number
    status: number
    createdAt: Date
    _count: Channel_UserCountAggregateOutputType | null
    _avg: Channel_UserAvgAggregateOutputType | null
    _sum: Channel_UserSumAggregateOutputType | null
    _min: Channel_UserMinAggregateOutputType | null
    _max: Channel_UserMaxAggregateOutputType | null
  }

  type GetChannel_UserGroupByPayload<T extends Channel_UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<Channel_UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Channel_UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Channel_UserGroupByOutputType[P]>
            : GetScalarType<T[P], Channel_UserGroupByOutputType[P]>
        }
      >
    >


  export type Channel_UserSelect = {
    id?: boolean
    channelId?: boolean
    userId?: boolean
    userType?: boolean
    status?: boolean
    createdAt?: boolean
    channel?: boolean | ChannelArgs
    user?: boolean | UserArgs
  }


  export type Channel_UserInclude = {
    channel?: boolean | ChannelArgs
    user?: boolean | UserArgs
  }

  export type Channel_UserGetPayload<S extends boolean | null | undefined | Channel_UserArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Channel_User :
    S extends undefined ? never :
    S extends { include: any } & (Channel_UserArgs | Channel_UserFindManyArgs)
    ? Channel_User  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'channel' ? ChannelGetPayload<S['include'][P]> :
        P extends 'user' ? UserGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (Channel_UserArgs | Channel_UserFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'channel' ? ChannelGetPayload<S['select'][P]> :
        P extends 'user' ? UserGetPayload<S['select'][P]> :  P extends keyof Channel_User ? Channel_User[P] : never
  } 
      : Channel_User


  type Channel_UserCountArgs = 
    Omit<Channel_UserFindManyArgs, 'select' | 'include'> & {
      select?: Channel_UserCountAggregateInputType | true
    }

  export interface Channel_UserDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one Channel_User that matches the filter.
     * @param {Channel_UserFindUniqueArgs} args - Arguments to find a Channel_User
     * @example
     * // Get one Channel_User
     * const channel_User = await prisma.channel_User.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends Channel_UserFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, Channel_UserFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Channel_User'> extends True ? Prisma__Channel_UserClient<Channel_UserGetPayload<T>> : Prisma__Channel_UserClient<Channel_UserGetPayload<T> | null, null>

    /**
     * Find one Channel_User that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {Channel_UserFindUniqueOrThrowArgs} args - Arguments to find a Channel_User
     * @example
     * // Get one Channel_User
     * const channel_User = await prisma.channel_User.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends Channel_UserFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, Channel_UserFindUniqueOrThrowArgs>
    ): Prisma__Channel_UserClient<Channel_UserGetPayload<T>>

    /**
     * Find the first Channel_User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Channel_UserFindFirstArgs} args - Arguments to find a Channel_User
     * @example
     * // Get one Channel_User
     * const channel_User = await prisma.channel_User.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends Channel_UserFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, Channel_UserFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Channel_User'> extends True ? Prisma__Channel_UserClient<Channel_UserGetPayload<T>> : Prisma__Channel_UserClient<Channel_UserGetPayload<T> | null, null>

    /**
     * Find the first Channel_User that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Channel_UserFindFirstOrThrowArgs} args - Arguments to find a Channel_User
     * @example
     * // Get one Channel_User
     * const channel_User = await prisma.channel_User.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends Channel_UserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, Channel_UserFindFirstOrThrowArgs>
    ): Prisma__Channel_UserClient<Channel_UserGetPayload<T>>

    /**
     * Find zero or more Channel_Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Channel_UserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Channel_Users
     * const channel_Users = await prisma.channel_User.findMany()
     * 
     * // Get first 10 Channel_Users
     * const channel_Users = await prisma.channel_User.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const channel_UserWithIdOnly = await prisma.channel_User.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends Channel_UserFindManyArgs>(
      args?: SelectSubset<T, Channel_UserFindManyArgs>
    ): Prisma.PrismaPromise<Array<Channel_UserGetPayload<T>>>

    /**
     * Create a Channel_User.
     * @param {Channel_UserCreateArgs} args - Arguments to create a Channel_User.
     * @example
     * // Create one Channel_User
     * const Channel_User = await prisma.channel_User.create({
     *   data: {
     *     // ... data to create a Channel_User
     *   }
     * })
     * 
    **/
    create<T extends Channel_UserCreateArgs>(
      args: SelectSubset<T, Channel_UserCreateArgs>
    ): Prisma__Channel_UserClient<Channel_UserGetPayload<T>>

    /**
     * Create many Channel_Users.
     *     @param {Channel_UserCreateManyArgs} args - Arguments to create many Channel_Users.
     *     @example
     *     // Create many Channel_Users
     *     const channel_User = await prisma.channel_User.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends Channel_UserCreateManyArgs>(
      args?: SelectSubset<T, Channel_UserCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Channel_User.
     * @param {Channel_UserDeleteArgs} args - Arguments to delete one Channel_User.
     * @example
     * // Delete one Channel_User
     * const Channel_User = await prisma.channel_User.delete({
     *   where: {
     *     // ... filter to delete one Channel_User
     *   }
     * })
     * 
    **/
    delete<T extends Channel_UserDeleteArgs>(
      args: SelectSubset<T, Channel_UserDeleteArgs>
    ): Prisma__Channel_UserClient<Channel_UserGetPayload<T>>

    /**
     * Update one Channel_User.
     * @param {Channel_UserUpdateArgs} args - Arguments to update one Channel_User.
     * @example
     * // Update one Channel_User
     * const channel_User = await prisma.channel_User.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends Channel_UserUpdateArgs>(
      args: SelectSubset<T, Channel_UserUpdateArgs>
    ): Prisma__Channel_UserClient<Channel_UserGetPayload<T>>

    /**
     * Delete zero or more Channel_Users.
     * @param {Channel_UserDeleteManyArgs} args - Arguments to filter Channel_Users to delete.
     * @example
     * // Delete a few Channel_Users
     * const { count } = await prisma.channel_User.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends Channel_UserDeleteManyArgs>(
      args?: SelectSubset<T, Channel_UserDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Channel_Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Channel_UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Channel_Users
     * const channel_User = await prisma.channel_User.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends Channel_UserUpdateManyArgs>(
      args: SelectSubset<T, Channel_UserUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Channel_User.
     * @param {Channel_UserUpsertArgs} args - Arguments to update or create a Channel_User.
     * @example
     * // Update or create a Channel_User
     * const channel_User = await prisma.channel_User.upsert({
     *   create: {
     *     // ... data to create a Channel_User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Channel_User we want to update
     *   }
     * })
    **/
    upsert<T extends Channel_UserUpsertArgs>(
      args: SelectSubset<T, Channel_UserUpsertArgs>
    ): Prisma__Channel_UserClient<Channel_UserGetPayload<T>>

    /**
     * Count the number of Channel_Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Channel_UserCountArgs} args - Arguments to filter Channel_Users to count.
     * @example
     * // Count the number of Channel_Users
     * const count = await prisma.channel_User.count({
     *   where: {
     *     // ... the filter for the Channel_Users we want to count
     *   }
     * })
    **/
    count<T extends Channel_UserCountArgs>(
      args?: Subset<T, Channel_UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Channel_UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Channel_User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Channel_UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Channel_UserAggregateArgs>(args: Subset<T, Channel_UserAggregateArgs>): Prisma.PrismaPromise<GetChannel_UserAggregateType<T>>

    /**
     * Group by Channel_User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Channel_UserGroupByArgs} args - Group by arguments.
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
      T extends Channel_UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Channel_UserGroupByArgs['orderBy'] }
        : { orderBy?: Channel_UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, Channel_UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChannel_UserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Channel_User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__Channel_UserClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    channel<T extends ChannelArgs= {}>(args?: Subset<T, ChannelArgs>): Prisma__ChannelClient<ChannelGetPayload<T> | Null>;

    user<T extends UserArgs= {}>(args?: Subset<T, UserArgs>): Prisma__UserClient<UserGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Channel_User base type for findUnique actions
   */
  export type Channel_UserFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Channel_User
     */
    select?: Channel_UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Channel_UserInclude | null
    /**
     * Filter, which Channel_User to fetch.
     */
    where: Channel_UserWhereUniqueInput
  }

  /**
   * Channel_User findUnique
   */
  export interface Channel_UserFindUniqueArgs extends Channel_UserFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Channel_User findUniqueOrThrow
   */
  export type Channel_UserFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Channel_User
     */
    select?: Channel_UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Channel_UserInclude | null
    /**
     * Filter, which Channel_User to fetch.
     */
    where: Channel_UserWhereUniqueInput
  }


  /**
   * Channel_User base type for findFirst actions
   */
  export type Channel_UserFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Channel_User
     */
    select?: Channel_UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Channel_UserInclude | null
    /**
     * Filter, which Channel_User to fetch.
     */
    where?: Channel_UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Channel_Users to fetch.
     */
    orderBy?: Enumerable<Channel_UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Channel_Users.
     */
    cursor?: Channel_UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Channel_Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Channel_Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Channel_Users.
     */
    distinct?: Enumerable<Channel_UserScalarFieldEnum>
  }

  /**
   * Channel_User findFirst
   */
  export interface Channel_UserFindFirstArgs extends Channel_UserFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Channel_User findFirstOrThrow
   */
  export type Channel_UserFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Channel_User
     */
    select?: Channel_UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Channel_UserInclude | null
    /**
     * Filter, which Channel_User to fetch.
     */
    where?: Channel_UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Channel_Users to fetch.
     */
    orderBy?: Enumerable<Channel_UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Channel_Users.
     */
    cursor?: Channel_UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Channel_Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Channel_Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Channel_Users.
     */
    distinct?: Enumerable<Channel_UserScalarFieldEnum>
  }


  /**
   * Channel_User findMany
   */
  export type Channel_UserFindManyArgs = {
    /**
     * Select specific fields to fetch from the Channel_User
     */
    select?: Channel_UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Channel_UserInclude | null
    /**
     * Filter, which Channel_Users to fetch.
     */
    where?: Channel_UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Channel_Users to fetch.
     */
    orderBy?: Enumerable<Channel_UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Channel_Users.
     */
    cursor?: Channel_UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Channel_Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Channel_Users.
     */
    skip?: number
    distinct?: Enumerable<Channel_UserScalarFieldEnum>
  }


  /**
   * Channel_User create
   */
  export type Channel_UserCreateArgs = {
    /**
     * Select specific fields to fetch from the Channel_User
     */
    select?: Channel_UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Channel_UserInclude | null
    /**
     * The data needed to create a Channel_User.
     */
    data: XOR<Channel_UserCreateInput, Channel_UserUncheckedCreateInput>
  }


  /**
   * Channel_User createMany
   */
  export type Channel_UserCreateManyArgs = {
    /**
     * The data used to create many Channel_Users.
     */
    data: Enumerable<Channel_UserCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Channel_User update
   */
  export type Channel_UserUpdateArgs = {
    /**
     * Select specific fields to fetch from the Channel_User
     */
    select?: Channel_UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Channel_UserInclude | null
    /**
     * The data needed to update a Channel_User.
     */
    data: XOR<Channel_UserUpdateInput, Channel_UserUncheckedUpdateInput>
    /**
     * Choose, which Channel_User to update.
     */
    where: Channel_UserWhereUniqueInput
  }


  /**
   * Channel_User updateMany
   */
  export type Channel_UserUpdateManyArgs = {
    /**
     * The data used to update Channel_Users.
     */
    data: XOR<Channel_UserUpdateManyMutationInput, Channel_UserUncheckedUpdateManyInput>
    /**
     * Filter which Channel_Users to update
     */
    where?: Channel_UserWhereInput
  }


  /**
   * Channel_User upsert
   */
  export type Channel_UserUpsertArgs = {
    /**
     * Select specific fields to fetch from the Channel_User
     */
    select?: Channel_UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Channel_UserInclude | null
    /**
     * The filter to search for the Channel_User to update in case it exists.
     */
    where: Channel_UserWhereUniqueInput
    /**
     * In case the Channel_User found by the `where` argument doesn't exist, create a new Channel_User with this data.
     */
    create: XOR<Channel_UserCreateInput, Channel_UserUncheckedCreateInput>
    /**
     * In case the Channel_User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<Channel_UserUpdateInput, Channel_UserUncheckedUpdateInput>
  }


  /**
   * Channel_User delete
   */
  export type Channel_UserDeleteArgs = {
    /**
     * Select specific fields to fetch from the Channel_User
     */
    select?: Channel_UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Channel_UserInclude | null
    /**
     * Filter which Channel_User to delete.
     */
    where: Channel_UserWhereUniqueInput
  }


  /**
   * Channel_User deleteMany
   */
  export type Channel_UserDeleteManyArgs = {
    /**
     * Filter which Channel_Users to delete
     */
    where?: Channel_UserWhereInput
  }


  /**
   * Channel_User without action
   */
  export type Channel_UserArgs = {
    /**
     * Select specific fields to fetch from the Channel_User
     */
    select?: Channel_UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Channel_UserInclude | null
  }



  /**
   * Model Message
   */


  export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null
    _avg: MessageAvgAggregateOutputType | null
    _sum: MessageSumAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  export type MessageAvgAggregateOutputType = {
    id: number | null
    senderId: number | null
    channelId: number | null
  }

  export type MessageSumAggregateOutputType = {
    id: number | null
    senderId: number | null
    channelId: number | null
  }

  export type MessageMinAggregateOutputType = {
    id: number | null
    senderId: number | null
    channelId: number | null
    text: string | null
    createdAt: Date | null
  }

  export type MessageMaxAggregateOutputType = {
    id: number | null
    senderId: number | null
    channelId: number | null
    text: string | null
    createdAt: Date | null
  }

  export type MessageCountAggregateOutputType = {
    id: number
    senderId: number
    channelId: number
    text: number
    createdAt: number
    _all: number
  }


  export type MessageAvgAggregateInputType = {
    id?: true
    senderId?: true
    channelId?: true
  }

  export type MessageSumAggregateInputType = {
    id?: true
    senderId?: true
    channelId?: true
  }

  export type MessageMinAggregateInputType = {
    id?: true
    senderId?: true
    channelId?: true
    text?: true
    createdAt?: true
  }

  export type MessageMaxAggregateInputType = {
    id?: true
    senderId?: true
    channelId?: true
    text?: true
    createdAt?: true
  }

  export type MessageCountAggregateInputType = {
    id?: true
    senderId?: true
    channelId?: true
    text?: true
    createdAt?: true
    _all?: true
  }

  export type MessageAggregateArgs = {
    /**
     * Filter which Message to aggregate.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: Enumerable<MessageOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Messages
    **/
    _count?: true | MessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MessageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MessageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageMaxAggregateInputType
  }

  export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
        [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessage[P]>
      : GetScalarType<T[P], AggregateMessage[P]>
  }




  export type MessageGroupByArgs = {
    where?: MessageWhereInput
    orderBy?: Enumerable<MessageOrderByWithAggregationInput>
    by: MessageScalarFieldEnum[]
    having?: MessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageCountAggregateInputType | true
    _avg?: MessageAvgAggregateInputType
    _sum?: MessageSumAggregateInputType
    _min?: MessageMinAggregateInputType
    _max?: MessageMaxAggregateInputType
  }


  export type MessageGroupByOutputType = {
    id: number
    senderId: number
    channelId: number
    text: string
    createdAt: Date
    _count: MessageCountAggregateOutputType | null
    _avg: MessageAvgAggregateOutputType | null
    _sum: MessageSumAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  type GetMessageGroupByPayload<T extends MessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<MessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageGroupByOutputType[P]>
        }
      >
    >


  export type MessageSelect = {
    id?: boolean
    senderId?: boolean
    channelId?: boolean
    text?: boolean
    createdAt?: boolean
    sender?: boolean | UserArgs
    channel?: boolean | ChannelArgs
  }


  export type MessageInclude = {
    sender?: boolean | UserArgs
    channel?: boolean | ChannelArgs
  }

  export type MessageGetPayload<S extends boolean | null | undefined | MessageArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Message :
    S extends undefined ? never :
    S extends { include: any } & (MessageArgs | MessageFindManyArgs)
    ? Message  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'sender' ? UserGetPayload<S['include'][P]> :
        P extends 'channel' ? ChannelGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (MessageArgs | MessageFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'sender' ? UserGetPayload<S['select'][P]> :
        P extends 'channel' ? ChannelGetPayload<S['select'][P]> :  P extends keyof Message ? Message[P] : never
  } 
      : Message


  type MessageCountArgs = 
    Omit<MessageFindManyArgs, 'select' | 'include'> & {
      select?: MessageCountAggregateInputType | true
    }

  export interface MessageDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one Message that matches the filter.
     * @param {MessageFindUniqueArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends MessageFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, MessageFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Message'> extends True ? Prisma__MessageClient<MessageGetPayload<T>> : Prisma__MessageClient<MessageGetPayload<T> | null, null>

    /**
     * Find one Message that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {MessageFindUniqueOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, MessageFindUniqueOrThrowArgs>
    ): Prisma__MessageClient<MessageGetPayload<T>>

    /**
     * Find the first Message that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends MessageFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, MessageFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Message'> extends True ? Prisma__MessageClient<MessageGetPayload<T>> : Prisma__MessageClient<MessageGetPayload<T> | null, null>

    /**
     * Find the first Message that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs>(
      args?: SelectSubset<T, MessageFindFirstOrThrowArgs>
    ): Prisma__MessageClient<MessageGetPayload<T>>

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.message.findMany()
     * 
     * // Get first 10 Messages
     * const messages = await prisma.message.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends MessageFindManyArgs>(
      args?: SelectSubset<T, MessageFindManyArgs>
    ): Prisma.PrismaPromise<Array<MessageGetPayload<T>>>

    /**
     * Create a Message.
     * @param {MessageCreateArgs} args - Arguments to create a Message.
     * @example
     * // Create one Message
     * const Message = await prisma.message.create({
     *   data: {
     *     // ... data to create a Message
     *   }
     * })
     * 
    **/
    create<T extends MessageCreateArgs>(
      args: SelectSubset<T, MessageCreateArgs>
    ): Prisma__MessageClient<MessageGetPayload<T>>

    /**
     * Create many Messages.
     *     @param {MessageCreateManyArgs} args - Arguments to create many Messages.
     *     @example
     *     // Create many Messages
     *     const message = await prisma.message.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends MessageCreateManyArgs>(
      args?: SelectSubset<T, MessageCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Message.
     * @param {MessageDeleteArgs} args - Arguments to delete one Message.
     * @example
     * // Delete one Message
     * const Message = await prisma.message.delete({
     *   where: {
     *     // ... filter to delete one Message
     *   }
     * })
     * 
    **/
    delete<T extends MessageDeleteArgs>(
      args: SelectSubset<T, MessageDeleteArgs>
    ): Prisma__MessageClient<MessageGetPayload<T>>

    /**
     * Update one Message.
     * @param {MessageUpdateArgs} args - Arguments to update one Message.
     * @example
     * // Update one Message
     * const message = await prisma.message.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends MessageUpdateArgs>(
      args: SelectSubset<T, MessageUpdateArgs>
    ): Prisma__MessageClient<MessageGetPayload<T>>

    /**
     * Delete zero or more Messages.
     * @param {MessageDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.message.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends MessageDeleteManyArgs>(
      args?: SelectSubset<T, MessageDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends MessageUpdateManyArgs>(
      args: SelectSubset<T, MessageUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Message.
     * @param {MessageUpsertArgs} args - Arguments to update or create a Message.
     * @example
     * // Update or create a Message
     * const message = await prisma.message.upsert({
     *   create: {
     *     // ... data to create a Message
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Message we want to update
     *   }
     * })
    **/
    upsert<T extends MessageUpsertArgs>(
      args: SelectSubset<T, MessageUpsertArgs>
    ): Prisma__MessageClient<MessageGetPayload<T>>

    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.message.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
    **/
    count<T extends MessageCountArgs>(
      args?: Subset<T, MessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MessageAggregateArgs>(args: Subset<T, MessageAggregateArgs>): Prisma.PrismaPromise<GetMessageAggregateType<T>>

    /**
     * Group by Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageGroupByArgs} args - Group by arguments.
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
      T extends MessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageGroupByArgs['orderBy'] }
        : { orderBy?: MessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Message.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__MessageClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    sender<T extends UserArgs= {}>(args?: Subset<T, UserArgs>): Prisma__UserClient<UserGetPayload<T> | Null>;

    channel<T extends ChannelArgs= {}>(args?: Subset<T, ChannelArgs>): Prisma__ChannelClient<ChannelGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Message base type for findUnique actions
   */
  export type MessageFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MessageInclude | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findUnique
   */
  export interface MessageFindUniqueArgs extends MessageFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Message findUniqueOrThrow
   */
  export type MessageFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MessageInclude | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }


  /**
   * Message base type for findFirst actions
   */
  export type MessageFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MessageInclude | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: Enumerable<MessageOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: Enumerable<MessageScalarFieldEnum>
  }

  /**
   * Message findFirst
   */
  export interface MessageFindFirstArgs extends MessageFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Message findFirstOrThrow
   */
  export type MessageFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MessageInclude | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: Enumerable<MessageOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: Enumerable<MessageScalarFieldEnum>
  }


  /**
   * Message findMany
   */
  export type MessageFindManyArgs = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MessageInclude | null
    /**
     * Filter, which Messages to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: Enumerable<MessageOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    distinct?: Enumerable<MessageScalarFieldEnum>
  }


  /**
   * Message create
   */
  export type MessageCreateArgs = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MessageInclude | null
    /**
     * The data needed to create a Message.
     */
    data: XOR<MessageCreateInput, MessageUncheckedCreateInput>
  }


  /**
   * Message createMany
   */
  export type MessageCreateManyArgs = {
    /**
     * The data used to create many Messages.
     */
    data: Enumerable<MessageCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Message update
   */
  export type MessageUpdateArgs = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MessageInclude | null
    /**
     * The data needed to update a Message.
     */
    data: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
    /**
     * Choose, which Message to update.
     */
    where: MessageWhereUniqueInput
  }


  /**
   * Message updateMany
   */
  export type MessageUpdateManyArgs = {
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
  }


  /**
   * Message upsert
   */
  export type MessageUpsertArgs = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MessageInclude | null
    /**
     * The filter to search for the Message to update in case it exists.
     */
    where: MessageWhereUniqueInput
    /**
     * In case the Message found by the `where` argument doesn't exist, create a new Message with this data.
     */
    create: XOR<MessageCreateInput, MessageUncheckedCreateInput>
    /**
     * In case the Message was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
  }


  /**
   * Message delete
   */
  export type MessageDeleteArgs = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MessageInclude | null
    /**
     * Filter which Message to delete.
     */
    where: MessageWhereUniqueInput
  }


  /**
   * Message deleteMany
   */
  export type MessageDeleteManyArgs = {
    /**
     * Filter which Messages to delete
     */
    where?: MessageWhereInput
  }


  /**
   * Message without action
   */
  export type MessageArgs = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MessageInclude | null
  }



  /**
   * Model Achievement
   */


  export type AggregateAchievement = {
    _count: AchievementCountAggregateOutputType | null
    _avg: AchievementAvgAggregateOutputType | null
    _sum: AchievementSumAggregateOutputType | null
    _min: AchievementMinAggregateOutputType | null
    _max: AchievementMaxAggregateOutputType | null
  }

  export type AchievementAvgAggregateOutputType = {
    id: number | null
  }

  export type AchievementSumAggregateOutputType = {
    id: number | null
  }

  export type AchievementMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
  }

  export type AchievementMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
  }

  export type AchievementCountAggregateOutputType = {
    id: number
    name: number
    description: number
    _all: number
  }


  export type AchievementAvgAggregateInputType = {
    id?: true
  }

  export type AchievementSumAggregateInputType = {
    id?: true
  }

  export type AchievementMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
  }

  export type AchievementMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
  }

  export type AchievementCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    _all?: true
  }

  export type AchievementAggregateArgs = {
    /**
     * Filter which Achievement to aggregate.
     */
    where?: AchievementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Achievements to fetch.
     */
    orderBy?: Enumerable<AchievementOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AchievementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Achievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Achievements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Achievements
    **/
    _count?: true | AchievementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AchievementAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AchievementSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AchievementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AchievementMaxAggregateInputType
  }

  export type GetAchievementAggregateType<T extends AchievementAggregateArgs> = {
        [P in keyof T & keyof AggregateAchievement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAchievement[P]>
      : GetScalarType<T[P], AggregateAchievement[P]>
  }




  export type AchievementGroupByArgs = {
    where?: AchievementWhereInput
    orderBy?: Enumerable<AchievementOrderByWithAggregationInput>
    by: AchievementScalarFieldEnum[]
    having?: AchievementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AchievementCountAggregateInputType | true
    _avg?: AchievementAvgAggregateInputType
    _sum?: AchievementSumAggregateInputType
    _min?: AchievementMinAggregateInputType
    _max?: AchievementMaxAggregateInputType
  }


  export type AchievementGroupByOutputType = {
    id: number
    name: string
    description: string
    _count: AchievementCountAggregateOutputType | null
    _avg: AchievementAvgAggregateOutputType | null
    _sum: AchievementSumAggregateOutputType | null
    _min: AchievementMinAggregateOutputType | null
    _max: AchievementMaxAggregateOutputType | null
  }

  type GetAchievementGroupByPayload<T extends AchievementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<AchievementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AchievementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AchievementGroupByOutputType[P]>
            : GetScalarType<T[P], AchievementGroupByOutputType[P]>
        }
      >
    >


  export type AchievementSelect = {
    id?: boolean
    name?: boolean
    description?: boolean
    users?: boolean | Achievement$usersArgs
    _count?: boolean | AchievementCountOutputTypeArgs
  }


  export type AchievementInclude = {
    users?: boolean | Achievement$usersArgs
    _count?: boolean | AchievementCountOutputTypeArgs
  }

  export type AchievementGetPayload<S extends boolean | null | undefined | AchievementArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Achievement :
    S extends undefined ? never :
    S extends { include: any } & (AchievementArgs | AchievementFindManyArgs)
    ? Achievement  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'users' ? Array < Achievement_UserGetPayload<S['include'][P]>>  :
        P extends '_count' ? AchievementCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (AchievementArgs | AchievementFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'users' ? Array < Achievement_UserGetPayload<S['select'][P]>>  :
        P extends '_count' ? AchievementCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Achievement ? Achievement[P] : never
  } 
      : Achievement


  type AchievementCountArgs = 
    Omit<AchievementFindManyArgs, 'select' | 'include'> & {
      select?: AchievementCountAggregateInputType | true
    }

  export interface AchievementDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one Achievement that matches the filter.
     * @param {AchievementFindUniqueArgs} args - Arguments to find a Achievement
     * @example
     * // Get one Achievement
     * const achievement = await prisma.achievement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends AchievementFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, AchievementFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Achievement'> extends True ? Prisma__AchievementClient<AchievementGetPayload<T>> : Prisma__AchievementClient<AchievementGetPayload<T> | null, null>

    /**
     * Find one Achievement that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {AchievementFindUniqueOrThrowArgs} args - Arguments to find a Achievement
     * @example
     * // Get one Achievement
     * const achievement = await prisma.achievement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends AchievementFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, AchievementFindUniqueOrThrowArgs>
    ): Prisma__AchievementClient<AchievementGetPayload<T>>

    /**
     * Find the first Achievement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementFindFirstArgs} args - Arguments to find a Achievement
     * @example
     * // Get one Achievement
     * const achievement = await prisma.achievement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends AchievementFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, AchievementFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Achievement'> extends True ? Prisma__AchievementClient<AchievementGetPayload<T>> : Prisma__AchievementClient<AchievementGetPayload<T> | null, null>

    /**
     * Find the first Achievement that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementFindFirstOrThrowArgs} args - Arguments to find a Achievement
     * @example
     * // Get one Achievement
     * const achievement = await prisma.achievement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends AchievementFindFirstOrThrowArgs>(
      args?: SelectSubset<T, AchievementFindFirstOrThrowArgs>
    ): Prisma__AchievementClient<AchievementGetPayload<T>>

    /**
     * Find zero or more Achievements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Achievements
     * const achievements = await prisma.achievement.findMany()
     * 
     * // Get first 10 Achievements
     * const achievements = await prisma.achievement.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const achievementWithIdOnly = await prisma.achievement.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends AchievementFindManyArgs>(
      args?: SelectSubset<T, AchievementFindManyArgs>
    ): Prisma.PrismaPromise<Array<AchievementGetPayload<T>>>

    /**
     * Create a Achievement.
     * @param {AchievementCreateArgs} args - Arguments to create a Achievement.
     * @example
     * // Create one Achievement
     * const Achievement = await prisma.achievement.create({
     *   data: {
     *     // ... data to create a Achievement
     *   }
     * })
     * 
    **/
    create<T extends AchievementCreateArgs>(
      args: SelectSubset<T, AchievementCreateArgs>
    ): Prisma__AchievementClient<AchievementGetPayload<T>>

    /**
     * Create many Achievements.
     *     @param {AchievementCreateManyArgs} args - Arguments to create many Achievements.
     *     @example
     *     // Create many Achievements
     *     const achievement = await prisma.achievement.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends AchievementCreateManyArgs>(
      args?: SelectSubset<T, AchievementCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Achievement.
     * @param {AchievementDeleteArgs} args - Arguments to delete one Achievement.
     * @example
     * // Delete one Achievement
     * const Achievement = await prisma.achievement.delete({
     *   where: {
     *     // ... filter to delete one Achievement
     *   }
     * })
     * 
    **/
    delete<T extends AchievementDeleteArgs>(
      args: SelectSubset<T, AchievementDeleteArgs>
    ): Prisma__AchievementClient<AchievementGetPayload<T>>

    /**
     * Update one Achievement.
     * @param {AchievementUpdateArgs} args - Arguments to update one Achievement.
     * @example
     * // Update one Achievement
     * const achievement = await prisma.achievement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends AchievementUpdateArgs>(
      args: SelectSubset<T, AchievementUpdateArgs>
    ): Prisma__AchievementClient<AchievementGetPayload<T>>

    /**
     * Delete zero or more Achievements.
     * @param {AchievementDeleteManyArgs} args - Arguments to filter Achievements to delete.
     * @example
     * // Delete a few Achievements
     * const { count } = await prisma.achievement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends AchievementDeleteManyArgs>(
      args?: SelectSubset<T, AchievementDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Achievements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Achievements
     * const achievement = await prisma.achievement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends AchievementUpdateManyArgs>(
      args: SelectSubset<T, AchievementUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Achievement.
     * @param {AchievementUpsertArgs} args - Arguments to update or create a Achievement.
     * @example
     * // Update or create a Achievement
     * const achievement = await prisma.achievement.upsert({
     *   create: {
     *     // ... data to create a Achievement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Achievement we want to update
     *   }
     * })
    **/
    upsert<T extends AchievementUpsertArgs>(
      args: SelectSubset<T, AchievementUpsertArgs>
    ): Prisma__AchievementClient<AchievementGetPayload<T>>

    /**
     * Count the number of Achievements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementCountArgs} args - Arguments to filter Achievements to count.
     * @example
     * // Count the number of Achievements
     * const count = await prisma.achievement.count({
     *   where: {
     *     // ... the filter for the Achievements we want to count
     *   }
     * })
    **/
    count<T extends AchievementCountArgs>(
      args?: Subset<T, AchievementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AchievementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Achievement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AchievementAggregateArgs>(args: Subset<T, AchievementAggregateArgs>): Prisma.PrismaPromise<GetAchievementAggregateType<T>>

    /**
     * Group by Achievement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementGroupByArgs} args - Group by arguments.
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
      T extends AchievementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AchievementGroupByArgs['orderBy'] }
        : { orderBy?: AchievementGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, AchievementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAchievementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Achievement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__AchievementClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    users<T extends Achievement$usersArgs= {}>(args?: Subset<T, Achievement$usersArgs>): Prisma.PrismaPromise<Array<Achievement_UserGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Achievement base type for findUnique actions
   */
  export type AchievementFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AchievementInclude | null
    /**
     * Filter, which Achievement to fetch.
     */
    where: AchievementWhereUniqueInput
  }

  /**
   * Achievement findUnique
   */
  export interface AchievementFindUniqueArgs extends AchievementFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Achievement findUniqueOrThrow
   */
  export type AchievementFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AchievementInclude | null
    /**
     * Filter, which Achievement to fetch.
     */
    where: AchievementWhereUniqueInput
  }


  /**
   * Achievement base type for findFirst actions
   */
  export type AchievementFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AchievementInclude | null
    /**
     * Filter, which Achievement to fetch.
     */
    where?: AchievementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Achievements to fetch.
     */
    orderBy?: Enumerable<AchievementOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Achievements.
     */
    cursor?: AchievementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Achievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Achievements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Achievements.
     */
    distinct?: Enumerable<AchievementScalarFieldEnum>
  }

  /**
   * Achievement findFirst
   */
  export interface AchievementFindFirstArgs extends AchievementFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Achievement findFirstOrThrow
   */
  export type AchievementFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AchievementInclude | null
    /**
     * Filter, which Achievement to fetch.
     */
    where?: AchievementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Achievements to fetch.
     */
    orderBy?: Enumerable<AchievementOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Achievements.
     */
    cursor?: AchievementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Achievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Achievements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Achievements.
     */
    distinct?: Enumerable<AchievementScalarFieldEnum>
  }


  /**
   * Achievement findMany
   */
  export type AchievementFindManyArgs = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AchievementInclude | null
    /**
     * Filter, which Achievements to fetch.
     */
    where?: AchievementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Achievements to fetch.
     */
    orderBy?: Enumerable<AchievementOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Achievements.
     */
    cursor?: AchievementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Achievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Achievements.
     */
    skip?: number
    distinct?: Enumerable<AchievementScalarFieldEnum>
  }


  /**
   * Achievement create
   */
  export type AchievementCreateArgs = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AchievementInclude | null
    /**
     * The data needed to create a Achievement.
     */
    data: XOR<AchievementCreateInput, AchievementUncheckedCreateInput>
  }


  /**
   * Achievement createMany
   */
  export type AchievementCreateManyArgs = {
    /**
     * The data used to create many Achievements.
     */
    data: Enumerable<AchievementCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Achievement update
   */
  export type AchievementUpdateArgs = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AchievementInclude | null
    /**
     * The data needed to update a Achievement.
     */
    data: XOR<AchievementUpdateInput, AchievementUncheckedUpdateInput>
    /**
     * Choose, which Achievement to update.
     */
    where: AchievementWhereUniqueInput
  }


  /**
   * Achievement updateMany
   */
  export type AchievementUpdateManyArgs = {
    /**
     * The data used to update Achievements.
     */
    data: XOR<AchievementUpdateManyMutationInput, AchievementUncheckedUpdateManyInput>
    /**
     * Filter which Achievements to update
     */
    where?: AchievementWhereInput
  }


  /**
   * Achievement upsert
   */
  export type AchievementUpsertArgs = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AchievementInclude | null
    /**
     * The filter to search for the Achievement to update in case it exists.
     */
    where: AchievementWhereUniqueInput
    /**
     * In case the Achievement found by the `where` argument doesn't exist, create a new Achievement with this data.
     */
    create: XOR<AchievementCreateInput, AchievementUncheckedCreateInput>
    /**
     * In case the Achievement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AchievementUpdateInput, AchievementUncheckedUpdateInput>
  }


  /**
   * Achievement delete
   */
  export type AchievementDeleteArgs = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AchievementInclude | null
    /**
     * Filter which Achievement to delete.
     */
    where: AchievementWhereUniqueInput
  }


  /**
   * Achievement deleteMany
   */
  export type AchievementDeleteManyArgs = {
    /**
     * Filter which Achievements to delete
     */
    where?: AchievementWhereInput
  }


  /**
   * Achievement.users
   */
  export type Achievement$usersArgs = {
    /**
     * Select specific fields to fetch from the Achievement_User
     */
    select?: Achievement_UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Achievement_UserInclude | null
    where?: Achievement_UserWhereInput
    orderBy?: Enumerable<Achievement_UserOrderByWithRelationInput>
    cursor?: Achievement_UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<Achievement_UserScalarFieldEnum>
  }


  /**
   * Achievement without action
   */
  export type AchievementArgs = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AchievementInclude | null
  }



  /**
   * Model Achievement_User
   */


  export type AggregateAchievement_User = {
    _count: Achievement_UserCountAggregateOutputType | null
    _avg: Achievement_UserAvgAggregateOutputType | null
    _sum: Achievement_UserSumAggregateOutputType | null
    _min: Achievement_UserMinAggregateOutputType | null
    _max: Achievement_UserMaxAggregateOutputType | null
  }

  export type Achievement_UserAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    achievementId: number | null
  }

  export type Achievement_UserSumAggregateOutputType = {
    id: number | null
    userId: number | null
    achievementId: number | null
  }

  export type Achievement_UserMinAggregateOutputType = {
    id: number | null
    userId: number | null
    achievementId: number | null
    createdAt: Date | null
  }

  export type Achievement_UserMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    achievementId: number | null
    createdAt: Date | null
  }

  export type Achievement_UserCountAggregateOutputType = {
    id: number
    userId: number
    achievementId: number
    createdAt: number
    _all: number
  }


  export type Achievement_UserAvgAggregateInputType = {
    id?: true
    userId?: true
    achievementId?: true
  }

  export type Achievement_UserSumAggregateInputType = {
    id?: true
    userId?: true
    achievementId?: true
  }

  export type Achievement_UserMinAggregateInputType = {
    id?: true
    userId?: true
    achievementId?: true
    createdAt?: true
  }

  export type Achievement_UserMaxAggregateInputType = {
    id?: true
    userId?: true
    achievementId?: true
    createdAt?: true
  }

  export type Achievement_UserCountAggregateInputType = {
    id?: true
    userId?: true
    achievementId?: true
    createdAt?: true
    _all?: true
  }

  export type Achievement_UserAggregateArgs = {
    /**
     * Filter which Achievement_User to aggregate.
     */
    where?: Achievement_UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Achievement_Users to fetch.
     */
    orderBy?: Enumerable<Achievement_UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: Achievement_UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Achievement_Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Achievement_Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Achievement_Users
    **/
    _count?: true | Achievement_UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Achievement_UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Achievement_UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Achievement_UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Achievement_UserMaxAggregateInputType
  }

  export type GetAchievement_UserAggregateType<T extends Achievement_UserAggregateArgs> = {
        [P in keyof T & keyof AggregateAchievement_User]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAchievement_User[P]>
      : GetScalarType<T[P], AggregateAchievement_User[P]>
  }




  export type Achievement_UserGroupByArgs = {
    where?: Achievement_UserWhereInput
    orderBy?: Enumerable<Achievement_UserOrderByWithAggregationInput>
    by: Achievement_UserScalarFieldEnum[]
    having?: Achievement_UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Achievement_UserCountAggregateInputType | true
    _avg?: Achievement_UserAvgAggregateInputType
    _sum?: Achievement_UserSumAggregateInputType
    _min?: Achievement_UserMinAggregateInputType
    _max?: Achievement_UserMaxAggregateInputType
  }


  export type Achievement_UserGroupByOutputType = {
    id: number
    userId: number
    achievementId: number
    createdAt: Date
    _count: Achievement_UserCountAggregateOutputType | null
    _avg: Achievement_UserAvgAggregateOutputType | null
    _sum: Achievement_UserSumAggregateOutputType | null
    _min: Achievement_UserMinAggregateOutputType | null
    _max: Achievement_UserMaxAggregateOutputType | null
  }

  type GetAchievement_UserGroupByPayload<T extends Achievement_UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<Achievement_UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Achievement_UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Achievement_UserGroupByOutputType[P]>
            : GetScalarType<T[P], Achievement_UserGroupByOutputType[P]>
        }
      >
    >


  export type Achievement_UserSelect = {
    id?: boolean
    userId?: boolean
    achievementId?: boolean
    createdAt?: boolean
    achievement?: boolean | AchievementArgs
    user?: boolean | UserArgs
  }


  export type Achievement_UserInclude = {
    achievement?: boolean | AchievementArgs
    user?: boolean | UserArgs
  }

  export type Achievement_UserGetPayload<S extends boolean | null | undefined | Achievement_UserArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Achievement_User :
    S extends undefined ? never :
    S extends { include: any } & (Achievement_UserArgs | Achievement_UserFindManyArgs)
    ? Achievement_User  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'achievement' ? AchievementGetPayload<S['include'][P]> :
        P extends 'user' ? UserGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (Achievement_UserArgs | Achievement_UserFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'achievement' ? AchievementGetPayload<S['select'][P]> :
        P extends 'user' ? UserGetPayload<S['select'][P]> :  P extends keyof Achievement_User ? Achievement_User[P] : never
  } 
      : Achievement_User


  type Achievement_UserCountArgs = 
    Omit<Achievement_UserFindManyArgs, 'select' | 'include'> & {
      select?: Achievement_UserCountAggregateInputType | true
    }

  export interface Achievement_UserDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one Achievement_User that matches the filter.
     * @param {Achievement_UserFindUniqueArgs} args - Arguments to find a Achievement_User
     * @example
     * // Get one Achievement_User
     * const achievement_User = await prisma.achievement_User.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends Achievement_UserFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, Achievement_UserFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Achievement_User'> extends True ? Prisma__Achievement_UserClient<Achievement_UserGetPayload<T>> : Prisma__Achievement_UserClient<Achievement_UserGetPayload<T> | null, null>

    /**
     * Find one Achievement_User that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {Achievement_UserFindUniqueOrThrowArgs} args - Arguments to find a Achievement_User
     * @example
     * // Get one Achievement_User
     * const achievement_User = await prisma.achievement_User.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends Achievement_UserFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, Achievement_UserFindUniqueOrThrowArgs>
    ): Prisma__Achievement_UserClient<Achievement_UserGetPayload<T>>

    /**
     * Find the first Achievement_User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Achievement_UserFindFirstArgs} args - Arguments to find a Achievement_User
     * @example
     * // Get one Achievement_User
     * const achievement_User = await prisma.achievement_User.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends Achievement_UserFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, Achievement_UserFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Achievement_User'> extends True ? Prisma__Achievement_UserClient<Achievement_UserGetPayload<T>> : Prisma__Achievement_UserClient<Achievement_UserGetPayload<T> | null, null>

    /**
     * Find the first Achievement_User that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Achievement_UserFindFirstOrThrowArgs} args - Arguments to find a Achievement_User
     * @example
     * // Get one Achievement_User
     * const achievement_User = await prisma.achievement_User.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends Achievement_UserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, Achievement_UserFindFirstOrThrowArgs>
    ): Prisma__Achievement_UserClient<Achievement_UserGetPayload<T>>

    /**
     * Find zero or more Achievement_Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Achievement_UserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Achievement_Users
     * const achievement_Users = await prisma.achievement_User.findMany()
     * 
     * // Get first 10 Achievement_Users
     * const achievement_Users = await prisma.achievement_User.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const achievement_UserWithIdOnly = await prisma.achievement_User.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends Achievement_UserFindManyArgs>(
      args?: SelectSubset<T, Achievement_UserFindManyArgs>
    ): Prisma.PrismaPromise<Array<Achievement_UserGetPayload<T>>>

    /**
     * Create a Achievement_User.
     * @param {Achievement_UserCreateArgs} args - Arguments to create a Achievement_User.
     * @example
     * // Create one Achievement_User
     * const Achievement_User = await prisma.achievement_User.create({
     *   data: {
     *     // ... data to create a Achievement_User
     *   }
     * })
     * 
    **/
    create<T extends Achievement_UserCreateArgs>(
      args: SelectSubset<T, Achievement_UserCreateArgs>
    ): Prisma__Achievement_UserClient<Achievement_UserGetPayload<T>>

    /**
     * Create many Achievement_Users.
     *     @param {Achievement_UserCreateManyArgs} args - Arguments to create many Achievement_Users.
     *     @example
     *     // Create many Achievement_Users
     *     const achievement_User = await prisma.achievement_User.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends Achievement_UserCreateManyArgs>(
      args?: SelectSubset<T, Achievement_UserCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Achievement_User.
     * @param {Achievement_UserDeleteArgs} args - Arguments to delete one Achievement_User.
     * @example
     * // Delete one Achievement_User
     * const Achievement_User = await prisma.achievement_User.delete({
     *   where: {
     *     // ... filter to delete one Achievement_User
     *   }
     * })
     * 
    **/
    delete<T extends Achievement_UserDeleteArgs>(
      args: SelectSubset<T, Achievement_UserDeleteArgs>
    ): Prisma__Achievement_UserClient<Achievement_UserGetPayload<T>>

    /**
     * Update one Achievement_User.
     * @param {Achievement_UserUpdateArgs} args - Arguments to update one Achievement_User.
     * @example
     * // Update one Achievement_User
     * const achievement_User = await prisma.achievement_User.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends Achievement_UserUpdateArgs>(
      args: SelectSubset<T, Achievement_UserUpdateArgs>
    ): Prisma__Achievement_UserClient<Achievement_UserGetPayload<T>>

    /**
     * Delete zero or more Achievement_Users.
     * @param {Achievement_UserDeleteManyArgs} args - Arguments to filter Achievement_Users to delete.
     * @example
     * // Delete a few Achievement_Users
     * const { count } = await prisma.achievement_User.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends Achievement_UserDeleteManyArgs>(
      args?: SelectSubset<T, Achievement_UserDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Achievement_Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Achievement_UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Achievement_Users
     * const achievement_User = await prisma.achievement_User.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends Achievement_UserUpdateManyArgs>(
      args: SelectSubset<T, Achievement_UserUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Achievement_User.
     * @param {Achievement_UserUpsertArgs} args - Arguments to update or create a Achievement_User.
     * @example
     * // Update or create a Achievement_User
     * const achievement_User = await prisma.achievement_User.upsert({
     *   create: {
     *     // ... data to create a Achievement_User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Achievement_User we want to update
     *   }
     * })
    **/
    upsert<T extends Achievement_UserUpsertArgs>(
      args: SelectSubset<T, Achievement_UserUpsertArgs>
    ): Prisma__Achievement_UserClient<Achievement_UserGetPayload<T>>

    /**
     * Count the number of Achievement_Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Achievement_UserCountArgs} args - Arguments to filter Achievement_Users to count.
     * @example
     * // Count the number of Achievement_Users
     * const count = await prisma.achievement_User.count({
     *   where: {
     *     // ... the filter for the Achievement_Users we want to count
     *   }
     * })
    **/
    count<T extends Achievement_UserCountArgs>(
      args?: Subset<T, Achievement_UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Achievement_UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Achievement_User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Achievement_UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Achievement_UserAggregateArgs>(args: Subset<T, Achievement_UserAggregateArgs>): Prisma.PrismaPromise<GetAchievement_UserAggregateType<T>>

    /**
     * Group by Achievement_User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Achievement_UserGroupByArgs} args - Group by arguments.
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
      T extends Achievement_UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Achievement_UserGroupByArgs['orderBy'] }
        : { orderBy?: Achievement_UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, Achievement_UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAchievement_UserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Achievement_User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__Achievement_UserClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    achievement<T extends AchievementArgs= {}>(args?: Subset<T, AchievementArgs>): Prisma__AchievementClient<AchievementGetPayload<T> | Null>;

    user<T extends UserArgs= {}>(args?: Subset<T, UserArgs>): Prisma__UserClient<UserGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Achievement_User base type for findUnique actions
   */
  export type Achievement_UserFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Achievement_User
     */
    select?: Achievement_UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Achievement_UserInclude | null
    /**
     * Filter, which Achievement_User to fetch.
     */
    where: Achievement_UserWhereUniqueInput
  }

  /**
   * Achievement_User findUnique
   */
  export interface Achievement_UserFindUniqueArgs extends Achievement_UserFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Achievement_User findUniqueOrThrow
   */
  export type Achievement_UserFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Achievement_User
     */
    select?: Achievement_UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Achievement_UserInclude | null
    /**
     * Filter, which Achievement_User to fetch.
     */
    where: Achievement_UserWhereUniqueInput
  }


  /**
   * Achievement_User base type for findFirst actions
   */
  export type Achievement_UserFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Achievement_User
     */
    select?: Achievement_UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Achievement_UserInclude | null
    /**
     * Filter, which Achievement_User to fetch.
     */
    where?: Achievement_UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Achievement_Users to fetch.
     */
    orderBy?: Enumerable<Achievement_UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Achievement_Users.
     */
    cursor?: Achievement_UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Achievement_Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Achievement_Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Achievement_Users.
     */
    distinct?: Enumerable<Achievement_UserScalarFieldEnum>
  }

  /**
   * Achievement_User findFirst
   */
  export interface Achievement_UserFindFirstArgs extends Achievement_UserFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Achievement_User findFirstOrThrow
   */
  export type Achievement_UserFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Achievement_User
     */
    select?: Achievement_UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Achievement_UserInclude | null
    /**
     * Filter, which Achievement_User to fetch.
     */
    where?: Achievement_UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Achievement_Users to fetch.
     */
    orderBy?: Enumerable<Achievement_UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Achievement_Users.
     */
    cursor?: Achievement_UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Achievement_Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Achievement_Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Achievement_Users.
     */
    distinct?: Enumerable<Achievement_UserScalarFieldEnum>
  }


  /**
   * Achievement_User findMany
   */
  export type Achievement_UserFindManyArgs = {
    /**
     * Select specific fields to fetch from the Achievement_User
     */
    select?: Achievement_UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Achievement_UserInclude | null
    /**
     * Filter, which Achievement_Users to fetch.
     */
    where?: Achievement_UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Achievement_Users to fetch.
     */
    orderBy?: Enumerable<Achievement_UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Achievement_Users.
     */
    cursor?: Achievement_UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Achievement_Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Achievement_Users.
     */
    skip?: number
    distinct?: Enumerable<Achievement_UserScalarFieldEnum>
  }


  /**
   * Achievement_User create
   */
  export type Achievement_UserCreateArgs = {
    /**
     * Select specific fields to fetch from the Achievement_User
     */
    select?: Achievement_UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Achievement_UserInclude | null
    /**
     * The data needed to create a Achievement_User.
     */
    data: XOR<Achievement_UserCreateInput, Achievement_UserUncheckedCreateInput>
  }


  /**
   * Achievement_User createMany
   */
  export type Achievement_UserCreateManyArgs = {
    /**
     * The data used to create many Achievement_Users.
     */
    data: Enumerable<Achievement_UserCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Achievement_User update
   */
  export type Achievement_UserUpdateArgs = {
    /**
     * Select specific fields to fetch from the Achievement_User
     */
    select?: Achievement_UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Achievement_UserInclude | null
    /**
     * The data needed to update a Achievement_User.
     */
    data: XOR<Achievement_UserUpdateInput, Achievement_UserUncheckedUpdateInput>
    /**
     * Choose, which Achievement_User to update.
     */
    where: Achievement_UserWhereUniqueInput
  }


  /**
   * Achievement_User updateMany
   */
  export type Achievement_UserUpdateManyArgs = {
    /**
     * The data used to update Achievement_Users.
     */
    data: XOR<Achievement_UserUpdateManyMutationInput, Achievement_UserUncheckedUpdateManyInput>
    /**
     * Filter which Achievement_Users to update
     */
    where?: Achievement_UserWhereInput
  }


  /**
   * Achievement_User upsert
   */
  export type Achievement_UserUpsertArgs = {
    /**
     * Select specific fields to fetch from the Achievement_User
     */
    select?: Achievement_UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Achievement_UserInclude | null
    /**
     * The filter to search for the Achievement_User to update in case it exists.
     */
    where: Achievement_UserWhereUniqueInput
    /**
     * In case the Achievement_User found by the `where` argument doesn't exist, create a new Achievement_User with this data.
     */
    create: XOR<Achievement_UserCreateInput, Achievement_UserUncheckedCreateInput>
    /**
     * In case the Achievement_User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<Achievement_UserUpdateInput, Achievement_UserUncheckedUpdateInput>
  }


  /**
   * Achievement_User delete
   */
  export type Achievement_UserDeleteArgs = {
    /**
     * Select specific fields to fetch from the Achievement_User
     */
    select?: Achievement_UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Achievement_UserInclude | null
    /**
     * Filter which Achievement_User to delete.
     */
    where: Achievement_UserWhereUniqueInput
  }


  /**
   * Achievement_User deleteMany
   */
  export type Achievement_UserDeleteManyArgs = {
    /**
     * Filter which Achievement_Users to delete
     */
    where?: Achievement_UserWhereInput
  }


  /**
   * Achievement_User without action
   */
  export type Achievement_UserArgs = {
    /**
     * Select specific fields to fetch from the Achievement_User
     */
    select?: Achievement_UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Achievement_UserInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const AchievementScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description'
  };

  export type AchievementScalarFieldEnum = (typeof AchievementScalarFieldEnum)[keyof typeof AchievementScalarFieldEnum]


  export const Achievement_UserScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    achievementId: 'achievementId',
    createdAt: 'createdAt'
  };

  export type Achievement_UserScalarFieldEnum = (typeof Achievement_UserScalarFieldEnum)[keyof typeof Achievement_UserScalarFieldEnum]


  export const BlockUserScalarFieldEnum: {
    id: 'id',
    blockerId: 'blockerId',
    blockedId: 'blockedId',
    createdAt: 'createdAt'
  };

  export type BlockUserScalarFieldEnum = (typeof BlockUserScalarFieldEnum)[keyof typeof BlockUserScalarFieldEnum]


  export const ChannelScalarFieldEnum: {
    id: 'id',
    title: 'title',
    channelCode: 'channelCode',
    password: 'password',
    idPublic: 'idPublic',
    isDm: 'isDm',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type ChannelScalarFieldEnum = (typeof ChannelScalarFieldEnum)[keyof typeof ChannelScalarFieldEnum]


  export const Channel_UserScalarFieldEnum: {
    id: 'id',
    channelId: 'channelId',
    userId: 'userId',
    userType: 'userType',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type Channel_UserScalarFieldEnum = (typeof Channel_UserScalarFieldEnum)[keyof typeof Channel_UserScalarFieldEnum]


  export const FollowUserScalarFieldEnum: {
    id: 'id',
    followerId: 'followerId',
    followeeId: 'followeeId',
    createdAt: 'createdAt'
  };

  export type FollowUserScalarFieldEnum = (typeof FollowUserScalarFieldEnum)[keyof typeof FollowUserScalarFieldEnum]


  export const GameResultScalarFieldEnum: {
    id: 'id',
    score: 'score',
    isLadder: 'isLadder',
    winnerId: 'winnerId',
    loserId: 'loserId',
    createdAt: 'createdAt'
  };

  export type GameResultScalarFieldEnum = (typeof GameResultScalarFieldEnum)[keyof typeof GameResultScalarFieldEnum]


  export const MessageScalarFieldEnum: {
    id: 'id',
    senderId: 'senderId',
    channelId: 'channelId',
    text: 'text',
    createdAt: 'createdAt'
  };

  export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    imageUrl: 'imageUrl',
    nickname: 'nickname',
    rank: 'rank',
    isTwoFactor: 'isTwoFactor',
    ftId: 'ftId',
    ftUsername: 'ftUsername',
    ftAccessToken: 'ftAccessToken',
    ftRefreshToken: 'ftRefreshToken',
    ftAccessExpiresAt: 'ftAccessExpiresAt',
    ftRefreshExpiresAt: 'ftRefreshExpiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: Enumerable<UserWhereInput>
    OR?: Enumerable<UserWhereInput>
    NOT?: Enumerable<UserWhereInput>
    id?: IntFilter | number
    imageUrl?: StringNullableFilter | string | null
    nickname?: StringNullableFilter | string | null
    rank?: IntFilter | number
    isTwoFactor?: BoolFilter | boolean
    ftId?: StringFilter | string
    ftUsername?: StringNullableFilter | string | null
    ftAccessToken?: StringNullableFilter | string | null
    ftRefreshToken?: StringNullableFilter | string | null
    ftAccessExpiresAt?: DateTimeNullableFilter | Date | string | null
    ftRefreshExpiresAt?: DateTimeNullableFilter | Date | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeNullableFilter | Date | string | null
    deletedAt?: DateTimeNullableFilter | Date | string | null
    winLogs?: GameResultListRelationFilter
    loseLogs?: GameResultListRelationFilter
    followers?: FollowUserListRelationFilter
    followees?: FollowUserListRelationFilter
    blockers?: BlockUserListRelationFilter
    blockeds?: BlockUserListRelationFilter
    channels?: Channel_UserListRelationFilter
    achievements?: Achievement_UserListRelationFilter
    messages?: MessageListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    imageUrl?: SortOrder
    nickname?: SortOrder
    rank?: SortOrder
    isTwoFactor?: SortOrder
    ftId?: SortOrder
    ftUsername?: SortOrder
    ftAccessToken?: SortOrder
    ftRefreshToken?: SortOrder
    ftAccessExpiresAt?: SortOrder
    ftRefreshExpiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    winLogs?: GameResultOrderByRelationAggregateInput
    loseLogs?: GameResultOrderByRelationAggregateInput
    followers?: FollowUserOrderByRelationAggregateInput
    followees?: FollowUserOrderByRelationAggregateInput
    blockers?: BlockUserOrderByRelationAggregateInput
    blockeds?: BlockUserOrderByRelationAggregateInput
    channels?: Channel_UserOrderByRelationAggregateInput
    achievements?: Achievement_UserOrderByRelationAggregateInput
    messages?: MessageOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = {
    id?: number
    nickname?: string
    ftId?: string
    ftAccessToken?: string
    ftRefreshToken?: string
  }

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    imageUrl?: SortOrder
    nickname?: SortOrder
    rank?: SortOrder
    isTwoFactor?: SortOrder
    ftId?: SortOrder
    ftUsername?: SortOrder
    ftAccessToken?: SortOrder
    ftRefreshToken?: SortOrder
    ftAccessExpiresAt?: SortOrder
    ftRefreshExpiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserScalarWhereWithAggregatesInput>
    OR?: Enumerable<UserScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UserScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    imageUrl?: StringNullableWithAggregatesFilter | string | null
    nickname?: StringNullableWithAggregatesFilter | string | null
    rank?: IntWithAggregatesFilter | number
    isTwoFactor?: BoolWithAggregatesFilter | boolean
    ftId?: StringWithAggregatesFilter | string
    ftUsername?: StringNullableWithAggregatesFilter | string | null
    ftAccessToken?: StringNullableWithAggregatesFilter | string | null
    ftRefreshToken?: StringNullableWithAggregatesFilter | string | null
    ftAccessExpiresAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
    ftRefreshExpiresAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
    deletedAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
  }

  export type GameResultWhereInput = {
    AND?: Enumerable<GameResultWhereInput>
    OR?: Enumerable<GameResultWhereInput>
    NOT?: Enumerable<GameResultWhereInput>
    id?: IntFilter | number
    score?: IntFilter | number
    isLadder?: BoolFilter | boolean
    winnerId?: IntFilter | number
    loserId?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    winner?: XOR<UserRelationFilter, UserWhereInput>
    loser?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type GameResultOrderByWithRelationInput = {
    id?: SortOrder
    score?: SortOrder
    isLadder?: SortOrder
    winnerId?: SortOrder
    loserId?: SortOrder
    createdAt?: SortOrder
    winner?: UserOrderByWithRelationInput
    loser?: UserOrderByWithRelationInput
  }

  export type GameResultWhereUniqueInput = {
    id?: number
  }

  export type GameResultOrderByWithAggregationInput = {
    id?: SortOrder
    score?: SortOrder
    isLadder?: SortOrder
    winnerId?: SortOrder
    loserId?: SortOrder
    createdAt?: SortOrder
    _count?: GameResultCountOrderByAggregateInput
    _avg?: GameResultAvgOrderByAggregateInput
    _max?: GameResultMaxOrderByAggregateInput
    _min?: GameResultMinOrderByAggregateInput
    _sum?: GameResultSumOrderByAggregateInput
  }

  export type GameResultScalarWhereWithAggregatesInput = {
    AND?: Enumerable<GameResultScalarWhereWithAggregatesInput>
    OR?: Enumerable<GameResultScalarWhereWithAggregatesInput>
    NOT?: Enumerable<GameResultScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    score?: IntWithAggregatesFilter | number
    isLadder?: BoolWithAggregatesFilter | boolean
    winnerId?: IntWithAggregatesFilter | number
    loserId?: IntWithAggregatesFilter | number
    createdAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type FollowUserWhereInput = {
    AND?: Enumerable<FollowUserWhereInput>
    OR?: Enumerable<FollowUserWhereInput>
    NOT?: Enumerable<FollowUserWhereInput>
    id?: IntFilter | number
    followerId?: IntFilter | number
    followeeId?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    follewer?: XOR<UserRelationFilter, UserWhereInput>
    follewee?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type FollowUserOrderByWithRelationInput = {
    id?: SortOrder
    followerId?: SortOrder
    followeeId?: SortOrder
    createdAt?: SortOrder
    follewer?: UserOrderByWithRelationInput
    follewee?: UserOrderByWithRelationInput
  }

  export type FollowUserWhereUniqueInput = {
    id?: number
  }

  export type FollowUserOrderByWithAggregationInput = {
    id?: SortOrder
    followerId?: SortOrder
    followeeId?: SortOrder
    createdAt?: SortOrder
    _count?: FollowUserCountOrderByAggregateInput
    _avg?: FollowUserAvgOrderByAggregateInput
    _max?: FollowUserMaxOrderByAggregateInput
    _min?: FollowUserMinOrderByAggregateInput
    _sum?: FollowUserSumOrderByAggregateInput
  }

  export type FollowUserScalarWhereWithAggregatesInput = {
    AND?: Enumerable<FollowUserScalarWhereWithAggregatesInput>
    OR?: Enumerable<FollowUserScalarWhereWithAggregatesInput>
    NOT?: Enumerable<FollowUserScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    followerId?: IntWithAggregatesFilter | number
    followeeId?: IntWithAggregatesFilter | number
    createdAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type BlockUserWhereInput = {
    AND?: Enumerable<BlockUserWhereInput>
    OR?: Enumerable<BlockUserWhereInput>
    NOT?: Enumerable<BlockUserWhereInput>
    id?: IntFilter | number
    blockerId?: IntFilter | number
    blockedId?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    blocker?: XOR<UserRelationFilter, UserWhereInput>
    blocked?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type BlockUserOrderByWithRelationInput = {
    id?: SortOrder
    blockerId?: SortOrder
    blockedId?: SortOrder
    createdAt?: SortOrder
    blocker?: UserOrderByWithRelationInput
    blocked?: UserOrderByWithRelationInput
  }

  export type BlockUserWhereUniqueInput = {
    id?: number
  }

  export type BlockUserOrderByWithAggregationInput = {
    id?: SortOrder
    blockerId?: SortOrder
    blockedId?: SortOrder
    createdAt?: SortOrder
    _count?: BlockUserCountOrderByAggregateInput
    _avg?: BlockUserAvgOrderByAggregateInput
    _max?: BlockUserMaxOrderByAggregateInput
    _min?: BlockUserMinOrderByAggregateInput
    _sum?: BlockUserSumOrderByAggregateInput
  }

  export type BlockUserScalarWhereWithAggregatesInput = {
    AND?: Enumerable<BlockUserScalarWhereWithAggregatesInput>
    OR?: Enumerable<BlockUserScalarWhereWithAggregatesInput>
    NOT?: Enumerable<BlockUserScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    blockerId?: IntWithAggregatesFilter | number
    blockedId?: IntWithAggregatesFilter | number
    createdAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type ChannelWhereInput = {
    AND?: Enumerable<ChannelWhereInput>
    OR?: Enumerable<ChannelWhereInput>
    NOT?: Enumerable<ChannelWhereInput>
    id?: IntFilter | number
    title?: StringFilter | string
    channelCode?: StringFilter | string
    password?: StringNullableFilter | string | null
    idPublic?: BoolFilter | boolean
    isDm?: BoolFilter | boolean
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeNullableFilter | Date | string | null
    deletedAt?: DateTimeNullableFilter | Date | string | null
    users?: Channel_UserListRelationFilter
    messages?: MessageListRelationFilter
  }

  export type ChannelOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    channelCode?: SortOrder
    password?: SortOrder
    idPublic?: SortOrder
    isDm?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    users?: Channel_UserOrderByRelationAggregateInput
    messages?: MessageOrderByRelationAggregateInput
  }

  export type ChannelWhereUniqueInput = {
    id?: number
    channelCode?: string
  }

  export type ChannelOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    channelCode?: SortOrder
    password?: SortOrder
    idPublic?: SortOrder
    isDm?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    _count?: ChannelCountOrderByAggregateInput
    _avg?: ChannelAvgOrderByAggregateInput
    _max?: ChannelMaxOrderByAggregateInput
    _min?: ChannelMinOrderByAggregateInput
    _sum?: ChannelSumOrderByAggregateInput
  }

  export type ChannelScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ChannelScalarWhereWithAggregatesInput>
    OR?: Enumerable<ChannelScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ChannelScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    title?: StringWithAggregatesFilter | string
    channelCode?: StringWithAggregatesFilter | string
    password?: StringNullableWithAggregatesFilter | string | null
    idPublic?: BoolWithAggregatesFilter | boolean
    isDm?: BoolWithAggregatesFilter | boolean
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
    deletedAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
  }

  export type Channel_UserWhereInput = {
    AND?: Enumerable<Channel_UserWhereInput>
    OR?: Enumerable<Channel_UserWhereInput>
    NOT?: Enumerable<Channel_UserWhereInput>
    id?: IntFilter | number
    channelId?: IntFilter | number
    userId?: IntFilter | number
    userType?: IntFilter | number
    status?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    channel?: XOR<ChannelRelationFilter, ChannelWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type Channel_UserOrderByWithRelationInput = {
    id?: SortOrder
    channelId?: SortOrder
    userId?: SortOrder
    userType?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    channel?: ChannelOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type Channel_UserWhereUniqueInput = {
    id?: number
  }

  export type Channel_UserOrderByWithAggregationInput = {
    id?: SortOrder
    channelId?: SortOrder
    userId?: SortOrder
    userType?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: Channel_UserCountOrderByAggregateInput
    _avg?: Channel_UserAvgOrderByAggregateInput
    _max?: Channel_UserMaxOrderByAggregateInput
    _min?: Channel_UserMinOrderByAggregateInput
    _sum?: Channel_UserSumOrderByAggregateInput
  }

  export type Channel_UserScalarWhereWithAggregatesInput = {
    AND?: Enumerable<Channel_UserScalarWhereWithAggregatesInput>
    OR?: Enumerable<Channel_UserScalarWhereWithAggregatesInput>
    NOT?: Enumerable<Channel_UserScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    channelId?: IntWithAggregatesFilter | number
    userId?: IntWithAggregatesFilter | number
    userType?: IntWithAggregatesFilter | number
    status?: IntWithAggregatesFilter | number
    createdAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type MessageWhereInput = {
    AND?: Enumerable<MessageWhereInput>
    OR?: Enumerable<MessageWhereInput>
    NOT?: Enumerable<MessageWhereInput>
    id?: IntFilter | number
    senderId?: IntFilter | number
    channelId?: IntFilter | number
    text?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    sender?: XOR<UserRelationFilter, UserWhereInput>
    channel?: XOR<ChannelRelationFilter, ChannelWhereInput>
  }

  export type MessageOrderByWithRelationInput = {
    id?: SortOrder
    senderId?: SortOrder
    channelId?: SortOrder
    text?: SortOrder
    createdAt?: SortOrder
    sender?: UserOrderByWithRelationInput
    channel?: ChannelOrderByWithRelationInput
  }

  export type MessageWhereUniqueInput = {
    id?: number
  }

  export type MessageOrderByWithAggregationInput = {
    id?: SortOrder
    senderId?: SortOrder
    channelId?: SortOrder
    text?: SortOrder
    createdAt?: SortOrder
    _count?: MessageCountOrderByAggregateInput
    _avg?: MessageAvgOrderByAggregateInput
    _max?: MessageMaxOrderByAggregateInput
    _min?: MessageMinOrderByAggregateInput
    _sum?: MessageSumOrderByAggregateInput
  }

  export type MessageScalarWhereWithAggregatesInput = {
    AND?: Enumerable<MessageScalarWhereWithAggregatesInput>
    OR?: Enumerable<MessageScalarWhereWithAggregatesInput>
    NOT?: Enumerable<MessageScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    senderId?: IntWithAggregatesFilter | number
    channelId?: IntWithAggregatesFilter | number
    text?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type AchievementWhereInput = {
    AND?: Enumerable<AchievementWhereInput>
    OR?: Enumerable<AchievementWhereInput>
    NOT?: Enumerable<AchievementWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    description?: StringFilter | string
    users?: Achievement_UserListRelationFilter
  }

  export type AchievementOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    users?: Achievement_UserOrderByRelationAggregateInput
  }

  export type AchievementWhereUniqueInput = {
    id?: number
  }

  export type AchievementOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    _count?: AchievementCountOrderByAggregateInput
    _avg?: AchievementAvgOrderByAggregateInput
    _max?: AchievementMaxOrderByAggregateInput
    _min?: AchievementMinOrderByAggregateInput
    _sum?: AchievementSumOrderByAggregateInput
  }

  export type AchievementScalarWhereWithAggregatesInput = {
    AND?: Enumerable<AchievementScalarWhereWithAggregatesInput>
    OR?: Enumerable<AchievementScalarWhereWithAggregatesInput>
    NOT?: Enumerable<AchievementScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
    description?: StringWithAggregatesFilter | string
  }

  export type Achievement_UserWhereInput = {
    AND?: Enumerable<Achievement_UserWhereInput>
    OR?: Enumerable<Achievement_UserWhereInput>
    NOT?: Enumerable<Achievement_UserWhereInput>
    id?: IntFilter | number
    userId?: IntFilter | number
    achievementId?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    achievement?: XOR<AchievementRelationFilter, AchievementWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type Achievement_UserOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    achievementId?: SortOrder
    createdAt?: SortOrder
    achievement?: AchievementOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type Achievement_UserWhereUniqueInput = {
    id?: number
  }

  export type Achievement_UserOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    achievementId?: SortOrder
    createdAt?: SortOrder
    _count?: Achievement_UserCountOrderByAggregateInput
    _avg?: Achievement_UserAvgOrderByAggregateInput
    _max?: Achievement_UserMaxOrderByAggregateInput
    _min?: Achievement_UserMinOrderByAggregateInput
    _sum?: Achievement_UserSumOrderByAggregateInput
  }

  export type Achievement_UserScalarWhereWithAggregatesInput = {
    AND?: Enumerable<Achievement_UserScalarWhereWithAggregatesInput>
    OR?: Enumerable<Achievement_UserScalarWhereWithAggregatesInput>
    NOT?: Enumerable<Achievement_UserScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    userId?: IntWithAggregatesFilter | number
    achievementId?: IntWithAggregatesFilter | number
    createdAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type UserCreateInput = {
    imageUrl?: string | null
    nickname?: string | null
    rank?: number
    isTwoFactor?: boolean
    ftId: string
    ftUsername?: string | null
    ftAccessToken?: string | null
    ftRefreshToken?: string | null
    ftAccessExpiresAt?: Date | string | null
    ftRefreshExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
    winLogs?: GameResultCreateNestedManyWithoutWinnerInput
    loseLogs?: GameResultCreateNestedManyWithoutLoserInput
    followers?: FollowUserCreateNestedManyWithoutFollewerInput
    followees?: FollowUserCreateNestedManyWithoutFolleweeInput
    blockers?: BlockUserCreateNestedManyWithoutBlockerInput
    blockeds?: BlockUserCreateNestedManyWithoutBlockedInput
    channels?: Channel_UserCreateNestedManyWithoutUserInput
    achievements?: Achievement_UserCreateNestedManyWithoutUserInput
    messages?: MessageCreateNestedManyWithoutSenderInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    imageUrl?: string | null
    nickname?: string | null
    rank?: number
    isTwoFactor?: boolean
    ftId: string
    ftUsername?: string | null
    ftAccessToken?: string | null
    ftRefreshToken?: string | null
    ftAccessExpiresAt?: Date | string | null
    ftRefreshExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
    winLogs?: GameResultUncheckedCreateNestedManyWithoutWinnerInput
    loseLogs?: GameResultUncheckedCreateNestedManyWithoutLoserInput
    followers?: FollowUserUncheckedCreateNestedManyWithoutFollewerInput
    followees?: FollowUserUncheckedCreateNestedManyWithoutFolleweeInput
    blockers?: BlockUserUncheckedCreateNestedManyWithoutBlockerInput
    blockeds?: BlockUserUncheckedCreateNestedManyWithoutBlockedInput
    channels?: Channel_UserUncheckedCreateNestedManyWithoutUserInput
    achievements?: Achievement_UserUncheckedCreateNestedManyWithoutUserInput
    messages?: MessageUncheckedCreateNestedManyWithoutSenderInput
  }

  export type UserUpdateInput = {
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    rank?: IntFieldUpdateOperationsInput | number
    isTwoFactor?: BoolFieldUpdateOperationsInput | boolean
    ftId?: StringFieldUpdateOperationsInput | string
    ftUsername?: NullableStringFieldUpdateOperationsInput | string | null
    ftAccessToken?: NullableStringFieldUpdateOperationsInput | string | null
    ftRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    ftAccessExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ftRefreshExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    winLogs?: GameResultUpdateManyWithoutWinnerNestedInput
    loseLogs?: GameResultUpdateManyWithoutLoserNestedInput
    followers?: FollowUserUpdateManyWithoutFollewerNestedInput
    followees?: FollowUserUpdateManyWithoutFolleweeNestedInput
    blockers?: BlockUserUpdateManyWithoutBlockerNestedInput
    blockeds?: BlockUserUpdateManyWithoutBlockedNestedInput
    channels?: Channel_UserUpdateManyWithoutUserNestedInput
    achievements?: Achievement_UserUpdateManyWithoutUserNestedInput
    messages?: MessageUpdateManyWithoutSenderNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    rank?: IntFieldUpdateOperationsInput | number
    isTwoFactor?: BoolFieldUpdateOperationsInput | boolean
    ftId?: StringFieldUpdateOperationsInput | string
    ftUsername?: NullableStringFieldUpdateOperationsInput | string | null
    ftAccessToken?: NullableStringFieldUpdateOperationsInput | string | null
    ftRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    ftAccessExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ftRefreshExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    winLogs?: GameResultUncheckedUpdateManyWithoutWinnerNestedInput
    loseLogs?: GameResultUncheckedUpdateManyWithoutLoserNestedInput
    followers?: FollowUserUncheckedUpdateManyWithoutFollewerNestedInput
    followees?: FollowUserUncheckedUpdateManyWithoutFolleweeNestedInput
    blockers?: BlockUserUncheckedUpdateManyWithoutBlockerNestedInput
    blockeds?: BlockUserUncheckedUpdateManyWithoutBlockedNestedInput
    channels?: Channel_UserUncheckedUpdateManyWithoutUserNestedInput
    achievements?: Achievement_UserUncheckedUpdateManyWithoutUserNestedInput
    messages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    imageUrl?: string | null
    nickname?: string | null
    rank?: number
    isTwoFactor?: boolean
    ftId: string
    ftUsername?: string | null
    ftAccessToken?: string | null
    ftRefreshToken?: string | null
    ftAccessExpiresAt?: Date | string | null
    ftRefreshExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    rank?: IntFieldUpdateOperationsInput | number
    isTwoFactor?: BoolFieldUpdateOperationsInput | boolean
    ftId?: StringFieldUpdateOperationsInput | string
    ftUsername?: NullableStringFieldUpdateOperationsInput | string | null
    ftAccessToken?: NullableStringFieldUpdateOperationsInput | string | null
    ftRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    ftAccessExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ftRefreshExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    rank?: IntFieldUpdateOperationsInput | number
    isTwoFactor?: BoolFieldUpdateOperationsInput | boolean
    ftId?: StringFieldUpdateOperationsInput | string
    ftUsername?: NullableStringFieldUpdateOperationsInput | string | null
    ftAccessToken?: NullableStringFieldUpdateOperationsInput | string | null
    ftRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    ftAccessExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ftRefreshExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type GameResultCreateInput = {
    score: number
    isLadder: boolean
    createdAt?: Date | string
    winner: UserCreateNestedOneWithoutWinLogsInput
    loser: UserCreateNestedOneWithoutLoseLogsInput
  }

  export type GameResultUncheckedCreateInput = {
    id?: number
    score: number
    isLadder: boolean
    winnerId: number
    loserId: number
    createdAt?: Date | string
  }

  export type GameResultUpdateInput = {
    score?: IntFieldUpdateOperationsInput | number
    isLadder?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    winner?: UserUpdateOneRequiredWithoutWinLogsNestedInput
    loser?: UserUpdateOneRequiredWithoutLoseLogsNestedInput
  }

  export type GameResultUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
    isLadder?: BoolFieldUpdateOperationsInput | boolean
    winnerId?: IntFieldUpdateOperationsInput | number
    loserId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameResultCreateManyInput = {
    id?: number
    score: number
    isLadder: boolean
    winnerId: number
    loserId: number
    createdAt?: Date | string
  }

  export type GameResultUpdateManyMutationInput = {
    score?: IntFieldUpdateOperationsInput | number
    isLadder?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameResultUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
    isLadder?: BoolFieldUpdateOperationsInput | boolean
    winnerId?: IntFieldUpdateOperationsInput | number
    loserId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowUserCreateInput = {
    createdAt?: Date | string
    follewer: UserCreateNestedOneWithoutFollowersInput
    follewee: UserCreateNestedOneWithoutFolloweesInput
  }

  export type FollowUserUncheckedCreateInput = {
    id?: number
    followerId: number
    followeeId: number
    createdAt?: Date | string
  }

  export type FollowUserUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    follewer?: UserUpdateOneRequiredWithoutFollowersNestedInput
    follewee?: UserUpdateOneRequiredWithoutFolloweesNestedInput
  }

  export type FollowUserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    followerId?: IntFieldUpdateOperationsInput | number
    followeeId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowUserCreateManyInput = {
    id?: number
    followerId: number
    followeeId: number
    createdAt?: Date | string
  }

  export type FollowUserUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowUserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    followerId?: IntFieldUpdateOperationsInput | number
    followeeId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlockUserCreateInput = {
    createdAt?: Date | string
    blocker: UserCreateNestedOneWithoutBlockersInput
    blocked: UserCreateNestedOneWithoutBlockedsInput
  }

  export type BlockUserUncheckedCreateInput = {
    id?: number
    blockerId: number
    blockedId: number
    createdAt?: Date | string
  }

  export type BlockUserUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    blocker?: UserUpdateOneRequiredWithoutBlockersNestedInput
    blocked?: UserUpdateOneRequiredWithoutBlockedsNestedInput
  }

  export type BlockUserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    blockerId?: IntFieldUpdateOperationsInput | number
    blockedId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlockUserCreateManyInput = {
    id?: number
    blockerId: number
    blockedId: number
    createdAt?: Date | string
  }

  export type BlockUserUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlockUserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    blockerId?: IntFieldUpdateOperationsInput | number
    blockedId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChannelCreateInput = {
    title: string
    channelCode: string
    password?: string | null
    idPublic: boolean
    isDm: boolean
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
    users?: Channel_UserCreateNestedManyWithoutChannelInput
    messages?: MessageCreateNestedManyWithoutChannelInput
  }

  export type ChannelUncheckedCreateInput = {
    id?: number
    title: string
    channelCode: string
    password?: string | null
    idPublic: boolean
    isDm: boolean
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
    users?: Channel_UserUncheckedCreateNestedManyWithoutChannelInput
    messages?: MessageUncheckedCreateNestedManyWithoutChannelInput
  }

  export type ChannelUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    channelCode?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    idPublic?: BoolFieldUpdateOperationsInput | boolean
    isDm?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: Channel_UserUpdateManyWithoutChannelNestedInput
    messages?: MessageUpdateManyWithoutChannelNestedInput
  }

  export type ChannelUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    channelCode?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    idPublic?: BoolFieldUpdateOperationsInput | boolean
    isDm?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: Channel_UserUncheckedUpdateManyWithoutChannelNestedInput
    messages?: MessageUncheckedUpdateManyWithoutChannelNestedInput
  }

  export type ChannelCreateManyInput = {
    id?: number
    title: string
    channelCode: string
    password?: string | null
    idPublic: boolean
    isDm: boolean
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
  }

  export type ChannelUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    channelCode?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    idPublic?: BoolFieldUpdateOperationsInput | boolean
    isDm?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ChannelUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    channelCode?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    idPublic?: BoolFieldUpdateOperationsInput | boolean
    isDm?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type Channel_UserCreateInput = {
    userType: number
    status: number
    createdAt?: Date | string
    channel: ChannelCreateNestedOneWithoutUsersInput
    user: UserCreateNestedOneWithoutChannelsInput
  }

  export type Channel_UserUncheckedCreateInput = {
    id?: number
    channelId: number
    userId: number
    userType: number
    status: number
    createdAt?: Date | string
  }

  export type Channel_UserUpdateInput = {
    userType?: IntFieldUpdateOperationsInput | number
    status?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    channel?: ChannelUpdateOneRequiredWithoutUsersNestedInput
    user?: UserUpdateOneRequiredWithoutChannelsNestedInput
  }

  export type Channel_UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    channelId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    userType?: IntFieldUpdateOperationsInput | number
    status?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Channel_UserCreateManyInput = {
    id?: number
    channelId: number
    userId: number
    userType: number
    status: number
    createdAt?: Date | string
  }

  export type Channel_UserUpdateManyMutationInput = {
    userType?: IntFieldUpdateOperationsInput | number
    status?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Channel_UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    channelId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    userType?: IntFieldUpdateOperationsInput | number
    status?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateInput = {
    text: string
    createdAt?: Date | string
    sender: UserCreateNestedOneWithoutMessagesInput
    channel: ChannelCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateInput = {
    id?: number
    senderId: number
    channelId: number
    text: string
    createdAt?: Date | string
  }

  export type MessageUpdateInput = {
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sender?: UserUpdateOneRequiredWithoutMessagesNestedInput
    channel?: ChannelUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    senderId?: IntFieldUpdateOperationsInput | number
    channelId?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateManyInput = {
    id?: number
    senderId: number
    channelId: number
    text: string
    createdAt?: Date | string
  }

  export type MessageUpdateManyMutationInput = {
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    senderId?: IntFieldUpdateOperationsInput | number
    channelId?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AchievementCreateInput = {
    name: string
    description: string
    users?: Achievement_UserCreateNestedManyWithoutAchievementInput
  }

  export type AchievementUncheckedCreateInput = {
    id?: number
    name: string
    description: string
    users?: Achievement_UserUncheckedCreateNestedManyWithoutAchievementInput
  }

  export type AchievementUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    users?: Achievement_UserUpdateManyWithoutAchievementNestedInput
  }

  export type AchievementUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    users?: Achievement_UserUncheckedUpdateManyWithoutAchievementNestedInput
  }

  export type AchievementCreateManyInput = {
    id?: number
    name: string
    description: string
  }

  export type AchievementUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type AchievementUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type Achievement_UserCreateInput = {
    createdAt?: Date | string
    achievement: AchievementCreateNestedOneWithoutUsersInput
    user: UserCreateNestedOneWithoutAchievementsInput
  }

  export type Achievement_UserUncheckedCreateInput = {
    id?: number
    userId: number
    achievementId: number
    createdAt?: Date | string
  }

  export type Achievement_UserUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    achievement?: AchievementUpdateOneRequiredWithoutUsersNestedInput
    user?: UserUpdateOneRequiredWithoutAchievementsNestedInput
  }

  export type Achievement_UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    achievementId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Achievement_UserCreateManyInput = {
    id?: number
    userId: number
    achievementId: number
    createdAt?: Date | string
  }

  export type Achievement_UserUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Achievement_UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    achievementId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter | string | null
  }

  export type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type DateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type GameResultListRelationFilter = {
    every?: GameResultWhereInput
    some?: GameResultWhereInput
    none?: GameResultWhereInput
  }

  export type FollowUserListRelationFilter = {
    every?: FollowUserWhereInput
    some?: FollowUserWhereInput
    none?: FollowUserWhereInput
  }

  export type BlockUserListRelationFilter = {
    every?: BlockUserWhereInput
    some?: BlockUserWhereInput
    none?: BlockUserWhereInput
  }

  export type Channel_UserListRelationFilter = {
    every?: Channel_UserWhereInput
    some?: Channel_UserWhereInput
    none?: Channel_UserWhereInput
  }

  export type Achievement_UserListRelationFilter = {
    every?: Achievement_UserWhereInput
    some?: Achievement_UserWhereInput
    none?: Achievement_UserWhereInput
  }

  export type MessageListRelationFilter = {
    every?: MessageWhereInput
    some?: MessageWhereInput
    none?: MessageWhereInput
  }

  export type GameResultOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FollowUserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BlockUserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type Channel_UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type Achievement_UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    imageUrl?: SortOrder
    nickname?: SortOrder
    rank?: SortOrder
    isTwoFactor?: SortOrder
    ftId?: SortOrder
    ftUsername?: SortOrder
    ftAccessToken?: SortOrder
    ftRefreshToken?: SortOrder
    ftAccessExpiresAt?: SortOrder
    ftRefreshExpiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
    rank?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    imageUrl?: SortOrder
    nickname?: SortOrder
    rank?: SortOrder
    isTwoFactor?: SortOrder
    ftId?: SortOrder
    ftUsername?: SortOrder
    ftAccessToken?: SortOrder
    ftRefreshToken?: SortOrder
    ftAccessExpiresAt?: SortOrder
    ftRefreshExpiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    imageUrl?: SortOrder
    nickname?: SortOrder
    rank?: SortOrder
    isTwoFactor?: SortOrder
    ftId?: SortOrder
    ftUsername?: SortOrder
    ftAccessToken?: SortOrder
    ftRefreshToken?: SortOrder
    ftAccessExpiresAt?: SortOrder
    ftRefreshExpiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
    rank?: SortOrder
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type BoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type DateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type GameResultCountOrderByAggregateInput = {
    id?: SortOrder
    score?: SortOrder
    isLadder?: SortOrder
    winnerId?: SortOrder
    loserId?: SortOrder
    createdAt?: SortOrder
  }

  export type GameResultAvgOrderByAggregateInput = {
    id?: SortOrder
    score?: SortOrder
    winnerId?: SortOrder
    loserId?: SortOrder
  }

  export type GameResultMaxOrderByAggregateInput = {
    id?: SortOrder
    score?: SortOrder
    isLadder?: SortOrder
    winnerId?: SortOrder
    loserId?: SortOrder
    createdAt?: SortOrder
  }

  export type GameResultMinOrderByAggregateInput = {
    id?: SortOrder
    score?: SortOrder
    isLadder?: SortOrder
    winnerId?: SortOrder
    loserId?: SortOrder
    createdAt?: SortOrder
  }

  export type GameResultSumOrderByAggregateInput = {
    id?: SortOrder
    score?: SortOrder
    winnerId?: SortOrder
    loserId?: SortOrder
  }

  export type FollowUserCountOrderByAggregateInput = {
    id?: SortOrder
    followerId?: SortOrder
    followeeId?: SortOrder
    createdAt?: SortOrder
  }

  export type FollowUserAvgOrderByAggregateInput = {
    id?: SortOrder
    followerId?: SortOrder
    followeeId?: SortOrder
  }

  export type FollowUserMaxOrderByAggregateInput = {
    id?: SortOrder
    followerId?: SortOrder
    followeeId?: SortOrder
    createdAt?: SortOrder
  }

  export type FollowUserMinOrderByAggregateInput = {
    id?: SortOrder
    followerId?: SortOrder
    followeeId?: SortOrder
    createdAt?: SortOrder
  }

  export type FollowUserSumOrderByAggregateInput = {
    id?: SortOrder
    followerId?: SortOrder
    followeeId?: SortOrder
  }

  export type BlockUserCountOrderByAggregateInput = {
    id?: SortOrder
    blockerId?: SortOrder
    blockedId?: SortOrder
    createdAt?: SortOrder
  }

  export type BlockUserAvgOrderByAggregateInput = {
    id?: SortOrder
    blockerId?: SortOrder
    blockedId?: SortOrder
  }

  export type BlockUserMaxOrderByAggregateInput = {
    id?: SortOrder
    blockerId?: SortOrder
    blockedId?: SortOrder
    createdAt?: SortOrder
  }

  export type BlockUserMinOrderByAggregateInput = {
    id?: SortOrder
    blockerId?: SortOrder
    blockedId?: SortOrder
    createdAt?: SortOrder
  }

  export type BlockUserSumOrderByAggregateInput = {
    id?: SortOrder
    blockerId?: SortOrder
    blockedId?: SortOrder
  }

  export type ChannelCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    channelCode?: SortOrder
    password?: SortOrder
    idPublic?: SortOrder
    isDm?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type ChannelAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ChannelMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    channelCode?: SortOrder
    password?: SortOrder
    idPublic?: SortOrder
    isDm?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type ChannelMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    channelCode?: SortOrder
    password?: SortOrder
    idPublic?: SortOrder
    isDm?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type ChannelSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ChannelRelationFilter = {
    is?: ChannelWhereInput
    isNot?: ChannelWhereInput
  }

  export type Channel_UserCountOrderByAggregateInput = {
    id?: SortOrder
    channelId?: SortOrder
    userId?: SortOrder
    userType?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type Channel_UserAvgOrderByAggregateInput = {
    id?: SortOrder
    channelId?: SortOrder
    userId?: SortOrder
    userType?: SortOrder
    status?: SortOrder
  }

  export type Channel_UserMaxOrderByAggregateInput = {
    id?: SortOrder
    channelId?: SortOrder
    userId?: SortOrder
    userType?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type Channel_UserMinOrderByAggregateInput = {
    id?: SortOrder
    channelId?: SortOrder
    userId?: SortOrder
    userType?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type Channel_UserSumOrderByAggregateInput = {
    id?: SortOrder
    channelId?: SortOrder
    userId?: SortOrder
    userType?: SortOrder
    status?: SortOrder
  }

  export type MessageCountOrderByAggregateInput = {
    id?: SortOrder
    senderId?: SortOrder
    channelId?: SortOrder
    text?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageAvgOrderByAggregateInput = {
    id?: SortOrder
    senderId?: SortOrder
    channelId?: SortOrder
  }

  export type MessageMaxOrderByAggregateInput = {
    id?: SortOrder
    senderId?: SortOrder
    channelId?: SortOrder
    text?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageMinOrderByAggregateInput = {
    id?: SortOrder
    senderId?: SortOrder
    channelId?: SortOrder
    text?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageSumOrderByAggregateInput = {
    id?: SortOrder
    senderId?: SortOrder
    channelId?: SortOrder
  }

  export type AchievementCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
  }

  export type AchievementAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AchievementMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
  }

  export type AchievementMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
  }

  export type AchievementSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AchievementRelationFilter = {
    is?: AchievementWhereInput
    isNot?: AchievementWhereInput
  }

  export type Achievement_UserCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    achievementId?: SortOrder
    createdAt?: SortOrder
  }

  export type Achievement_UserAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    achievementId?: SortOrder
  }

  export type Achievement_UserMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    achievementId?: SortOrder
    createdAt?: SortOrder
  }

  export type Achievement_UserMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    achievementId?: SortOrder
    createdAt?: SortOrder
  }

  export type Achievement_UserSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    achievementId?: SortOrder
  }

  export type GameResultCreateNestedManyWithoutWinnerInput = {
    create?: XOR<Enumerable<GameResultCreateWithoutWinnerInput>, Enumerable<GameResultUncheckedCreateWithoutWinnerInput>>
    connectOrCreate?: Enumerable<GameResultCreateOrConnectWithoutWinnerInput>
    createMany?: GameResultCreateManyWinnerInputEnvelope
    connect?: Enumerable<GameResultWhereUniqueInput>
  }

  export type GameResultCreateNestedManyWithoutLoserInput = {
    create?: XOR<Enumerable<GameResultCreateWithoutLoserInput>, Enumerable<GameResultUncheckedCreateWithoutLoserInput>>
    connectOrCreate?: Enumerable<GameResultCreateOrConnectWithoutLoserInput>
    createMany?: GameResultCreateManyLoserInputEnvelope
    connect?: Enumerable<GameResultWhereUniqueInput>
  }

  export type FollowUserCreateNestedManyWithoutFollewerInput = {
    create?: XOR<Enumerable<FollowUserCreateWithoutFollewerInput>, Enumerable<FollowUserUncheckedCreateWithoutFollewerInput>>
    connectOrCreate?: Enumerable<FollowUserCreateOrConnectWithoutFollewerInput>
    createMany?: FollowUserCreateManyFollewerInputEnvelope
    connect?: Enumerable<FollowUserWhereUniqueInput>
  }

  export type FollowUserCreateNestedManyWithoutFolleweeInput = {
    create?: XOR<Enumerable<FollowUserCreateWithoutFolleweeInput>, Enumerable<FollowUserUncheckedCreateWithoutFolleweeInput>>
    connectOrCreate?: Enumerable<FollowUserCreateOrConnectWithoutFolleweeInput>
    createMany?: FollowUserCreateManyFolleweeInputEnvelope
    connect?: Enumerable<FollowUserWhereUniqueInput>
  }

  export type BlockUserCreateNestedManyWithoutBlockerInput = {
    create?: XOR<Enumerable<BlockUserCreateWithoutBlockerInput>, Enumerable<BlockUserUncheckedCreateWithoutBlockerInput>>
    connectOrCreate?: Enumerable<BlockUserCreateOrConnectWithoutBlockerInput>
    createMany?: BlockUserCreateManyBlockerInputEnvelope
    connect?: Enumerable<BlockUserWhereUniqueInput>
  }

  export type BlockUserCreateNestedManyWithoutBlockedInput = {
    create?: XOR<Enumerable<BlockUserCreateWithoutBlockedInput>, Enumerable<BlockUserUncheckedCreateWithoutBlockedInput>>
    connectOrCreate?: Enumerable<BlockUserCreateOrConnectWithoutBlockedInput>
    createMany?: BlockUserCreateManyBlockedInputEnvelope
    connect?: Enumerable<BlockUserWhereUniqueInput>
  }

  export type Channel_UserCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<Channel_UserCreateWithoutUserInput>, Enumerable<Channel_UserUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<Channel_UserCreateOrConnectWithoutUserInput>
    createMany?: Channel_UserCreateManyUserInputEnvelope
    connect?: Enumerable<Channel_UserWhereUniqueInput>
  }

  export type Achievement_UserCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<Achievement_UserCreateWithoutUserInput>, Enumerable<Achievement_UserUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<Achievement_UserCreateOrConnectWithoutUserInput>
    createMany?: Achievement_UserCreateManyUserInputEnvelope
    connect?: Enumerable<Achievement_UserWhereUniqueInput>
  }

  export type MessageCreateNestedManyWithoutSenderInput = {
    create?: XOR<Enumerable<MessageCreateWithoutSenderInput>, Enumerable<MessageUncheckedCreateWithoutSenderInput>>
    connectOrCreate?: Enumerable<MessageCreateOrConnectWithoutSenderInput>
    createMany?: MessageCreateManySenderInputEnvelope
    connect?: Enumerable<MessageWhereUniqueInput>
  }

  export type GameResultUncheckedCreateNestedManyWithoutWinnerInput = {
    create?: XOR<Enumerable<GameResultCreateWithoutWinnerInput>, Enumerable<GameResultUncheckedCreateWithoutWinnerInput>>
    connectOrCreate?: Enumerable<GameResultCreateOrConnectWithoutWinnerInput>
    createMany?: GameResultCreateManyWinnerInputEnvelope
    connect?: Enumerable<GameResultWhereUniqueInput>
  }

  export type GameResultUncheckedCreateNestedManyWithoutLoserInput = {
    create?: XOR<Enumerable<GameResultCreateWithoutLoserInput>, Enumerable<GameResultUncheckedCreateWithoutLoserInput>>
    connectOrCreate?: Enumerable<GameResultCreateOrConnectWithoutLoserInput>
    createMany?: GameResultCreateManyLoserInputEnvelope
    connect?: Enumerable<GameResultWhereUniqueInput>
  }

  export type FollowUserUncheckedCreateNestedManyWithoutFollewerInput = {
    create?: XOR<Enumerable<FollowUserCreateWithoutFollewerInput>, Enumerable<FollowUserUncheckedCreateWithoutFollewerInput>>
    connectOrCreate?: Enumerable<FollowUserCreateOrConnectWithoutFollewerInput>
    createMany?: FollowUserCreateManyFollewerInputEnvelope
    connect?: Enumerable<FollowUserWhereUniqueInput>
  }

  export type FollowUserUncheckedCreateNestedManyWithoutFolleweeInput = {
    create?: XOR<Enumerable<FollowUserCreateWithoutFolleweeInput>, Enumerable<FollowUserUncheckedCreateWithoutFolleweeInput>>
    connectOrCreate?: Enumerable<FollowUserCreateOrConnectWithoutFolleweeInput>
    createMany?: FollowUserCreateManyFolleweeInputEnvelope
    connect?: Enumerable<FollowUserWhereUniqueInput>
  }

  export type BlockUserUncheckedCreateNestedManyWithoutBlockerInput = {
    create?: XOR<Enumerable<BlockUserCreateWithoutBlockerInput>, Enumerable<BlockUserUncheckedCreateWithoutBlockerInput>>
    connectOrCreate?: Enumerable<BlockUserCreateOrConnectWithoutBlockerInput>
    createMany?: BlockUserCreateManyBlockerInputEnvelope
    connect?: Enumerable<BlockUserWhereUniqueInput>
  }

  export type BlockUserUncheckedCreateNestedManyWithoutBlockedInput = {
    create?: XOR<Enumerable<BlockUserCreateWithoutBlockedInput>, Enumerable<BlockUserUncheckedCreateWithoutBlockedInput>>
    connectOrCreate?: Enumerable<BlockUserCreateOrConnectWithoutBlockedInput>
    createMany?: BlockUserCreateManyBlockedInputEnvelope
    connect?: Enumerable<BlockUserWhereUniqueInput>
  }

  export type Channel_UserUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<Channel_UserCreateWithoutUserInput>, Enumerable<Channel_UserUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<Channel_UserCreateOrConnectWithoutUserInput>
    createMany?: Channel_UserCreateManyUserInputEnvelope
    connect?: Enumerable<Channel_UserWhereUniqueInput>
  }

  export type Achievement_UserUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<Achievement_UserCreateWithoutUserInput>, Enumerable<Achievement_UserUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<Achievement_UserCreateOrConnectWithoutUserInput>
    createMany?: Achievement_UserCreateManyUserInputEnvelope
    connect?: Enumerable<Achievement_UserWhereUniqueInput>
  }

  export type MessageUncheckedCreateNestedManyWithoutSenderInput = {
    create?: XOR<Enumerable<MessageCreateWithoutSenderInput>, Enumerable<MessageUncheckedCreateWithoutSenderInput>>
    connectOrCreate?: Enumerable<MessageCreateOrConnectWithoutSenderInput>
    createMany?: MessageCreateManySenderInputEnvelope
    connect?: Enumerable<MessageWhereUniqueInput>
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type GameResultUpdateManyWithoutWinnerNestedInput = {
    create?: XOR<Enumerable<GameResultCreateWithoutWinnerInput>, Enumerable<GameResultUncheckedCreateWithoutWinnerInput>>
    connectOrCreate?: Enumerable<GameResultCreateOrConnectWithoutWinnerInput>
    upsert?: Enumerable<GameResultUpsertWithWhereUniqueWithoutWinnerInput>
    createMany?: GameResultCreateManyWinnerInputEnvelope
    set?: Enumerable<GameResultWhereUniqueInput>
    disconnect?: Enumerable<GameResultWhereUniqueInput>
    delete?: Enumerable<GameResultWhereUniqueInput>
    connect?: Enumerable<GameResultWhereUniqueInput>
    update?: Enumerable<GameResultUpdateWithWhereUniqueWithoutWinnerInput>
    updateMany?: Enumerable<GameResultUpdateManyWithWhereWithoutWinnerInput>
    deleteMany?: Enumerable<GameResultScalarWhereInput>
  }

  export type GameResultUpdateManyWithoutLoserNestedInput = {
    create?: XOR<Enumerable<GameResultCreateWithoutLoserInput>, Enumerable<GameResultUncheckedCreateWithoutLoserInput>>
    connectOrCreate?: Enumerable<GameResultCreateOrConnectWithoutLoserInput>
    upsert?: Enumerable<GameResultUpsertWithWhereUniqueWithoutLoserInput>
    createMany?: GameResultCreateManyLoserInputEnvelope
    set?: Enumerable<GameResultWhereUniqueInput>
    disconnect?: Enumerable<GameResultWhereUniqueInput>
    delete?: Enumerable<GameResultWhereUniqueInput>
    connect?: Enumerable<GameResultWhereUniqueInput>
    update?: Enumerable<GameResultUpdateWithWhereUniqueWithoutLoserInput>
    updateMany?: Enumerable<GameResultUpdateManyWithWhereWithoutLoserInput>
    deleteMany?: Enumerable<GameResultScalarWhereInput>
  }

  export type FollowUserUpdateManyWithoutFollewerNestedInput = {
    create?: XOR<Enumerable<FollowUserCreateWithoutFollewerInput>, Enumerable<FollowUserUncheckedCreateWithoutFollewerInput>>
    connectOrCreate?: Enumerable<FollowUserCreateOrConnectWithoutFollewerInput>
    upsert?: Enumerable<FollowUserUpsertWithWhereUniqueWithoutFollewerInput>
    createMany?: FollowUserCreateManyFollewerInputEnvelope
    set?: Enumerable<FollowUserWhereUniqueInput>
    disconnect?: Enumerable<FollowUserWhereUniqueInput>
    delete?: Enumerable<FollowUserWhereUniqueInput>
    connect?: Enumerable<FollowUserWhereUniqueInput>
    update?: Enumerable<FollowUserUpdateWithWhereUniqueWithoutFollewerInput>
    updateMany?: Enumerable<FollowUserUpdateManyWithWhereWithoutFollewerInput>
    deleteMany?: Enumerable<FollowUserScalarWhereInput>
  }

  export type FollowUserUpdateManyWithoutFolleweeNestedInput = {
    create?: XOR<Enumerable<FollowUserCreateWithoutFolleweeInput>, Enumerable<FollowUserUncheckedCreateWithoutFolleweeInput>>
    connectOrCreate?: Enumerable<FollowUserCreateOrConnectWithoutFolleweeInput>
    upsert?: Enumerable<FollowUserUpsertWithWhereUniqueWithoutFolleweeInput>
    createMany?: FollowUserCreateManyFolleweeInputEnvelope
    set?: Enumerable<FollowUserWhereUniqueInput>
    disconnect?: Enumerable<FollowUserWhereUniqueInput>
    delete?: Enumerable<FollowUserWhereUniqueInput>
    connect?: Enumerable<FollowUserWhereUniqueInput>
    update?: Enumerable<FollowUserUpdateWithWhereUniqueWithoutFolleweeInput>
    updateMany?: Enumerable<FollowUserUpdateManyWithWhereWithoutFolleweeInput>
    deleteMany?: Enumerable<FollowUserScalarWhereInput>
  }

  export type BlockUserUpdateManyWithoutBlockerNestedInput = {
    create?: XOR<Enumerable<BlockUserCreateWithoutBlockerInput>, Enumerable<BlockUserUncheckedCreateWithoutBlockerInput>>
    connectOrCreate?: Enumerable<BlockUserCreateOrConnectWithoutBlockerInput>
    upsert?: Enumerable<BlockUserUpsertWithWhereUniqueWithoutBlockerInput>
    createMany?: BlockUserCreateManyBlockerInputEnvelope
    set?: Enumerable<BlockUserWhereUniqueInput>
    disconnect?: Enumerable<BlockUserWhereUniqueInput>
    delete?: Enumerable<BlockUserWhereUniqueInput>
    connect?: Enumerable<BlockUserWhereUniqueInput>
    update?: Enumerable<BlockUserUpdateWithWhereUniqueWithoutBlockerInput>
    updateMany?: Enumerable<BlockUserUpdateManyWithWhereWithoutBlockerInput>
    deleteMany?: Enumerable<BlockUserScalarWhereInput>
  }

  export type BlockUserUpdateManyWithoutBlockedNestedInput = {
    create?: XOR<Enumerable<BlockUserCreateWithoutBlockedInput>, Enumerable<BlockUserUncheckedCreateWithoutBlockedInput>>
    connectOrCreate?: Enumerable<BlockUserCreateOrConnectWithoutBlockedInput>
    upsert?: Enumerable<BlockUserUpsertWithWhereUniqueWithoutBlockedInput>
    createMany?: BlockUserCreateManyBlockedInputEnvelope
    set?: Enumerable<BlockUserWhereUniqueInput>
    disconnect?: Enumerable<BlockUserWhereUniqueInput>
    delete?: Enumerable<BlockUserWhereUniqueInput>
    connect?: Enumerable<BlockUserWhereUniqueInput>
    update?: Enumerable<BlockUserUpdateWithWhereUniqueWithoutBlockedInput>
    updateMany?: Enumerable<BlockUserUpdateManyWithWhereWithoutBlockedInput>
    deleteMany?: Enumerable<BlockUserScalarWhereInput>
  }

  export type Channel_UserUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<Channel_UserCreateWithoutUserInput>, Enumerable<Channel_UserUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<Channel_UserCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<Channel_UserUpsertWithWhereUniqueWithoutUserInput>
    createMany?: Channel_UserCreateManyUserInputEnvelope
    set?: Enumerable<Channel_UserWhereUniqueInput>
    disconnect?: Enumerable<Channel_UserWhereUniqueInput>
    delete?: Enumerable<Channel_UserWhereUniqueInput>
    connect?: Enumerable<Channel_UserWhereUniqueInput>
    update?: Enumerable<Channel_UserUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<Channel_UserUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<Channel_UserScalarWhereInput>
  }

  export type Achievement_UserUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<Achievement_UserCreateWithoutUserInput>, Enumerable<Achievement_UserUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<Achievement_UserCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<Achievement_UserUpsertWithWhereUniqueWithoutUserInput>
    createMany?: Achievement_UserCreateManyUserInputEnvelope
    set?: Enumerable<Achievement_UserWhereUniqueInput>
    disconnect?: Enumerable<Achievement_UserWhereUniqueInput>
    delete?: Enumerable<Achievement_UserWhereUniqueInput>
    connect?: Enumerable<Achievement_UserWhereUniqueInput>
    update?: Enumerable<Achievement_UserUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<Achievement_UserUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<Achievement_UserScalarWhereInput>
  }

  export type MessageUpdateManyWithoutSenderNestedInput = {
    create?: XOR<Enumerable<MessageCreateWithoutSenderInput>, Enumerable<MessageUncheckedCreateWithoutSenderInput>>
    connectOrCreate?: Enumerable<MessageCreateOrConnectWithoutSenderInput>
    upsert?: Enumerable<MessageUpsertWithWhereUniqueWithoutSenderInput>
    createMany?: MessageCreateManySenderInputEnvelope
    set?: Enumerable<MessageWhereUniqueInput>
    disconnect?: Enumerable<MessageWhereUniqueInput>
    delete?: Enumerable<MessageWhereUniqueInput>
    connect?: Enumerable<MessageWhereUniqueInput>
    update?: Enumerable<MessageUpdateWithWhereUniqueWithoutSenderInput>
    updateMany?: Enumerable<MessageUpdateManyWithWhereWithoutSenderInput>
    deleteMany?: Enumerable<MessageScalarWhereInput>
  }

  export type GameResultUncheckedUpdateManyWithoutWinnerNestedInput = {
    create?: XOR<Enumerable<GameResultCreateWithoutWinnerInput>, Enumerable<GameResultUncheckedCreateWithoutWinnerInput>>
    connectOrCreate?: Enumerable<GameResultCreateOrConnectWithoutWinnerInput>
    upsert?: Enumerable<GameResultUpsertWithWhereUniqueWithoutWinnerInput>
    createMany?: GameResultCreateManyWinnerInputEnvelope
    set?: Enumerable<GameResultWhereUniqueInput>
    disconnect?: Enumerable<GameResultWhereUniqueInput>
    delete?: Enumerable<GameResultWhereUniqueInput>
    connect?: Enumerable<GameResultWhereUniqueInput>
    update?: Enumerable<GameResultUpdateWithWhereUniqueWithoutWinnerInput>
    updateMany?: Enumerable<GameResultUpdateManyWithWhereWithoutWinnerInput>
    deleteMany?: Enumerable<GameResultScalarWhereInput>
  }

  export type GameResultUncheckedUpdateManyWithoutLoserNestedInput = {
    create?: XOR<Enumerable<GameResultCreateWithoutLoserInput>, Enumerable<GameResultUncheckedCreateWithoutLoserInput>>
    connectOrCreate?: Enumerable<GameResultCreateOrConnectWithoutLoserInput>
    upsert?: Enumerable<GameResultUpsertWithWhereUniqueWithoutLoserInput>
    createMany?: GameResultCreateManyLoserInputEnvelope
    set?: Enumerable<GameResultWhereUniqueInput>
    disconnect?: Enumerable<GameResultWhereUniqueInput>
    delete?: Enumerable<GameResultWhereUniqueInput>
    connect?: Enumerable<GameResultWhereUniqueInput>
    update?: Enumerable<GameResultUpdateWithWhereUniqueWithoutLoserInput>
    updateMany?: Enumerable<GameResultUpdateManyWithWhereWithoutLoserInput>
    deleteMany?: Enumerable<GameResultScalarWhereInput>
  }

  export type FollowUserUncheckedUpdateManyWithoutFollewerNestedInput = {
    create?: XOR<Enumerable<FollowUserCreateWithoutFollewerInput>, Enumerable<FollowUserUncheckedCreateWithoutFollewerInput>>
    connectOrCreate?: Enumerable<FollowUserCreateOrConnectWithoutFollewerInput>
    upsert?: Enumerable<FollowUserUpsertWithWhereUniqueWithoutFollewerInput>
    createMany?: FollowUserCreateManyFollewerInputEnvelope
    set?: Enumerable<FollowUserWhereUniqueInput>
    disconnect?: Enumerable<FollowUserWhereUniqueInput>
    delete?: Enumerable<FollowUserWhereUniqueInput>
    connect?: Enumerable<FollowUserWhereUniqueInput>
    update?: Enumerable<FollowUserUpdateWithWhereUniqueWithoutFollewerInput>
    updateMany?: Enumerable<FollowUserUpdateManyWithWhereWithoutFollewerInput>
    deleteMany?: Enumerable<FollowUserScalarWhereInput>
  }

  export type FollowUserUncheckedUpdateManyWithoutFolleweeNestedInput = {
    create?: XOR<Enumerable<FollowUserCreateWithoutFolleweeInput>, Enumerable<FollowUserUncheckedCreateWithoutFolleweeInput>>
    connectOrCreate?: Enumerable<FollowUserCreateOrConnectWithoutFolleweeInput>
    upsert?: Enumerable<FollowUserUpsertWithWhereUniqueWithoutFolleweeInput>
    createMany?: FollowUserCreateManyFolleweeInputEnvelope
    set?: Enumerable<FollowUserWhereUniqueInput>
    disconnect?: Enumerable<FollowUserWhereUniqueInput>
    delete?: Enumerable<FollowUserWhereUniqueInput>
    connect?: Enumerable<FollowUserWhereUniqueInput>
    update?: Enumerable<FollowUserUpdateWithWhereUniqueWithoutFolleweeInput>
    updateMany?: Enumerable<FollowUserUpdateManyWithWhereWithoutFolleweeInput>
    deleteMany?: Enumerable<FollowUserScalarWhereInput>
  }

  export type BlockUserUncheckedUpdateManyWithoutBlockerNestedInput = {
    create?: XOR<Enumerable<BlockUserCreateWithoutBlockerInput>, Enumerable<BlockUserUncheckedCreateWithoutBlockerInput>>
    connectOrCreate?: Enumerable<BlockUserCreateOrConnectWithoutBlockerInput>
    upsert?: Enumerable<BlockUserUpsertWithWhereUniqueWithoutBlockerInput>
    createMany?: BlockUserCreateManyBlockerInputEnvelope
    set?: Enumerable<BlockUserWhereUniqueInput>
    disconnect?: Enumerable<BlockUserWhereUniqueInput>
    delete?: Enumerable<BlockUserWhereUniqueInput>
    connect?: Enumerable<BlockUserWhereUniqueInput>
    update?: Enumerable<BlockUserUpdateWithWhereUniqueWithoutBlockerInput>
    updateMany?: Enumerable<BlockUserUpdateManyWithWhereWithoutBlockerInput>
    deleteMany?: Enumerable<BlockUserScalarWhereInput>
  }

  export type BlockUserUncheckedUpdateManyWithoutBlockedNestedInput = {
    create?: XOR<Enumerable<BlockUserCreateWithoutBlockedInput>, Enumerable<BlockUserUncheckedCreateWithoutBlockedInput>>
    connectOrCreate?: Enumerable<BlockUserCreateOrConnectWithoutBlockedInput>
    upsert?: Enumerable<BlockUserUpsertWithWhereUniqueWithoutBlockedInput>
    createMany?: BlockUserCreateManyBlockedInputEnvelope
    set?: Enumerable<BlockUserWhereUniqueInput>
    disconnect?: Enumerable<BlockUserWhereUniqueInput>
    delete?: Enumerable<BlockUserWhereUniqueInput>
    connect?: Enumerable<BlockUserWhereUniqueInput>
    update?: Enumerable<BlockUserUpdateWithWhereUniqueWithoutBlockedInput>
    updateMany?: Enumerable<BlockUserUpdateManyWithWhereWithoutBlockedInput>
    deleteMany?: Enumerable<BlockUserScalarWhereInput>
  }

  export type Channel_UserUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<Channel_UserCreateWithoutUserInput>, Enumerable<Channel_UserUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<Channel_UserCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<Channel_UserUpsertWithWhereUniqueWithoutUserInput>
    createMany?: Channel_UserCreateManyUserInputEnvelope
    set?: Enumerable<Channel_UserWhereUniqueInput>
    disconnect?: Enumerable<Channel_UserWhereUniqueInput>
    delete?: Enumerable<Channel_UserWhereUniqueInput>
    connect?: Enumerable<Channel_UserWhereUniqueInput>
    update?: Enumerable<Channel_UserUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<Channel_UserUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<Channel_UserScalarWhereInput>
  }

  export type Achievement_UserUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<Achievement_UserCreateWithoutUserInput>, Enumerable<Achievement_UserUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<Achievement_UserCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<Achievement_UserUpsertWithWhereUniqueWithoutUserInput>
    createMany?: Achievement_UserCreateManyUserInputEnvelope
    set?: Enumerable<Achievement_UserWhereUniqueInput>
    disconnect?: Enumerable<Achievement_UserWhereUniqueInput>
    delete?: Enumerable<Achievement_UserWhereUniqueInput>
    connect?: Enumerable<Achievement_UserWhereUniqueInput>
    update?: Enumerable<Achievement_UserUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<Achievement_UserUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<Achievement_UserScalarWhereInput>
  }

  export type MessageUncheckedUpdateManyWithoutSenderNestedInput = {
    create?: XOR<Enumerable<MessageCreateWithoutSenderInput>, Enumerable<MessageUncheckedCreateWithoutSenderInput>>
    connectOrCreate?: Enumerable<MessageCreateOrConnectWithoutSenderInput>
    upsert?: Enumerable<MessageUpsertWithWhereUniqueWithoutSenderInput>
    createMany?: MessageCreateManySenderInputEnvelope
    set?: Enumerable<MessageWhereUniqueInput>
    disconnect?: Enumerable<MessageWhereUniqueInput>
    delete?: Enumerable<MessageWhereUniqueInput>
    connect?: Enumerable<MessageWhereUniqueInput>
    update?: Enumerable<MessageUpdateWithWhereUniqueWithoutSenderInput>
    updateMany?: Enumerable<MessageUpdateManyWithWhereWithoutSenderInput>
    deleteMany?: Enumerable<MessageScalarWhereInput>
  }

  export type UserCreateNestedOneWithoutWinLogsInput = {
    create?: XOR<UserCreateWithoutWinLogsInput, UserUncheckedCreateWithoutWinLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWinLogsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutLoseLogsInput = {
    create?: XOR<UserCreateWithoutLoseLogsInput, UserUncheckedCreateWithoutLoseLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutLoseLogsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutWinLogsNestedInput = {
    create?: XOR<UserCreateWithoutWinLogsInput, UserUncheckedCreateWithoutWinLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWinLogsInput
    upsert?: UserUpsertWithoutWinLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutWinLogsInput, UserUncheckedUpdateWithoutWinLogsInput>
  }

  export type UserUpdateOneRequiredWithoutLoseLogsNestedInput = {
    create?: XOR<UserCreateWithoutLoseLogsInput, UserUncheckedCreateWithoutLoseLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutLoseLogsInput
    upsert?: UserUpsertWithoutLoseLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutLoseLogsInput, UserUncheckedUpdateWithoutLoseLogsInput>
  }

  export type UserCreateNestedOneWithoutFollowersInput = {
    create?: XOR<UserCreateWithoutFollowersInput, UserUncheckedCreateWithoutFollowersInput>
    connectOrCreate?: UserCreateOrConnectWithoutFollowersInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutFolloweesInput = {
    create?: XOR<UserCreateWithoutFolloweesInput, UserUncheckedCreateWithoutFolloweesInput>
    connectOrCreate?: UserCreateOrConnectWithoutFolloweesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutFollowersNestedInput = {
    create?: XOR<UserCreateWithoutFollowersInput, UserUncheckedCreateWithoutFollowersInput>
    connectOrCreate?: UserCreateOrConnectWithoutFollowersInput
    upsert?: UserUpsertWithoutFollowersInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutFollowersInput, UserUncheckedUpdateWithoutFollowersInput>
  }

  export type UserUpdateOneRequiredWithoutFolloweesNestedInput = {
    create?: XOR<UserCreateWithoutFolloweesInput, UserUncheckedCreateWithoutFolloweesInput>
    connectOrCreate?: UserCreateOrConnectWithoutFolloweesInput
    upsert?: UserUpsertWithoutFolloweesInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutFolloweesInput, UserUncheckedUpdateWithoutFolloweesInput>
  }

  export type UserCreateNestedOneWithoutBlockersInput = {
    create?: XOR<UserCreateWithoutBlockersInput, UserUncheckedCreateWithoutBlockersInput>
    connectOrCreate?: UserCreateOrConnectWithoutBlockersInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutBlockedsInput = {
    create?: XOR<UserCreateWithoutBlockedsInput, UserUncheckedCreateWithoutBlockedsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBlockedsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutBlockersNestedInput = {
    create?: XOR<UserCreateWithoutBlockersInput, UserUncheckedCreateWithoutBlockersInput>
    connectOrCreate?: UserCreateOrConnectWithoutBlockersInput
    upsert?: UserUpsertWithoutBlockersInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutBlockersInput, UserUncheckedUpdateWithoutBlockersInput>
  }

  export type UserUpdateOneRequiredWithoutBlockedsNestedInput = {
    create?: XOR<UserCreateWithoutBlockedsInput, UserUncheckedCreateWithoutBlockedsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBlockedsInput
    upsert?: UserUpsertWithoutBlockedsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutBlockedsInput, UserUncheckedUpdateWithoutBlockedsInput>
  }

  export type Channel_UserCreateNestedManyWithoutChannelInput = {
    create?: XOR<Enumerable<Channel_UserCreateWithoutChannelInput>, Enumerable<Channel_UserUncheckedCreateWithoutChannelInput>>
    connectOrCreate?: Enumerable<Channel_UserCreateOrConnectWithoutChannelInput>
    createMany?: Channel_UserCreateManyChannelInputEnvelope
    connect?: Enumerable<Channel_UserWhereUniqueInput>
  }

  export type MessageCreateNestedManyWithoutChannelInput = {
    create?: XOR<Enumerable<MessageCreateWithoutChannelInput>, Enumerable<MessageUncheckedCreateWithoutChannelInput>>
    connectOrCreate?: Enumerable<MessageCreateOrConnectWithoutChannelInput>
    createMany?: MessageCreateManyChannelInputEnvelope
    connect?: Enumerable<MessageWhereUniqueInput>
  }

  export type Channel_UserUncheckedCreateNestedManyWithoutChannelInput = {
    create?: XOR<Enumerable<Channel_UserCreateWithoutChannelInput>, Enumerable<Channel_UserUncheckedCreateWithoutChannelInput>>
    connectOrCreate?: Enumerable<Channel_UserCreateOrConnectWithoutChannelInput>
    createMany?: Channel_UserCreateManyChannelInputEnvelope
    connect?: Enumerable<Channel_UserWhereUniqueInput>
  }

  export type MessageUncheckedCreateNestedManyWithoutChannelInput = {
    create?: XOR<Enumerable<MessageCreateWithoutChannelInput>, Enumerable<MessageUncheckedCreateWithoutChannelInput>>
    connectOrCreate?: Enumerable<MessageCreateOrConnectWithoutChannelInput>
    createMany?: MessageCreateManyChannelInputEnvelope
    connect?: Enumerable<MessageWhereUniqueInput>
  }

  export type Channel_UserUpdateManyWithoutChannelNestedInput = {
    create?: XOR<Enumerable<Channel_UserCreateWithoutChannelInput>, Enumerable<Channel_UserUncheckedCreateWithoutChannelInput>>
    connectOrCreate?: Enumerable<Channel_UserCreateOrConnectWithoutChannelInput>
    upsert?: Enumerable<Channel_UserUpsertWithWhereUniqueWithoutChannelInput>
    createMany?: Channel_UserCreateManyChannelInputEnvelope
    set?: Enumerable<Channel_UserWhereUniqueInput>
    disconnect?: Enumerable<Channel_UserWhereUniqueInput>
    delete?: Enumerable<Channel_UserWhereUniqueInput>
    connect?: Enumerable<Channel_UserWhereUniqueInput>
    update?: Enumerable<Channel_UserUpdateWithWhereUniqueWithoutChannelInput>
    updateMany?: Enumerable<Channel_UserUpdateManyWithWhereWithoutChannelInput>
    deleteMany?: Enumerable<Channel_UserScalarWhereInput>
  }

  export type MessageUpdateManyWithoutChannelNestedInput = {
    create?: XOR<Enumerable<MessageCreateWithoutChannelInput>, Enumerable<MessageUncheckedCreateWithoutChannelInput>>
    connectOrCreate?: Enumerable<MessageCreateOrConnectWithoutChannelInput>
    upsert?: Enumerable<MessageUpsertWithWhereUniqueWithoutChannelInput>
    createMany?: MessageCreateManyChannelInputEnvelope
    set?: Enumerable<MessageWhereUniqueInput>
    disconnect?: Enumerable<MessageWhereUniqueInput>
    delete?: Enumerable<MessageWhereUniqueInput>
    connect?: Enumerable<MessageWhereUniqueInput>
    update?: Enumerable<MessageUpdateWithWhereUniqueWithoutChannelInput>
    updateMany?: Enumerable<MessageUpdateManyWithWhereWithoutChannelInput>
    deleteMany?: Enumerable<MessageScalarWhereInput>
  }

  export type Channel_UserUncheckedUpdateManyWithoutChannelNestedInput = {
    create?: XOR<Enumerable<Channel_UserCreateWithoutChannelInput>, Enumerable<Channel_UserUncheckedCreateWithoutChannelInput>>
    connectOrCreate?: Enumerable<Channel_UserCreateOrConnectWithoutChannelInput>
    upsert?: Enumerable<Channel_UserUpsertWithWhereUniqueWithoutChannelInput>
    createMany?: Channel_UserCreateManyChannelInputEnvelope
    set?: Enumerable<Channel_UserWhereUniqueInput>
    disconnect?: Enumerable<Channel_UserWhereUniqueInput>
    delete?: Enumerable<Channel_UserWhereUniqueInput>
    connect?: Enumerable<Channel_UserWhereUniqueInput>
    update?: Enumerable<Channel_UserUpdateWithWhereUniqueWithoutChannelInput>
    updateMany?: Enumerable<Channel_UserUpdateManyWithWhereWithoutChannelInput>
    deleteMany?: Enumerable<Channel_UserScalarWhereInput>
  }

  export type MessageUncheckedUpdateManyWithoutChannelNestedInput = {
    create?: XOR<Enumerable<MessageCreateWithoutChannelInput>, Enumerable<MessageUncheckedCreateWithoutChannelInput>>
    connectOrCreate?: Enumerable<MessageCreateOrConnectWithoutChannelInput>
    upsert?: Enumerable<MessageUpsertWithWhereUniqueWithoutChannelInput>
    createMany?: MessageCreateManyChannelInputEnvelope
    set?: Enumerable<MessageWhereUniqueInput>
    disconnect?: Enumerable<MessageWhereUniqueInput>
    delete?: Enumerable<MessageWhereUniqueInput>
    connect?: Enumerable<MessageWhereUniqueInput>
    update?: Enumerable<MessageUpdateWithWhereUniqueWithoutChannelInput>
    updateMany?: Enumerable<MessageUpdateManyWithWhereWithoutChannelInput>
    deleteMany?: Enumerable<MessageScalarWhereInput>
  }

  export type ChannelCreateNestedOneWithoutUsersInput = {
    create?: XOR<ChannelCreateWithoutUsersInput, ChannelUncheckedCreateWithoutUsersInput>
    connectOrCreate?: ChannelCreateOrConnectWithoutUsersInput
    connect?: ChannelWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutChannelsInput = {
    create?: XOR<UserCreateWithoutChannelsInput, UserUncheckedCreateWithoutChannelsInput>
    connectOrCreate?: UserCreateOrConnectWithoutChannelsInput
    connect?: UserWhereUniqueInput
  }

  export type ChannelUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<ChannelCreateWithoutUsersInput, ChannelUncheckedCreateWithoutUsersInput>
    connectOrCreate?: ChannelCreateOrConnectWithoutUsersInput
    upsert?: ChannelUpsertWithoutUsersInput
    connect?: ChannelWhereUniqueInput
    update?: XOR<ChannelUpdateWithoutUsersInput, ChannelUncheckedUpdateWithoutUsersInput>
  }

  export type UserUpdateOneRequiredWithoutChannelsNestedInput = {
    create?: XOR<UserCreateWithoutChannelsInput, UserUncheckedCreateWithoutChannelsInput>
    connectOrCreate?: UserCreateOrConnectWithoutChannelsInput
    upsert?: UserUpsertWithoutChannelsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutChannelsInput, UserUncheckedUpdateWithoutChannelsInput>
  }

  export type UserCreateNestedOneWithoutMessagesInput = {
    create?: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutMessagesInput
    connect?: UserWhereUniqueInput
  }

  export type ChannelCreateNestedOneWithoutMessagesInput = {
    create?: XOR<ChannelCreateWithoutMessagesInput, ChannelUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ChannelCreateOrConnectWithoutMessagesInput
    connect?: ChannelWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutMessagesInput
    upsert?: UserUpsertWithoutMessagesInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutMessagesInput, UserUncheckedUpdateWithoutMessagesInput>
  }

  export type ChannelUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<ChannelCreateWithoutMessagesInput, ChannelUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ChannelCreateOrConnectWithoutMessagesInput
    upsert?: ChannelUpsertWithoutMessagesInput
    connect?: ChannelWhereUniqueInput
    update?: XOR<ChannelUpdateWithoutMessagesInput, ChannelUncheckedUpdateWithoutMessagesInput>
  }

  export type Achievement_UserCreateNestedManyWithoutAchievementInput = {
    create?: XOR<Enumerable<Achievement_UserCreateWithoutAchievementInput>, Enumerable<Achievement_UserUncheckedCreateWithoutAchievementInput>>
    connectOrCreate?: Enumerable<Achievement_UserCreateOrConnectWithoutAchievementInput>
    createMany?: Achievement_UserCreateManyAchievementInputEnvelope
    connect?: Enumerable<Achievement_UserWhereUniqueInput>
  }

  export type Achievement_UserUncheckedCreateNestedManyWithoutAchievementInput = {
    create?: XOR<Enumerable<Achievement_UserCreateWithoutAchievementInput>, Enumerable<Achievement_UserUncheckedCreateWithoutAchievementInput>>
    connectOrCreate?: Enumerable<Achievement_UserCreateOrConnectWithoutAchievementInput>
    createMany?: Achievement_UserCreateManyAchievementInputEnvelope
    connect?: Enumerable<Achievement_UserWhereUniqueInput>
  }

  export type Achievement_UserUpdateManyWithoutAchievementNestedInput = {
    create?: XOR<Enumerable<Achievement_UserCreateWithoutAchievementInput>, Enumerable<Achievement_UserUncheckedCreateWithoutAchievementInput>>
    connectOrCreate?: Enumerable<Achievement_UserCreateOrConnectWithoutAchievementInput>
    upsert?: Enumerable<Achievement_UserUpsertWithWhereUniqueWithoutAchievementInput>
    createMany?: Achievement_UserCreateManyAchievementInputEnvelope
    set?: Enumerable<Achievement_UserWhereUniqueInput>
    disconnect?: Enumerable<Achievement_UserWhereUniqueInput>
    delete?: Enumerable<Achievement_UserWhereUniqueInput>
    connect?: Enumerable<Achievement_UserWhereUniqueInput>
    update?: Enumerable<Achievement_UserUpdateWithWhereUniqueWithoutAchievementInput>
    updateMany?: Enumerable<Achievement_UserUpdateManyWithWhereWithoutAchievementInput>
    deleteMany?: Enumerable<Achievement_UserScalarWhereInput>
  }

  export type Achievement_UserUncheckedUpdateManyWithoutAchievementNestedInput = {
    create?: XOR<Enumerable<Achievement_UserCreateWithoutAchievementInput>, Enumerable<Achievement_UserUncheckedCreateWithoutAchievementInput>>
    connectOrCreate?: Enumerable<Achievement_UserCreateOrConnectWithoutAchievementInput>
    upsert?: Enumerable<Achievement_UserUpsertWithWhereUniqueWithoutAchievementInput>
    createMany?: Achievement_UserCreateManyAchievementInputEnvelope
    set?: Enumerable<Achievement_UserWhereUniqueInput>
    disconnect?: Enumerable<Achievement_UserWhereUniqueInput>
    delete?: Enumerable<Achievement_UserWhereUniqueInput>
    connect?: Enumerable<Achievement_UserWhereUniqueInput>
    update?: Enumerable<Achievement_UserUpdateWithWhereUniqueWithoutAchievementInput>
    updateMany?: Enumerable<Achievement_UserUpdateManyWithWhereWithoutAchievementInput>
    deleteMany?: Enumerable<Achievement_UserScalarWhereInput>
  }

  export type AchievementCreateNestedOneWithoutUsersInput = {
    create?: XOR<AchievementCreateWithoutUsersInput, AchievementUncheckedCreateWithoutUsersInput>
    connectOrCreate?: AchievementCreateOrConnectWithoutUsersInput
    connect?: AchievementWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutAchievementsInput = {
    create?: XOR<UserCreateWithoutAchievementsInput, UserUncheckedCreateWithoutAchievementsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAchievementsInput
    connect?: UserWhereUniqueInput
  }

  export type AchievementUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<AchievementCreateWithoutUsersInput, AchievementUncheckedCreateWithoutUsersInput>
    connectOrCreate?: AchievementCreateOrConnectWithoutUsersInput
    upsert?: AchievementUpsertWithoutUsersInput
    connect?: AchievementWhereUniqueInput
    update?: XOR<AchievementUpdateWithoutUsersInput, AchievementUncheckedUpdateWithoutUsersInput>
  }

  export type UserUpdateOneRequiredWithoutAchievementsNestedInput = {
    create?: XOR<UserCreateWithoutAchievementsInput, UserUncheckedCreateWithoutAchievementsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAchievementsInput
    upsert?: UserUpsertWithoutAchievementsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutAchievementsInput, UserUncheckedUpdateWithoutAchievementsInput>
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedBoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedDateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedBoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedDateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type GameResultCreateWithoutWinnerInput = {
    score: number
    isLadder: boolean
    createdAt?: Date | string
    loser: UserCreateNestedOneWithoutLoseLogsInput
  }

  export type GameResultUncheckedCreateWithoutWinnerInput = {
    id?: number
    score: number
    isLadder: boolean
    loserId: number
    createdAt?: Date | string
  }

  export type GameResultCreateOrConnectWithoutWinnerInput = {
    where: GameResultWhereUniqueInput
    create: XOR<GameResultCreateWithoutWinnerInput, GameResultUncheckedCreateWithoutWinnerInput>
  }

  export type GameResultCreateManyWinnerInputEnvelope = {
    data: Enumerable<GameResultCreateManyWinnerInput>
    skipDuplicates?: boolean
  }

  export type GameResultCreateWithoutLoserInput = {
    score: number
    isLadder: boolean
    createdAt?: Date | string
    winner: UserCreateNestedOneWithoutWinLogsInput
  }

  export type GameResultUncheckedCreateWithoutLoserInput = {
    id?: number
    score: number
    isLadder: boolean
    winnerId: number
    createdAt?: Date | string
  }

  export type GameResultCreateOrConnectWithoutLoserInput = {
    where: GameResultWhereUniqueInput
    create: XOR<GameResultCreateWithoutLoserInput, GameResultUncheckedCreateWithoutLoserInput>
  }

  export type GameResultCreateManyLoserInputEnvelope = {
    data: Enumerable<GameResultCreateManyLoserInput>
    skipDuplicates?: boolean
  }

  export type FollowUserCreateWithoutFollewerInput = {
    createdAt?: Date | string
    follewee: UserCreateNestedOneWithoutFolloweesInput
  }

  export type FollowUserUncheckedCreateWithoutFollewerInput = {
    id?: number
    followeeId: number
    createdAt?: Date | string
  }

  export type FollowUserCreateOrConnectWithoutFollewerInput = {
    where: FollowUserWhereUniqueInput
    create: XOR<FollowUserCreateWithoutFollewerInput, FollowUserUncheckedCreateWithoutFollewerInput>
  }

  export type FollowUserCreateManyFollewerInputEnvelope = {
    data: Enumerable<FollowUserCreateManyFollewerInput>
    skipDuplicates?: boolean
  }

  export type FollowUserCreateWithoutFolleweeInput = {
    createdAt?: Date | string
    follewer: UserCreateNestedOneWithoutFollowersInput
  }

  export type FollowUserUncheckedCreateWithoutFolleweeInput = {
    id?: number
    followerId: number
    createdAt?: Date | string
  }

  export type FollowUserCreateOrConnectWithoutFolleweeInput = {
    where: FollowUserWhereUniqueInput
    create: XOR<FollowUserCreateWithoutFolleweeInput, FollowUserUncheckedCreateWithoutFolleweeInput>
  }

  export type FollowUserCreateManyFolleweeInputEnvelope = {
    data: Enumerable<FollowUserCreateManyFolleweeInput>
    skipDuplicates?: boolean
  }

  export type BlockUserCreateWithoutBlockerInput = {
    createdAt?: Date | string
    blocked: UserCreateNestedOneWithoutBlockedsInput
  }

  export type BlockUserUncheckedCreateWithoutBlockerInput = {
    id?: number
    blockedId: number
    createdAt?: Date | string
  }

  export type BlockUserCreateOrConnectWithoutBlockerInput = {
    where: BlockUserWhereUniqueInput
    create: XOR<BlockUserCreateWithoutBlockerInput, BlockUserUncheckedCreateWithoutBlockerInput>
  }

  export type BlockUserCreateManyBlockerInputEnvelope = {
    data: Enumerable<BlockUserCreateManyBlockerInput>
    skipDuplicates?: boolean
  }

  export type BlockUserCreateWithoutBlockedInput = {
    createdAt?: Date | string
    blocker: UserCreateNestedOneWithoutBlockersInput
  }

  export type BlockUserUncheckedCreateWithoutBlockedInput = {
    id?: number
    blockerId: number
    createdAt?: Date | string
  }

  export type BlockUserCreateOrConnectWithoutBlockedInput = {
    where: BlockUserWhereUniqueInput
    create: XOR<BlockUserCreateWithoutBlockedInput, BlockUserUncheckedCreateWithoutBlockedInput>
  }

  export type BlockUserCreateManyBlockedInputEnvelope = {
    data: Enumerable<BlockUserCreateManyBlockedInput>
    skipDuplicates?: boolean
  }

  export type Channel_UserCreateWithoutUserInput = {
    userType: number
    status: number
    createdAt?: Date | string
    channel: ChannelCreateNestedOneWithoutUsersInput
  }

  export type Channel_UserUncheckedCreateWithoutUserInput = {
    id?: number
    channelId: number
    userType: number
    status: number
    createdAt?: Date | string
  }

  export type Channel_UserCreateOrConnectWithoutUserInput = {
    where: Channel_UserWhereUniqueInput
    create: XOR<Channel_UserCreateWithoutUserInput, Channel_UserUncheckedCreateWithoutUserInput>
  }

  export type Channel_UserCreateManyUserInputEnvelope = {
    data: Enumerable<Channel_UserCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type Achievement_UserCreateWithoutUserInput = {
    createdAt?: Date | string
    achievement: AchievementCreateNestedOneWithoutUsersInput
  }

  export type Achievement_UserUncheckedCreateWithoutUserInput = {
    id?: number
    achievementId: number
    createdAt?: Date | string
  }

  export type Achievement_UserCreateOrConnectWithoutUserInput = {
    where: Achievement_UserWhereUniqueInput
    create: XOR<Achievement_UserCreateWithoutUserInput, Achievement_UserUncheckedCreateWithoutUserInput>
  }

  export type Achievement_UserCreateManyUserInputEnvelope = {
    data: Enumerable<Achievement_UserCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type MessageCreateWithoutSenderInput = {
    text: string
    createdAt?: Date | string
    channel: ChannelCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateWithoutSenderInput = {
    id?: number
    channelId: number
    text: string
    createdAt?: Date | string
  }

  export type MessageCreateOrConnectWithoutSenderInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput>
  }

  export type MessageCreateManySenderInputEnvelope = {
    data: Enumerable<MessageCreateManySenderInput>
    skipDuplicates?: boolean
  }

  export type GameResultUpsertWithWhereUniqueWithoutWinnerInput = {
    where: GameResultWhereUniqueInput
    update: XOR<GameResultUpdateWithoutWinnerInput, GameResultUncheckedUpdateWithoutWinnerInput>
    create: XOR<GameResultCreateWithoutWinnerInput, GameResultUncheckedCreateWithoutWinnerInput>
  }

  export type GameResultUpdateWithWhereUniqueWithoutWinnerInput = {
    where: GameResultWhereUniqueInput
    data: XOR<GameResultUpdateWithoutWinnerInput, GameResultUncheckedUpdateWithoutWinnerInput>
  }

  export type GameResultUpdateManyWithWhereWithoutWinnerInput = {
    where: GameResultScalarWhereInput
    data: XOR<GameResultUpdateManyMutationInput, GameResultUncheckedUpdateManyWithoutWinLogsInput>
  }

  export type GameResultScalarWhereInput = {
    AND?: Enumerable<GameResultScalarWhereInput>
    OR?: Enumerable<GameResultScalarWhereInput>
    NOT?: Enumerable<GameResultScalarWhereInput>
    id?: IntFilter | number
    score?: IntFilter | number
    isLadder?: BoolFilter | boolean
    winnerId?: IntFilter | number
    loserId?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
  }

  export type GameResultUpsertWithWhereUniqueWithoutLoserInput = {
    where: GameResultWhereUniqueInput
    update: XOR<GameResultUpdateWithoutLoserInput, GameResultUncheckedUpdateWithoutLoserInput>
    create: XOR<GameResultCreateWithoutLoserInput, GameResultUncheckedCreateWithoutLoserInput>
  }

  export type GameResultUpdateWithWhereUniqueWithoutLoserInput = {
    where: GameResultWhereUniqueInput
    data: XOR<GameResultUpdateWithoutLoserInput, GameResultUncheckedUpdateWithoutLoserInput>
  }

  export type GameResultUpdateManyWithWhereWithoutLoserInput = {
    where: GameResultScalarWhereInput
    data: XOR<GameResultUpdateManyMutationInput, GameResultUncheckedUpdateManyWithoutLoseLogsInput>
  }

  export type FollowUserUpsertWithWhereUniqueWithoutFollewerInput = {
    where: FollowUserWhereUniqueInput
    update: XOR<FollowUserUpdateWithoutFollewerInput, FollowUserUncheckedUpdateWithoutFollewerInput>
    create: XOR<FollowUserCreateWithoutFollewerInput, FollowUserUncheckedCreateWithoutFollewerInput>
  }

  export type FollowUserUpdateWithWhereUniqueWithoutFollewerInput = {
    where: FollowUserWhereUniqueInput
    data: XOR<FollowUserUpdateWithoutFollewerInput, FollowUserUncheckedUpdateWithoutFollewerInput>
  }

  export type FollowUserUpdateManyWithWhereWithoutFollewerInput = {
    where: FollowUserScalarWhereInput
    data: XOR<FollowUserUpdateManyMutationInput, FollowUserUncheckedUpdateManyWithoutFollowersInput>
  }

  export type FollowUserScalarWhereInput = {
    AND?: Enumerable<FollowUserScalarWhereInput>
    OR?: Enumerable<FollowUserScalarWhereInput>
    NOT?: Enumerable<FollowUserScalarWhereInput>
    id?: IntFilter | number
    followerId?: IntFilter | number
    followeeId?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
  }

  export type FollowUserUpsertWithWhereUniqueWithoutFolleweeInput = {
    where: FollowUserWhereUniqueInput
    update: XOR<FollowUserUpdateWithoutFolleweeInput, FollowUserUncheckedUpdateWithoutFolleweeInput>
    create: XOR<FollowUserCreateWithoutFolleweeInput, FollowUserUncheckedCreateWithoutFolleweeInput>
  }

  export type FollowUserUpdateWithWhereUniqueWithoutFolleweeInput = {
    where: FollowUserWhereUniqueInput
    data: XOR<FollowUserUpdateWithoutFolleweeInput, FollowUserUncheckedUpdateWithoutFolleweeInput>
  }

  export type FollowUserUpdateManyWithWhereWithoutFolleweeInput = {
    where: FollowUserScalarWhereInput
    data: XOR<FollowUserUpdateManyMutationInput, FollowUserUncheckedUpdateManyWithoutFolloweesInput>
  }

  export type BlockUserUpsertWithWhereUniqueWithoutBlockerInput = {
    where: BlockUserWhereUniqueInput
    update: XOR<BlockUserUpdateWithoutBlockerInput, BlockUserUncheckedUpdateWithoutBlockerInput>
    create: XOR<BlockUserCreateWithoutBlockerInput, BlockUserUncheckedCreateWithoutBlockerInput>
  }

  export type BlockUserUpdateWithWhereUniqueWithoutBlockerInput = {
    where: BlockUserWhereUniqueInput
    data: XOR<BlockUserUpdateWithoutBlockerInput, BlockUserUncheckedUpdateWithoutBlockerInput>
  }

  export type BlockUserUpdateManyWithWhereWithoutBlockerInput = {
    where: BlockUserScalarWhereInput
    data: XOR<BlockUserUpdateManyMutationInput, BlockUserUncheckedUpdateManyWithoutBlockersInput>
  }

  export type BlockUserScalarWhereInput = {
    AND?: Enumerable<BlockUserScalarWhereInput>
    OR?: Enumerable<BlockUserScalarWhereInput>
    NOT?: Enumerable<BlockUserScalarWhereInput>
    id?: IntFilter | number
    blockerId?: IntFilter | number
    blockedId?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
  }

  export type BlockUserUpsertWithWhereUniqueWithoutBlockedInput = {
    where: BlockUserWhereUniqueInput
    update: XOR<BlockUserUpdateWithoutBlockedInput, BlockUserUncheckedUpdateWithoutBlockedInput>
    create: XOR<BlockUserCreateWithoutBlockedInput, BlockUserUncheckedCreateWithoutBlockedInput>
  }

  export type BlockUserUpdateWithWhereUniqueWithoutBlockedInput = {
    where: BlockUserWhereUniqueInput
    data: XOR<BlockUserUpdateWithoutBlockedInput, BlockUserUncheckedUpdateWithoutBlockedInput>
  }

  export type BlockUserUpdateManyWithWhereWithoutBlockedInput = {
    where: BlockUserScalarWhereInput
    data: XOR<BlockUserUpdateManyMutationInput, BlockUserUncheckedUpdateManyWithoutBlockedsInput>
  }

  export type Channel_UserUpsertWithWhereUniqueWithoutUserInput = {
    where: Channel_UserWhereUniqueInput
    update: XOR<Channel_UserUpdateWithoutUserInput, Channel_UserUncheckedUpdateWithoutUserInput>
    create: XOR<Channel_UserCreateWithoutUserInput, Channel_UserUncheckedCreateWithoutUserInput>
  }

  export type Channel_UserUpdateWithWhereUniqueWithoutUserInput = {
    where: Channel_UserWhereUniqueInput
    data: XOR<Channel_UserUpdateWithoutUserInput, Channel_UserUncheckedUpdateWithoutUserInput>
  }

  export type Channel_UserUpdateManyWithWhereWithoutUserInput = {
    where: Channel_UserScalarWhereInput
    data: XOR<Channel_UserUpdateManyMutationInput, Channel_UserUncheckedUpdateManyWithoutChannelsInput>
  }

  export type Channel_UserScalarWhereInput = {
    AND?: Enumerable<Channel_UserScalarWhereInput>
    OR?: Enumerable<Channel_UserScalarWhereInput>
    NOT?: Enumerable<Channel_UserScalarWhereInput>
    id?: IntFilter | number
    channelId?: IntFilter | number
    userId?: IntFilter | number
    userType?: IntFilter | number
    status?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
  }

  export type Achievement_UserUpsertWithWhereUniqueWithoutUserInput = {
    where: Achievement_UserWhereUniqueInput
    update: XOR<Achievement_UserUpdateWithoutUserInput, Achievement_UserUncheckedUpdateWithoutUserInput>
    create: XOR<Achievement_UserCreateWithoutUserInput, Achievement_UserUncheckedCreateWithoutUserInput>
  }

  export type Achievement_UserUpdateWithWhereUniqueWithoutUserInput = {
    where: Achievement_UserWhereUniqueInput
    data: XOR<Achievement_UserUpdateWithoutUserInput, Achievement_UserUncheckedUpdateWithoutUserInput>
  }

  export type Achievement_UserUpdateManyWithWhereWithoutUserInput = {
    where: Achievement_UserScalarWhereInput
    data: XOR<Achievement_UserUpdateManyMutationInput, Achievement_UserUncheckedUpdateManyWithoutAchievementsInput>
  }

  export type Achievement_UserScalarWhereInput = {
    AND?: Enumerable<Achievement_UserScalarWhereInput>
    OR?: Enumerable<Achievement_UserScalarWhereInput>
    NOT?: Enumerable<Achievement_UserScalarWhereInput>
    id?: IntFilter | number
    userId?: IntFilter | number
    achievementId?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
  }

  export type MessageUpsertWithWhereUniqueWithoutSenderInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutSenderInput, MessageUncheckedUpdateWithoutSenderInput>
    create: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutSenderInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutSenderInput, MessageUncheckedUpdateWithoutSenderInput>
  }

  export type MessageUpdateManyWithWhereWithoutSenderInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutMessagesInput>
  }

  export type MessageScalarWhereInput = {
    AND?: Enumerable<MessageScalarWhereInput>
    OR?: Enumerable<MessageScalarWhereInput>
    NOT?: Enumerable<MessageScalarWhereInput>
    id?: IntFilter | number
    senderId?: IntFilter | number
    channelId?: IntFilter | number
    text?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
  }

  export type UserCreateWithoutWinLogsInput = {
    imageUrl?: string | null
    nickname?: string | null
    rank?: number
    isTwoFactor?: boolean
    ftId: string
    ftUsername?: string | null
    ftAccessToken?: string | null
    ftRefreshToken?: string | null
    ftAccessExpiresAt?: Date | string | null
    ftRefreshExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
    loseLogs?: GameResultCreateNestedManyWithoutLoserInput
    followers?: FollowUserCreateNestedManyWithoutFollewerInput
    followees?: FollowUserCreateNestedManyWithoutFolleweeInput
    blockers?: BlockUserCreateNestedManyWithoutBlockerInput
    blockeds?: BlockUserCreateNestedManyWithoutBlockedInput
    channels?: Channel_UserCreateNestedManyWithoutUserInput
    achievements?: Achievement_UserCreateNestedManyWithoutUserInput
    messages?: MessageCreateNestedManyWithoutSenderInput
  }

  export type UserUncheckedCreateWithoutWinLogsInput = {
    id?: number
    imageUrl?: string | null
    nickname?: string | null
    rank?: number
    isTwoFactor?: boolean
    ftId: string
    ftUsername?: string | null
    ftAccessToken?: string | null
    ftRefreshToken?: string | null
    ftAccessExpiresAt?: Date | string | null
    ftRefreshExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
    loseLogs?: GameResultUncheckedCreateNestedManyWithoutLoserInput
    followers?: FollowUserUncheckedCreateNestedManyWithoutFollewerInput
    followees?: FollowUserUncheckedCreateNestedManyWithoutFolleweeInput
    blockers?: BlockUserUncheckedCreateNestedManyWithoutBlockerInput
    blockeds?: BlockUserUncheckedCreateNestedManyWithoutBlockedInput
    channels?: Channel_UserUncheckedCreateNestedManyWithoutUserInput
    achievements?: Achievement_UserUncheckedCreateNestedManyWithoutUserInput
    messages?: MessageUncheckedCreateNestedManyWithoutSenderInput
  }

  export type UserCreateOrConnectWithoutWinLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWinLogsInput, UserUncheckedCreateWithoutWinLogsInput>
  }

  export type UserCreateWithoutLoseLogsInput = {
    imageUrl?: string | null
    nickname?: string | null
    rank?: number
    isTwoFactor?: boolean
    ftId: string
    ftUsername?: string | null
    ftAccessToken?: string | null
    ftRefreshToken?: string | null
    ftAccessExpiresAt?: Date | string | null
    ftRefreshExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
    winLogs?: GameResultCreateNestedManyWithoutWinnerInput
    followers?: FollowUserCreateNestedManyWithoutFollewerInput
    followees?: FollowUserCreateNestedManyWithoutFolleweeInput
    blockers?: BlockUserCreateNestedManyWithoutBlockerInput
    blockeds?: BlockUserCreateNestedManyWithoutBlockedInput
    channels?: Channel_UserCreateNestedManyWithoutUserInput
    achievements?: Achievement_UserCreateNestedManyWithoutUserInput
    messages?: MessageCreateNestedManyWithoutSenderInput
  }

  export type UserUncheckedCreateWithoutLoseLogsInput = {
    id?: number
    imageUrl?: string | null
    nickname?: string | null
    rank?: number
    isTwoFactor?: boolean
    ftId: string
    ftUsername?: string | null
    ftAccessToken?: string | null
    ftRefreshToken?: string | null
    ftAccessExpiresAt?: Date | string | null
    ftRefreshExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
    winLogs?: GameResultUncheckedCreateNestedManyWithoutWinnerInput
    followers?: FollowUserUncheckedCreateNestedManyWithoutFollewerInput
    followees?: FollowUserUncheckedCreateNestedManyWithoutFolleweeInput
    blockers?: BlockUserUncheckedCreateNestedManyWithoutBlockerInput
    blockeds?: BlockUserUncheckedCreateNestedManyWithoutBlockedInput
    channels?: Channel_UserUncheckedCreateNestedManyWithoutUserInput
    achievements?: Achievement_UserUncheckedCreateNestedManyWithoutUserInput
    messages?: MessageUncheckedCreateNestedManyWithoutSenderInput
  }

  export type UserCreateOrConnectWithoutLoseLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLoseLogsInput, UserUncheckedCreateWithoutLoseLogsInput>
  }

  export type UserUpsertWithoutWinLogsInput = {
    update: XOR<UserUpdateWithoutWinLogsInput, UserUncheckedUpdateWithoutWinLogsInput>
    create: XOR<UserCreateWithoutWinLogsInput, UserUncheckedCreateWithoutWinLogsInput>
  }

  export type UserUpdateWithoutWinLogsInput = {
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    rank?: IntFieldUpdateOperationsInput | number
    isTwoFactor?: BoolFieldUpdateOperationsInput | boolean
    ftId?: StringFieldUpdateOperationsInput | string
    ftUsername?: NullableStringFieldUpdateOperationsInput | string | null
    ftAccessToken?: NullableStringFieldUpdateOperationsInput | string | null
    ftRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    ftAccessExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ftRefreshExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loseLogs?: GameResultUpdateManyWithoutLoserNestedInput
    followers?: FollowUserUpdateManyWithoutFollewerNestedInput
    followees?: FollowUserUpdateManyWithoutFolleweeNestedInput
    blockers?: BlockUserUpdateManyWithoutBlockerNestedInput
    blockeds?: BlockUserUpdateManyWithoutBlockedNestedInput
    channels?: Channel_UserUpdateManyWithoutUserNestedInput
    achievements?: Achievement_UserUpdateManyWithoutUserNestedInput
    messages?: MessageUpdateManyWithoutSenderNestedInput
  }

  export type UserUncheckedUpdateWithoutWinLogsInput = {
    id?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    rank?: IntFieldUpdateOperationsInput | number
    isTwoFactor?: BoolFieldUpdateOperationsInput | boolean
    ftId?: StringFieldUpdateOperationsInput | string
    ftUsername?: NullableStringFieldUpdateOperationsInput | string | null
    ftAccessToken?: NullableStringFieldUpdateOperationsInput | string | null
    ftRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    ftAccessExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ftRefreshExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    loseLogs?: GameResultUncheckedUpdateManyWithoutLoserNestedInput
    followers?: FollowUserUncheckedUpdateManyWithoutFollewerNestedInput
    followees?: FollowUserUncheckedUpdateManyWithoutFolleweeNestedInput
    blockers?: BlockUserUncheckedUpdateManyWithoutBlockerNestedInput
    blockeds?: BlockUserUncheckedUpdateManyWithoutBlockedNestedInput
    channels?: Channel_UserUncheckedUpdateManyWithoutUserNestedInput
    achievements?: Achievement_UserUncheckedUpdateManyWithoutUserNestedInput
    messages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
  }

  export type UserUpsertWithoutLoseLogsInput = {
    update: XOR<UserUpdateWithoutLoseLogsInput, UserUncheckedUpdateWithoutLoseLogsInput>
    create: XOR<UserCreateWithoutLoseLogsInput, UserUncheckedCreateWithoutLoseLogsInput>
  }

  export type UserUpdateWithoutLoseLogsInput = {
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    rank?: IntFieldUpdateOperationsInput | number
    isTwoFactor?: BoolFieldUpdateOperationsInput | boolean
    ftId?: StringFieldUpdateOperationsInput | string
    ftUsername?: NullableStringFieldUpdateOperationsInput | string | null
    ftAccessToken?: NullableStringFieldUpdateOperationsInput | string | null
    ftRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    ftAccessExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ftRefreshExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    winLogs?: GameResultUpdateManyWithoutWinnerNestedInput
    followers?: FollowUserUpdateManyWithoutFollewerNestedInput
    followees?: FollowUserUpdateManyWithoutFolleweeNestedInput
    blockers?: BlockUserUpdateManyWithoutBlockerNestedInput
    blockeds?: BlockUserUpdateManyWithoutBlockedNestedInput
    channels?: Channel_UserUpdateManyWithoutUserNestedInput
    achievements?: Achievement_UserUpdateManyWithoutUserNestedInput
    messages?: MessageUpdateManyWithoutSenderNestedInput
  }

  export type UserUncheckedUpdateWithoutLoseLogsInput = {
    id?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    rank?: IntFieldUpdateOperationsInput | number
    isTwoFactor?: BoolFieldUpdateOperationsInput | boolean
    ftId?: StringFieldUpdateOperationsInput | string
    ftUsername?: NullableStringFieldUpdateOperationsInput | string | null
    ftAccessToken?: NullableStringFieldUpdateOperationsInput | string | null
    ftRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    ftAccessExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ftRefreshExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    winLogs?: GameResultUncheckedUpdateManyWithoutWinnerNestedInput
    followers?: FollowUserUncheckedUpdateManyWithoutFollewerNestedInput
    followees?: FollowUserUncheckedUpdateManyWithoutFolleweeNestedInput
    blockers?: BlockUserUncheckedUpdateManyWithoutBlockerNestedInput
    blockeds?: BlockUserUncheckedUpdateManyWithoutBlockedNestedInput
    channels?: Channel_UserUncheckedUpdateManyWithoutUserNestedInput
    achievements?: Achievement_UserUncheckedUpdateManyWithoutUserNestedInput
    messages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
  }

  export type UserCreateWithoutFollowersInput = {
    imageUrl?: string | null
    nickname?: string | null
    rank?: number
    isTwoFactor?: boolean
    ftId: string
    ftUsername?: string | null
    ftAccessToken?: string | null
    ftRefreshToken?: string | null
    ftAccessExpiresAt?: Date | string | null
    ftRefreshExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
    winLogs?: GameResultCreateNestedManyWithoutWinnerInput
    loseLogs?: GameResultCreateNestedManyWithoutLoserInput
    followees?: FollowUserCreateNestedManyWithoutFolleweeInput
    blockers?: BlockUserCreateNestedManyWithoutBlockerInput
    blockeds?: BlockUserCreateNestedManyWithoutBlockedInput
    channels?: Channel_UserCreateNestedManyWithoutUserInput
    achievements?: Achievement_UserCreateNestedManyWithoutUserInput
    messages?: MessageCreateNestedManyWithoutSenderInput
  }

  export type UserUncheckedCreateWithoutFollowersInput = {
    id?: number
    imageUrl?: string | null
    nickname?: string | null
    rank?: number
    isTwoFactor?: boolean
    ftId: string
    ftUsername?: string | null
    ftAccessToken?: string | null
    ftRefreshToken?: string | null
    ftAccessExpiresAt?: Date | string | null
    ftRefreshExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
    winLogs?: GameResultUncheckedCreateNestedManyWithoutWinnerInput
    loseLogs?: GameResultUncheckedCreateNestedManyWithoutLoserInput
    followees?: FollowUserUncheckedCreateNestedManyWithoutFolleweeInput
    blockers?: BlockUserUncheckedCreateNestedManyWithoutBlockerInput
    blockeds?: BlockUserUncheckedCreateNestedManyWithoutBlockedInput
    channels?: Channel_UserUncheckedCreateNestedManyWithoutUserInput
    achievements?: Achievement_UserUncheckedCreateNestedManyWithoutUserInput
    messages?: MessageUncheckedCreateNestedManyWithoutSenderInput
  }

  export type UserCreateOrConnectWithoutFollowersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFollowersInput, UserUncheckedCreateWithoutFollowersInput>
  }

  export type UserCreateWithoutFolloweesInput = {
    imageUrl?: string | null
    nickname?: string | null
    rank?: number
    isTwoFactor?: boolean
    ftId: string
    ftUsername?: string | null
    ftAccessToken?: string | null
    ftRefreshToken?: string | null
    ftAccessExpiresAt?: Date | string | null
    ftRefreshExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
    winLogs?: GameResultCreateNestedManyWithoutWinnerInput
    loseLogs?: GameResultCreateNestedManyWithoutLoserInput
    followers?: FollowUserCreateNestedManyWithoutFollewerInput
    blockers?: BlockUserCreateNestedManyWithoutBlockerInput
    blockeds?: BlockUserCreateNestedManyWithoutBlockedInput
    channels?: Channel_UserCreateNestedManyWithoutUserInput
    achievements?: Achievement_UserCreateNestedManyWithoutUserInput
    messages?: MessageCreateNestedManyWithoutSenderInput
  }

  export type UserUncheckedCreateWithoutFolloweesInput = {
    id?: number
    imageUrl?: string | null
    nickname?: string | null
    rank?: number
    isTwoFactor?: boolean
    ftId: string
    ftUsername?: string | null
    ftAccessToken?: string | null
    ftRefreshToken?: string | null
    ftAccessExpiresAt?: Date | string | null
    ftRefreshExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
    winLogs?: GameResultUncheckedCreateNestedManyWithoutWinnerInput
    loseLogs?: GameResultUncheckedCreateNestedManyWithoutLoserInput
    followers?: FollowUserUncheckedCreateNestedManyWithoutFollewerInput
    blockers?: BlockUserUncheckedCreateNestedManyWithoutBlockerInput
    blockeds?: BlockUserUncheckedCreateNestedManyWithoutBlockedInput
    channels?: Channel_UserUncheckedCreateNestedManyWithoutUserInput
    achievements?: Achievement_UserUncheckedCreateNestedManyWithoutUserInput
    messages?: MessageUncheckedCreateNestedManyWithoutSenderInput
  }

  export type UserCreateOrConnectWithoutFolloweesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFolloweesInput, UserUncheckedCreateWithoutFolloweesInput>
  }

  export type UserUpsertWithoutFollowersInput = {
    update: XOR<UserUpdateWithoutFollowersInput, UserUncheckedUpdateWithoutFollowersInput>
    create: XOR<UserCreateWithoutFollowersInput, UserUncheckedCreateWithoutFollowersInput>
  }

  export type UserUpdateWithoutFollowersInput = {
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    rank?: IntFieldUpdateOperationsInput | number
    isTwoFactor?: BoolFieldUpdateOperationsInput | boolean
    ftId?: StringFieldUpdateOperationsInput | string
    ftUsername?: NullableStringFieldUpdateOperationsInput | string | null
    ftAccessToken?: NullableStringFieldUpdateOperationsInput | string | null
    ftRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    ftAccessExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ftRefreshExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    winLogs?: GameResultUpdateManyWithoutWinnerNestedInput
    loseLogs?: GameResultUpdateManyWithoutLoserNestedInput
    followees?: FollowUserUpdateManyWithoutFolleweeNestedInput
    blockers?: BlockUserUpdateManyWithoutBlockerNestedInput
    blockeds?: BlockUserUpdateManyWithoutBlockedNestedInput
    channels?: Channel_UserUpdateManyWithoutUserNestedInput
    achievements?: Achievement_UserUpdateManyWithoutUserNestedInput
    messages?: MessageUpdateManyWithoutSenderNestedInput
  }

  export type UserUncheckedUpdateWithoutFollowersInput = {
    id?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    rank?: IntFieldUpdateOperationsInput | number
    isTwoFactor?: BoolFieldUpdateOperationsInput | boolean
    ftId?: StringFieldUpdateOperationsInput | string
    ftUsername?: NullableStringFieldUpdateOperationsInput | string | null
    ftAccessToken?: NullableStringFieldUpdateOperationsInput | string | null
    ftRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    ftAccessExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ftRefreshExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    winLogs?: GameResultUncheckedUpdateManyWithoutWinnerNestedInput
    loseLogs?: GameResultUncheckedUpdateManyWithoutLoserNestedInput
    followees?: FollowUserUncheckedUpdateManyWithoutFolleweeNestedInput
    blockers?: BlockUserUncheckedUpdateManyWithoutBlockerNestedInput
    blockeds?: BlockUserUncheckedUpdateManyWithoutBlockedNestedInput
    channels?: Channel_UserUncheckedUpdateManyWithoutUserNestedInput
    achievements?: Achievement_UserUncheckedUpdateManyWithoutUserNestedInput
    messages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
  }

  export type UserUpsertWithoutFolloweesInput = {
    update: XOR<UserUpdateWithoutFolloweesInput, UserUncheckedUpdateWithoutFolloweesInput>
    create: XOR<UserCreateWithoutFolloweesInput, UserUncheckedCreateWithoutFolloweesInput>
  }

  export type UserUpdateWithoutFolloweesInput = {
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    rank?: IntFieldUpdateOperationsInput | number
    isTwoFactor?: BoolFieldUpdateOperationsInput | boolean
    ftId?: StringFieldUpdateOperationsInput | string
    ftUsername?: NullableStringFieldUpdateOperationsInput | string | null
    ftAccessToken?: NullableStringFieldUpdateOperationsInput | string | null
    ftRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    ftAccessExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ftRefreshExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    winLogs?: GameResultUpdateManyWithoutWinnerNestedInput
    loseLogs?: GameResultUpdateManyWithoutLoserNestedInput
    followers?: FollowUserUpdateManyWithoutFollewerNestedInput
    blockers?: BlockUserUpdateManyWithoutBlockerNestedInput
    blockeds?: BlockUserUpdateManyWithoutBlockedNestedInput
    channels?: Channel_UserUpdateManyWithoutUserNestedInput
    achievements?: Achievement_UserUpdateManyWithoutUserNestedInput
    messages?: MessageUpdateManyWithoutSenderNestedInput
  }

  export type UserUncheckedUpdateWithoutFolloweesInput = {
    id?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    rank?: IntFieldUpdateOperationsInput | number
    isTwoFactor?: BoolFieldUpdateOperationsInput | boolean
    ftId?: StringFieldUpdateOperationsInput | string
    ftUsername?: NullableStringFieldUpdateOperationsInput | string | null
    ftAccessToken?: NullableStringFieldUpdateOperationsInput | string | null
    ftRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    ftAccessExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ftRefreshExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    winLogs?: GameResultUncheckedUpdateManyWithoutWinnerNestedInput
    loseLogs?: GameResultUncheckedUpdateManyWithoutLoserNestedInput
    followers?: FollowUserUncheckedUpdateManyWithoutFollewerNestedInput
    blockers?: BlockUserUncheckedUpdateManyWithoutBlockerNestedInput
    blockeds?: BlockUserUncheckedUpdateManyWithoutBlockedNestedInput
    channels?: Channel_UserUncheckedUpdateManyWithoutUserNestedInput
    achievements?: Achievement_UserUncheckedUpdateManyWithoutUserNestedInput
    messages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
  }

  export type UserCreateWithoutBlockersInput = {
    imageUrl?: string | null
    nickname?: string | null
    rank?: number
    isTwoFactor?: boolean
    ftId: string
    ftUsername?: string | null
    ftAccessToken?: string | null
    ftRefreshToken?: string | null
    ftAccessExpiresAt?: Date | string | null
    ftRefreshExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
    winLogs?: GameResultCreateNestedManyWithoutWinnerInput
    loseLogs?: GameResultCreateNestedManyWithoutLoserInput
    followers?: FollowUserCreateNestedManyWithoutFollewerInput
    followees?: FollowUserCreateNestedManyWithoutFolleweeInput
    blockeds?: BlockUserCreateNestedManyWithoutBlockedInput
    channels?: Channel_UserCreateNestedManyWithoutUserInput
    achievements?: Achievement_UserCreateNestedManyWithoutUserInput
    messages?: MessageCreateNestedManyWithoutSenderInput
  }

  export type UserUncheckedCreateWithoutBlockersInput = {
    id?: number
    imageUrl?: string | null
    nickname?: string | null
    rank?: number
    isTwoFactor?: boolean
    ftId: string
    ftUsername?: string | null
    ftAccessToken?: string | null
    ftRefreshToken?: string | null
    ftAccessExpiresAt?: Date | string | null
    ftRefreshExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
    winLogs?: GameResultUncheckedCreateNestedManyWithoutWinnerInput
    loseLogs?: GameResultUncheckedCreateNestedManyWithoutLoserInput
    followers?: FollowUserUncheckedCreateNestedManyWithoutFollewerInput
    followees?: FollowUserUncheckedCreateNestedManyWithoutFolleweeInput
    blockeds?: BlockUserUncheckedCreateNestedManyWithoutBlockedInput
    channels?: Channel_UserUncheckedCreateNestedManyWithoutUserInput
    achievements?: Achievement_UserUncheckedCreateNestedManyWithoutUserInput
    messages?: MessageUncheckedCreateNestedManyWithoutSenderInput
  }

  export type UserCreateOrConnectWithoutBlockersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBlockersInput, UserUncheckedCreateWithoutBlockersInput>
  }

  export type UserCreateWithoutBlockedsInput = {
    imageUrl?: string | null
    nickname?: string | null
    rank?: number
    isTwoFactor?: boolean
    ftId: string
    ftUsername?: string | null
    ftAccessToken?: string | null
    ftRefreshToken?: string | null
    ftAccessExpiresAt?: Date | string | null
    ftRefreshExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
    winLogs?: GameResultCreateNestedManyWithoutWinnerInput
    loseLogs?: GameResultCreateNestedManyWithoutLoserInput
    followers?: FollowUserCreateNestedManyWithoutFollewerInput
    followees?: FollowUserCreateNestedManyWithoutFolleweeInput
    blockers?: BlockUserCreateNestedManyWithoutBlockerInput
    channels?: Channel_UserCreateNestedManyWithoutUserInput
    achievements?: Achievement_UserCreateNestedManyWithoutUserInput
    messages?: MessageCreateNestedManyWithoutSenderInput
  }

  export type UserUncheckedCreateWithoutBlockedsInput = {
    id?: number
    imageUrl?: string | null
    nickname?: string | null
    rank?: number
    isTwoFactor?: boolean
    ftId: string
    ftUsername?: string | null
    ftAccessToken?: string | null
    ftRefreshToken?: string | null
    ftAccessExpiresAt?: Date | string | null
    ftRefreshExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
    winLogs?: GameResultUncheckedCreateNestedManyWithoutWinnerInput
    loseLogs?: GameResultUncheckedCreateNestedManyWithoutLoserInput
    followers?: FollowUserUncheckedCreateNestedManyWithoutFollewerInput
    followees?: FollowUserUncheckedCreateNestedManyWithoutFolleweeInput
    blockers?: BlockUserUncheckedCreateNestedManyWithoutBlockerInput
    channels?: Channel_UserUncheckedCreateNestedManyWithoutUserInput
    achievements?: Achievement_UserUncheckedCreateNestedManyWithoutUserInput
    messages?: MessageUncheckedCreateNestedManyWithoutSenderInput
  }

  export type UserCreateOrConnectWithoutBlockedsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBlockedsInput, UserUncheckedCreateWithoutBlockedsInput>
  }

  export type UserUpsertWithoutBlockersInput = {
    update: XOR<UserUpdateWithoutBlockersInput, UserUncheckedUpdateWithoutBlockersInput>
    create: XOR<UserCreateWithoutBlockersInput, UserUncheckedCreateWithoutBlockersInput>
  }

  export type UserUpdateWithoutBlockersInput = {
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    rank?: IntFieldUpdateOperationsInput | number
    isTwoFactor?: BoolFieldUpdateOperationsInput | boolean
    ftId?: StringFieldUpdateOperationsInput | string
    ftUsername?: NullableStringFieldUpdateOperationsInput | string | null
    ftAccessToken?: NullableStringFieldUpdateOperationsInput | string | null
    ftRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    ftAccessExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ftRefreshExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    winLogs?: GameResultUpdateManyWithoutWinnerNestedInput
    loseLogs?: GameResultUpdateManyWithoutLoserNestedInput
    followers?: FollowUserUpdateManyWithoutFollewerNestedInput
    followees?: FollowUserUpdateManyWithoutFolleweeNestedInput
    blockeds?: BlockUserUpdateManyWithoutBlockedNestedInput
    channels?: Channel_UserUpdateManyWithoutUserNestedInput
    achievements?: Achievement_UserUpdateManyWithoutUserNestedInput
    messages?: MessageUpdateManyWithoutSenderNestedInput
  }

  export type UserUncheckedUpdateWithoutBlockersInput = {
    id?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    rank?: IntFieldUpdateOperationsInput | number
    isTwoFactor?: BoolFieldUpdateOperationsInput | boolean
    ftId?: StringFieldUpdateOperationsInput | string
    ftUsername?: NullableStringFieldUpdateOperationsInput | string | null
    ftAccessToken?: NullableStringFieldUpdateOperationsInput | string | null
    ftRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    ftAccessExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ftRefreshExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    winLogs?: GameResultUncheckedUpdateManyWithoutWinnerNestedInput
    loseLogs?: GameResultUncheckedUpdateManyWithoutLoserNestedInput
    followers?: FollowUserUncheckedUpdateManyWithoutFollewerNestedInput
    followees?: FollowUserUncheckedUpdateManyWithoutFolleweeNestedInput
    blockeds?: BlockUserUncheckedUpdateManyWithoutBlockedNestedInput
    channels?: Channel_UserUncheckedUpdateManyWithoutUserNestedInput
    achievements?: Achievement_UserUncheckedUpdateManyWithoutUserNestedInput
    messages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
  }

  export type UserUpsertWithoutBlockedsInput = {
    update: XOR<UserUpdateWithoutBlockedsInput, UserUncheckedUpdateWithoutBlockedsInput>
    create: XOR<UserCreateWithoutBlockedsInput, UserUncheckedCreateWithoutBlockedsInput>
  }

  export type UserUpdateWithoutBlockedsInput = {
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    rank?: IntFieldUpdateOperationsInput | number
    isTwoFactor?: BoolFieldUpdateOperationsInput | boolean
    ftId?: StringFieldUpdateOperationsInput | string
    ftUsername?: NullableStringFieldUpdateOperationsInput | string | null
    ftAccessToken?: NullableStringFieldUpdateOperationsInput | string | null
    ftRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    ftAccessExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ftRefreshExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    winLogs?: GameResultUpdateManyWithoutWinnerNestedInput
    loseLogs?: GameResultUpdateManyWithoutLoserNestedInput
    followers?: FollowUserUpdateManyWithoutFollewerNestedInput
    followees?: FollowUserUpdateManyWithoutFolleweeNestedInput
    blockers?: BlockUserUpdateManyWithoutBlockerNestedInput
    channels?: Channel_UserUpdateManyWithoutUserNestedInput
    achievements?: Achievement_UserUpdateManyWithoutUserNestedInput
    messages?: MessageUpdateManyWithoutSenderNestedInput
  }

  export type UserUncheckedUpdateWithoutBlockedsInput = {
    id?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    rank?: IntFieldUpdateOperationsInput | number
    isTwoFactor?: BoolFieldUpdateOperationsInput | boolean
    ftId?: StringFieldUpdateOperationsInput | string
    ftUsername?: NullableStringFieldUpdateOperationsInput | string | null
    ftAccessToken?: NullableStringFieldUpdateOperationsInput | string | null
    ftRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    ftAccessExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ftRefreshExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    winLogs?: GameResultUncheckedUpdateManyWithoutWinnerNestedInput
    loseLogs?: GameResultUncheckedUpdateManyWithoutLoserNestedInput
    followers?: FollowUserUncheckedUpdateManyWithoutFollewerNestedInput
    followees?: FollowUserUncheckedUpdateManyWithoutFolleweeNestedInput
    blockers?: BlockUserUncheckedUpdateManyWithoutBlockerNestedInput
    channels?: Channel_UserUncheckedUpdateManyWithoutUserNestedInput
    achievements?: Achievement_UserUncheckedUpdateManyWithoutUserNestedInput
    messages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
  }

  export type Channel_UserCreateWithoutChannelInput = {
    userType: number
    status: number
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutChannelsInput
  }

  export type Channel_UserUncheckedCreateWithoutChannelInput = {
    id?: number
    userId: number
    userType: number
    status: number
    createdAt?: Date | string
  }

  export type Channel_UserCreateOrConnectWithoutChannelInput = {
    where: Channel_UserWhereUniqueInput
    create: XOR<Channel_UserCreateWithoutChannelInput, Channel_UserUncheckedCreateWithoutChannelInput>
  }

  export type Channel_UserCreateManyChannelInputEnvelope = {
    data: Enumerable<Channel_UserCreateManyChannelInput>
    skipDuplicates?: boolean
  }

  export type MessageCreateWithoutChannelInput = {
    text: string
    createdAt?: Date | string
    sender: UserCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateWithoutChannelInput = {
    id?: number
    senderId: number
    text: string
    createdAt?: Date | string
  }

  export type MessageCreateOrConnectWithoutChannelInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutChannelInput, MessageUncheckedCreateWithoutChannelInput>
  }

  export type MessageCreateManyChannelInputEnvelope = {
    data: Enumerable<MessageCreateManyChannelInput>
    skipDuplicates?: boolean
  }

  export type Channel_UserUpsertWithWhereUniqueWithoutChannelInput = {
    where: Channel_UserWhereUniqueInput
    update: XOR<Channel_UserUpdateWithoutChannelInput, Channel_UserUncheckedUpdateWithoutChannelInput>
    create: XOR<Channel_UserCreateWithoutChannelInput, Channel_UserUncheckedCreateWithoutChannelInput>
  }

  export type Channel_UserUpdateWithWhereUniqueWithoutChannelInput = {
    where: Channel_UserWhereUniqueInput
    data: XOR<Channel_UserUpdateWithoutChannelInput, Channel_UserUncheckedUpdateWithoutChannelInput>
  }

  export type Channel_UserUpdateManyWithWhereWithoutChannelInput = {
    where: Channel_UserScalarWhereInput
    data: XOR<Channel_UserUpdateManyMutationInput, Channel_UserUncheckedUpdateManyWithoutUsersInput>
  }

  export type MessageUpsertWithWhereUniqueWithoutChannelInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutChannelInput, MessageUncheckedUpdateWithoutChannelInput>
    create: XOR<MessageCreateWithoutChannelInput, MessageUncheckedCreateWithoutChannelInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutChannelInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutChannelInput, MessageUncheckedUpdateWithoutChannelInput>
  }

  export type MessageUpdateManyWithWhereWithoutChannelInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutMessagesInput>
  }

  export type ChannelCreateWithoutUsersInput = {
    title: string
    channelCode: string
    password?: string | null
    idPublic: boolean
    isDm: boolean
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
    messages?: MessageCreateNestedManyWithoutChannelInput
  }

  export type ChannelUncheckedCreateWithoutUsersInput = {
    id?: number
    title: string
    channelCode: string
    password?: string | null
    idPublic: boolean
    isDm: boolean
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
    messages?: MessageUncheckedCreateNestedManyWithoutChannelInput
  }

  export type ChannelCreateOrConnectWithoutUsersInput = {
    where: ChannelWhereUniqueInput
    create: XOR<ChannelCreateWithoutUsersInput, ChannelUncheckedCreateWithoutUsersInput>
  }

  export type UserCreateWithoutChannelsInput = {
    imageUrl?: string | null
    nickname?: string | null
    rank?: number
    isTwoFactor?: boolean
    ftId: string
    ftUsername?: string | null
    ftAccessToken?: string | null
    ftRefreshToken?: string | null
    ftAccessExpiresAt?: Date | string | null
    ftRefreshExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
    winLogs?: GameResultCreateNestedManyWithoutWinnerInput
    loseLogs?: GameResultCreateNestedManyWithoutLoserInput
    followers?: FollowUserCreateNestedManyWithoutFollewerInput
    followees?: FollowUserCreateNestedManyWithoutFolleweeInput
    blockers?: BlockUserCreateNestedManyWithoutBlockerInput
    blockeds?: BlockUserCreateNestedManyWithoutBlockedInput
    achievements?: Achievement_UserCreateNestedManyWithoutUserInput
    messages?: MessageCreateNestedManyWithoutSenderInput
  }

  export type UserUncheckedCreateWithoutChannelsInput = {
    id?: number
    imageUrl?: string | null
    nickname?: string | null
    rank?: number
    isTwoFactor?: boolean
    ftId: string
    ftUsername?: string | null
    ftAccessToken?: string | null
    ftRefreshToken?: string | null
    ftAccessExpiresAt?: Date | string | null
    ftRefreshExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
    winLogs?: GameResultUncheckedCreateNestedManyWithoutWinnerInput
    loseLogs?: GameResultUncheckedCreateNestedManyWithoutLoserInput
    followers?: FollowUserUncheckedCreateNestedManyWithoutFollewerInput
    followees?: FollowUserUncheckedCreateNestedManyWithoutFolleweeInput
    blockers?: BlockUserUncheckedCreateNestedManyWithoutBlockerInput
    blockeds?: BlockUserUncheckedCreateNestedManyWithoutBlockedInput
    achievements?: Achievement_UserUncheckedCreateNestedManyWithoutUserInput
    messages?: MessageUncheckedCreateNestedManyWithoutSenderInput
  }

  export type UserCreateOrConnectWithoutChannelsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutChannelsInput, UserUncheckedCreateWithoutChannelsInput>
  }

  export type ChannelUpsertWithoutUsersInput = {
    update: XOR<ChannelUpdateWithoutUsersInput, ChannelUncheckedUpdateWithoutUsersInput>
    create: XOR<ChannelCreateWithoutUsersInput, ChannelUncheckedCreateWithoutUsersInput>
  }

  export type ChannelUpdateWithoutUsersInput = {
    title?: StringFieldUpdateOperationsInput | string
    channelCode?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    idPublic?: BoolFieldUpdateOperationsInput | boolean
    isDm?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    messages?: MessageUpdateManyWithoutChannelNestedInput
  }

  export type ChannelUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    channelCode?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    idPublic?: BoolFieldUpdateOperationsInput | boolean
    isDm?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    messages?: MessageUncheckedUpdateManyWithoutChannelNestedInput
  }

  export type UserUpsertWithoutChannelsInput = {
    update: XOR<UserUpdateWithoutChannelsInput, UserUncheckedUpdateWithoutChannelsInput>
    create: XOR<UserCreateWithoutChannelsInput, UserUncheckedCreateWithoutChannelsInput>
  }

  export type UserUpdateWithoutChannelsInput = {
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    rank?: IntFieldUpdateOperationsInput | number
    isTwoFactor?: BoolFieldUpdateOperationsInput | boolean
    ftId?: StringFieldUpdateOperationsInput | string
    ftUsername?: NullableStringFieldUpdateOperationsInput | string | null
    ftAccessToken?: NullableStringFieldUpdateOperationsInput | string | null
    ftRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    ftAccessExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ftRefreshExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    winLogs?: GameResultUpdateManyWithoutWinnerNestedInput
    loseLogs?: GameResultUpdateManyWithoutLoserNestedInput
    followers?: FollowUserUpdateManyWithoutFollewerNestedInput
    followees?: FollowUserUpdateManyWithoutFolleweeNestedInput
    blockers?: BlockUserUpdateManyWithoutBlockerNestedInput
    blockeds?: BlockUserUpdateManyWithoutBlockedNestedInput
    achievements?: Achievement_UserUpdateManyWithoutUserNestedInput
    messages?: MessageUpdateManyWithoutSenderNestedInput
  }

  export type UserUncheckedUpdateWithoutChannelsInput = {
    id?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    rank?: IntFieldUpdateOperationsInput | number
    isTwoFactor?: BoolFieldUpdateOperationsInput | boolean
    ftId?: StringFieldUpdateOperationsInput | string
    ftUsername?: NullableStringFieldUpdateOperationsInput | string | null
    ftAccessToken?: NullableStringFieldUpdateOperationsInput | string | null
    ftRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    ftAccessExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ftRefreshExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    winLogs?: GameResultUncheckedUpdateManyWithoutWinnerNestedInput
    loseLogs?: GameResultUncheckedUpdateManyWithoutLoserNestedInput
    followers?: FollowUserUncheckedUpdateManyWithoutFollewerNestedInput
    followees?: FollowUserUncheckedUpdateManyWithoutFolleweeNestedInput
    blockers?: BlockUserUncheckedUpdateManyWithoutBlockerNestedInput
    blockeds?: BlockUserUncheckedUpdateManyWithoutBlockedNestedInput
    achievements?: Achievement_UserUncheckedUpdateManyWithoutUserNestedInput
    messages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
  }

  export type UserCreateWithoutMessagesInput = {
    imageUrl?: string | null
    nickname?: string | null
    rank?: number
    isTwoFactor?: boolean
    ftId: string
    ftUsername?: string | null
    ftAccessToken?: string | null
    ftRefreshToken?: string | null
    ftAccessExpiresAt?: Date | string | null
    ftRefreshExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
    winLogs?: GameResultCreateNestedManyWithoutWinnerInput
    loseLogs?: GameResultCreateNestedManyWithoutLoserInput
    followers?: FollowUserCreateNestedManyWithoutFollewerInput
    followees?: FollowUserCreateNestedManyWithoutFolleweeInput
    blockers?: BlockUserCreateNestedManyWithoutBlockerInput
    blockeds?: BlockUserCreateNestedManyWithoutBlockedInput
    channels?: Channel_UserCreateNestedManyWithoutUserInput
    achievements?: Achievement_UserCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMessagesInput = {
    id?: number
    imageUrl?: string | null
    nickname?: string | null
    rank?: number
    isTwoFactor?: boolean
    ftId: string
    ftUsername?: string | null
    ftAccessToken?: string | null
    ftRefreshToken?: string | null
    ftAccessExpiresAt?: Date | string | null
    ftRefreshExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
    winLogs?: GameResultUncheckedCreateNestedManyWithoutWinnerInput
    loseLogs?: GameResultUncheckedCreateNestedManyWithoutLoserInput
    followers?: FollowUserUncheckedCreateNestedManyWithoutFollewerInput
    followees?: FollowUserUncheckedCreateNestedManyWithoutFolleweeInput
    blockers?: BlockUserUncheckedCreateNestedManyWithoutBlockerInput
    blockeds?: BlockUserUncheckedCreateNestedManyWithoutBlockedInput
    channels?: Channel_UserUncheckedCreateNestedManyWithoutUserInput
    achievements?: Achievement_UserUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMessagesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
  }

  export type ChannelCreateWithoutMessagesInput = {
    title: string
    channelCode: string
    password?: string | null
    idPublic: boolean
    isDm: boolean
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
    users?: Channel_UserCreateNestedManyWithoutChannelInput
  }

  export type ChannelUncheckedCreateWithoutMessagesInput = {
    id?: number
    title: string
    channelCode: string
    password?: string | null
    idPublic: boolean
    isDm: boolean
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
    users?: Channel_UserUncheckedCreateNestedManyWithoutChannelInput
  }

  export type ChannelCreateOrConnectWithoutMessagesInput = {
    where: ChannelWhereUniqueInput
    create: XOR<ChannelCreateWithoutMessagesInput, ChannelUncheckedCreateWithoutMessagesInput>
  }

  export type UserUpsertWithoutMessagesInput = {
    update: XOR<UserUpdateWithoutMessagesInput, UserUncheckedUpdateWithoutMessagesInput>
    create: XOR<UserCreateWithoutMessagesInput, UserUncheckedCreateWithoutMessagesInput>
  }

  export type UserUpdateWithoutMessagesInput = {
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    rank?: IntFieldUpdateOperationsInput | number
    isTwoFactor?: BoolFieldUpdateOperationsInput | boolean
    ftId?: StringFieldUpdateOperationsInput | string
    ftUsername?: NullableStringFieldUpdateOperationsInput | string | null
    ftAccessToken?: NullableStringFieldUpdateOperationsInput | string | null
    ftRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    ftAccessExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ftRefreshExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    winLogs?: GameResultUpdateManyWithoutWinnerNestedInput
    loseLogs?: GameResultUpdateManyWithoutLoserNestedInput
    followers?: FollowUserUpdateManyWithoutFollewerNestedInput
    followees?: FollowUserUpdateManyWithoutFolleweeNestedInput
    blockers?: BlockUserUpdateManyWithoutBlockerNestedInput
    blockeds?: BlockUserUpdateManyWithoutBlockedNestedInput
    channels?: Channel_UserUpdateManyWithoutUserNestedInput
    achievements?: Achievement_UserUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMessagesInput = {
    id?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    rank?: IntFieldUpdateOperationsInput | number
    isTwoFactor?: BoolFieldUpdateOperationsInput | boolean
    ftId?: StringFieldUpdateOperationsInput | string
    ftUsername?: NullableStringFieldUpdateOperationsInput | string | null
    ftAccessToken?: NullableStringFieldUpdateOperationsInput | string | null
    ftRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    ftAccessExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ftRefreshExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    winLogs?: GameResultUncheckedUpdateManyWithoutWinnerNestedInput
    loseLogs?: GameResultUncheckedUpdateManyWithoutLoserNestedInput
    followers?: FollowUserUncheckedUpdateManyWithoutFollewerNestedInput
    followees?: FollowUserUncheckedUpdateManyWithoutFolleweeNestedInput
    blockers?: BlockUserUncheckedUpdateManyWithoutBlockerNestedInput
    blockeds?: BlockUserUncheckedUpdateManyWithoutBlockedNestedInput
    channels?: Channel_UserUncheckedUpdateManyWithoutUserNestedInput
    achievements?: Achievement_UserUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ChannelUpsertWithoutMessagesInput = {
    update: XOR<ChannelUpdateWithoutMessagesInput, ChannelUncheckedUpdateWithoutMessagesInput>
    create: XOR<ChannelCreateWithoutMessagesInput, ChannelUncheckedCreateWithoutMessagesInput>
  }

  export type ChannelUpdateWithoutMessagesInput = {
    title?: StringFieldUpdateOperationsInput | string
    channelCode?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    idPublic?: BoolFieldUpdateOperationsInput | boolean
    isDm?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: Channel_UserUpdateManyWithoutChannelNestedInput
  }

  export type ChannelUncheckedUpdateWithoutMessagesInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    channelCode?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    idPublic?: BoolFieldUpdateOperationsInput | boolean
    isDm?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: Channel_UserUncheckedUpdateManyWithoutChannelNestedInput
  }

  export type Achievement_UserCreateWithoutAchievementInput = {
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutAchievementsInput
  }

  export type Achievement_UserUncheckedCreateWithoutAchievementInput = {
    id?: number
    userId: number
    createdAt?: Date | string
  }

  export type Achievement_UserCreateOrConnectWithoutAchievementInput = {
    where: Achievement_UserWhereUniqueInput
    create: XOR<Achievement_UserCreateWithoutAchievementInput, Achievement_UserUncheckedCreateWithoutAchievementInput>
  }

  export type Achievement_UserCreateManyAchievementInputEnvelope = {
    data: Enumerable<Achievement_UserCreateManyAchievementInput>
    skipDuplicates?: boolean
  }

  export type Achievement_UserUpsertWithWhereUniqueWithoutAchievementInput = {
    where: Achievement_UserWhereUniqueInput
    update: XOR<Achievement_UserUpdateWithoutAchievementInput, Achievement_UserUncheckedUpdateWithoutAchievementInput>
    create: XOR<Achievement_UserCreateWithoutAchievementInput, Achievement_UserUncheckedCreateWithoutAchievementInput>
  }

  export type Achievement_UserUpdateWithWhereUniqueWithoutAchievementInput = {
    where: Achievement_UserWhereUniqueInput
    data: XOR<Achievement_UserUpdateWithoutAchievementInput, Achievement_UserUncheckedUpdateWithoutAchievementInput>
  }

  export type Achievement_UserUpdateManyWithWhereWithoutAchievementInput = {
    where: Achievement_UserScalarWhereInput
    data: XOR<Achievement_UserUpdateManyMutationInput, Achievement_UserUncheckedUpdateManyWithoutUsersInput>
  }

  export type AchievementCreateWithoutUsersInput = {
    name: string
    description: string
  }

  export type AchievementUncheckedCreateWithoutUsersInput = {
    id?: number
    name: string
    description: string
  }

  export type AchievementCreateOrConnectWithoutUsersInput = {
    where: AchievementWhereUniqueInput
    create: XOR<AchievementCreateWithoutUsersInput, AchievementUncheckedCreateWithoutUsersInput>
  }

  export type UserCreateWithoutAchievementsInput = {
    imageUrl?: string | null
    nickname?: string | null
    rank?: number
    isTwoFactor?: boolean
    ftId: string
    ftUsername?: string | null
    ftAccessToken?: string | null
    ftRefreshToken?: string | null
    ftAccessExpiresAt?: Date | string | null
    ftRefreshExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
    winLogs?: GameResultCreateNestedManyWithoutWinnerInput
    loseLogs?: GameResultCreateNestedManyWithoutLoserInput
    followers?: FollowUserCreateNestedManyWithoutFollewerInput
    followees?: FollowUserCreateNestedManyWithoutFolleweeInput
    blockers?: BlockUserCreateNestedManyWithoutBlockerInput
    blockeds?: BlockUserCreateNestedManyWithoutBlockedInput
    channels?: Channel_UserCreateNestedManyWithoutUserInput
    messages?: MessageCreateNestedManyWithoutSenderInput
  }

  export type UserUncheckedCreateWithoutAchievementsInput = {
    id?: number
    imageUrl?: string | null
    nickname?: string | null
    rank?: number
    isTwoFactor?: boolean
    ftId: string
    ftUsername?: string | null
    ftAccessToken?: string | null
    ftRefreshToken?: string | null
    ftAccessExpiresAt?: Date | string | null
    ftRefreshExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    deletedAt?: Date | string | null
    winLogs?: GameResultUncheckedCreateNestedManyWithoutWinnerInput
    loseLogs?: GameResultUncheckedCreateNestedManyWithoutLoserInput
    followers?: FollowUserUncheckedCreateNestedManyWithoutFollewerInput
    followees?: FollowUserUncheckedCreateNestedManyWithoutFolleweeInput
    blockers?: BlockUserUncheckedCreateNestedManyWithoutBlockerInput
    blockeds?: BlockUserUncheckedCreateNestedManyWithoutBlockedInput
    channels?: Channel_UserUncheckedCreateNestedManyWithoutUserInput
    messages?: MessageUncheckedCreateNestedManyWithoutSenderInput
  }

  export type UserCreateOrConnectWithoutAchievementsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAchievementsInput, UserUncheckedCreateWithoutAchievementsInput>
  }

  export type AchievementUpsertWithoutUsersInput = {
    update: XOR<AchievementUpdateWithoutUsersInput, AchievementUncheckedUpdateWithoutUsersInput>
    create: XOR<AchievementCreateWithoutUsersInput, AchievementUncheckedCreateWithoutUsersInput>
  }

  export type AchievementUpdateWithoutUsersInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type AchievementUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type UserUpsertWithoutAchievementsInput = {
    update: XOR<UserUpdateWithoutAchievementsInput, UserUncheckedUpdateWithoutAchievementsInput>
    create: XOR<UserCreateWithoutAchievementsInput, UserUncheckedCreateWithoutAchievementsInput>
  }

  export type UserUpdateWithoutAchievementsInput = {
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    rank?: IntFieldUpdateOperationsInput | number
    isTwoFactor?: BoolFieldUpdateOperationsInput | boolean
    ftId?: StringFieldUpdateOperationsInput | string
    ftUsername?: NullableStringFieldUpdateOperationsInput | string | null
    ftAccessToken?: NullableStringFieldUpdateOperationsInput | string | null
    ftRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    ftAccessExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ftRefreshExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    winLogs?: GameResultUpdateManyWithoutWinnerNestedInput
    loseLogs?: GameResultUpdateManyWithoutLoserNestedInput
    followers?: FollowUserUpdateManyWithoutFollewerNestedInput
    followees?: FollowUserUpdateManyWithoutFolleweeNestedInput
    blockers?: BlockUserUpdateManyWithoutBlockerNestedInput
    blockeds?: BlockUserUpdateManyWithoutBlockedNestedInput
    channels?: Channel_UserUpdateManyWithoutUserNestedInput
    messages?: MessageUpdateManyWithoutSenderNestedInput
  }

  export type UserUncheckedUpdateWithoutAchievementsInput = {
    id?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    rank?: IntFieldUpdateOperationsInput | number
    isTwoFactor?: BoolFieldUpdateOperationsInput | boolean
    ftId?: StringFieldUpdateOperationsInput | string
    ftUsername?: NullableStringFieldUpdateOperationsInput | string | null
    ftAccessToken?: NullableStringFieldUpdateOperationsInput | string | null
    ftRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    ftAccessExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ftRefreshExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    winLogs?: GameResultUncheckedUpdateManyWithoutWinnerNestedInput
    loseLogs?: GameResultUncheckedUpdateManyWithoutLoserNestedInput
    followers?: FollowUserUncheckedUpdateManyWithoutFollewerNestedInput
    followees?: FollowUserUncheckedUpdateManyWithoutFolleweeNestedInput
    blockers?: BlockUserUncheckedUpdateManyWithoutBlockerNestedInput
    blockeds?: BlockUserUncheckedUpdateManyWithoutBlockedNestedInput
    channels?: Channel_UserUncheckedUpdateManyWithoutUserNestedInput
    messages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
  }

  export type GameResultCreateManyWinnerInput = {
    id?: number
    score: number
    isLadder: boolean
    loserId: number
    createdAt?: Date | string
  }

  export type GameResultCreateManyLoserInput = {
    id?: number
    score: number
    isLadder: boolean
    winnerId: number
    createdAt?: Date | string
  }

  export type FollowUserCreateManyFollewerInput = {
    id?: number
    followeeId: number
    createdAt?: Date | string
  }

  export type FollowUserCreateManyFolleweeInput = {
    id?: number
    followerId: number
    createdAt?: Date | string
  }

  export type BlockUserCreateManyBlockerInput = {
    id?: number
    blockedId: number
    createdAt?: Date | string
  }

  export type BlockUserCreateManyBlockedInput = {
    id?: number
    blockerId: number
    createdAt?: Date | string
  }

  export type Channel_UserCreateManyUserInput = {
    id?: number
    channelId: number
    userType: number
    status: number
    createdAt?: Date | string
  }

  export type Achievement_UserCreateManyUserInput = {
    id?: number
    achievementId: number
    createdAt?: Date | string
  }

  export type MessageCreateManySenderInput = {
    id?: number
    channelId: number
    text: string
    createdAt?: Date | string
  }

  export type GameResultUpdateWithoutWinnerInput = {
    score?: IntFieldUpdateOperationsInput | number
    isLadder?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loser?: UserUpdateOneRequiredWithoutLoseLogsNestedInput
  }

  export type GameResultUncheckedUpdateWithoutWinnerInput = {
    id?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
    isLadder?: BoolFieldUpdateOperationsInput | boolean
    loserId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameResultUncheckedUpdateManyWithoutWinLogsInput = {
    id?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
    isLadder?: BoolFieldUpdateOperationsInput | boolean
    loserId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameResultUpdateWithoutLoserInput = {
    score?: IntFieldUpdateOperationsInput | number
    isLadder?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    winner?: UserUpdateOneRequiredWithoutWinLogsNestedInput
  }

  export type GameResultUncheckedUpdateWithoutLoserInput = {
    id?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
    isLadder?: BoolFieldUpdateOperationsInput | boolean
    winnerId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameResultUncheckedUpdateManyWithoutLoseLogsInput = {
    id?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
    isLadder?: BoolFieldUpdateOperationsInput | boolean
    winnerId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowUserUpdateWithoutFollewerInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    follewee?: UserUpdateOneRequiredWithoutFolloweesNestedInput
  }

  export type FollowUserUncheckedUpdateWithoutFollewerInput = {
    id?: IntFieldUpdateOperationsInput | number
    followeeId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowUserUncheckedUpdateManyWithoutFollowersInput = {
    id?: IntFieldUpdateOperationsInput | number
    followeeId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowUserUpdateWithoutFolleweeInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    follewer?: UserUpdateOneRequiredWithoutFollowersNestedInput
  }

  export type FollowUserUncheckedUpdateWithoutFolleweeInput = {
    id?: IntFieldUpdateOperationsInput | number
    followerId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowUserUncheckedUpdateManyWithoutFolloweesInput = {
    id?: IntFieldUpdateOperationsInput | number
    followerId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlockUserUpdateWithoutBlockerInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    blocked?: UserUpdateOneRequiredWithoutBlockedsNestedInput
  }

  export type BlockUserUncheckedUpdateWithoutBlockerInput = {
    id?: IntFieldUpdateOperationsInput | number
    blockedId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlockUserUncheckedUpdateManyWithoutBlockersInput = {
    id?: IntFieldUpdateOperationsInput | number
    blockedId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlockUserUpdateWithoutBlockedInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    blocker?: UserUpdateOneRequiredWithoutBlockersNestedInput
  }

  export type BlockUserUncheckedUpdateWithoutBlockedInput = {
    id?: IntFieldUpdateOperationsInput | number
    blockerId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlockUserUncheckedUpdateManyWithoutBlockedsInput = {
    id?: IntFieldUpdateOperationsInput | number
    blockerId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Channel_UserUpdateWithoutUserInput = {
    userType?: IntFieldUpdateOperationsInput | number
    status?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    channel?: ChannelUpdateOneRequiredWithoutUsersNestedInput
  }

  export type Channel_UserUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    channelId?: IntFieldUpdateOperationsInput | number
    userType?: IntFieldUpdateOperationsInput | number
    status?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Channel_UserUncheckedUpdateManyWithoutChannelsInput = {
    id?: IntFieldUpdateOperationsInput | number
    channelId?: IntFieldUpdateOperationsInput | number
    userType?: IntFieldUpdateOperationsInput | number
    status?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Achievement_UserUpdateWithoutUserInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    achievement?: AchievementUpdateOneRequiredWithoutUsersNestedInput
  }

  export type Achievement_UserUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    achievementId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Achievement_UserUncheckedUpdateManyWithoutAchievementsInput = {
    id?: IntFieldUpdateOperationsInput | number
    achievementId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUpdateWithoutSenderInput = {
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    channel?: ChannelUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateWithoutSenderInput = {
    id?: IntFieldUpdateOperationsInput | number
    channelId?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyWithoutMessagesInput = {
    id?: IntFieldUpdateOperationsInput | number
    channelId?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Channel_UserCreateManyChannelInput = {
    id?: number
    userId: number
    userType: number
    status: number
    createdAt?: Date | string
  }

  export type MessageCreateManyChannelInput = {
    id?: number
    senderId: number
    text: string
    createdAt?: Date | string
  }

  export type Channel_UserUpdateWithoutChannelInput = {
    userType?: IntFieldUpdateOperationsInput | number
    status?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutChannelsNestedInput
  }

  export type Channel_UserUncheckedUpdateWithoutChannelInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    userType?: IntFieldUpdateOperationsInput | number
    status?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Channel_UserUncheckedUpdateManyWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    userType?: IntFieldUpdateOperationsInput | number
    status?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUpdateWithoutChannelInput = {
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sender?: UserUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateWithoutChannelInput = {
    id?: IntFieldUpdateOperationsInput | number
    senderId?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Achievement_UserCreateManyAchievementInput = {
    id?: number
    userId: number
    createdAt?: Date | string
  }

  export type Achievement_UserUpdateWithoutAchievementInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAchievementsNestedInput
  }

  export type Achievement_UserUncheckedUpdateWithoutAchievementInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type Achievement_UserUncheckedUpdateManyWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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