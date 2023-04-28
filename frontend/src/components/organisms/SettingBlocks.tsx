import { useQuery, useMutation } from '@tanstack/react-query';
import { getMyBlocks, unblockUser } from 'api/api.v1';
import UserList from 'components/molecule/UserList';
import Button from 'components/atoms/Button';

export default function SettingBlocks() {
  const getMyBlocksQuery = useQuery({
    queryKey: ['getMyBlocks'],
    queryFn: getMyBlocks,
  });

  const unblockUserMutation = useMutation({
    mutationFn: unblockUser,
    onSuccess: () => getMyBlocksQuery.refetch(),
  });

  const handleClickUnblock = (e: React.MouseEvent<HTMLElement>) => {
    const ancestorElement = e.currentTarget.closest('[data-user-id]');
    if (!(ancestorElement instanceof HTMLElement)) return;
    const userId = ancestorElement.dataset.userId;

    const answer = confirm('차단을 해제하시겠습니까?');
    if (!answer) return;
    unblockUserMutation.mutate(Number(userId));
  };

  return (
    <>
      {getMyBlocksQuery.isSuccess && (
        <UserList
          users={getMyBlocksQuery.data || null}
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
      )}
    </>
  );
}
