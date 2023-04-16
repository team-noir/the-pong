/** User */

type UserStatus = 'online' | 'offline' | 'game';

export interface UserType {
  id: number;
  nickname?: string;
  rank?: number;
  isTwoFactor?: boolean;
  status?: UserStatus;
  achievements?: [];
  games?: [];
  isFollowedByMyself?: boolean;
  isBlockedByMyself?: boolean;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export const USER_ROLES = {
  OWNER: 'owner',
  ADMIN: 'admin',
  NORMAL: 'normal',
} as const;

/* eslint-disable */
type UserRoleType = typeof USER_ROLES[keyof typeof USER_ROLES];

export type ChannelUserRoleType = 'admin' | 'normal';

export const CHANNEL_USER_STATUS = {
  KICK: 'kick',
  BAN: 'ban',
  MUTE: 'mute',
} as const;

/* eslint-disable */
export type ChannelUserStatusType =
  typeof CHANNEL_USER_STATUS[keyof typeof CHANNEL_USER_STATUS];

export interface ChannelUserType extends UserType {
  role: UserRoleType;
  isMuted: boolean;
}

export interface ProfileFormType {
  nickname: string;
  imageFile: File | null;
}

/** Achievement */

export interface AchievementType {
  id: number;
  title: string;
  description: string;
}

/** Channel */

export interface ChannelType {
  id: number;
  title: string;
  isProtected: boolean;
  isPrivate: boolean;
  isDm: boolean;
  dmUserId?: number;
  userCount?: number;
  isJoined?: boolean;
  users?: ChannelUserType[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ChannelFormType {
  id?: number;
  title?: string;
  isPrivate?: boolean;
  password?: string;
}

export interface MessageType {
  id: number;
  senderId?: number;
  senderNickname?: string;
  isLog: boolean;
  text: string;
  createdAt: string;
}

export interface NoticeType {
  id: number;
  channelId: number;
  text: string;
  code: number;
  users: UserType[];
  createdAt: string;
}

/** Game */

export interface PlayerType {
  id: number;
  nickname: string;
  level: number;
  isOwner?: boolean;
}

export interface GameHistoryPlayerType extends PlayerType {
  score: number;
}

export interface GameType {
  id: number;
  players: PlayerType[];
  mode: string;
  theme: number;
  viewerCount?: number;
  isLadder: boolean;
  createdAt: string;
}

export interface GameSettingType extends GameType {
  modes: string[];
  themes: number[];
}

export interface GameHistoryType {
  id: number;
  isLadder: boolean;
  winner: {
    id: number;
    nickname: string;
    level: number;
    score: number;
  };
  loser: {
    id: number;
    nickname: string;
    level: number;
    score: number;
  };
  createdAt: string;
}
