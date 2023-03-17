import Button from 'components/atoms/Button';
import UserList from 'components/molecule/UserList';
import { ReactElement, useEffect, useState } from 'react';
import { ChannelType } from 'types/channelType';
import styles from 'assets/styles/Channel.module.css';

interface Props {
  channel: ChannelType;
}

const dummyUserType = {
  owner: 0,
  admin: 1,
  normal: 2,
};

export interface DummyChannelUserType {
  id: string;
  nickname: string;
  profileImageUrl: string;
  userType: number;
}

const dummyChannelUsers: DummyChannelUserType[] = [
  {
    id: '0',
    nickname: 'sarchoi',
    profileImageUrl: 'https://placekitten.com/800/800',
    userType: dummyUserType.admin,
  },
  {
    id: '1',
    nickname: 'heehkim',
    profileImageUrl: 'https://placekitten.com/800/800',
    userType: dummyUserType.owner,
  },
  {
    id: '2',
    nickname: 'cpak',
    profileImageUrl: 'https://placekitten.com/800/800',
    userType: dummyUserType.normal,
  },
  {
    id: '3',
    nickname: 'hello',
    profileImageUrl: 'https://placekitten.com/800/800',
    userType: dummyUserType.admin,
  },
];

const currentUserId = '1';

// 내가 가장 위, 다음으로 owner, admin, normal 순, 각 userType끼리는 nickname 순
const compare = (user1: DummyChannelUserType, user2: DummyChannelUserType) => {
  if (user1.id === currentUserId) return -1;
  if (user1.userType !== user2.userType) {
    return user1.userType - user2.userType;
  }
  return user1.nickname.localeCompare(user2.nickname);
};

export default function ChannelSetting({ channel }: Props) {
  const [channelUsers, setChannelUsers] = useState<
    DummyChannelUserType[] | null
  >(null);
  const [currentUser, setCurrentUser] = useState<DummyChannelUserType | null>(
    null
  );
  const [buttons, setButtons] = useState<ReactElement[]>([
    <Button key="button0" type="button">
      게임 초대
    </Button>,
  ]);

  useEffect(() => {
    // TODO: 채널 유저 정보를 가져오는 API 호출
    setChannelUsers(dummyChannelUsers.sort(compare));
  }, []);

  useEffect(() => {
    const user = channelUsers?.find((user) => user.id === currentUserId);
    user && setCurrentUser(user);
  }, [channelUsers]);

  useEffect(() => {
    if (currentUser && currentUser.userType >= dummyUserType.admin) {
      setButtons([
        <Button key="button0" type="button">
          게임 초대
        </Button>,
        <Button key="button1" type="button">
          내보내기
        </Button>,
        <Button key="button2" type="button">
          차단하기
        </Button>,
        <Button key="button3" type="button">
          조용히
        </Button>,
      ]);
    }
  }, [currentUser]);

  return (
    <div>
      {currentUser?.userType === dummyUserType.owner && (
        <Button type="button">채팅방 설정</Button>
      )}
      <h2>참가자</h2>
      <UserList
        styles={styles}
        users={channelUsers}
        imageSize={52}
        buttons={buttons}
        currentUserId={currentUserId}
      />
    </div>
  );
}
