import ProfileImage from 'components/atoms/ProfileImage';
import { MessageType } from 'types';

interface Props {
  message: MessageType;
  isShowProfile: boolean;
  isMyMessage: boolean;
}

const formatDate = (iso: string) => {
  const d = new Date(iso);
  const locale = 'ko-KR';
  const date = d
    .toLocaleDateString(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/ /g, '');
  const time = d.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
  });
  return `${date} ${time}`;
};

export default function MessageItem({
  message,
  isShowProfile,
  isMyMessage,
}: Props) {
  return (
    <div
      className={`flex mb-4 items-end ${`
        ${isMyMessage ? 'self-end flex-row-reverse' : 'self-start flex-row'}
        ${isShowProfile ? 'flex-col' : 'flex-row'}
      `}`}
    >
      <li
        className={`p-2 rounded ${
          isMyMessage
            ? 'text-right bg-theme-green text-text-light'
            : 'bg-gray text-text-dark'
        }`}
      >
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
        </div>
      </li>
      <span className="mx-2 text-xs leading-3">
        {formatDate(message.createdAt)}
      </span>
    </div>
  );
}
