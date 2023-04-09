import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import ProfileImage from 'components/atoms/ProfileImage';
import { UserType } from 'types';

interface Props {
  user: UserType;
  imageSize: number;
  buttons?: ReactElement[];
  hasStatus: boolean;
  myUserId?: number;
}

export default function UserItem({
  user,
  imageSize,
  buttons,
  hasStatus,
  myUserId,
}: Props) {
  return (
    <li data-user-id={user.id}>
      <Link to={`/profile/${user.id}`}>
        <div>
          <ProfileImage
            userId={user.id}
            alt={`${user.nickname}'s profile image`}
            size={imageSize}
          />
          {hasStatus && user.status !== 'offline' && (
            <div>{user.status === 'online' ? '🟢' : 'Game'}</div>
          )}
        </div>
      </Link>
      <Link to={`/profile/${user.id}`}>
        <span>{user.nickname}</span>
      </Link>
      {user.id !== myUserId && buttons && <div>{buttons}</div>}
    </li>
  );
}
