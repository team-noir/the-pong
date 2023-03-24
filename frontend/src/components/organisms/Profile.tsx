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
}

export default function Profile({
  user,
  myId,
  onClickFollow,
  onClickUnfollow,
  onClickBlock,
  onClickUnblock,
}: Props) {
  const isMyPage = user.id.toString() === myId;

  return (
    <>
      <h1>Profile</h1>
      <ProfileImage userId={user.id} alt="profile image" size={320} />
      <p data-testid={user.id}>{user.nickname}</p>
      {isMyPage && <Link to="/setting">프로필 수정하기</Link>}
      {!isMyPage && (
        <div>
          {user.isFollowing && (
            <Button type="button" onClick={() => onClickUnfollow(user.id)}>
              언팔로우
            </Button>
          )}
          {!user.isFollowing && (
            <Button type="button" onClick={() => onClickFollow(user.id)}>
              팔로우하기
            </Button>
          )}
          {user.isBlocked && (
            <Button type="button" onClick={() => onClickUnblock(user.id)}>
              차단 해제
            </Button>
          )}
          {!user.isBlocked && (
            <Button type="button" onClick={() => onClickBlock(user.id)}>
              차단하기
            </Button>
          )}
        </div>
      )}
    </>
  );
}
