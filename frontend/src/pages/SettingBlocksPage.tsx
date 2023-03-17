import { useEffect, useState } from 'react';
import AppTemplate from 'components/templates/AppTemplate';
import HeaderWithBackButton from 'components/molecule/HeaderWithBackButton';
import UserList from 'components/molecule/UserList';
import Button from 'components/atoms/Button';
import styles from 'assets/styles/Blocks.module.css';
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

export default function SettingBlocksPage() {
  const [blockedUsers, setBlockedUsers] = useState<UserType[] | null>(null);

  // TODO: 차단 목록 API에서 가져오기
  useEffect(() => {
    setBlockedUsers(dummyBlocks);
  }, []);

  const handleClickUnblock = () => {
    // TODO: call unblock API
  };

  return (
    <AppTemplate header={<HeaderWithBackButton title={'차단 관리'} />}>
      <UserList
        styles={styles}
        users={blockedUsers}
        imageSize={52}
        buttons={[
          <Button key="button0" type="button" onClick={handleClickUnblock}>
            차단 해제
          </Button>,
        ]}
      />
    </AppTemplate>
  );
}
