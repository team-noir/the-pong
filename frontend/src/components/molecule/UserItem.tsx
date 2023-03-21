import { ReactElement } from 'react';
import { UserType } from 'types/userType';
import { Link } from 'react-router-dom';
import ProfileImage from 'components/atoms/ProfileImage';
import userItemStyles from 'assets/styles/UserItem.module.css';
import { API_PREFIX } from 'api/api.v1';

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
            profileImageUrl={`${API_PREFIX}/users/${user.id}/profile-image`}
            alt={`${user.nickname}'s profile image`}
            size={imageSize}
          />
          {hasStatus && user.status !== 'off' && (
            <div className={userItemStyles.status}>
              {user.status === 'on' ? '🟢' : 'Game'}
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
