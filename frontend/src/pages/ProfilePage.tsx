import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import * as api from 'api/api.v1';
import Profile from 'components/organisms/Profile';
// import Achievements from 'components/organisms/Achievements';

export default function ProfilePage() {
  const { userId } = useParams() as { userId: string };
  const navigate = useNavigate();

  const getUserQuery = useQuery({
    queryKey: ['profile', userId],
    queryFn: () => api.getUser(Number(userId)),
  });

  const followUserMutation = useMutation({
    mutationFn: api.followUser,
    onSuccess: () => getUserQuery.refetch(),
  });

  const unfollowUserMutation = useMutation({
    mutationFn: api.unfollowUser,
    onSuccess: () => getUserQuery.refetch(),
  });

  const blockUserMutation = useMutation({
    mutationFn: api.blockUser,
    onSuccess: () => getUserQuery.refetch(),
  });

  const unblockUserMutation = useMutation({
    mutationFn: api.unblockUser,
    onSuccess: () => getUserQuery.refetch(),
  });

  const getDmChannelMutation = useMutation({
    mutationFn: api.getDmChannel,
    onSuccess: (data) => navigate(`/channel/${data.id}`),
    useErrorBoundary: true,
  });

  const handleClickFollow = (userId: number) => {
    const answer = confirm('팔로우하시겠습니까?');
    if (!answer) return;
    followUserMutation.mutate(userId);
  };

  const handleClickUnfollow = (userId: number) => {
    const answer = confirm('언팔로우하시겠습니까?');
    if (!answer) return;
    unfollowUserMutation.mutate(Number(userId));
  };

  const handleClickBlock = (userId: number) => {
    const answer = confirm('정말 차단하시겠습니까?');
    if (!answer) return;
    blockUserMutation.mutate(userId);
  };

  const handleClickUnblock = (userId: number) => {
    const answer = confirm('차단을 해제하시겠습니까?');
    if (!answer) return;
    unblockUserMutation.mutate(userId);
  };

  const handleClickDm = (userId: number) => {
    getDmChannelMutation.mutate(userId);
  };

  return (
    <>
      {getUserQuery.isSuccess && (
        <>
          <section className="section">
            <Profile
              user={getUserQuery.data}
              onClickFollow={handleClickFollow}
              onClickUnfollow={handleClickUnfollow}
              onClickBlock={handleClickBlock}
              onClickUnblock={handleClickUnblock}
              onClickDm={handleClickDm}
            />
          </section>
          <section className="section">
            <h2 className="section-title">업적</h2>
            {/* <Achievements id={profileQuery.data.id} /> */}
          </section>
          <section className="section">
            <h2 className="section-title">게임 히스토리</h2>
          </section>
        </>
      )}
    </>
  );
}
