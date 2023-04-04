import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { getUsers } from 'api/api.v1';
import UserList from 'components/molecule/UserList';
import SearchCombobox from 'components/molecule/SearchCombobox';
import Button from 'components/atoms/Button';
import { UserType, ChannelUserType } from 'types';
import styles from 'assets/styles/ChannelInvite.module.css';

interface Props {
  channelUsers: ChannelUserType[];
  onClickClose: () => void;
  inviteUsers: (userIds: number[]) => void;
}

export default function ChannelInvite({
  channelUsers,
  onClickClose,
  inviteUsers,
}: Props) {
  const [nickname, setNickname] = useState('');
  const [users, setUsers] = useState<UserType[]>([]);

  const getUsersMutation = useMutation(getUsers);

  useEffect(() => {
    if (!nickname.trim()) return;

    getUsersMutation.mutate(nickname);
  }, [nickname]);

  const handleSelect = (nickname: string) => {
    if (!getUsersMutation.isSuccess || !getUsersMutation.data) return;

    const selectedUser = getUsersMutation.data.find(
      (user) => user.nickname === nickname
    );
    if (!selectedUser) return;

    if (!users.find((user) => user.id === selectedUser.id)) {
      setUsers((prevState) => [...prevState, selectedUser]);
    }
    setNickname('');
  };

  const handleClickDelete = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const ancestorElement = e.currentTarget.closest('[data-user-id]');
    if (!(ancestorElement instanceof HTMLElement)) return;

    const userId = Number(ancestorElement.dataset.userId);
    setUsers((prevState) => prevState.filter((user) => user.id !== userId));
  };

  return (
    <div>
      <div>
        <Button type="button" onClick={onClickClose}>
          x
        </Button>
        <h2>채널 초대하기</h2>
      </div>
      <SearchCombobox
        placeholder="닉네임을 입력해주세요."
        dataList={getUsersMutation.isSuccess ? getUsersMutation.data : []}
        channelUsers={channelUsers}
        setValue={(value) => setNickname(value)}
        onSelect={handleSelect}
      />
      <UserList
        styles={styles}
        users={users}
        imageSize={52}
        buttons={[
          <Button key="button" type="button" onClick={handleClickDelete}>
            x
          </Button>,
        ]}
      />
      <Button
        type="button"
        onClick={() => inviteUsers(users.map((user) => user.id))}
      >
        초대하기
      </Button>
    </div>
  );
}
