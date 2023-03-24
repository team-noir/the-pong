import Profile from 'components/organisms/Profile';
import Achievements from 'components/organisms/Achievements';
import {
  getUser,
  getWhoami,
  ProfileUserType,
  putMyFollowing,
  deleteMyFollowing,
  putMyBlocks,
  deleteMyBlocks,
} from 'api/api.v1';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { UserType } from 'types/userType';

export default function ProfilePage() {
  const { userId } = useParams() as { userId: string };

  const getUserQuery = useQuery<ProfileUserType, AxiosError>({
    queryKey: ['profile', userId],
    queryFn: () => getUser(userId),
  });

  const whoamiQuery = useQuery<UserType, AxiosError>({
    queryKey: ['whoami'],
    queryFn: getWhoami,
  });

  const putMyFollowingMutation = useMutation(putMyFollowing);
  const deleteMyFollowingMutation = useMutation(deleteMyFollowing);
  const putMyBlocksMutation = useMutation(putMyBlocks);
  const deleteMyBlocksMutation = useMutation(deleteMyBlocks);

  const handleClickFollow = (userId: number) => {
    const answer = confirm('팔로우하시겠습니까?');
    if (!answer) return;
    putMyFollowingMutation.mutate(userId);
  };

  const handleClickUnfollow = (userId: number) => {
    const answer = confirm('언팔로우하시겠습니까?');
    if (!answer) return;
    deleteMyFollowingMutation.mutate(Number(userId));
  };

  const handleClickBlock = (userId: number) => {
    const answer = confirm('정말 차단하시겠습니까?');
    if (!answer) return;
    putMyBlocksMutation.mutate(userId);
  };

  const handleClickUnblock = (userId: number) => {
    const answer = confirm('차단을 해제하시겠습니까?');
    if (!answer) return;
    deleteMyBlocksMutation.mutate(userId);
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
          />
          {/* <Achievements id={profileQuery.data.id} /> */}
        </>
      )}
    </>
  );
}
