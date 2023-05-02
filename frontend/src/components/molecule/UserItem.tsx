import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import ProfileImage from 'components/atoms/ProfileImage';
import { UserType } from 'types';
import { classNames } from 'utils';
import ProfileImageWithStatus from './ProfileImageWithStatus';
import ROUTES from 'constants/routes';

interface Props {
  user: UserType;
  imageSize: number;
  buttons?: ReactNode;
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
      className="px-2 py-4 flex items-center space-x-4"
    >
      <div
        className={classNames(
          'flex-shrink-0',
          inviteList && 'pointer-events-none cursor-default'
        )}
      >
        <Link to={`${ROUTES.PROFILE.USER(user.id)}`}>
          <div className="relative">
            {hasStatus ? (
              <ProfileImageWithStatus
                userId={user.id}
                nickname={`${user.nickname}`}
                size={imageSize}
              />
            ) : (
              <ProfileImage
                userId={user.id}
                nickname={`${user.nickname}`}
                size={imageSize}
              />
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
          <Link to={`${ROUTES.PROFILE.USER(user.id)}`}>
            <span className="text-lg font-medium">{user.nickname}</span>
          </Link>
        </div>
        {buttons && (
          <div className="inline-flex items-center space-x-2">
            {user.id !== myUserId && buttons && <>{buttons}</>}
          </div>
        )}
      </div>
    </li>
  );
}
