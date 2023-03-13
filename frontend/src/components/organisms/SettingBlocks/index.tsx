import { useEffect, useState } from 'react';
import BlocksList from './BlocksList';
import { UserType } from 'types/userType';

const dummyBlocks: UserType[] = [
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
];

export default function SettingBlocks() {
  const [blockedUsers, setBlockedUsers] = useState<UserType[] | null>(null);

  // TODO: 차단 목록 API에서 가져오기
  useEffect(() => {
    setBlockedUsers(dummyBlocks);
  }, []);

  return (
    <>
      <h1>SettingBlocks</h1>
      <BlocksList blockedUsers={blockedUsers} />
    </>
  );
}
