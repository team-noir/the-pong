import { useEffect, useState } from 'react';
import { UserType } from 'types/userType';
import FollowingList from './FollowingList';

const dummyFollowings: UserType[] = [
  {
    id: '2',
    nickname: '닉네임2',
    profileImageUrl: 'https://placekitten.com/800/800',
    status: 'on',
  },
  {
    id: '3',
    nickname: '닉네임3',
    profileImageUrl: 'https://placekitten.com/800/800',
    status: 'on',
  },
  {
    id: '4',
    nickname: '닉네임4',
    profileImageUrl: 'https://placekitten.com/800/800',
    status: 'off',
  },
  {
    id: '5',
    nickname: '닉네임5',
    profileImageUrl: 'https://placekitten.com/800/800',
    status: 'game',
  },
];

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
