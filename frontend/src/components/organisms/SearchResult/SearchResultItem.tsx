import { Link } from 'react-router-dom';
import ProfileImage from 'components/atoms/ProfileImage';
import { UserType } from 'types';

interface Props {
  user: UserType;
}

export default function SearchResultItem({ user }: Props) {
  return (
    <Link to={`/profile/${user.id}`}>
      <li>
        <ProfileImage
          userId={user.id}
          alt={`${user.nickname}'s profile image`}
          size={52}
        />
        <span>{user.nickname}</span>
      </li>
    </Link>
  );
}
