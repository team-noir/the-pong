
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum
} = require('./runtime/index-browser')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 4.11.0
 * Query Engine version: 8fde8fef4033376662cad983758335009d522acb
 */
Prisma.prismaVersion = {
  client: "4.11.0",
  engine: "8fde8fef4033376662cad983758335009d522acb"
}

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.NotFoundError = () => {
  throw new Error(`NotFoundError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.validator = () => (val) => val


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
// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275
function makeEnum(x) { return x; }

exports.Prisma.AchievementScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  description: 'description'
});

exports.Prisma.Achievement_UserScalarFieldEnum = makeEnum({
  id: 'id',
  userId: 'userId',
  achievementId: 'achievementId',
  createdAt: 'createdAt'
});

exports.Prisma.BlockUserScalarFieldEnum = makeEnum({
  id: 'id',
  blockerId: 'blockerId',
  blockedId: 'blockedId',
  createdAt: 'createdAt'
});

exports.Prisma.ChannelScalarFieldEnum = makeEnum({
  id: 'id',
  title: 'title',
  channelCode: 'channelCode',
  password: 'password',
  idPublic: 'idPublic',
  isDm: 'isDm',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
});

exports.Prisma.Channel_UserScalarFieldEnum = makeEnum({
  id: 'id',
  channelId: 'channelId',
  userId: 'userId',
  userType: 'userType',
  status: 'status',
  createdAt: 'createdAt'
});

exports.Prisma.FollowUserScalarFieldEnum = makeEnum({
  id: 'id',
  followerId: 'followerId',
  followeeId: 'followeeId',
  createdAt: 'createdAt'
});

exports.Prisma.GameResultScalarFieldEnum = makeEnum({
  id: 'id',
  score: 'score',
  isLadder: 'isLadder',
  winnerId: 'winnerId',
  loserId: 'loserId',
  createdAt: 'createdAt'
});

exports.Prisma.MessageScalarFieldEnum = makeEnum({
  id: 'id',
  senderId: 'senderId',
  channelId: 'channelId',
  text: 'text',
  createdAt: 'createdAt'
});

exports.Prisma.QueryMode = makeEnum({
  default: 'default',
  insensitive: 'insensitive'
});

exports.Prisma.SortOrder = makeEnum({
  asc: 'asc',
  desc: 'desc'
});

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = makeEnum({
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
});


exports.Prisma.ModelName = makeEnum({
  User: 'User',
  GameResult: 'GameResult',
  FollowUser: 'FollowUser',
  BlockUser: 'BlockUser',
  Channel: 'Channel',
  Channel_User: 'Channel_User',
  Message: 'Message',
  Achievement: 'Achievement',
  Achievement_User: 'Achievement_User'
});

/**
 * Create the Client
 */
class PrismaClient {
  constructor() {
    throw new Error(
      `PrismaClient is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
    )
  }
}
exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
