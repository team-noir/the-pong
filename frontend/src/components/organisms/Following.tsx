import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getDmChannel, unfollowUser } from 'api/api.v1';
import UserList from 'components/molecule/UserList';
import Button from 'components/atoms/Button';
import GameInviteButton from 'components/molecule/GameInviteButton';
import { UserType } from 'types';

interface Props {
  users: UserType[];
}

export default function Following({ users }: Props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const getDmChannelMutation = useMutation({
    mutationFn: getDmChannel,
    onSuccess: (data) => navigate(`/channel/${data.id}`),
  });

  const unfollowUserMutation = useMutation({
    mutationFn: unfollowUser,
    onSuccess: () => queryClient.invalidateQueries(['getMyFollowing']),
  });

  const handleClickDm = (e: React.MouseEvent<HTMLElement>) => {
    const ancestorElement = e.currentTarget.closest('[data-user-id]');
    if (!(ancestorElement instanceof HTMLElement)) return;
    const userId = ancestorElement.dataset.userId;
    getDmChannelMutation.mutate(Number(userId));
  };

  const handleClickUnfollow = (e: React.MouseEvent<HTMLElement>) => {
    const ancestorElement = e.currentTarget.closest('[data-user-id]');
    if (!(ancestorElement instanceof HTMLElement)) return;
    const userId = ancestorElement.dataset.userId;

    const answer = confirm('언팔로우하시겠습니까?');
    if (!answer) return;
    unfollowUserMutation.mutate(Number(userId));
  };

  return (
    <section className="section">
      <h2 className="section-title">팔로잉</h2>
      <UserList
        users={users}
        imageSize={52}
        hasStatus={true}
        buttons={[
          <GameInviteButton key="button0" />,
          <Button onClick={handleClickDm} key="button1" primary size="small">
            메시지 보내기
          </Button>,
          <Button
            key="button2"
            onClick={handleClickUnfollow}
            linkStyle
            className="text-red"
            size="small"
          >
            언팔로우
          </Button>,
        ]}
      />
    </section>
  );
}
