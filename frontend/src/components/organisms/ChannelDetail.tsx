import { useEffect, useState } from 'react';
import Button from 'components/atoms/Button';
import { ChannelType } from 'types/channelType';
import styles from 'assets/styles/Channel.module.css';
import ChannelUserList from 'components/molecule/ChannelUserList';
import { ChannelUserType, RoleType } from 'types/channelUserType';

interface Props {
  channel: ChannelType;
  myUserId: number;
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

const compare = (user1: ChannelUserType, user2: ChannelUserType) => {
  const priority = [RoleType.owner, RoleType.admin, RoleType.normal];
  if (user1.role !== user2.role) {
    return priority.indexOf(user1.role) - priority.indexOf(user2.role);
  }
  // 같은 userType이면 nickname 순
  if (user1.nickname && user2.nickname) {
    return user1.nickname.localeCompare(user2.nickname);
  }
  return 0;
};

export default function ChannelDetail({
  channel,
  myUserId,
  onClickSetting,
  onClickInvite,
}: Props) {
  const [myUser, setMyUser] = useState<ChannelUserType | null>(null);
  const [channelUsers, setChannelUsers] = useState<ChannelUserType[]>([]);

  useEffect(() => {
    if (channel.users) {
      setMyUser(findMyUser(myUserId, channel.users));

      setChannelUsers(
        channel.users.filter((user) => user.id !== myUserId).sort(compare)
      );
    }
  }, [channel.users, myUserId]);

  const isMyUserRoleOwner = myUser?.role === RoleType.owner;

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
