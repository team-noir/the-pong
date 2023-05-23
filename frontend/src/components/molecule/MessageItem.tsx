import ProfileImage from 'components/atoms/ProfileImage';
import { MessageType } from 'types';
import { formatDate, formatTime, classNames } from 'utils';

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
      {message.isLog ? (
        <div className="flex my-2 vh-center">
          <span className="p-2 rounded bg-gray-dark text-text-light text-xs leading-3">
            {message.text}
          </span>
        </div>
      ) : (
        <div className={classNames('flex flex-col mb-2 gap-2')}>
          {isShowProfile && message.senderId && (
            <div className="flex flex-row items-end gap-2">
              <ProfileImage
                userId={message.senderId}
                nickname={message.senderNickname || ''}
                size={40}
              />
              <span className="leading-none mb-1">
                {message.senderNickname}
              </span>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <li
              className={classNames(
                'flex',
                isMyMessage ? 'flex-row-reverse' : 'flex-row'
              )}
            >
              <p
                className={classNames(
                  'p-2 rounded',
                  isMyMessage
                    ? 'bg-green text-text-light'
                    : 'bg-gray text-text-dark'
                )}
              >
                {message.text}
              </p>
              <span
                className={classNames(
                  'mx-2 text-xs leading-3 self-end',
                  isMyMessage && 'text-right'
                )}
              >
                {formatTime(message.createdAt)}
              </span>
            </li>
          </div>
        </div>
      )}
      {isShowDate && (
        <span className="self-center text-xs leading-3 my-2">
          {`${formatDate(message.createdAt)}`}
        </span>
      )}
    </>
  );
}
