import ProfileImage from 'components/atoms/ProfileImage';
import { DummyMessageType } from 'components/organisms/Channel';
import styles from 'assets/styles/Message.module.css';

interface Props {
  message: DummyMessageType;
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
            profileImageUrl={message.profileImageUrl}
            alt={`${message.nickname}'s profile image`}
            size={52}
          />
          <span>{message.nickname}</span>
        </div>
      )}
      <div>
        <p>{message.text}</p>
        <span>{message.createdAt}</span>
      </div>
    </li>
  );
}
