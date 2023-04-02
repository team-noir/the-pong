import { render, screen } from '@testing-library/react';
import { ProfileUserType } from 'api/api.v1';
import Profile from 'components/organisms/Profile';

const profileUser: ProfileUserType = {
  id: 1,
  nickname: `user1's nickname`,
  rank: 0,
  achievements: [],
  games: [],
  isFollowedByMyself: false,
  isBlockedByMyself: false,
};

const mockHandler = (userId: number, message: string) =>
  console.log(`${userId} ${message}}`);

describe('Component - Profile 렌더링', () => {
  test('닉네임과 프로필 사진을 보여준다', () => {
    render(
      <Profile
        user={profileUser}
        myId={'2'}
        onClickFollow={(userId: number) => mockHandler(userId, 'followed')}
        onClickUnfollow={(userId: number) => mockHandler(userId, 'unfollowed')}
        onClickBlock={(userId: number) => mockHandler(userId, 'blocked')}
        onClickUnblock={(userId: number) => mockHandler(userId, 'unblocked')}
        onClickDm={(userId: number) => mockHandler(userId, 'dm')}
      />
    );
    screen.findByText(profileUser.nickname);
    screen.findByAltText('profile image');
    screen.findByText('팔로우하기');
  });
});
