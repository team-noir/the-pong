import Button from 'components/atoms/Button';
import { useEffect, useState } from 'react';
import { ChannelType } from 'types/channelType';
import styles from 'assets/styles/Channel.module.css';
import { ChannelUserType, UserTypeType } from 'types/channelUserType';
import ChannelUserList from 'components/molecule/ChannelUserList';

interface Props {
  channel: ChannelType;
}

const dummyChannelUsers: ChannelUserType[] = [
  {
    id: 0,
    nickname: 'sarchoi',
    userType: UserTypeType.admin,
  },
  {
    id: 1,
    nickname: 'heehkim',
    userType: UserTypeType.admin,
  },
  {
    id: 2,
    nickname: 'cpak',
    userType: UserTypeType.normal,
  },
  {
    id: 3,
    nickname: 'hello',
    userType: UserTypeType.admin,
  },
];

const myUserId = 1;

// 내가 가장 위, 다음으로 owner, admin, normal 순, 각 userType끼리는 nickname 순
const compare = (user1: ChannelUserType, user2: ChannelUserType) => {
  if (user1.id === myUserId) return -1;
  if (user1.userType !== user2.userType) {
    return user1.userType - user2.userType;
  }
  if (user1.nickname && user2.nickname) {
    return user1.nickname.localeCompare(user2.nickname);
  }
  return 0;
};

export default function ChannelSetting({ channel }: Props) {
  const [channelUsers, setChannelUsers] = useState<ChannelUserType[] | null>(
    null
  );
  const [myUser, setMyUser] = useState<ChannelUserType | null>(null);

  useEffect(() => {
    // TODO: 채널 유저 정보를 가져오는 API 호출
    setChannelUsers(dummyChannelUsers.sort(compare));
  }, []);

  useEffect(() => {
    const user = channelUsers?.find((user) => user.id === myUserId);
    user && setMyUser(user);
  }, [channelUsers]);

  return (
    <div>
      {myUser?.userType === UserTypeType.owner && (
        <Button type="button">채팅방 설정</Button>
      )}
      <h2>참가자</h2>
      <ChannelUserList
        styles={styles}
        users={channelUsers}
        imageSize={52}
        myUser={myUser}
      />
    </div>
  );
}
