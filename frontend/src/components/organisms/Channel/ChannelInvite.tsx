import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getUsers, inviteUserToChannel } from 'api/rest.v1';
import { XMarkIcon } from '@heroicons/react/20/solid';
import useDebounce from 'hooks/useDebounce';
import Modal from 'components/templates/Modal';
import UserList from 'components/molecule/UserList';
import SearchCombobox from 'components/molecule/SearchCombobox';
import Button from 'components/atoms/Button';
import { UserType, ChannelUserType } from 'types';
import QUERY_KEYS from 'constants/queryKeys';

interface Props {
  channelId: number;
  channelUsers: ChannelUserType[];
  onClickClose: () => void;
}

export default function ChannelInvite({
  channelId,
  channelUsers,
  onClickClose,
}: Props) {
  const queryClient = useQueryClient();

  const [nickname, setNickname] = useState('');
  const [users, setUsers] = useState<UserType[]>([]);

  const getUsersMutation = useMutation(getUsers);
  const debouncedGetUsers = useDebounce(getUsersMutation.mutate, 300);

  const inviteUserToChannelMutation = useMutation({
    mutationFn: inviteUserToChannel,
    onSuccess: () => {
      onClickClose();
      queryClient.invalidateQueries([QUERY_KEYS.CHANNEL, String(channelId)]);
    },
  });

  useEffect(() => {
    if (!nickname.trim()) {
      getUsersMutation.reset();
      return;
    }

    debouncedGetUsers({ q: nickname, paging: { size: 5 } });
  }, [nickname]);

  const handleClickInvite = () => {
    inviteUserToChannelMutation.mutate({
      channelId: channelId,
      userIds: users.map((user) => user.id),
    });
  };

  const handleSelect = (nickname: string) => {
    if (!getUsersMutation.isSuccess || !getUsersMutation.data) return;

    const selectedUser = getUsersMutation.data.data.find(
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
    <Modal onClickClose={onClickClose}>
      <section>
        <h3 className="section-title">채널 초대하기</h3>
        <div className="mb-4 relative">
          <SearchCombobox
            placeholder="닉네임을 입력해주세요."
            dataList={getUsersMutation.data ? getUsersMutation.data.data : []}
            channelUsers={channelUsers}
            setValue={(value) => setNickname(value)}
            onSelect={handleSelect}
          />
        </div>

        <UserList
          users={users}
          imageSize={52}
          buttons={[
            <Button key="button" onClick={handleClickDelete}>
              <XMarkIcon className="w-6 h-6" />
            </Button>,
          ]}
          inviteList
        />

        <Button onClick={handleClickInvite} primary fullLength>
          초대하기
        </Button>
      </section>
    </Modal>
  );
}
