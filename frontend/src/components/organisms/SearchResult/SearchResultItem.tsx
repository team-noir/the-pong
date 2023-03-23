import { Link } from 'react-router-dom';
import ProfileImage from 'components/atoms/ProfileImage';
import styles from 'assets/styles/SearchResult.module.css';
import { UserType } from 'types/userType';
import { API_PREFIX } from 'api/api.v1';

interface Props {
  user: UserType;
}

export default function SearchResultItem({ user }: Props) {
  return (
    <Link to={`/profile/${user.id}`}>
      <li className={styles.li}>
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
