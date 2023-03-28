import Button from 'components/atoms/Button';
import { useEffect, useState } from 'react';
import { ChannelType } from 'types/channelType';
import styles from 'assets/styles/Channel.module.css';
import { ChannelUserType, RoleType } from 'types/channelUserType';
import ChannelUserList from 'components/molecule/ChannelUserList';

interface Props {
  channel: ChannelType | null;
}

const myUserId = 1;

// 내가 가장 위, 다음으로 owner, admin, normal 순, 각 userType끼리는 nickname 순
const compare = (user1: ChannelUserType, user2: ChannelUserType) => {
  if (user1.id === myUserId) return -1;
  if (user1.role !== user2.role) {
    return user1.role - user2.role;
  }
  if (user1.nickname && user2.nickname) {
    return user1.nickname.localeCompare(user2.nickname);
  }
  return 0;
};

export default function ChannelDetail({ channel }: Props) {
  const [channelUsers, setChannelUsers] = useState<ChannelUserType[] | null>(
    null
  );
  const [myUser, setMyUser] = useState<ChannelUserType | null>(null);

  useEffect(() => {
    // TODO: 채널 유저 정보를 가져오는 API 호출
    if (!channel || !channel.users) return;

    setChannelUsers(channel.users.sort(compare));
  }, []);

  useEffect(() => {
    const user = channelUsers?.find((user) => user.id === myUserId);
    user && setMyUser(user);
  }, [channelUsers]);

  return (
    <div>
      {myUser?.role === RoleType.owner && (
        <Button type="button">채널 설정</Button>
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
