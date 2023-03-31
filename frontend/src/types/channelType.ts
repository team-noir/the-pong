import { ChannelUserType } from 'types/channelUserType';
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
