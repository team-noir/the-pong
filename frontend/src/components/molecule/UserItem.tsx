import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import ProfileImage from 'components/atoms/ProfileImage';
import { UserType } from 'types';
import { classNames } from 'utils';

interface Props {
  user: UserType;
  imageSize: number;
  buttons?: ReactElement[];
  hasStatus: boolean;
  myUserId?: number;
  inviteList?: boolean;
}

export default function UserItem({
  user,
  imageSize,
  buttons,
  hasStatus,
  myUserId,
  inviteList = false,
}: Props) {
  return (
    <li
      data-user-id={user.id}
      className="mb-2 px-2 py-2 flex items-center space-x-4"
    >
      <div
        className={classNames(
          'flex-shrink-0',
          inviteList && 'pointer-events-none cursor-default'
        )}
      >
        <Link to={`/profile/${user.id}`}>
          <div className="relative">
            <ProfileImage
              userId={user.id}
              alt={`${user.nickname}'s profile image`}
              size={imageSize}
            />
            {hasStatus && user.status === 'online' && (
              <span className="user-indicator w-3.5 h-3.5 bg-status-online"></span>
            )}
            {hasStatus && user.status === 'game' && (
              <span className="user-indicator w-3.5 h-3.5 bg-status-game border-2"></span>
            )}
          </div>
        </Link>
      </div>

      <div
        className={classNames(
          'flex-1 truncate',
          inviteList && 'inline-flex items-center space-x-2'
        )}
      >
        <div
          className={inviteList ? 'pointer-events-none cursor-default' : 'mb-1'}
        >
          <Link to={`/profile/${user.id}`}>
            <span className="text-lg font-medium">{user.nickname}</span>
          </Link>
        </div>
        <div className="inline-flex items-center space-x-2">
          {user.id !== myUserId && buttons && <>{buttons}</>}
        </div>
      </div>
    </li>
  );
}
