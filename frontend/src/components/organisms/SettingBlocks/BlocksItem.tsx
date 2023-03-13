import { Link } from 'react-router-dom';
import ProfileImage from 'components/atoms/ProfileImage';
import Button from 'components/atoms/Button';
import styles from 'assets/styles/SearchResult.module.css';
import { UserType } from 'types/userType';

interface Props {
  user: UserType;
}

export default function BlocksItem({ user }: Props) {
  const handleClickUnblock = () => {
    // TODO: call unblock API
  };

  return (
    <li className={styles.li}>
      <Link to={`/profile/${user.id}`}>
        <ProfileImage
          profileImageUrl={user.profileImageUrl}
          alt={`${user.nickname}'s profile image`}
          size={52}
        />
      </Link>
      <Link to={`/profile/${user.id}`}>
        <span>{user.nickname}</span>
      </Link>
      <Button type="button" onClick={handleClickUnblock}>
        차단 해제
      </Button>
    </li>
  );
}
