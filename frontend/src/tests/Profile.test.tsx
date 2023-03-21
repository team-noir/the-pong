import { render, screen } from '@testing-library/react';
import { ProfileType } from 'api/api.v1';
import Profile from 'components/organisms/Profile';
import { UserType } from 'types/userType';

const profileUser: ProfileType = {
  id: 1,
  nickname: `user1's nickname`,
  rank: 0,
  achievements: [],
  games: [],
};

const mockFollowings: UserType[] = [
  {
    id: 1,
    nickname: 'Mock Following Nickname1',
    status: 'on',
  },
  {
    id: 2,
    nickname: 'Mock Following Nickname2',
    status: 'off',
  },
  {
    id: 3,
    nickname: 'Mock Following Nickname3',
    status: 'game',
  },
  {
    id: 4,
    nickname: 'Mock Following Nickname4',
    status: 'off',
  },
];

describe('Component - Profile 렌더링', () => {
  test('닉네임과 프로필 사진을 보여준다', () => {
    render(
      <Profile
        user={profileUser}
        myId={'2'}
        followings={mockFollowings}
        onClickUnfollow={() => console.log('Unfollowed')}
      />
    );
    screen.getByText(`user1's nickname`);
    screen.getByAltText('profile image');
    screen.getByText('팔로우하기');
  });
});
