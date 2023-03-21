import { useQuery, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getMyBlocks, deleteMyBlocks } from 'api/api.v1';
import AppTemplate from 'components/templates/AppTemplate';
import HeaderWithBackButton from 'components/molecule/HeaderWithBackButton';
import UserList from 'components/molecule/UserList';
import Button from 'components/atoms/Button';
import styles from 'assets/styles/Blocks.module.css';
import { UserType } from 'types/userType';

export default function SettingBlocksPage() {
  const getMyBlocksQuery = useQuery<UserType[], AxiosError>({
    queryKey: ['getMyBlocks'],
    queryFn: getMyBlocks,
  });

  const deleteMyBlocksMutation = useMutation(deleteMyBlocks);

  const handleClickUnblock = (e: React.MouseEvent<HTMLElement>) => {
    const ancestorElement = e.currentTarget.closest('[data-user-id]');
    if (!(ancestorElement instanceof HTMLElement)) return;
    const userId = ancestorElement.dataset.userId;

    const answer = confirm('차단을 해제하시겠습니까?');
    if (!answer) return;
    deleteMyBlocksMutation.mutate(Number(userId));
  };

  return (
    <AppTemplate header={<HeaderWithBackButton title={'차단 관리'} />}>
      {getMyBlocksQuery.isLoading && <div>loading...</div>}
      {getMyBlocksQuery.isError && (
        <div>error: {getMyBlocksQuery.error.message}</div>
      )}
      {getMyBlocksQuery.isSuccess && (
        <UserList
          styles={styles}
          users={getMyBlocksQuery.data || null}
          imageSize={52}
          buttons={[
            <Button key="button0" type="button" onClick={handleClickUnblock}>
              차단 해제
            </Button>,
          ]}
        />
      )}
    </AppTemplate>
  );
}
