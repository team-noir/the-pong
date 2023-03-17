export interface ChannelType {
  id: string;
  title: string;
  channelCode?: string;
  password?: string;
  isPublic?: boolean;
  isDm?: boolean;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}
