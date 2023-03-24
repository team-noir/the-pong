import { UserType } from './userType';

export const UserTypeType = {
  owner: 0,
  admin: 1,
  normal: 4,
};

export interface ChannelUserType extends UserType {
  userType: number;
}
