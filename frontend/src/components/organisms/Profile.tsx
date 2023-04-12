import { Link } from 'react-router-dom';
import Button from 'components/atoms/Button';
import ProfileImage from 'components/atoms/ProfileImage';
import { UserType } from 'types';
import { useUser } from 'hooks/useStore';

interface Props {
  user: UserType;
  onClickFollow: (userId: number) => void;
  onClickUnfollow: (userId: number) => void;
  onClickBlock: (userId: number) => void;
  onClickUnblock: (userId: number) => void;
  onClickDm: (userId: number) => void;
}

export default function Profile({
  user,
  onClickFollow,
  onClickUnfollow,
  onClickBlock,
  onClickUnblock,
  onClickDm,
}: Props) {
  const myUserId = useUser((state) => state.id);
  const isMyPage = user.id === myUserId;

  return (
    <div className="flex flex-col items-center">
      <ProfileImage userId={user.id} alt="profile image" size={192} />
      <p data-testid={user.id} className="text-2xl font-semibold mt-4 mb-8">
        {user.nickname}
      </p>
      {isMyPage && (
        <Link to="/setting" className="button primary small">
          프로필 수정하기
        </Link>
      )}
      {!isMyPage && (
        <div className="flex flex-col items-center">
          <div className="inline-flex gap-4 mb-4">
            {user.isFollowedByMyself ? (
              <Button
                onClick={() => onClickUnfollow(user.id)}
                secondary
                className="w-36"
              >
                언팔로우
              </Button>
            ) : (
              <Button
                onClick={() => onClickFollow(user.id)}
                primary
                className="w-36"
              >
                팔로우하기
              </Button>
            )}
            {!user.isBlockedByMyself && (
              <Button
                onClick={() => onClickDm(user.id)}
                primary
                className="w-36"
              >
                메시지 보내기
              </Button>
            )}
          </div>
          {user.isBlockedByMyself ? (
            <Button
              onClick={() => onClickUnblock(user.id)}
              linkStyle
              className="text-red"
              size="small"
            >
              차단 해제
            </Button>
          ) : (
            <Button
              onClick={() => onClickBlock(user.id)}
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
  );
}
