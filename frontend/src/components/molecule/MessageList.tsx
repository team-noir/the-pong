import { useQuery } from '@tanstack/react-query';
import { MessageType } from 'components/organisms/Channel';
import MessageItem from 'components/molecule/MessageItem';
import styles from 'assets/styles/Message.module.css';
import { AxiosError } from 'axios';
import { getWhoami } from 'api/api.v1';
import { UserType } from 'types/userType';

interface Props {
  messages: MessageType[] | null;
}

export default function MessageList({ messages }: Props) {
  const whoamiQuery = useQuery<UserType, AxiosError>({
    queryKey: ['whoami'],
    queryFn: getWhoami,
  });

  return (
    <ul className={styles.ul}>
      {messages?.map((message, index) => {
        const isMyMessage = message.senderId === whoamiQuery.data?.id;
        const isContinuousMessage =
          messages[index - 1]?.senderId === message.senderId;
        return (
          <MessageItem
            key={message.id}
            message={message}
            isShowProfile={!isMyMessage && !isContinuousMessage}
            className={isMyMessage ? styles.my : styles.other}
          />
        );
      })}
    </ul>
  );
}
