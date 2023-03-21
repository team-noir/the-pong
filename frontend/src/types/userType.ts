export interface UserType {
  id: number;
  nickname?: string;
  rank?: number;
  isTwoFactor?: boolean;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  status?: 'on' | 'off' | 'game';
}
