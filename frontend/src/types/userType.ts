type UserStatus = 'online' | 'offline' | 'game';

export interface UserType {
  id: number;
  nickname?: string;
  rank?: number;
  isTwoFactor?: boolean;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  status?: UserStatus;
}
