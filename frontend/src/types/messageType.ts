export interface MessageType {
  id: number;
  senderId?: number;
  senderNickname?: string;
  isLog: boolean;
  text: string;
  createdAt: string;
}
