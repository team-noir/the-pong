import ProfileImage from 'components/atoms/ProfileImage';
import { MessageType } from 'components/organisms/Channel';
import styles from 'assets/styles/Message.module.css';

interface Props {
  message: MessageType;
  isShowProfile: boolean;
  className: string;
}

export default function MessageItem({
  message,
  isShowProfile,
  className,
}: Props) {
  return (
    <li className={`${styles.li} ${className}`}>
      {isShowProfile && (
        <div>
          <ProfileImage
            userId={message.senderId}
            alt={`${message.senderNickname}'s profile image`}
            size={52}
          />
          <span>{message.senderNickname}</span>
        </div>
      )}
      <div>
        <p>{message.text}</p>
        <span>{message.createdAt}</span>
      </div>
    </li>
  );
}
