import { useEffect, useState } from 'react';
import Modal from 'components/templates/Modal';
import ChannelUserList from 'components/molecule/ChannelUserList';
import Button from 'components/atoms/Button';
import { ChannelType, USER_ROLES, ChannelUserType } from 'types';

interface Props {
  channel: ChannelType;
  myUserId: number;
  onClickClose: () => void;
  onClickSetting: () => void;
  onClickInvite: () => void;
  onClickLeave: () => void;
}

export default function ChannelDetail({
  channel,
  myUserId,
  onClickClose,
  onClickSetting,
  onClickInvite,
  onClickLeave,
}: Props) {
  const [myUser, setMyUser] = useState<ChannelUserType | null>(null);
  const [channelUsers, setChannelUsers] = useState<ChannelUserType[]>([]);

  useEffect(() => {
    if (!channel.users) return;
    setMyUser(findMyUser(myUserId, channel.users));
    setChannelUsers(
      channel.users.filter((user) => user.id !== myUserId).sort(compare)
    );
  }, [channel.users, myUserId]);

  const isMyUserRoleOwner = myUser?.role === USER_ROLES.OWNER;

  return (
    <Modal onClickClose={onClickClose}>
      <section className="section small">
        {isMyUserRoleOwner && (
          <Button onClick={onClickSetting} primary fullLength>
            채널 설정
          </Button>
        )}
      </section>
      <section className="section small">
        <h3 className="section-title">참가자</h3>
        {myUser && channelUsers && (
          <ChannelUserList
            channelId={channel.id}
            myUser={myUser}
            users={channelUsers}
            imageSize={52}
            isPrivate={channel.isPrivate}
            onClickInvite={onClickInvite}
          />
        )}
      </section>
      <section className="section small">
        <Button
          onClick={onClickLeave}
          linkStyle
          size="small"
          className="text-red"
          fullLength
        >
          {isMyUserRoleOwner ? '채널 삭제' : '채널 나가기'}
        </Button>
      </section>
    </Modal>
  );
}

// Utils

function findMyUser(
  myUserId: number,
  users: ChannelUserType[] | null
): ChannelUserType | null {
  if (!users) return null;
  const myUser = users.find((user) => user.id === myUserId);
  return myUser ? myUser : null;
}

function compare(user1: ChannelUserType, user2: ChannelUserType) {
  const priority = [USER_ROLES.OWNER, USER_ROLES.ADMIN, USER_ROLES.NORMAL];
  if (user1.role !== user2.role) {
    return priority.indexOf(user1.role) - priority.indexOf(user2.role);
  }
  if (user1.nickname && user2.nickname) {
    return user1.nickname.localeCompare(user2.nickname);
  }
  return 0;
}
