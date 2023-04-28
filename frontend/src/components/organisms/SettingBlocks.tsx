import { useMutation, useQueryClient } from '@tanstack/react-query';
import { unblockUser } from 'api/api.v1';
import UserList from 'components/molecule/UserList';
import Button from 'components/atoms/Button';
import { UserType } from 'types';

interface Props {
  users: UserType[];
}

export default function SettingBlocks({ users }: Props) {
  const queryClient = useQueryClient();

  const unblockUserMutation = useMutation({
    mutationFn: unblockUser,
    onSuccess: () => queryClient.invalidateQueries(['getMyBlocks']),
  });

  const handleClickUnblock = (e: React.MouseEvent<HTMLElement>) => {
    const ancestorElement = e.currentTarget.closest('[data-user-id]');
    if (!(ancestorElement instanceof HTMLElement)) return;
    const userId = ancestorElement.dataset.userId;
    unblockUserMutation.mutate(Number(userId));
  };

  return (
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
  );
}
