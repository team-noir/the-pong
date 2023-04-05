import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import ProfileImage from 'components/atoms/ProfileImage';
import { UserType } from 'types';
import userItemStyles from 'assets/styles/UserItem.module.css';

interface Props {
  styles: { readonly [key: string]: string };
  user: UserType;
  imageSize: number;
  buttons?: ReactElement[];
  hasStatus: boolean;
  myUserId?: number;
}

export default function UserItem({
  styles,
  user,
  imageSize,
  buttons,
  hasStatus,
  myUserId,
}: Props) {
  return (
    <li className={styles.li} data-user-id={user.id}>
      <Link to={`/profile/${user.id}`}>
        <div className={userItemStyles.container}>
          <ProfileImage
            userId={user.id}
            alt={`${user.nickname}'s profile image`}
            size={imageSize}
          />
          {hasStatus && user.status !== 'offline' && (
            <div className={userItemStyles.status}>
              {user.status === 'online' ? '🟢' : 'Game'}
            </div>
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
