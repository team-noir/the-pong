import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Button from 'components/atoms/Button';
import { ChannelType } from 'types/channelType';
import styles from 'assets/styles/Channel.module.css';
import ChannelUserList from 'components/molecule/ChannelUserList';
import { AxiosError } from 'axios';
import { getWhoami } from 'api/api.v1';
import { ChannelUserType, RoleType } from 'types/channelUserType';
import { UserType } from 'types/userType';

interface Props {
  channel: ChannelType;
  onClickSetting: () => void;
  onClickInvite: () => void;
}

const findMyUser = (
  myUserId: number,
  users: ChannelUserType[] | null
): ChannelUserType | null => {
  if (!users) return null;
  const myUser = users.find((user) => user.id === myUserId);
  return myUser ? myUser : null;
};

// 내가 가장 위, 다음으로 owner, admin, normal 순, 각 userType끼리는 nickname 순
const compare = (user1: ChannelUserType, user2: ChannelUserType) => {
  const priority = [RoleType.owner, RoleType.admin, RoleType.normal];
  if (user1.role !== user2.role) {
    return priority.indexOf(user1.role) - priority.indexOf(user2.role);
  }
  if (user1.nickname && user2.nickname) {
    return user1.nickname.localeCompare(user2.nickname);
  }
  return 0;
};

export default function ChannelDetail({
  channel,
  onClickSetting,
  onClickInvite,
}: Props) {
  const whoamiQuery = useQuery<UserType, AxiosError>({
    queryKey: ['whoami'],
    queryFn: getWhoami,
  });
  const [myUser, setMyUser] = useState<ChannelUserType | null>(null);
  const [channelUsers, setChannelUsers] = useState<ChannelUserType[]>([]);

  useEffect(() => {
    if (whoamiQuery.status === 'success' && channel.users) {
      setMyUser(findMyUser(whoamiQuery.data.id, channel.users));

      setChannelUsers(
        channel.users
          .filter((user) => user.id !== whoamiQuery.data.id)
          .sort(compare)
      );
    }
  }, [whoamiQuery.status]);

  const isMyUserRoleOwner = myUser?.role === RoleType.owner;

  if (whoamiQuery.status === 'loading') {
    return <div>Loading...</div>;
  }

  if (whoamiQuery.status === 'error') {
    return <div>Error</div>;
  }

  if (!channel) return <div>채널을 선택해주세요</div>;

  return (
    <div>
      {isMyUserRoleOwner && (
        <Button type="button" onClick={onClickSetting}>
          채널 설정
        </Button>
      )}
      <h2>참가자</h2>
      {myUser && channelUsers && (
        <ChannelUserList
          styles={styles}
          myUser={myUser}
          users={channelUsers}
          imageSize={52}
          isPrivate={channel.isPrivate}
          onClickInvite={onClickInvite}
        />
      )}
      <Button type="button">
        {isMyUserRoleOwner ? '채널 삭제' : '채널 나가기'}
      </Button>
    </div>
  );
}
