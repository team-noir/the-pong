import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from 'api/api.v1';
import { useUser } from 'hooks/useStore';
import Button from 'components/atoms/Button';
import ProfileImage from 'components/atoms/ProfileImage';
import Achievements from 'components/organisms/Profile/Achievements';
import GameHistory from 'components/organisms/Profile/GameHistory';
import { UserType } from 'types';
import ROUTES from 'constants/routes';
import QUERY_KEYS from 'constants/queryKeys';

interface Props {
  user: UserType;
}

export default function Profile({ user }: Props) {
  const myUserId = useUser((state) => state.id);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const queryKey = [QUERY_KEYS.PROFILE, String(user.id)];
  const isMyPage = user.id === myUserId;

  const onMutate = async (newUser: UserType | undefined) => {
    await queryClient.cancelQueries(queryKey);
    const prevUser = user;
    queryClient.setQueryData(queryKey, newUser);
    return { prevUser };
  };
  const onError = (
    _error: Error,
    _variables: number,
    context: { prevUser: UserType | undefined } | undefined
  ) => queryClient.setQueryData(queryKey, context?.prevUser);
  const onSettled = () => queryClient.invalidateQueries(queryKey);

  const followUserMutation = useMutation({
    mutationFn: api.followUser,
    onMutate: () => onMutate(user && { ...user, isFollowedByMyself: true }),
    onError,
    onSettled,
  });

  const unfollowUserMutation = useMutation({
    mutationFn: api.unfollowUser,
    onMutate: () => onMutate(user && { ...user, isFollowedByMyself: false }),
    onError,
    onSettled,
  });

  const blockUserMutation = useMutation({
    mutationFn: api.blockUser,
    onMutate: () => onMutate(user && { ...user, isBlockedByMyself: true }),
    onError,
    onSettled,
  });

  const unblockUserMutation = useMutation({
    mutationFn: api.unblockUser,
    onMutate: () => onMutate(user && { ...user, isBlockedByMyself: false }),
    onError,
    onSettled,
  });

  const getDmChannelMutation = useMutation({
    mutationFn: api.getDmChannel,
    onSuccess: (data) => navigate(ROUTES.CHANNEL.ROOM(data.id)),
  });

  return (
    <>
      <section className="section">
        <div className="flex flex-col items-center">
          <ProfileImage
            userId={user.id}
            nickname={`${user.nickname}`}
            size={192}
          />
          <div className="mb-8 text-center">
            <p data-testid={user} className="text-2xl font-semibold mt-4 mb-2">
              {user.nickname}
            </p>
            <span className="badge">Lv. {user.level}</span>
          </div>
          {isMyPage && (
            <Link to="/setting/profile" className="button primary small">
              프로필 수정하기
            </Link>
          )}
          {!isMyPage && (
            <div className="flex flex-col items-center">
              <div className="inline-flex gap-4 mb-4">
                {user.isFollowedByMyself ? (
                  <Button
                    onClick={() => unfollowUserMutation.mutate(user.id)}
                    secondary
                    className="w-36"
                  >
                    언팔로우
                  </Button>
                ) : (
                  <Button
                    onClick={() => followUserMutation.mutate(user.id)}
                    primary
                    className="w-36"
                  >
                    팔로우하기
                  </Button>
                )}
                {!user.isBlockedByMyself && (
                  <Button
                    onClick={() => getDmChannelMutation.mutate(user.id)}
                    primary
                    className="w-36"
                  >
                    메시지 보내기
                  </Button>
                )}
              </div>
              {user.isBlockedByMyself ? (
                <Button
                  onClick={() => unblockUserMutation.mutate(user.id)}
                  linkStyle
                  className="text-red"
                  size="small"
                >
                  차단 해제
                </Button>
              ) : (
                <Button
                  onClick={() => blockUserMutation.mutate(user.id)}
                  linkStyle
                  className="text-red"
                  size="small"
                >
                  차단하기
                </Button>
              )}
            </div>
          )}
        </div>
      </section>
      <Achievements userId={user.id} />
      <GameHistory userId={user.id} />
    </>
  );
}
