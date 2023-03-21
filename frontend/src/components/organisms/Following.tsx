import { useEffect, useState } from 'react';
import { UserType } from 'types/userType';
import UserList from '../molecule/UserList';
import styles from 'assets/styles/Following.module.css';
import Button from 'components/atoms/Button';

const dummyFollowings: UserType[] = [
  {
    id: 2,
    nickname: '닉네임2',
    status: 'on',
  },
  {
    id: 3,
    nickname: '닉네임3',
    status: 'on',
  },
  {
    id: 4,
    nickname: '닉네임4',
    status: 'off',
  },
  {
    id: 5,
    nickname: '닉네임5',
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
      <UserList
        styles={styles}
        users={followings}
        imageSize={52}
        hasStatus={true}
        buttons={[
          <Button key="button0" type="button">
            게임 초대
          </Button>,
          <Button key="button1" type="button">
            메시지 보내기
          </Button>,
          <Button key="button2" type="button">
            언팔로우
          </Button>,
        ]}
      />
    </>
  );
}
