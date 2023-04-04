import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import {
  getUser,
  whoami,
  followUser,
  unfollowUser,
  blockUser,
  unblockUser,
  getDmChannel,
} from 'api/api.v1';
import Profile from 'components/organisms/Profile';
import Achievements from 'components/organisms/Achievements';
import { UserType } from 'types';

export default function ProfilePage() {
  const { userId } = useParams() as { userId: string };
  const navigate = useNavigate();

  const getUserQuery = useQuery<UserType, AxiosError>({
    queryKey: ['profile', userId],
    queryFn: () => getUser(Number(userId)),
  });

  const whoamiQuery = useQuery<UserType, AxiosError>({
    queryKey: ['whoami'],
    queryFn: whoami,
  });

  const followUserMutation = useMutation(followUser);
  const unfollowUserMutation = useMutation(unfollowUser);
  const blockUserMutation = useMutation(blockUser);
  const unblockUserMutation = useMutation(unblockUser);
  const getDmChannelMutation = useMutation(getDmChannel);

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
    getDmChannelMutation.mutate(userId, {
      onError: () => alert('다시 시도해 주세요.'),
      onSuccess: (data) => navigate(`/channel/${data.id}`),
    });
  };

  return (
    <>
      {(getUserQuery.isLoading || whoamiQuery.isLoading) && (
        <div>Loading...</div>
      )}
      {getUserQuery.isError && <div>{getUserQuery.error.message}</div>}
      {whoamiQuery.isError && <div>{whoamiQuery.error.message}</div>}
      {getUserQuery.isSuccess && whoamiQuery.isSuccess && (
        <>
          <div>ProfilePage</div>
          <Profile
            user={getUserQuery.data}
            myId={`${whoamiQuery.data.id}`}
            onClickFollow={handleClickFollow}
            onClickUnfollow={handleClickUnfollow}
            onClickBlock={handleClickBlock}
            onClickUnblock={handleClickUnblock}
            onClickDm={handleClickDm}
          />
          {/* <Achievements id={profileQuery.data.id} /> */}
        </>
      )}
    </>
  );
}
