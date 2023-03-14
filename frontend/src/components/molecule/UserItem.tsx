import { ReactElement } from 'react';
import { UserType } from 'types/userType';
import { Link } from 'react-router-dom';
import ProfileImage from 'components/atoms/ProfileImage';
import ProfileImageWithStatus from './ProfileImageWithStatus';

interface Props {
  styles: { readonly [key: string]: string };
  user: UserType;
  imageSize: number;
  buttons?: ReactElement[];
  hasStatus: boolean;
}

export default function UserItem({
  styles,
  user,
  imageSize,
  buttons,
  hasStatus,
}: Props) {
  return (
    <li className={styles.li}>
      <Link to={`/profile/${user.id}`}>
        {!hasStatus && (
          <ProfileImage
            profileImageUrl={user.profileImageUrl}
            alt={`${user.nickname}'s profile image`}
            size={imageSize}
          />
        )}
        {hasStatus && (
          <ProfileImageWithStatus
            profileImageUrl={user.profileImageUrl}
            alt={`${user.nickname}'s profile image`}
            size={imageSize}
            status={user.status || 'off'}
          />
        )}
      </Link>
      <Link to={`/profile/${user.id}`}>
        <span>{user.nickname}</span>
      </Link>
      {buttons && <div>{buttons}</div>}
    </li>
  );
}
