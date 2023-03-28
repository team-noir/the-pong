import { UserType } from './userType';

export const RoleType = {
  owner: 0,
  admin: 1,
  normal: 2,
};

export interface ChannelUserType extends UserType {
  role: number;
  isMuted: boolean;
}