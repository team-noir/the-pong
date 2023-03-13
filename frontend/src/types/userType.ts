export interface UserType {
  id: string;
  fortytwoId?: string;
  nickname?: string;
  profileImageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  status?: 'on' | 'off' | 'game';
  isTwoFactor?: boolean;
}
