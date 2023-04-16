import MessageItem from 'components/molecule/MessageItem';
import { MessageType } from 'types';
import { formatDate } from 'utils';

interface Props {
  messages: MessageType[] | null;
  myUserId: number;
}

export default function MessageList({ messages, myUserId }: Props) {
  return (
    <ul className="flex flex-col">
      {messages?.map((message, index) => {
        const isMyMessage = message.senderId === myUserId;
        const isContinuousMessage =
          messages[index - 1]?.senderId === message.senderId;
        const isShowDate =
          formatDate(messages[index - 1]?.createdAt) !==
          formatDate(message.createdAt);
        return (
          <MessageItem
            key={message.id}
            message={message}
            isShowProfile={!isMyMessage && !isContinuousMessage}
            isMyMessage={isMyMessage}
            isShowDate={isShowDate}
          />
        );
      })}
    </ul>
  );
}
