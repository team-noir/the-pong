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
  isFollowing: false,
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
        onClickFollow={(userId: number) => console.log(`${userId} followed`)}
        onClickUnfollow={(userId: number) =>
          console.log(`${userId} unfollowed`)
        }
        onClickBlock={(userId: number) => {
          console.log(`${userId} blocked`);
        }}
      />
    );
    screen.findByText(profileUser.nickname);
    screen.findByAltText('profile image');
    screen.findByText('팔로우하기');
  });
});
