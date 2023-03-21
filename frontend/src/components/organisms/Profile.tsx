import Button from 'components/atoms/Button';
import { Link } from 'react-router-dom';
import ProfileImage from 'components/atoms/ProfileImage';
import { API_PREFIX, ProfileType } from 'api/api.v1';
import { UserType } from 'types/userType';

interface Props {
  user: ProfileType;
  myId: string;
  followings: UserType[] | null;
  onClickUnfollow: (userId: number) => void;
}

export default function Profile({
  user,
  myId,
  followings,
  onClickUnfollow,
}: Props) {
  const isMyPage = user.id.toString() === myId;
  const isFollowing = followings?.some((following) => following.id === user.id);

  return (
    <>
      <h1>Profile</h1>
      <ProfileImage
        profileImageUrl={`${API_PREFIX}/users/${user.id}/profile-image`}
        alt="profile image"
        size={320}
      />
      <p data-testid={user.id}>{user.nickname}</p>
      {isMyPage && <Link to="/setting">프로필 수정하기</Link>}
      {!isMyPage && (
        <div>
          {isFollowing && (
            <Button type="button" onClick={() => onClickUnfollow(user.id)}>
              언팔로우
            </Button>
          )}
          {!isFollowing && <Button type="button">팔로우하기</Button>}
          <Button type="button">차단하기</Button>
        </div>
      )}
    </>
  );
}
