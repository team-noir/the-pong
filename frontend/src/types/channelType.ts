import { ChannelUserType } from 'types/channelUserType';
export interface ChannelType {
  id: number;
  title: string;
  isProtected: boolean;
  isPrivate: boolean;
  isDm: boolean;
  userCount?: number;
  users?: ChannelUserType[];
  createdAt?: string;
  updatedAt?: string;
}
