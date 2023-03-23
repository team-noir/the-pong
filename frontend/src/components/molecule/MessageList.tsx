import { DummyMessageType } from 'components/organisms/Channel';
import MessageItem from 'components/molecule/MessageItem';
import styles from 'assets/styles/Message.module.css';

interface Props {
  messages: DummyMessageType[] | null;
}

const myUsrId = 1;

export default function MessageList({ messages }: Props) {
  return (
    <ul className={styles.ul}>
      {messages?.map((message, index) => {
        const isMyMessage = message.userId === myUsrId;
        const isContinuousMessage =
          messages[index - 1]?.userId === message.userId;
        return (
          <MessageItem
            key={message.id}
            message={message}
            isShowProfile={!isMyMessage && isContinuousMessage}
            className={isMyMessage ? styles.my : styles.other}
          />
        );
      })}
    </ul>
  );
}
