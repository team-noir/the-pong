import { useMutation, useQueryClient } from '@tanstack/react-query';
import { unblockUser } from 'api/api.v1';
import UserList from 'components/molecule/UserList';
import Button from 'components/atoms/Button';
import { UserType } from 'types';
import QUERY_KEYS from 'constants/queryKeys';

interface Props {
  users: UserType[];
}

export default function SettingBlocks({ users }: Props) {
  const queryClient = useQueryClient();

  const unblockUserMutation = useMutation({
    mutationFn: unblockUser,
    onSuccess: () => queryClient.invalidateQueries([QUERY_KEYS.BLOCKS]),
  });

  const handleClickUnblock = (e: React.MouseEvent<HTMLElement>) => {
    const ancestorElement = e.currentTarget.closest('[data-user-id]');
    if (!(ancestorElement instanceof HTMLElement)) return;
    const userId = ancestorElement.dataset.userId;
    unblockUserMutation.mutate(Number(userId));
  };

  return (
    <>
      {users.length ? (
        <UserList
          users={users}
          imageSize={52}
          buttons={[
            <Button
              key="button0"
              onClick={handleClickUnblock}
              secondary
              size="small"
            >
              차단 해제
            </Button>,
          ]}
        />
      ) : (
        <p>차단한 회원이 없습니다.</p>
      )}
    </>
  );
}
