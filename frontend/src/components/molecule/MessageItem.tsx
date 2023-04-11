import ProfileImage from 'components/atoms/ProfileImage';
import { MessageType } from 'types';
import { formatDate, formatTime } from 'utils';

interface Props {
  message: MessageType;
  isShowProfile: boolean;
  isMyMessage: boolean;
  isShowDate: boolean;
}

export default function MessageItem({
  message,
  isShowProfile,
  isMyMessage,
  isShowDate,
}: Props) {
  return (
    <>
      {isShowDate && (
        <span className="self-center text-xs leading-3 mb-4">
          {`${formatDate(message.createdAt)}`}
        </span>
      )}
      <div
        className={`flex mb-4 items-end ${`
        ${isMyMessage ? 'self-end flex-row-reverse' : 'self-start flex-row'}
        ${isShowProfile ? 'flex-col' : 'flex-row'}
        ${message.isLog && 'self-center'}
      `}`}
      >
        {!message.isLog && isShowProfile && (
          <div className="flex">
            <ProfileImage
              userId={message.senderId}
              alt={`${message.senderNickname}'s profile image`}
              size={52}
            />
            <span>{message.senderNickname}</span>
          </div>
        )}
        <li
          className={`flex 
        ${isMyMessage ? 'flex-row-reverse' : 'flex-row'}`}
        >
          <p
            className={`p-2 rounded ${
              isMyMessage
                ? 'bg-green text-text-light'
                : 'bg-gray text-text-dark'
            }`}
          >
            {message.text}
          </p>
          {!message.isLog && (
            <span
              className={`mx-2 text-xs leading-3 self-end ${
                isMyMessage && 'text-right'
              }`}
            >
              {`${formatTime(message.createdAt)}`}
            </span>
          )}
        </li>
      </div>
    </>
  );
}
