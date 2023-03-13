import Button from 'components/atoms/Button';
import ProfileImageWithStatus from 'components/molecule/ProfileImageWithStatus';
import styles from 'assets/styles/Following.module.css';
import { UserType } from 'types/userType';

interface FollowingItemProps {
  following: UserType;
}

export default function FollowingItem({ following }: FollowingItemProps) {
  return (
    <li className={styles.li}>
      <ProfileImageWithStatus
        profileImageUrl={following.profileImageUrl}
        alt={`${following.nickname}'s profile image`}
        size={52}
        status={following.status || 'off'}
      />
      <span>{following.nickname}</span>
      <div>
        <Button type="button">게임 초대</Button>
        <Button type="button">메시지 보내기</Button>
        <Button type="button">언팔로우</Button>
      </div>
    </li>
  );
}
