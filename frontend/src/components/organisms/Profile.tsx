import Button from 'components/atoms/Button';
import { Link } from 'react-router-dom';
import ProfileImage from 'components/atoms/ProfileImage';
import { ProfileUserType } from 'api/api.v1';

interface Props {
  user: ProfileUserType;
  myId: string;
  onClickFollow: (userId: number) => void;
  onClickUnfollow: (userId: number) => void;
  onClickBlock: (userId: number) => void;
  onClickUnblock: (userId: number) => void;
  onClickDm: (userId: number) => void;
}

export default function Profile({
  user,
  myId,
  onClickFollow,
  onClickUnfollow,
  onClickBlock,
  onClickUnblock,
  onClickDm,
}: Props) {
  const isMyPage = user.id.toString() === myId;

  return (
    <>
      <h1>Profile</h1>
      <ProfileImage userId={user.id} alt="profile image" size={320} />
      <p data-testid={user.id}>{user.nickname}</p>
      {/* TODO: 나중에 지우기 (다른 회원 프로필 테스트용) */}
      <Link to="/profile/3">user3</Link>
      {isMyPage && <Link to="/setting">프로필 수정하기</Link>}
      {!isMyPage && (
        <div>
          <div>
            {user.isFollowedByMyself ? (
              <Button type="button" onClick={() => onClickUnfollow(user.id)}>
                언팔로우
              </Button>
            ) : (
              <Button type="button" onClick={() => onClickFollow(user.id)}>
                팔로우하기
              </Button>
            )}
            {!user.isBlockedByMyself && (
              <Button type="button" onClick={() => onClickDm(user.id)}>
                메시지 보내기
              </Button>
            )}
          </div>
          {user.isBlockedByMyself ? (
            <Button type="button" onClick={() => onClickUnblock(user.id)}>
              차단 해제
            </Button>
          ) : (
            <Button type="button" onClick={() => onClickBlock(user.id)}>
              차단하기
            </Button>
          )}
        </div>
      )}
    </>
  );
}
