import { UserType } from './userType';

export const RoleType: { [key: string]: string } = {
  owner: 'owner',
  admin: 'admin',
  normal: 'normal',
};

export interface ChannelUserType extends UserType {
  role: string;
  isMuted: boolean;
}
