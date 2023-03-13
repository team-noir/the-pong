import { Link } from 'react-router-dom';
import ProfileImage from 'components/atoms/ProfileImage';
import styles from 'assets/styles/SearchResult.module.css';
import { UserType } from 'types/userType';

interface Props {
  user: UserType;
}

export default function SearchResultItem({ user }: Props) {
  return (
    <Link to={`/profile/${user.id}`}>
      <li className={styles.li}>
        <ProfileImage
          profileImageUrl={user.profileImageUrl}
          alt={`${user.nickname}'s profile image`}
          size={52}
        />
        <span>{user.nickname}</span>
      </li>
    </Link>
  );
}
