import Profile from 'components/organisms/Profile';
import Achievements from 'components/organisms/Achievements';
import {
  deleteMyFollowing,
  getMyFollowing,
  getProfile,
  getWhoami,
  ProfileType,
} from 'api/api.v1';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { UserType } from 'types/userType';

export default function ProfilePage() {
  const { userId } = useParams() as { userId: string };

  const profileQuery = useQuery<ProfileType, AxiosError>({
    queryKey: ['profile', userId],
    queryFn: () => getProfile(userId),
  });

  const whoamiQuery = useQuery<UserType, AxiosError>({
    queryKey: ['whoami'],
    queryFn: getWhoami,
  });

  const getMyFollowingQuery = useQuery<UserType[], AxiosError>({
    queryKey: ['getMyFollowing'],
    queryFn: getMyFollowing,
  });

  const deleteMyFollowingMutation = useMutation(deleteMyFollowing);

  const handleClickUnfollow = (userId: number) => {
    const answer = confirm('언팔로우하시겠습니까?');
    if (!answer) return;
    deleteMyFollowingMutation.mutate(Number(userId));
  };

  return (
    <>
      {(profileQuery.isLoading || whoamiQuery.isLoading) && (
        <div>Loading...</div>
      )}
      {profileQuery.isError && <div>{profileQuery.error.message}</div>}
      {whoamiQuery.isError && <div>{whoamiQuery.error.message}</div>}
      {profileQuery.isSuccess && whoamiQuery.isSuccess && (
        <>
          <div>ProfilePage</div>
          <Profile
            user={profileQuery.data}
            myId={`${whoamiQuery.data.id}`}
            followings={getMyFollowingQuery.data || null}
            onClickUnfollow={handleClickUnfollow}
          />
          {/* <Achievements id={profileQuery.data.id} /> */}
        </>
      )}
    </>
  );
}
