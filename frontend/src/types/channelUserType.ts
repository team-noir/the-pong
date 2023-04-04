import { UserType } from './userType';

export const UserRole: { [key: string]: string } = {
  owner: 'owner',
  admin: 'admin',
  normal: 'normal',
};

export interface ChannelUserType extends UserType {
  role: string;
  isMuted: boolean;
}

export type ChannelUserRoleType = 'admin' | 'normal';

export type ChannelUserStatusType = 'kick' | 'ban' | 'mute';
