import { useEffect, useState } from 'react';
import Button from 'components/atoms/Button';
import { UserType } from 'types/userType';
import styles from 'assets/styles/Following.module.css';

const dummyFollowings: UserType[] = [
  {
    id: '2',
    nickname: '닉네임2',
    profileImageUrl: 'https://placekitten.com/800/800',
  },
  {
    id: '3',
    nickname: '닉네임3',
    profileImageUrl: 'https://placekitten.com/800/800',
  },
  {
    id: '4',
    nickname: '닉네임4',
    profileImageUrl: 'https://placekitten.com/800/800',
  },
  {
    id: '5',
    nickname: '닉네임5',
    profileImageUrl: 'https://placekitten.com/800/800',
  },
];

interface FollowingItemProps {
  following: UserType;
}

function FollowingItem({ following }: FollowingItemProps) {
  return (
    <li className={styles.li}>
      <img
        src={following.profileImageUrl}
        alt={`${following.nickname}'s profile image`}
        className={styles.img}
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

interface FollowingListProps {
  followings: UserType[] | null;
}

function FollowingList({ followings }: FollowingListProps) {
  return (
    <ul className={styles.ul}>
      {followings &&
        followings.map((following) => {
          return <FollowingItem key={following.id} following={following} />;
        })}
    </ul>
  );
}

export default function Following() {
  const [followings, setFollowings] = useState<UserType[] | null>(null);

  // TODO: 내 팔로우 목록 API에서 가져오기
  useEffect(() => {
    setFollowings(dummyFollowings);
  }, []);

  return (
    <>
      <h1>Following</h1>
      <FollowingList followings={followings} />
    </>
  );
}
